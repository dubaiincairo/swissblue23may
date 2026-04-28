import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanityConfig, projectId } from "../env";

export function getClient() {
  if (!hasSanityConfig) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: process.env.NODE_ENV === "production",
  });
}

export { hasSanityConfig };
