import { after, NextResponse } from "next/server";
import { isChatLeadKind, type ChatLeadKind } from "@/lib/chat-leads";
import { getClientIp, HONEYPOT_FIELD, honeypotTripped, rateLimit } from "@/lib/rate-limit";
import { notifyChatLead } from "@/lib/notify";
import { getFormsClient, isFormsConfigured } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

const MAX_NAME_CHARS = 120;
const MAX_CONTACT_CHARS = 160;
const MAX_REQUEST_CHARS = 2_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function localized(locale: "ar" | "en", english: string, arabic: string) {
  return locale === "ar" ? arabic : english;
}

function cleanString(value: unknown, limit: number) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, limit) : "";
}

function contactParts(contact: string) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? contact : "";
  const phone = contact.replace(/[^\d+]/g, "");
  return { email, phone: /^\+?\d{7,20}$/.test(phone) ? phone : "" };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!isRecord(parsed)) throw new Error("Invalid body");
    body = parsed;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (honeypotTripped(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true });
  }

  const locale = body.locale === "ar" ? "ar" : "en";
  if (process.env.AI_CHAT_ENABLED !== "true" || !isFormsConfigured()) {
    return NextResponse.json(
      { error: localized(locale, "Lead capture is not available.", "إرسال الطلبات غير متاح حالياً.") },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const tooMany =
    !(await rateLimit("ai-chat-lead-minute", ip, 3, 10 * 60)).success ||
    !(await rateLimit("ai-chat-lead-day", ip, 12, 24 * 60 * 60)).success;
  if (tooMany) {
    return NextResponse.json(
      { error: localized(locale, "Too many requests. Please try again later.", "تم إرسال طلبات كثيرة. يرجى المحاولة لاحقاً.") },
      { status: 429 },
    );
  }

  const kind = body.kind;
  const fullName = cleanString(body.fullName, MAX_NAME_CHARS);
  const contact = cleanString(body.contact, MAX_CONTACT_CHARS);
  const requestText = cleanString(body.request, MAX_REQUEST_CHARS);
  const { email, phone } = contactParts(contact);

  if (!isChatLeadKind(kind) || !fullName || !requestText || (!email && !phone)) {
    return NextResponse.json(
      { error: localized(locale, "Please provide your name, a valid email or mobile number, and your request.", "يرجى إدخال الاسم وبريد إلكتروني أو رقم جوال صحيح وطلبك.") },
      { status: 400 },
    );
  }

  const client = getFormsClient();
  if (!client) {
    return NextResponse.json(
      { error: localized(locale, "Lead capture is not available.", "إرسال الطلبات غير متاح حالياً.") },
      { status: 503 },
    );
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: "chatLead",
    status: "new",
    createdAt: new Date().toISOString(),
    kind: kind satisfies ChatLeadKind,
    fullName,
    contact,
    email,
    phone,
    request: requestText,
    locale,
  };

  try {
    await client.create(doc);
  } catch {
    return NextResponse.json({ error: localized(locale, "Your request could not be saved. Please try again.", "تعذر حفظ طلبك. يرجى المحاولة مرة أخرى.") }, { status: 502 });
  }

  after(() => notifyChatLead(doc));
  return NextResponse.json({ ok: true });
}
