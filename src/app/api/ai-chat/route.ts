import { NextResponse } from "next/server";
import {
  aiInstructions,
  fastWebsiteAnswer,
  type ChatLocale,
  type ChatTurn,
  unsupportedAnswer,
  websiteContext,
} from "@/lib/ai-chat";
import { getEditableContent } from "@/lib/editable-content";
import { durableRateLimit, getClientIp, hasDurableRateLimitStore } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_CHARS = 800;
const MAX_HISTORY_TURNS = 8;
const MAX_HISTORY_TURN_CHARS = 800;
const MAX_OUTPUT_TOKENS = 520;
const DAY_SECONDS = 24 * 60 * 60;
const MONTH_SECONDS = 30 * DAY_SECONDS;

const DOCUMENT_SEARCH_TERMS = [
  "policy",
  "policies",
  "cancel",
  "cancellation",
  "refund",
  "check-in",
  "check in",
  "checkout",
  "check out",
  "breakfast",
  "parking",
  "wifi",
  "wi-fi",
  "smoking",
  "pet",
  "pets",
  "deposit",
  "payment",
  "invoice",
  "manager",
  "complaint",
  "problem",
  "issue",
  "corporate",
  "contract",
  "job",
  "career",
  "room type",
  "room types",
  "suite",
  "bed",
  "beds",
  "occupancy",
  "adult",
  "adults",
  "child",
  "children",
  "room size",
  "سياسة",
  "سياسات",
  "الغاء",
  "إلغاء",
  "استرداد",
  "دخول",
  "مغادرة",
  "فطور",
  "افطار",
  "إفطار",
  "مواقف",
  "واي فاي",
  "تدخين",
  "حيوان",
  "حيوانات",
  "دفع",
  "فاتورة",
  "مدير",
  "شكوى",
  "مشكلة",
  "شركات",
  "عقد",
  "وظيفة",
  "توظيف",
  "نوع الغرفه",
  "انواع الغرف",
  "جناح",
  "سرير",
  "اسره",
  "اشغال",
  "بالغ",
  "بالغين",
  "طفل",
  "اطفال",
  "مساحه الغرفه",
];

const ADVANCED_CONVERSATION_TERMS = [
  "complaint", "complain", "disappointed", "unacceptable", "angry", "upset", "frustrated", "refund",
  "manager", "supervisor", "human", "agent", "compare", "recommend", "best option", "special occasion",
  "anniversary", "group", "corporate", "contract", "proposal", "negotiate", "discount", "cancel",
  "شكوى", "اشتكي", "محبط", "غير مقبول", "غاضب", "منزعج", "استرداد", "مدير", "مشرف", "موظف",
  "انسان", "قارن", "مقارنه", "مقارنة", "رشح", "اقترح", "افضل", "أفضل", "مناسبه", "مناسبة",
  "ذكرى", "مجموعه", "مجموعة", "شركات", "عقد", "عرض", "تفاوض", "خصم", "الغاء", "إلغاء",
];

const FOLLOW_UP_TERMS = [
  "it", "that", "this", "there", "them", "those", "what about", "and the", "also", "which one",
  "more", "why", "how about", "هو", "هي", "هذا", "هذه", "هناك", "عنها", "عنه", "ايضا", "أيضا",
  "كمان", "طيب", "وماذا", "ماذا عن", "اي واحد", "أي واحد", "ليه", "لماذا",
];

type OpenAIResponse = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

type ChatComplexity = "routine" | "advanced";

function asPositiveInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function localized(locale: ChatLocale, english: string, arabic: string) {
  return locale === "ar" ? arabic : english;
}

