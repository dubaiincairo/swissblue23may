import type { EditableSiteContent } from "@/lib/editable-content";

export type ChatLocale = "ar" | "en";

export type WebsiteKnowledge = {
  context: string;
  hasRelevantSource: boolean;
};

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
  return matches * 10;
}

/**
 * Uses the editable CMS tree as the assistant's live website knowledge. The
 * relevant text is selected per question to keep each answer inexpensive.
 */
export function websiteContext(
  content: EditableSiteContent,
  locale: ChatLocale,
  question: string,
): WebsiteKnowledge {
  const leaves: TextLeaf[] = [];
  collectText(content[locale], "", leaves);
  const terms = questionTerms(question);
  const ranked = leaves
    .map((leaf) => ({ leaf, score: scoreLeaf(leaf, terms) }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.leaf.path.localeCompare(right.leaf.path));

  const selected: TextLeaf[] = [];
  let size = 0;
  for (const { leaf } of ranked) {
    const line = `${leaf.path}: ${leaf.text}`;
    if (size + line.length + 1 > MAX_CONTEXT_CHARS) break;
    selected.push(leaf);
    size += line.length + 1;
  }

  return {
    context: selected.map((leaf) => `${leaf.path}: ${leaf.text}`).join("\n"),
    hasRelevantSource: selected.length > 0,
  };
}

export function aiInstructions(locale: ChatLocale, context: string) {
  const language = locale === "ar" ? "Arabic" : "English";
  return `You are the Swiss Blue Hotels website assistant. Reply in ${language}.

Use only the retrieved website knowledge below and approved documents returned by file search. Search approved documents before giving a factual answer whenever file search is available. Never use general knowledge or make assumptions.

Do not invent property features, live availability, rates, policies, contact details, offers, or careers information. If the exact answer is not supported by the retrieved sources, say that you do not have verified information and ask the visitor to contact reservations. Do not claim that a reservation is confirmed. Keep replies helpful, concise, and under 140 words. Use ${language} only; do not mix languages.

Current Swiss Blue website knowledge:
${context}`;
}

export function unsupportedAnswer(locale: ChatLocale) {
  return locale === "ar"
    ? "لا أملك معلومات موثقة للإجابة عن ذلك. يرجى التواصل مع فريق الحجوزات لمساعدتك."
    : "I do not have verified information for that. Please contact reservations for assistance.";
}
