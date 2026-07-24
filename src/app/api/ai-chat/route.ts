import { NextResponse } from "next/server";
import { aiInstructions, fastWebsiteAnswer, type ChatLocale, unsupportedAnswer, websiteContext } from "@/lib/ai-chat";
import { getEditableContent } from "@/lib/editable-content";
import { durableRateLimit, getClientIp, hasDurableRateLimitStore } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_CHARS = 800;
const MAX_OUTPUT_TOKENS = 900;
const DAY_SECONDS = 24 * 60 * 60;
const MONTH_SECONDS = 30 * DAY_SECONDS;

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

function asPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function localized(locale: ChatLocale, english: string, arabic: string) {
  return locale === "ar" ? arabic : english;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function responseText(payload: OpenAIResponse) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  return (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((part) => (part.type === "output_text" || part.type === "text" || !part.type) && typeof part.text === "string")
    .map((part) => part.text?.trim())
    .filter((part): part is string => Boolean(part))
    .join("\n")
    .trim();
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

async function requestOpenAiAnswer({
  message,
  locale,
  context,
  tools,
  signal,
}: {
  message: string;
  locale: ChatLocale;
  context: string;
  tools?: Array<{ type: "file_search"; vector_store_ids: string[]; max_num_results: number }>;
  signal: AbortSignal;
}) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
      instructions: aiInstructions(locale, context),
      input: message,
      max_output_tokens: MAX_OUTPUT_TOKENS,
      store: false,
      ...(tools ? { tools } : {}),
    }),
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    return { ok: false as const, status: response.status };
  }

  const payload = (await response.json()) as OpenAIResponse;
  return { ok: true as const, answer: responseText(payload) };
}

async function allowRequest(request: Request) {
  const ip = getClientIp(request);
  const checks = [
    ["ai-chat-ip-minute", ip, asPositiveInt(process.env.OPENAI_CHAT_IP_PER_MINUTE, 3), 60],
    ["ai-chat-ip-day", ip, asPositiveInt(process.env.OPENAI_CHAT_IP_PER_DAY, 20), DAY_SECONDS],
    ["ai-chat-site-minute", "all", asPositiveInt(process.env.OPENAI_CHAT_SITE_PER_MINUTE, 8), 60],
    ["ai-chat-site-day", "all", asPositiveInt(process.env.OPENAI_CHAT_DAILY_LIMIT, 400), DAY_SECONDS],
    ["ai-chat-site-month", "all", asPositiveInt(process.env.OPENAI_CHAT_MONTHLY_LIMIT, 6_000), MONTH_SECONDS],
  ] as const;

  // Short-circuit in order: a visitor who has already hit a personal limit
  // cannot consume a shared site allowance with further attempts.
  for (const [name, subject, limit, windowSec] of checks) {
    const check = await durableRateLimit(name, subject, limit, windowSec);
    if (check === null) return { allowed: false, status: 503 };
    if (!check.success) return { allowed: false, status: 429 };
  }

  return { allowed: true, status: 200 };
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

  const locale: ChatLocale = body.locale === "ar" ? "ar" : "en";
  if (
    process.env.AI_CHAT_ENABLED !== "true" ||
    !process.env.OPENAI_API_KEY ||
    !hasDurableRateLimitStore()
  ) {
    return NextResponse.json(
      { error: localized(locale, "The assistant is not available.", "المساعد غير متاح حالياً.") },
      { status: 503 },
    );
  }

  const message = typeof body.message === "string" ? body.message.replace(/\s+/g, " ").trim() : "";
  if (message.length < 2 || message.length > MAX_MESSAGE_CHARS) {
    return NextResponse.json(
      { error: localized(locale, "Please enter a message up to 800 characters.", "يرجى كتابة رسالة لا تتجاوز 800 حرف.") },
      { status: 400 },
    );
  }

  const content = await getEditableContent();
  const fastAnswer = fastWebsiteAnswer(content, locale, message);
  if (fastAnswer) {
    return NextResponse.json({ answer: fastAnswer });
  }

  const allowance = await allowRequest(request);
  if (!allowance.allowed) {
    const error = allowance.status === 429
      ? localized(locale, "The assistant has reached its current limit. Please try again later.", "وصل المساعد إلى الحد المتاح حالياً. يرجى المحاولة لاحقاً.")
      : localized(locale, "The assistant is temporarily unavailable. Please try again shortly.", "المساعد غير متاح مؤقتاً. يرجى المحاولة بعد قليل.");
    return NextResponse.json({ error }, { status: allowance.status });
  }

  const websiteKnowledge = websiteContext(content, locale, message);
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();
  if (!websiteKnowledge.hasRelevantSource && !vectorStoreId) {
    return NextResponse.json({ answer: unsupportedAnswer(locale) });
  }

  const tools = vectorStoreId
    ? [{ type: "file_search" as const, vector_store_ids: [vectorStoreId], max_num_results: 3 }]
    : undefined;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);
  try {
    const firstAttempt = await requestOpenAiAnswer({
      message,
      locale,
      context: websiteKnowledge.context,
      tools,
      signal: controller.signal,
    });

    if (!firstAttempt.ok) {
      const status = firstAttempt.status === 429 ? 429 : 502;
      return NextResponse.json(
        { error: localized(locale, "The assistant is busy right now. Please try again shortly.", "المساعد مشغول حالياً. يرجى المحاولة بعد قليل.") },
        { status },
      );
    }

    let answer = firstAttempt.answer;
    if (!answer && tools) {
      const fallbackAttempt = await requestOpenAiAnswer({
        message,
        locale,
        context: websiteKnowledge.context,
        signal: controller.signal,
      });
      if (!fallbackAttempt.ok) {
        const status = fallbackAttempt.status === 429 ? 429 : 502;
        return NextResponse.json(
          { error: localized(locale, "The assistant is busy right now. Please try again shortly.", "المساعد مشغول حالياً. يرجى المحاولة بعد قليل.") },
          { status },
        );
      }
      answer = fallbackAttempt.answer;
    }

    if (!answer) {
      return NextResponse.json({ answer: unsupportedAnswer(locale) });
    }

    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: localized(locale, "The assistant is temporarily unavailable. Please try again shortly.", "المساعد غير متاح مؤقتاً. يرجى المحاولة بعد قليل.") },
      { status: 503 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
