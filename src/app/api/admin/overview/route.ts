import { NextResponse } from "next/server";
import { getFreshAdminSession } from "@/lib/admin-session";
import { hasAuthority } from "@/lib/authorities";
import { getAdminOverview, parseOverviewRange } from "@/lib/admin-overview";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getFreshAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasAuthority(session.perms, "analytics")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const range = parseOverviewRange(new URL(request.url).searchParams.get("range"));
  const content = await getEditableContent();
  const propertyId = content.en.seo.analytics?.ga4PropertyId || content.ar.seo.analytics?.ga4PropertyId;
  return NextResponse.json(await getAdminOverview(range, propertyId), { headers: { "Cache-Control": "private, no-store" } });
}
