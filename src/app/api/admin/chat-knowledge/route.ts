import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { load } from "cheerio";
import {
  addChatKnowledgeSource,
  isChatKnowledgeConfigured,
  listChatKnowledgeSources,
  removeChatKnowledgeSource,
  type ChatKnowledgeSource,
} from "@/lib/chat-knowledge";
import {
  attachKnowledgeFile,
  deleteKnowledgeFile,
  getKnowledgeFileStatus,
  uploadKnowledgeFile,
} from "@/lib/openai-files";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_PDF_BYTES = 12 * 1024 * 1024;
const MAX_WEB_BYTES = 2 * 1024 * 1024;
const MAX_SOURCE_COUNT = 50;

function error(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function isPrivateIp(address: string) {
  const normalized = address.replace(/^::ffff:/, "");
  if (isIP(normalized) === 4) {
    const [a, b] = normalized.split(".").map(Number);
    return (
      a === 10 ||
      a === 127 ||
      a === 0 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  const lower = normalized.toLowerCase();
  return lower === "::1" || lower === "::" || lower.startsWith("fc") || lower.startsWith("fd") || lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb");
}

async function assertPublicUrl(url: URL) {
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("Use an HTTP or HTTPS link.");
  }
  if (url.username || url.password) throw new Error("Links with embedded credentials are not allowed.");
  const addresses = await lookup(url.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some((entry) => isPrivateIp(entry.address))) {
    throw new Error("This link is not publicly reachable.");
  }
}

async function fetchPublicSource(input: string) {
  let current = new URL(input);
  for (let redirect = 0; redirect < 4; redirect += 1) {
    await assertPublicUrl(current);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let response: Response;
    try {
      response = await fetch(current, {
        headers: { "User-Agent": "SwissBlueKnowledgeBot/1.0" },
        redirect: "manual",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The source redirected without a destination.");
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) throw new Error(`The source returned HTTP ${response.status}.`);

    const length = Number.parseInt(response.headers.get("content-length") ?? "0", 10);
    if (length > MAX_WEB_BYTES) throw new Error("The source is too large. Maximum size is 2 MB.");
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength > MAX_WEB_BYTES) throw new Error("The source is too large. Maximum size is 2 MB.");
    return { buffer, contentType: response.headers.get("content-type") ?? "", url: current };
  }
  throw new Error("The source redirected too many times.");
}

function webPageFile(buffer: Buffer, url: URL) {
  const $ = load(buffer.toString("utf8"));
  $("script, style, noscript, template, svg, form, nav, footer").remove();
  const title = $("title").first().text().replace(/\s+/g, " ").trim() || url.hostname;
  const main = $("main, article, [role='main']").first();
  const text = (main.length ? main.text() : $("body").text()).replace(/\s+/g, " ").trim();
  if (text.length < 80) throw new Error("The page does not contain enough readable text.");
  const document = [`Source: ${url.toString()}`, `Title: ${title}`, "", text.slice(0, 220_000)].join("\n");
  const safeName = `${url.hostname.replace(/[^a-z0-9.-]/gi, "-")}-${Date.now()}.txt`;
  return { file: new File([document], safeName, { type: "text/plain" }), title };
}

async function createSource(file: File, source: Omit<ChatKnowledgeSource, "id" | "fileId" | "vectorStoreFileId" | "status" | "createdAt">) {
  const fileId = await uploadKnowledgeFile(file);
  try {
    const attached = await attachKnowledgeFile(fileId);
    const item: ChatKnowledgeSource = {
      ...source,
      id: crypto.randomUUID(),
      fileId,
      vectorStoreFileId: attached.id,
      status: attached.status,
      createdAt: new Date().toISOString(),
    };
    await addChatKnowledgeSource(item);
    return item;
  } catch (cause) {
    await deleteKnowledgeFile(fileId, "");
    throw cause;
  }
}

export async function GET() {
  const configured = isChatKnowledgeConfigured();
  if (!configured) return NextResponse.json({ configured, sources: [] });
  const stored = await listChatKnowledgeSources();
  const sources = await Promise.all(
    stored.map(async (source) => ({
      ...source,
      status: await getKnowledgeFileStatus(source.vectorStoreFileId),
    })),
  );
  return NextResponse.json({ configured, sources });
}

export async function POST(request: Request) {
  if (!isChatKnowledgeConfigured()) return error("Knowledge base is not configured.", 503);
  if ((await listChatKnowledgeSources()).length >= MAX_SOURCE_COUNT) {
    return error("The knowledge base has reached its 50-source limit.", 409);
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File)) return error("Choose a PDF file.");
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        return error("Only PDF files are accepted.");
      }
      if (file.size <= 0 || file.size > MAX_PDF_BYTES) return error("PDF files must be 12 MB or smaller.");
      const source = await createSource(file, { kind: "pdf", title: file.name.slice(0, 180) });
      return NextResponse.json({ source }, { status: 201 });
    }

    const body = (await request.json()) as { url?: unknown };
    const input = typeof body.url === "string" ? body.url.trim() : "";
    if (!input || input.length > 2_000) return error("Enter a valid source link.");
    const fetched = await fetchPublicSource(input);
    const isPdf = fetched.contentType.toLowerCase().includes("application/pdf") || fetched.url.pathname.toLowerCase().endsWith(".pdf");
    const titleFromUrl = decodeURIComponent(fetched.url.pathname.split("/").pop() || fetched.url.hostname).slice(0, 180);
    const prepared = isPdf
      ? { file: new File([fetched.buffer], titleFromUrl || "source.pdf", { type: "application/pdf" }), title: titleFromUrl || fetched.url.hostname }
      : webPageFile(fetched.buffer, fetched.url);
    const source = await createSource(prepared.file, {
      kind: "url",
      title: prepared.title,
      sourceUrl: fetched.url.toString(),
    });
    return NextResponse.json({ source }, { status: 201 });
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : "Could not add this source.";
    return error(message, 502);
  }
}

export async function DELETE(request: Request) {
  if (!isChatKnowledgeConfigured()) return error("Knowledge base is not configured.", 503);
  const id = new URL(request.url).searchParams.get("id")?.trim();
  if (!id) return error("Source id is required.");
  const source = await removeChatKnowledgeSource(id);
  if (!source) return error("Source not found.", 404);
  await deleteKnowledgeFile(source.fileId, source.vectorStoreFileId);
  return NextResponse.json({ removed: true });
}
