import type { EditableSiteContent } from "@/lib/editable-content";

export type ChatLocale = "ar" | "en";

type TextLeaf = {
  path: string;
  text: string;
};

const OMITTED_KEYS = new Set([
  "image",
  "images",
  "logo",
  "favicon",
  "ogImage",
  "cropFocus",
  "backgroundPosition",
]);

const CORE_PATHS = [
  "footerContact",
  "homepage.properties",
  "faq",
  "subpages.reservationOfficePage",
  "subpages.corporateDealsPage",
  "subpages.careersPage",
];

const MAX_CONTEXT_CHARS = 9_500;

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function collectText(value: unknown, path: string, leaves: TextLeaf[]) {
  if (typeof value === "string") {
    const text = cleanText(value);
    if (text && !/^https?:\/\//i.test(text) && !text.startsWith("data:")) {
      leaves.push({ path, text: text.slice(0, 700) });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectText(item, `${path}.${index}`, leaves));
    return;
  }

  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      if (OMITTED_KEYS.has(key) || key === "seo") continue;
      collectText(child, path ? `${path}.${key}` : key, leaves);
    }
  }
}

function questionTerms(question: string) {
  return Array.from(
    new Set(
      cleanText(question.toLocaleLowerCase())
        .split(/[^\p{L}\p{N}]+/u)
        .filter((term) => term.length >= 2),
    ),
  );
}

function scoreLeaf(leaf: TextLeaf, terms: string[]) {
  const haystack = `${leaf.path} ${leaf.text}`.toLocaleLowerCase();
  const matches = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
  const coreBoost = CORE_PATHS.some((path) => leaf.path.startsWith(path)) ? 1 : 0;
  return matches * 8 + coreBoost;
}

/**
 * Uses the editable CMS tree as the assistant's live website knowledge. The
 * relevant text is selected per question to keep each answer inexpensive.
 */
export function websiteContext(
  content: EditableSiteContent,
  locale: ChatLocale,
  question: string,
) {
  const leaves: TextLeaf[] = [];
  collectText(content[locale], "", leaves);
  const terms = questionTerms(question);
  const ranked = leaves
    .map((leaf) => ({ leaf, score: scoreLeaf(leaf, terms) }))
    .sort((left, right) => right.score - left.score || left.leaf.path.localeCompare(right.leaf.path));

  const selected: TextLeaf[] = [];
  let size = 0;
  for (const { leaf } of ranked) {
    const line = `${leaf.path}: ${leaf.text}`;
    if (size + line.length + 1 > MAX_CONTEXT_CHARS) break;
    selected.push(leaf);
    size += line.length + 1;
  }

  return selected.map((leaf) => `${leaf.path}: ${leaf.text}`).join("\n");
}

export function aiInstructions(locale: ChatLocale, context: string) {
  const language = locale === "ar" ? "Arabic" : "English";
  return `You are the Swiss Blue Hotels website assistant. Reply in ${language}.

Use only the website knowledge and the uploaded business documents available to you. Do not invent property features, live availability, rates, policies, contact details, or offers. If the answer is not supported by the knowledge, say so clearly and direct the visitor to the reservations team. Do not claim that a reservation is confirmed. Keep replies helpful, concise, and under 140 words.

Current Swiss Blue website knowledge:
${context}`;
}
