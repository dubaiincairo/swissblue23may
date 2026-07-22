import { NextResponse } from "next/server";
import { generateEditorialText } from "@/lib/openai-text";

export const dynamic = "force-dynamic";

type RephraseBody = {
  text?: unknown;
  language?: unknown;
  isHtml?: unknown;
  instructions?: unknown;
};

const SUPPORTED = new Set(["ar", "en"]);
const MAX_TEXT_LENGTH = 3_000;
const MAX_INSTRUCTIONS_LENGTH = 600;

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
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
  const isHtml = body.isHtml === true;
  const editorInstructions = typeof body.instructions === "string"
    ? body.instructions.trim().slice(0, MAX_INSTRUCTIONS_LENGTH)
    : "";

  if (text.trim().length < 2) return badRequest("Text is too short to rephrase.");
  if (text.length > MAX_TEXT_LENGTH) {
    return badRequest(`Text is too long. Maximum is ${MAX_TEXT_LENGTH} characters.`);
  }
  if (!SUPPORTED.has(language)) return badRequest("Unsupported language.");

  const languageLabel = language === "ar" ? "Arabic" : "English";
  const formatRule = isHtml
    ? "Preserve the exact HTML tag structure. Change only visible text and return HTML only."
    : "Return plain text only, without Markdown, labels, or quotation marks.";
  const customRule = editorInstructions
    ? `Follow this editor instruction when it does not conflict with the rules: ${editorInstructions}`
    : "";

  try {
    const rephrased = await generateEditorialText({
      instructions: [
        "You are the senior bilingual editor for Swiss Blue Hotels in Saudi Arabia.",
        `Rewrite in the same language (${languageLabel}) using a clear, confident, welcoming premium-hospitality voice.`,
        "Keep the meaning, facts, length, brand names, numbers, prices, URLs, email addresses, phone numbers, and preserved tokens unchanged.",
        "Do not invent claims or operational details.",
        formatRule,
        customRule,
      ].filter(Boolean).join("\n"),
      input: text,
    });

    return NextResponse.json({ rephrased });
  } catch (cause) {
    const status = typeof cause === "object" && cause && "status" in cause && cause.status === 429 ? 429 : 502;
    return NextResponse.json({ error: status === 429 ? "Rephrase limit reached. Try again shortly." : "Rephrase failed." }, { status });
  }
}
