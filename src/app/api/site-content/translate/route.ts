import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type TranslateBody = {
  text?: unknown;
  source?: unknown;
  target?: unknown;
  isHtml?: unknown;
};

const SUPPORTED = new Set(["ar", "en"]);

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function deeplLang(code: string, role: "source" | "target") {
  if (code === "en") {
    return role === "target" ? "EN-US" : "EN";
  }
  if (code === "ar") return "AR";
  return code.toUpperCase();
}

export async function POST(request: Request) {
  const key = process.env.DEEPL_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Translation isn't configured." }, { status: 503 });
  }

  let body: TranslateBody;
  try {
    body = (await request.json()) as TranslateBody;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const text = typeof body.text === "string" ? body.text : "";
  const source = typeof body.source === "string" ? body.source.toLowerCase() : "";
  const target = typeof body.target === "string" ? body.target.toLowerCase() : "";
  const isHtml = body.isHtml === true;

  if (!text.trim()) return badRequest("Text is empty.");
  if (!SUPPORTED.has(source)) return badRequest("Unsupported source language.");
  if (!SUPPORTED.has(target)) return badRequest("Unsupported target language.");
  if (source === target) return badRequest("Source and target must differ.");

  // DeepL Free uses api-free; paid uses api. Key ending ":fx" → free tier.
  const endpoint = key.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";

  const params = new URLSearchParams();
  params.append("text", text);
  params.append("source_lang", deeplLang(source, "source"));
  params.append("target_lang", deeplLang(target, "target"));
  if (isHtml) {
    params.append("tag_handling", "html");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json(
      { error: `Translation failed (${response.status}).`, detail: detail.slice(0, 200) },
      { status: response.status === 456 ? 402 : 502 },
    );
  }

  const data = (await response.json()) as { translations?: Array<{ text: string }> };
  const translated = data.translations?.[0]?.text;

  if (typeof translated !== "string") {
    return NextResponse.json({ error: "Translation returned no text." }, { status: 502 });
  }

  return NextResponse.json({ translated });
}
