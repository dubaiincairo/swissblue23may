import { NextResponse } from "next/server";
import {
  defaultSiteContent,
  getEditableContent,
  saveEditableContent,
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
  let body: { content?: typeof defaultSiteContent; hiddenSections?: string[] };

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

  const content = body?.content ?? defaultSiteContent;
  const hiddenSections = Array.isArray(body?.hiddenSections) ? body.hiddenSections : [];

  const saved = await saveEditableContent(content, hiddenSections);

  return NextResponse.json({
    ok: true,
    content: saved.content,
    hiddenSections: saved.hiddenSections,
  });
}
