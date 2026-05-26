import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const dynamic = "force-dynamic";

const allowedTypes = new Set([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export async function POST(request: Request) {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    return NextResponse.json({ error: "CMS upload is not configured." }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json(
      { error: "Supported media types are JPG, PNG, WebP, AVIF, SVG, MP4, MOV, and WebM." },
      { status: 400 },
    );
  }

  const isVideo = file.type.startsWith("video/");
  const maxSize = isVideo ? 80 * 1024 * 1024 : 8 * 1024 * 1024;

  if (file.size > maxSize) {
    return NextResponse.json(
      { error: isVideo ? "Video must be 80 MB or smaller." : "Image must be 8 MB or smaller." },
      { status: 400 },
    );
  }

  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: false,
  });

  const buffer = Buffer.from(await file.arrayBuffer());
  const asset = await client.assets.upload(isVideo ? "file" : "image", buffer, {
    filename: file.name,
  });

  return NextResponse.json({
    url: asset.url,
    type: isVideo ? "video" : "image",
    width: asset.metadata?.dimensions?.width,
    height: asset.metadata?.dimensions?.height,
  });
}
