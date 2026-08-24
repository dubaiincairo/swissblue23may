import { NextResponse } from "next/server";

import { getFreshAdminSession, sessionHas } from "@/lib/admin-session";
import { getFormsClient } from "@/sanity/lib/forms";

const STATUSES = new Set(["new", "contacted", "demo_scheduled", "partnered", "archived"]);

export async function PATCH(request: Request) {
  const session = await getFreshAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!sessionHas(session, "submissions")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { id?: unknown; status?: unknown; notes?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const status = typeof body.status === "string" ? body.status : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  if (!/^[A-Za-z0-9._-]+$/.test(id) || !STATUSES.has(status) || notes.length > 4000) {
    return NextResponse.json({ error: "Invalid lead update." }, { status: 400 });
  }

  const client = getFormsClient();
  if (!client) return NextResponse.json({ error: "Submissions are not configured." }, { status: 500 });

  const updatedAt = new Date().toISOString();
  try {
    await client.patch(id).set({ status, notes, updatedAt }).commit();
    return NextResponse.json({ ok: true, updatedAt });
  } catch {
    return NextResponse.json({ error: "The lead could not be updated." }, { status: 502 });
  }
}
