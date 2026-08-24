import { NextResponse } from "next/server";

import { getFreshAdminSession, sessionHas } from "@/lib/admin-session";
import {
  getSaudiHospitalityStore,
  saveSaudiHospitalityStore,
} from "@/lib/saudihospitalityweb-content";

async function authorize() {
  const session = await getFreshAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sessionHas(session, "content-any")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export async function GET() {
  const denied = await authorize();
  if (denied) return denied;
  return NextResponse.json({ content: await getSaudiHospitalityStore() });
}

export async function PUT(request: Request) {
  const denied = await authorize();
  if (denied) return denied;

  try {
    const body = (await request.json()) as { content?: unknown };
    const content = await saveSaudiHospitalityStore(body.content);
    return NextResponse.json({ content });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save content";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
