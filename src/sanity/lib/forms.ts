import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const maxCvBytes = 10 * 1024 * 1024;

export const allowedCvTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

/**
 * Token used for reading + creating form submissions. Prefer a least-privilege
 * token scoped to just the form document types + asset uploads
 * (SANITY_FORMS_TOKEN); fall back to the full write token so nothing breaks
 * until the scoped one is provisioned. Keeping the public form routes off the
 * all-powerful write token limits the blast radius if a form route is abused.
 */
function formsToken(): string | undefined {
  return process.env.SANITY_FORMS_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN;
}

export function isFormsConfigured() {
  return Boolean(projectId && dataset && formsToken());
}

/** Sanity client with write access for storing form submissions. Null when unconfigured. */
export function getFormsClient() {
  const token = formsToken();

  if (!projectId || !dataset || !token) {
    return null;
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false });
}
