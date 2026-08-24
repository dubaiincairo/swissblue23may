import { NextResponse, after } from "next/server";
import { getFormsClient, isFormsConfigured } from "@/sanity/lib/forms";
import { HONEYPOT_FIELD, getClientIp, honeypotTripped, rateLimit } from "@/lib/rate-limit";
import { notifyCorporateRequest } from "@/lib/notify";

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

  // Anti-abuse: cap submissions per IP (burst + hourly) before doing any work.
  const ip = getClientIp(request);
  const tooMany =
    !(await rateLimit("forms-b2b", ip, 5, 60)).success ||
    !(await rateLimit("forms-b2b-hr", ip, 20, 3600)).success;
  if (tooMany) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field — silently accept & drop.
  if (honeypotTripped(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ ok: true });
  }

  const value = (key: string) => {
    const raw = body[key];
    if (typeof raw === "string") return raw.trim();
    if (raw == null) return "";
    return String(raw);
  };

  const company = value("company");
  const contact = value("contact");
  const email = value("email").toLowerCase();
  const phone = value("phone");

  if (!company || !contact || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (company.length > 160 || contact.length > 120 || email.length > 254 || phone.length > 40) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
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
  doc.company = company;
  doc.contact = contact;
  doc.email = email;
  doc.phone = phone;
  } catch {
    return NextResponse.json({ error: "Could not save the request." }, { status: 502 });
  }

  // Best-effort email + WhatsApp notification, after the response is sent.
  after(() => notifyCorporateRequest(doc));

  return NextResponse.json({ ok: true });
}
