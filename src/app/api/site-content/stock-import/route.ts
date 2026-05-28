import { NextResponse } from "next/server";
import {
  allowedImageTypes,
  isUploadConfigured,
  maxImageBytes,
  uploadAssetToSanity,
} from "@/sanity/lib/asset-upload";

export const dynamic = "force-dynamic";

type ImportBody = {
  source?: unknown;
  downloadUrl?: unknown;
  filename?: unknown;
};

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function sanitizeFilename(input: string, source: "unsplash" | "pexels" | "google") {
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

  if (source !== "unsplash" && source !== "pexels" && source !== "google") {
    return badRequest("source must be 'unsplash', 'pexels', or 'google'.");
  }

  if (typeof downloadUrl !== "string" || !downloadUrl.startsWith("https://")) {
    return badRequest("downloadUrl must be an https URL.");
  }

  let allowedHost = false;
  try {
    const host = new URL(downloadUrl).hostname;
    if (source === "unsplash") {
      allowedHost = host === "api.unsplash.com" || host.endsWith(".unsplash.com");
    } else if (source === "pexels") {
      allowedHost = host.endsWith(".pexels.com");
    } else {
      allowedHost = true;
    }
  } catch {
    return badRequest("downloadUrl is not a valid URL.");
  }

  if (!allowedHost) {
    return badRequest("downloadUrl host is not allowed for this source.");
  }

  let imageUrl = downloadUrl;

  if (source === "unsplash") {
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) {
      return NextResponse.json({ error: "Unsplash isn't configured." }, { status: 503 });
    }

    const trackResponse = await fetch(downloadUrl, {
      headers: { Authorization: `Client-ID ${key}` },
    });

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

  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    return NextResponse.json(
      { error: `Could not fetch the image (${imageResponse.status}).` },
      { status: 502 },
    );
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
