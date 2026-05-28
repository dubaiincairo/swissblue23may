import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const allowedImageTypes = new Set([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
]);

export const allowedVideoTypes = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export const allowedAssetTypes = new Set([...allowedImageTypes, ...allowedVideoTypes]);

export const maxImageBytes = 8 * 1024 * 1024;
export const maxVideoBytes = 80 * 1024 * 1024;

export type UploadedAsset = {
  url: string;
  type: "image" | "video";
  width?: number;
  height?: number;
};

type UploadInput = {
  buffer: Buffer;
  mimeType: string;
  filename: string;
};

export function isUploadConfigured() {
  return Boolean(projectId && dataset && process.env.SANITY_API_WRITE_TOKEN);
}

export async function uploadAssetToSanity({ buffer, mimeType, filename }: UploadInput): Promise<UploadedAsset> {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    throw new Error("CMS upload is not configured.");
  }

  const isVideo = mimeType.startsWith("video/");
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    token,
    useCdn: false,
  });

  const asset = await client.assets.upload(isVideo ? "file" : "image", buffer, {
    filename,
    contentType: mimeType,
  });

  return {
    url: asset.url,
    type: isVideo ? "video" : "image",
    width: asset.metadata?.dimensions?.width,
    height: asset.metadata?.dimensions?.height,
  };
}
