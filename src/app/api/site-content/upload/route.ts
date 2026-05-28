import { NextResponse } from "next/server";
import {
  allowedAssetTypes,
  isUploadConfigured,
  maxImageBytes,
  maxVideoBytes,
  uploadAssetToSanity,
} from "@/sanity/lib/asset-upload";

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

  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await uploadAssetToSanity({
    buffer,
    mimeType: file.type,
    filename: file.name,
  });

  return NextResponse.json(asset);
}
