import { NextResponse } from "next/server";
import { generateEditorialText } from "@/lib/openai-text";

export const dynamic = "force-dynamic";

type TranslateBody = {
  text?: unknown;
  source?: unknown;
  target?: unknown;
  isHtml?: unknown;
};

const SUPPORTED = new Set(["ar", "en"]);
const MAX_TEXT_LENGTH = 6_000;

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Translation isn't configured." }, { status: 503 });
  }

  let body: TranslateBody;
  try {
    body = (await request.json()) as TranslateBody;
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const text = typeof body.text === "string" ? body.text : "";
  const source = typeof body.source === "string" ? body.source.toLowerCase() : "";
  const target = typeof body.target === "string" ? body.target.toLowerCase() : "";
  const isHtml = body.isHtml === true;

  if (!text.trim()) return badRequest("Text is empty.");
  if (text.length > MAX_TEXT_LENGTH) return badRequest(`Text is too long. Maximum is ${MAX_TEXT_LENGTH} characters.`);
  if (!SUPPORTED.has(source) || !SUPPORTED.has(target)) return badRequest("Unsupported language.");
  if (source === target) return badRequest("Source and target must differ.");

  const sourceLabel = source === "ar" ? "Arabic" : "English";
  const targetLabel = target === "ar" ? "Arabic" : "English";
  const formatRule = isHtml
    ? "Preserve the exact HTML tag structure. Translate only visible text and return HTML only."
    : "Return plain text only, without Markdown, labels, or quotation marks.";

  try {
    const translated = await generateEditorialText({
      instructions: [
        "You are the senior Arabic-English translator for Swiss Blue Hotels in Saudi Arabia.",
        `Translate faithfully from ${sourceLabel} to natural, professional ${targetLabel}.`,
        "Use premium hospitality language without adding, omitting, or changing facts.",
        "Preserve brand names, numbers, prices, URLs, email addresses, phone numbers, placeholders, and formatting tokens.",
        formatRule,
      ].join("\n"),
      input: text,
      maxOutputTokens: 2_200,
    });

    return NextResponse.json({ translated });
  } catch (cause) {
    const status = typeof cause === "object" && cause && "status" in cause && cause.status === 429 ? 429 : 502;
    return NextResponse.json({ error: status === 429 ? "Translation limit reached. Try again shortly." : "Translation failed." }, { status });
  }
}
