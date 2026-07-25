import type { EditableSiteContent } from "@/lib/editable-content";

export type ChatLocale = "ar" | "en";

export type WebsiteKnowledge = {
  context: string;
  hasRelevantSource: boolean;
};

type PropertySummary = {
  slug?: string;
  title?: string;
  city?: string;
  units?: string;
  unitTypes?: Array<{ title?: string; count?: string }>;
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

const PROPERTY_ALIASES_BY_SLUG: Record<string, string[]> = {
  "swiss-blue-jeddah": ["swiss blue jeddah", "jeddah", "سويس بلو جده", "سويس بلو جدة", "جده", "جدة"],
  "swiss-blue-jazan": ["swiss blue jazan", "jazan", "jizan", "سويس بلو جازان", "جازان"],
  "al-zahraa-serviced-apartments": ["al zahraa", "zahraa", "الزهراء", "زهراء"],
  "al-samer-serviced-apartments": ["al samer", "samer", "السامر", "سامر"],
  "vinas-riyadh-serviced-apartments": ["vinas", "vinas riyadh", "فيناس", "فيناس الرياض"],
  "tulip-alrawdah-serviced-apartments": ["tulip", "alrawdah", "al rawdah", "توليب", "الروضه", "الروضة"],
};

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

function normalizeSearch(value: string) {
  return cleanText(value)
    .toLocaleLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function mentionsRoomsQuestion(question: string) {
  const normalized = normalizeSearch(question);
  const hasArabicUnit = ["غرف", "غرفه", "شقق", "شقه", "وحدات", "وحده"].some((term) => normalized.includes(term));
  if (hasArabicUnit && (normalized.includes("كم") || normalized.includes("عدد") || normalized.includes("متاح"))) {
    return true;
  }

  const hasEnglishUnit = ["room", "rooms", "apartment", "apartments", "unit", "units"].some((term) => normalized.includes(term));
  if (hasEnglishUnit && (normalized.includes("how many") || normalized.includes("available") || normalized.includes("type"))) {
    return true;
  }

  return [
    "how many room",
    "how many apartment",
    "how many unit",
    "rooms available",
    "apartments available",
    "unit types",
    "room types",
    "كم غرف",
    "كم غرفة",
    "كم شقه",
    "كم شقة",
    "عدد الغرف",
    "عدد الشقق",
    "انواع الغرف",
    "أنواع الغرف",
  ].some((term) => normalized.includes(normalizeSearch(term)));
}

function propertyAliases(property: PropertySummary) {
  const title = property.title ?? "";
  const slug = property.slug ?? "";
  return [title, slug, ...(PROPERTY_ALIASES_BY_SLUG[slug] ?? []), ...slug.split("-"), ...(title.match(/\p{L}+/gu) ?? [])]
    .filter((value) => value.length >= 3)
    .map(normalizeSearch);
}

function findMentionedProperty(properties: PropertySummary[], question: string) {
  const normalizedQuestion = normalizeSearch(question);
  return properties.find((property) => propertyAliases(property).some((alias) => normalizedQuestion.includes(alias)));
}

export function fastWebsiteAnswer(content: EditableSiteContent, locale: ChatLocale, question: string) {
  if (!mentionsRoomsQuestion(question)) return null;

  const property = findMentionedProperty(content[locale].homepage.properties.items, question);
  if (!property) return null;

  const unitTypes = property.unitTypes ?? [];
  const unitList = unitTypes
    .map((unit) => {
      if (!unit.title || !unit.count) return null;
      return locale === "ar" ? `${unit.title}: ${unit.count}` : `${unit.title}: ${unit.count}`;
    })
    .filter((item): item is string => Boolean(item));

  if (locale === "ar") {
    const details = unitList.length ? `\n\nالفئات:\n- ${unitList.join("\n- ")}` : "";
    return `${property.title} في ${property.city ?? "سويس بلو"} تضم ${property.units ?? "عدة وحدات"}.${details}\n\nهذا هو حجم المنشأة، أما التوفر الفعلي فيعتمد على تاريخ الإقامة. يرجى استخدام زر الحجز أو التواصل مع فريق الحجوزات للتأكد.`;
  }

  const details = unitList.length ? `\n\nUnit types:\n- ${unitList.join("\n- ")}` : "";
  return `${property.title} in ${property.city ?? "Swiss Blue"} has ${property.units ?? "several units"}.${details}\n\nThis is the property size. Live availability depends on the stay dates, so please use the Book now button or contact reservations to confirm.`;
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
  return `You are Sarah Al-Otaibi, the Swiss Blue Hotels virtual concierge. Reply in ${language}.

Use only the retrieved website knowledge below and approved documents returned by file search. Search approved documents before giving a factual answer whenever file search is available. Never use general knowledge or make assumptions.

Customer service style:
- Sound warm, calm, and helpful, like a real reservations agent.
- Answer the visitor's question directly in the first sentence, then offer the next useful step.
- Do not begin replies with repeated generic openers such as "I'd be happy to help", "Certainly", "Of course", "يسعدني مساعدتك", or "بالطبع".
- Do not say "listed on the Swiss Blue site", "retrieved sources", "documents", or similar internal/source wording.
- Do not open with definitions such as "'Tulip' refers to..."; instead use the full property name naturally.
- If the visitor asks about live availability, exact prices, today's inventory, or booking confirmation, explain that live availability must be checked through reservations or the booking link.
- If the visitor seems ready to book, invite them to share dates and preferred property, or use the Book now button.

Formatting rules:
- Use professional plain text only. Do not use emojis.
- Keep replies scannable: use short paragraphs, or a short hyphen-bullet list when listing options.
- Do not use markdown tables, headings, decorative symbols, or long blocks of text.

Do not invent property features, live availability, rates, policies, contact details, offers, or careers information. If the exact answer is not supported by the retrieved sources, politely say that you do not have verified details and direct the visitor to reservations. Do not claim that a reservation is confirmed. Keep replies helpful, concise, and under 120 words. Use ${language} only; do not mix languages.

Current Swiss Blue website knowledge:
${context}`;
}

export function unsupportedAnswer(locale: ChatLocale) {
  return locale === "ar"
    ? "لا أملك حالياً معلومة موثقة عن هذا الطلب. يرجى التواصل مع فريق الحجوزات للتأكد من التفاصيل والتوافر."
    : "I do not have verified details for that request right now. Please contact reservations to confirm the latest information and availability.";
}
