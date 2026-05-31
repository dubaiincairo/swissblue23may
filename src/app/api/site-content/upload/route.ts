import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import {
  allowedAssetTypes,
  isUploadConfigured,
  maxImageBytes,
  maxVideoBytes,
  uploadAssetToSanity,
} from "@/sanity/lib/asset-upload";
import { looksLikeSvg, sniffMime } from "@/lib/file-signature";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isUploadConfigured()) {
    return NextResponse.json({ error: "CMS upload is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }

  if (!allowedAssetTypes.has(file.type)) {
    return NextResponse.json(
      { error: "Supported media types are JPG, PNG, WebP, AVIF, SVG, MP4, MOV, and WebM." },
      { status: 400 },
    );
  }

  const isVideo = file.type.startsWith("video/");
  const maxSize = isVideo ? maxVideoBytes : maxImageBytes;

  if (file.size > maxSize) {
    return NextResponse.json(
      { error: isVideo ? "Video must be 80 MB or smaller." : "Image must be 8 MB or smaller." },
      { status: 400 },
    );
  }

  let buffer = Buffer.from(await file.arrayBuffer());
  let mimeType = file.type;

  // Validate the actual bytes, not the spoofable client Content-Type.
  if (file.type === "image/svg+xml") {
    // SVG is XML and can carry <script> / event handlers — sanitise before storing.
    const text = buffer.toString("utf8");
    if (!looksLikeSvg(text)) {
      return NextResponse.json({ error: "That doesn't look like a valid SVG." }, { status: 400 });
    }
    const clean = DOMPurify.sanitize(text, { USE_PROFILES: { svg: true, svgFilters: true } });
    if (!clean.trim()) {
      return NextResponse.json({ error: "SVG could not be sanitised." }, { status: 400 });
    }
    buffer = Buffer.from(clean, "utf8");
  } else {
    const sniffed = sniffMime(buffer);
    const sniffedIsVideo = sniffed?.startsWith("video/") ?? false;
    if (!sniffed || !allowedAssetTypes.has(sniffed) || sniffedIsVideo !== isVideo) {
      return NextResponse.json(
        { error: "File contents don't match a supported media type." },
        { status: 400 },
      );
    }
    mimeType = sniffed; // trust the detected type for the upload, not the client's claim
  }

  const asset = await uploadAssetToSanity({
    buffer,
    mimeType,
    filename: file.name,
  });

  return NextResponse.json(asset);
}
