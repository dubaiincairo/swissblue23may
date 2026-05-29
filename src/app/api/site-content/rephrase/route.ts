import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RephraseBody = {
  text?: unknown;
  language?: unknown;
  tone?: unknown;
  isHtml?: unknown;
  instructions?: unknown;
};

const MAX_INSTRUCTIONS_LENGTH = 600;

const SUPPORTED = new Set(["ar", "en"]);
const MAX_TEXT_LENGTH = 3000;
const MIN_TEXT_LENGTH = 2;
const DEFAULT_TONE = "luxury hospitality";
const MODEL = "gemini-2.5-flash-lite";

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function buildPrompt({
  text,
  language,
  tone,
  isHtml,
  instructions,
}: {
  text: string;
  language: "ar" | "en";
  tone: string;
  isHtml: boolean;
  instructions: string;
}) {
  const languageLabel = language === "ar" ? "Arabic" : "English";
  const styleNote =
    language === "ar"
      ? "Use professional, natural Modern Standard Arabic suited for a premium hospitality brand."
      : "Use clear, professional business English suited for a premium hospitality brand.";
  const htmlNote = isHtml
    ? "The input is HTML produced by a rich-text editor and may contain tags such as <p>, <strong>, <em>, <u>, <s>, and <br>. Preserve the exact HTML structure: keep the same tags wrapping the same logical pieces of content. Do not add, remove, or rename tags. Only rephrase the visible text inside them."
    : "The input is plain text. Return plain text only. Do not add any HTML or Markdown.";

  const instructionsNote = instructions
    ? `Editor's custom instructions (follow them as closely as possible, but never break the rules above about keeping meaning, language, facts, and preserved tokens): ${instructions}`
    : "";

  return [
    "You are a professional bilingual copywriter for a luxury hospitality website (Swiss Blue Hotels).",
    `Rephrase the text below into the same language (${languageLabel}), keeping its original meaning.`,
    `Tone: ${tone}.`,
    "Length: roughly the same as the original.",
    styleNote,
    htmlNote,
    "Preserve all brand names, prices, numbers, URLs, emails, phone numbers, hashtags, and emojis exactly as they appear.",
    "Do not invent facts, claims, or details that are not in the original text.",
    instructionsNote,
    "Return ONLY the rephrased result. No preamble, no quotation marks around the output, no commentary, no labels like \"Rephrased:\".",
    "",
    "Text to rephrase:",
    text,
  ]
    .filter(Boolean)
    .join("\n");
}

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Rephrase isn't configured." }, { status: 503 });
  }

  let body: RephraseBody;
  try {
    body = (await request.json()) as RephraseBody;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const text = typeof body.text === "string" ? body.text : "";
  const language = typeof body.language === "string" ? body.language.toLowerCase() : "";
  const tone =
    typeof body.tone === "string" && body.tone.trim()
      ? body.tone.trim().slice(0, 80)
      : DEFAULT_TONE;
  const isHtml = body.isHtml === true;
  const instructions =
    typeof body.instructions === "string"
      ? body.instructions.trim().slice(0, MAX_INSTRUCTIONS_LENGTH)
      : "";

  if (!text.trim() || text.trim().length < MIN_TEXT_LENGTH) {
    return badRequest("Text is too short to rephrase.");
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return badRequest(`Text is too long. Maximum is ${MAX_TEXT_LENGTH} characters.`);
  }
  if (!SUPPORTED.has(language)) {
    return badRequest("Unsupported language.");
  }

  const prompt = buildPrompt({
    text,
    language: language as "ar" | "en",
    tone,
    isHtml,
    instructions,
  });

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return NextResponse.json(
      { error: `Rephrase failed (${response.status}).`, detail: detail.slice(0, 200) },
      { status: response.status === 429 ? 429 : 502 },
    );
  }

  const data = (await response.json()) as GeminiResponse;
  const rephrased = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof rephrased !== "string" || !rephrased.trim()) {
    return NextResponse.json({ error: "Rephrase returned no text." }, { status: 502 });
  }

  return NextResponse.json({ rephrased: rephrased.trim() });
}