function normalizeIntent(value: string) {
  return value
    .toLocaleLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

function shouldSearchDocuments(message: string, hasRelevantWebsiteSource: boolean) {
  if (!hasRelevantWebsiteSource) return true;
  const normalized = normalizeIntent(message);
  return DOCUMENT_SEARCH_TERMS.some((term) => normalized.includes(normalizeIntent(term)));
}

function containsAnyNormalized(value: string, terms: string[]) {
  const normalized = normalizeIntent(value);
  return terms.some((term) => normalized.includes(normalizeIntent(term)));
}

function conversationQuery(message: string, history: ChatTurn[], pagePath: string) {
  const recentUserMessages = history
    .filter((turn) => turn.role === "user")
    .slice(-3)
    .map((turn) => turn.content);
  const pageTerms = pagePath.replace(/[\/_-]+/g, " ").trim();
  return [...recentUserMessages, message, pageTerms].filter(Boolean).join(" ");
}

function conversationComplexity(message: string, history: ChatTurn[]): ChatComplexity {
  const normalized = normalizeIntent(message);
  const looksLikeFollowUp = history.length > 0 && (
    message.length < 36 ||
    containsAnyNormalized(message, FOLLOW_UP_TERMS)
  );
  const complexMessage = containsAnyNormalized(message, ADVANCED_CONVERSATION_TERMS) || /[?!]{2,}/.test(message);
  const complexHistory = history.slice(-4).some((turn) => containsAnyNormalized(turn.content, ADVANCED_CONVERSATION_TERMS));
  return complexMessage || complexHistory || looksLikeFollowUp || normalized.split(/\s+/).length > 28
    ? "advanced"
    : "routine";
}

function cleanHistory(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-MAX_HISTORY_TURNS)
    .flatMap((turn): ChatTurn[] => {
      if (!isRecord(turn) || (turn.role !== "assistant" && turn.role !== "user") || typeof turn.content !== "string") {
        return [];
      }
      const content = turn.content.replace(/\s+/g, " ").trim().slice(0, MAX_HISTORY_TURN_CHARS);
      return content.length >= 2 ? [{ role: turn.role, content }] : [];
    });
}

function inputTurns(history: ChatTurn[], message: string) {
  return [
    ...history.map((turn) => ({ role: turn.role, content: turn.content })),
    { role: "user" as const, content: message },
  ];
}

