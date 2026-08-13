import { NextResponse } from "next/server";
import {
  allowedImageTypes,
  isUploadConfigured,
  maxImageBytes,
  uploadAssetToSanity,
} from "@/sanity/lib/asset-upload";

export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 12_000;
const MAX_REDIRECTS = 4;

type ImportBody = {
  source?: unknown;
  downloadUrl?: unknown;
  filename?: unknown;
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/** True only when the URL points at this source's allowlisted image hosts. */
function hostAllowed(rawUrl: string, source: "unsplash" | "pexels"): boolean {
  try {
    const host = new URL(rawUrl).hostname;
    return source === "unsplash"
      ? host === "api.unsplash.com" || host.endsWith(".unsplash.com")
      : host.endsWith(".pexels.com");
  } catch {
    return false;
  }
}

function sanitizeFilename(input: string, source: "unsplash" | "pexels") {
  const fallback = `${source}-photo`;
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || fallback;
}

function extensionForMime(mime: string) {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/avif":
      return "avif";
    case "image/svg+xml":
      return "svg";
    default:
      return "jpg";
  }
}

async function fetchAllowedSource(
  rawUrl: string,
  source: "unsplash" | "pexels",
  init: RequestInit = {},
): Promise<Response> {
  let current = rawUrl;

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    if (!current.startsWith("https://") || !hostAllowed(current, source)) {
      throw new Error("Resolved image URL is not allowed.");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(current, { ...init, redirect: "manual", signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }

    if (response.status < 300 || response.status >= 400) return response;

    const location = response.headers.get("location");
    if (!location) throw new Error("Image source redirected without a destination.");
    current = new URL(location, current).toString();
  }

  throw new Error("Image source redirected too many times.");
}

export async function POST(request: Request) {
  if (!isUploadConfigured()) {
    return NextResponse.json({ error: "CMS upload is not configured." }, { status: 500 });
  }

  let body: ImportBody;
  try {
    body = (await request.json()) as ImportBody;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const source = body.source;
  const downloadUrl = body.downloadUrl;
  const filenameHint = typeof body.filename === "string" ? body.filename : "";

  if (source !== "unsplash" && source !== "pexels") {
    return badRequest("source must be 'unsplash' or 'pexels'.");
  }

  if (typeof downloadUrl !== "string" || !downloadUrl.startsWith("https://")) {
    return badRequest("downloadUrl must be an https URL.");
  }

  if (!hostAllowed(downloadUrl, source)) {
    return badRequest("downloadUrl host is not allowed for this source.");
  }

  let imageUrl = downloadUrl;

  if (source === "unsplash") {
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) {
      return NextResponse.json({ error: "Unsplash isn't configured." }, { status: 503 });
    }

    let trackResponse: Response;
    try {
      trackResponse = await fetchAllowedSource(downloadUrl, source, {
        headers: { Authorization: `Client-ID ${key}` },
      });
    } catch {
      return NextResponse.json({ error: "Could not securely reach the image source." }, { status: 502 });
    }

    if (!trackResponse.ok) {
      return NextResponse.json(
        { error: `Unsplash download tracking failed (${trackResponse.status}).` },
        { status: 502 },
      );
    }

    const trackData = (await trackResponse.json()) as { url?: string };
    if (typeof trackData.url === "string" && trackData.url) {
      imageUrl = trackData.url;
    }
  }

  // Re-validate the final URL (e.g. Unsplash's tracking-redirect target) so the
  // server only ever fetches from the allowlisted image hosts — no SSRF pivot.
  if (!imageUrl.startsWith("https://") || !hostAllowed(imageUrl, source)) {
    return NextResponse.json({ error: "Resolved image URL is not allowed." }, { status: 502 });
  }

  let imageResponse: Response;
  try {
    imageResponse = await fetchAllowedSource(imageUrl, source);
  } catch {
    return NextResponse.json({ error: "Could not securely reach the image source." }, { status: 502 });
  }
  if (!imageResponse.ok) {
    return NextResponse.json(
      { error: `Could not fetch the image (${imageResponse.status}).` },
      { status: 502 },
    );
  }

  // Reject oversized payloads up front when the host declares a content length.
  const declaredLength = Number(imageResponse.headers.get("content-length") ?? "");
  if (Number.isFinite(declaredLength) && declaredLength > maxImageBytes) {
    return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 413 });
  }

  const contentType = imageResponse.headers.get("content-type")?.split(";")[0]?.trim() ?? "image/jpeg";
  const mimeType = allowedImageTypes.has(contentType) ? contentType : "image/jpeg";

  const arrayBuffer = await imageResponse.arrayBuffer();
  if (arrayBuffer.byteLength > maxImageBytes) {
    return NextResponse.json({ error: "Image must be 8 MB or smaller." }, { status: 413 });
  }

  const filename = `${sanitizeFilename(filenameHint, source)}.${extensionForMime(mimeType)}`;

  const asset = await uploadAssetToSanity({
    buffer: Buffer.from(arrayBuffer),
    mimeType,
    filename,
  });

  return NextResponse.json(asset);
}
