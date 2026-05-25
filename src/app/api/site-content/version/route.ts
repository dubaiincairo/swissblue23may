import { NextResponse } from "next/server";
import { getEditableContentVersion } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const updatedAt = await getEditableContentVersion();

  return NextResponse.json(
    { updatedAt },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
