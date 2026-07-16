const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";

type OpenAITextResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{ type?: string; text?: string }>;
  }>;
  error?: { message?: string };
};

function extractText(payload: OpenAITextResponse) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  return (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === "output_text" && typeof part.text === "string")
    .map((part) => part.text?.trim())
    .filter((part): part is string => Boolean(part))
    .join("\n")
    .trim();
}

export async function generateEditorialText({
  instructions,
  input,
  maxOutputTokens = 1_400,
}: {
  instructions: string;
  input: string;
  maxOutputTokens?: number;
}) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OpenAI is not configured.");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(OPENAI_RESPONSES_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_EDITOR_MODEL || process.env.OPENAI_CHAT_MODEL || "gpt-5-mini",
        instructions,
        input,
        max_output_tokens: maxOutputTokens,
        store: false,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    const payload = (await response.json().catch(() => ({}))) as OpenAITextResponse;
    if (!response.ok) {
      console.error(`OpenAI editorial request failed (${response.status}): ${payload.error?.message ?? "Unknown error"}`);
      const error = new Error(payload.error?.message || "OpenAI editorial request failed.");
      Object.assign(error, { status: response.status });
      throw error;
    }

    const text = extractText(payload);
    if (!text) throw new Error("OpenAI returned no text.");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}
