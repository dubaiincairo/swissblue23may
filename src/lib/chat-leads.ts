export type ChatLeadKind = "booking" | "corporate" | "career";

const CORPORATE_TERMS = [
  "corporate", "company", "business", "b2b", "contract", "partnership", "delegation", "group booking", "monthly stay",
  "شرك", "مؤسس", "اعمال", "أعمال", "عقد", "تعاقد", "مجموع", "وفد", "جهة",
];

const CAREER_TERMS = [
  "career", "job", "jobs", "vacancy", "vacancies", "employment", "apply", "application", "cv", "resume", "recruitment",
  "وظيف", "توظيف", "وظائف", "سيره", "سيرة", "تقديم",
];

const BOOKING_TERMS = [
  "book", "booking", "reserve", "reservation", "room", "rooms", "stay", "availability", "available", "check-in", "apartment", "suite",
  "حجز", "احجز", "حجوز", "غرف", "غرفة", "اقامة", "إقامة", "توفر", "متاح", "شقه", "شقة", "جناح",
];

function normalize(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function containsAny(value: string, terms: string[]) {
  const normalized = normalize(value);
  return terms.some((term) => normalized.includes(normalize(term)));
}

export function isChatLeadKind(value: unknown): value is ChatLeadKind {
  return value === "booking" || value === "corporate" || value === "career";
}

/** Recognizes help that should become a routed lead instead of an AI answer. */
export function detectChatLeadKind(message: string): ChatLeadKind | null {
  if (containsAny(message, CORPORATE_TERMS)) return "corporate";
  if (containsAny(message, CAREER_TERMS)) return "career";
  if (containsAny(message, BOOKING_TERMS)) return "booking";
  return null;
}
