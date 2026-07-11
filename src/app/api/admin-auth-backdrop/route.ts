import { NextResponse } from "next/server";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

// This is deliberately limited to the public artwork configuration required by
// the sign-in screen. Editing remains behind the authenticated content API.
export async function GET() {
  const { en } = await getEditableContent();

  return NextResponse.json(
    { backdrop: en.media.adminAuthBackdrop },
    { headers: { "Cache-Control": "no-store" } },
  );
}
