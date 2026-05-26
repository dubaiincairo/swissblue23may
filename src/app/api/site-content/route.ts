import { NextResponse } from "next/server";
import {
  defaultSiteContent,
  getEditableContent,
  saveEditableContent,
} from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getEditableContent();

  return NextResponse.json(
    { content },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function PUT(request: Request) {
  let body: { content?: typeof defaultSiteContent };

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

  await saveEditableContent(content);

  return NextResponse.json({
    ok: true,
    content,
  });
}
