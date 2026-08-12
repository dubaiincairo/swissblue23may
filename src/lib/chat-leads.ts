export type ChatLeadKind = "booking" | "corporate" | "career" | "support";

const BOOKING_REQUEST_TERMS = [
  "book for me", "make a booking", "make reservation", "reserve for me", "reserve a room", "booking request",
  "call me", "contact me", "send request", "i want to book", "i need to book", "help me book",
  "احجز لي", "ابغى احجز", "ابي احجز", "أريد الحجز", "اريد الحجز", "طلب حجز", "تواصلوا معي", "اتصلوا بي",
  "ارسل طلب", "أرسل طلب", "ساعدني احجز", "ساعدوني احجز",
];

const CORPORATE_REQUEST_TERMS = [
  "corporate request", "company request", "b2b request", "corporate proposal", "company proposal", "corporate deal",
  "corporate contract", "business contract", "request a proposal", "send corporate request",
  "طلب شركات", "طلب شركه", "طلب شركة", "عرض شركات", "عرض شركه", "عرض شركة", "عقد شركات", "تعاقد شركات",
];

const CAREER_REQUEST_TERMS = [
  "apply for job", "apply for a job", "send cv", "submit cv", "submit resume", "job application", "career application",
  "اقدم على وظيفة", "التقديم على وظيفه", "التقديم على وظيفة", "تقديم وظيفه", "تقديم وظيفة",
  "ارسال السيرة", "إرسال السيرة", "ارسل سيرتي", "أرسل سيرتي",
];

const SUPPORT_REQUEST_TERMS = [
  "speak to a human", "talk to a human", "human agent", "speak to an agent", "talk to an agent",
  "speak to a manager", "talk to a manager", "contact a manager", "call me about a complaint",
  "اريد موظف", "أريد موظف", "اكلم موظف", "التحدث مع موظف", "أتحدث مع موظف", "اتحدث مع موظف", "موظف حقيقي",
  "اريد مدير", "أريد مدير", "اكلم مدير", "التحدث مع مدير", "أتحدث مع مدير", "اتحدث مع مدير", "تواصل المدير معي",
  "this is unacceptable", "i am very angry", "i am extremely upset", "serious complaint",
  "هذا غير مقبول", "انا غاضب جدا", "أنا غاضب جدا", "شكوى خطيره", "شكوى خطيرة",
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
  return value === "booking" || value === "corporate" || value === "career" || value === "support";
}

/** Recognizes help that should become a routed lead instead of an AI answer. */
export function detectChatLeadKind(message: string): ChatLeadKind | null {
  if (containsAny(message, SUPPORT_REQUEST_TERMS)) return "support";
  if (containsAny(message, CORPORATE_REQUEST_TERMS)) return "corporate";
  if (containsAny(message, CAREER_REQUEST_TERMS)) return "career";
  if (containsAny(message, BOOKING_REQUEST_TERMS)) return "booking";
  return null;
}
