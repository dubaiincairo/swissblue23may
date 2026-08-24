import "server-only";

import type { BilingualSaudiHospitalityStore } from "@/lib/saudihospitalityweb-store";
import { initialSaudiHospitalityContent } from "@/lib/saudihospitalityweb-store";
import { getClient } from "@/sanity/lib/client";
import { getFormsClient } from "@/sanity/lib/forms";

const DOCUMENT_ID = "saudiHospitalityWebContent";
const MAX_CONTENT_BYTES = 750_000;

function isStore(value: unknown): value is BilingualSaudiHospitalityStore {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<BilingualSaudiHospitalityStore>;
  return Boolean(candidate.ar?.hero?.title && candidate.en?.hero?.title);
}

export async function getSaudiHospitalityStore(): Promise<BilingualSaudiHospitalityStore> {
  const client = getClient();
  if (!client) return initialSaudiHospitalityContent;

  try {
    const content = await client.withConfig({ useCdn: false }).fetch<unknown>(
      `*[_id == $id][0].content`,
      { id: DOCUMENT_ID },
    );
    return isStore(content) ? content : initialSaudiHospitalityContent;
  } catch {
    return initialSaudiHospitalityContent;
  }
}

export async function saveSaudiHospitalityStore(
  value: unknown,
): Promise<BilingualSaudiHospitalityStore> {
  if (!isStore(value) || JSON.stringify(value).length > MAX_CONTENT_BYTES) {
    throw new Error("Invalid Saudi Hospitality content payload");
  }

  const client = getFormsClient();
  if (!client) throw new Error("Content persistence is not configured");

  await client.createOrReplace({
    _id: DOCUMENT_ID,
    _type: "saudiHospitalityWeb",
    content: value,
    updatedAt: new Date().toISOString(),
  });
  return value;
}
