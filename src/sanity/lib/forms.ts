import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const maxCvBytes = 10 * 1024 * 1024;

export const allowedCvTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function isFormsConfigured() {
  return Boolean(projectId && dataset && process.env.SANITY_API_WRITE_TOKEN);
}

/** Sanity client with write access for storing form submissions. Null when unconfigured. */
export function getFormsClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    return null;
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}
