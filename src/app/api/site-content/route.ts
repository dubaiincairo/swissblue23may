import { NextResponse } from "next/server";
import {
  getEditableContent,
  saveEditableContent,
  type EditableSiteContent,
} from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const { hiddenSections, ...content } = await getEditableContent();

  return NextResponse.json(
    { content, hiddenSections },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function PUT(request: Request) {
  let body: {
    content?: EditableSiteContent;
    hiddenSections?: string[];
    editedLanguage?: "ar" | "en";
  };

  try {
    const text = await request.text();

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Save request did not include content." },
        { status: 400 },
      );
    }

    body = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Save request content was not valid JSON." },
      { status: 400 },
    );
  }

  if (
    !body?.content ||
    typeof body.content !== "object" ||
    Array.isArray(body.content)
  ) {
    return NextResponse.json(
      { error: "Save request did not include a content object." },
      { status: 400 },
    );
  }
  if (!Array.isArray(body.hiddenSections)) {
    return NextResponse.json(
      { error: "Save request did not include hiddenSections." },
      { status: 400 },
    );
  }

  const content = body.content;
  const hiddenSections = body.hiddenSections;
  const editedLanguage =
    body?.editedLanguage === "ar" || body?.editedLanguage === "en"
      ? body.editedLanguage
      : undefined;

  const saved = await saveEditableContent(
    content,
    hiddenSections,
    editedLanguage,
  );

  return NextResponse.json({
    ok: true,
    content: saved.content,
    hiddenSections: saved.hiddenSections,
  });
}
