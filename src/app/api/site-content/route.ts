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
  const body = await request.json();
  const content = body?.content ?? defaultSiteContent;

  await saveEditableContent(content);

  return NextResponse.json({
    ok: true,
    content,
  });
}