function selectedModel(complexity: ChatComplexity) {
  if (complexity === "advanced") {
    return process.env.OPENAI_CHAT_ADVANCED_MODEL?.trim() || "gpt-5.1";
  }
  return process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-5-mini";
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

function plainTextAnswer(answer: string) {
  return new Response(answer, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

async function requestOpenAiAnswer({
  message,
  history,
  locale,
  context,
  pagePath,
  model,
  reasoningEffort,
  tools,
  signal,
}: {
  message: string;
  history: ChatTurn[];
  locale: ChatLocale;
  context: string;
  pagePath: string;
  model: string;
  reasoningEffort: "minimal" | "low";
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
      model,
      instructions: aiInstructions(locale, context, pagePath),
      input: inputTurns(history, message),
      reasoning: { effort: reasoningEffort },
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

async function requestOpenAiStream({
  message,
  history,
  locale,
  context,
  pagePath,
  model,
  reasoningEffort,
  tools,
  signal,
}: {
  message: string;
  history: ChatTurn[];
  locale: ChatLocale;
  context: string;
  pagePath: string;
  model: string;
  reasoningEffort: "minimal" | "low";
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
      model,
      instructions: aiInstructions(locale, context, pagePath),
      input: inputTurns(history, message),
      reasoning: { effort: reasoningEffort },
      max_output_tokens: MAX_OUTPUT_TOKENS,
      store: false,
      stream: true,
      ...(tools ? { tools } : {}),
    }),
    cache: "no-store",
    signal,
  });

  if (!response.ok || !response.body) {
    return { ok: false as const, status: response.status || 502 };
  }

  const source = response.body;
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = source.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

          let boundary = buffer.indexOf("\n\n");
          while (boundary >= 0) {
            const event = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            for (const line of event.split("\n")) {
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const payload = JSON.parse(data) as { type?: string; delta?: string };
                if (payload.type === "response.output_text.delta" && typeof payload.delta === "string") {
                  controller.enqueue(encoder.encode(payload.delta));
                }
              } catch {
                // Ignore non-JSON SSE bookkeeping events.
              }
            }
            boundary = buffer.indexOf("\n\n");
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return { ok: true as const, stream };
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

  const history = cleanHistory(body.history);
  const pagePath = typeof body.pagePath === "string" && body.pagePath.startsWith("/")
    ? body.pagePath.replace(/[^a-zA-Z0-9/_-]/g, "").slice(0, 180)
    : "";
  const wantsStream = body.stream === true;
  const query = conversationQuery(message, history, pagePath);

  const content = await getEditableContent();
  const priorUserContext = history.filter((turn) => turn.role === "user").slice(-3).map((turn) => turn.content).join(" ");
  const fastAnswer = fastWebsiteAnswer(content, locale, message, priorUserContext);
  if (fastAnswer) {
    return wantsStream ? plainTextAnswer(fastAnswer) : NextResponse.json({ answer: fastAnswer });
  }

  const allowance = await allowRequest(request);
  if (!allowance.allowed) {
    const error = allowance.status === 429
      ? localized(locale, "The assistant has reached its current limit. Please try again later.", "وصل المساعد إلى الحد المتاح حالياً. يرجى المحاولة لاحقاً.")
      : localized(locale, "The assistant is temporarily unavailable. Please try again shortly.", "المساعد غير متاح مؤقتاً. يرجى المحاولة بعد قليل.");
    return NextResponse.json({ error }, { status: allowance.status });
  }

  const websiteKnowledge = websiteContext(content, locale, query);
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID?.trim();
  if (!websiteKnowledge.hasRelevantSource && !vectorStoreId) {
    const answer = unsupportedAnswer(locale);
    return wantsStream ? plainTextAnswer(answer) : NextResponse.json({ answer });
  }

  const complexity = conversationComplexity(message, history);
  const model = selectedModel(complexity);
  const routineModel = process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-5-mini";
  const tools = vectorStoreId && (
    shouldSearchDocuments(query, websiteKnowledge.hasRelevantSource) || complexity === "advanced"
  )
    ? [{ type: "file_search" as const, vector_store_ids: [vectorStoreId], max_num_results: 5 }]
    : undefined;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);
  try {
    if (wantsStream) {
      let streamed = await requestOpenAiStream({
        message,
        history,
        locale,
        context: websiteKnowledge.context,
        pagePath,
        model,
        reasoningEffort: complexity === "advanced" ? "low" : "minimal",
        tools,
        signal: controller.signal,
      });

      if (!streamed.ok && model !== routineModel) {
        streamed = await requestOpenAiStream({
          message,
          history,
          locale,
          context: websiteKnowledge.context,
          pagePath,
          model: routineModel,
          reasoningEffort: "minimal",
          tools,
          signal: controller.signal,
        });
      }

      if (!streamed.ok) {
        const status = streamed.status === 429 ? 429 : 502;
        return NextResponse.json(
          { error: localized(locale, "The assistant is busy right now. Please try again shortly.", "المساعد مشغول حالياً. يرجى المحاولة بعد قليل.") },
          { status },
        );
      }

      clearTimeout(timeout);
      return new Response(streamed.stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    let firstAttempt = await requestOpenAiAnswer({
      message,
      history,
      locale,
      context: websiteKnowledge.context,
      pagePath,
      model,
      reasoningEffort: complexity === "advanced" ? "low" : "minimal",
      tools,
      signal: controller.signal,
    });

    if (!firstAttempt.ok && model !== routineModel) {
      firstAttempt = await requestOpenAiAnswer({
        message,
        history,
        locale,
        context: websiteKnowledge.context,
        pagePath,
        model: routineModel,
        reasoningEffort: "minimal",
        tools,
        signal: controller.signal,
      });
    }

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
        history,
        locale,
        context: websiteKnowledge.context,
        pagePath,
        model: routineModel,
        reasoningEffort: "minimal",
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
