import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import {
  getEditableContent,
  saveEditableContent,
  type EditableSiteContent,
} from "@/lib/editable-content";
import { requireApiAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await requireApiAuthority("content-any");
  if (auth.error) return auth.error;

  const { hiddenSections, ...content } = await getEditableContent({ fresh: true });

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
  const auth = await requireApiAuthority("content-any");
  if (auth.error) return auth.error;

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

  let saved: Awaited<ReturnType<typeof saveEditableContent>>;
  try {
    saved = await saveEditableContent(content, hiddenSections, editedLanguage);
  } catch (error) {
    console.error("site-content save failed", error);
    return NextResponse.json(
      { error: "Saving failed. The content store did not accept the change; nothing was published." },
      { status: 500 },
    );
  }

  // Expire every cached public page (and the content fetch behind it) so the
  // next visit renders the saved content instead of waiting for the 5-minute window.
  revalidatePath("/", "layout");

  return NextResponse.json({
    ok: true,
    content: saved.content,
    hiddenSections: saved.hiddenSections,
  });
}
