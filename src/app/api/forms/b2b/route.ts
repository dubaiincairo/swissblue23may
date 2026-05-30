import { NextResponse } from "next/server";
import { getFormsClient, isFormsConfigured } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

const FIELDS = [
  "company",
  "sector",
  "contact",
  "jobTitle",
  "email",
  "phone",
  "city",
  "propertyType",
  "requestType",
  "guests",
  "units",
  "budget",
  "arrival",
  "departure",
  "documents",
  "preferredContact",
  "message",
  "locale",
] as const;

export async function POST(request: Request) {
  if (!isFormsConfigured()) {
    return NextResponse.json({ error: "Submissions are not configured." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const value = (key: string) => {
    const raw = body[key];
    if (typeof raw === "string") return raw.trim();
    if (raw == null) return "";
    return String(raw);
  };

  if (!value("company") || !value("contact") || !value("email")) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const client = getFormsClient();
  if (!client) {
    return NextResponse.json({ error: "Submissions are not configured." }, { status: 500 });
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: "corporateRequest",
    status: "new",
    createdAt: new Date().toISOString(),
  };
  for (const key of FIELDS) {
    doc[key] = value(key);
  }

  try {
    await client.create(doc);
  } catch {
    return NextResponse.json({ error: "Could not save the request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
