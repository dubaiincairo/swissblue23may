import { NextResponse } from "next/server";
import { allowedCvTypes, getFormsClient, isFormsConfigured, maxCvBytes } from "@/sanity/lib/forms";
import { HONEYPOT_FIELD, getClientIp, honeypotTripped, rateLimit } from "@/lib/rate-limit";
import { sniffMime } from "@/lib/file-signature";

export const dynamic = "force-dynamic";

const TEXT_FIELDS = [
  "position",
  "fullName",
  "email",
  "phone",
  "nationality",
  "location",
  "yearsExperience",
  "currentTitle",
  "expectedSalary",
  "noticePeriod",
  "linkedin",
  "message",
  "locale",
] as const;

export async function POST(request: Request) {
  if (!isFormsConfigured()) {
    return NextResponse.json({ error: "Submissions are not configured." }, { status: 500 });
  }

  // Anti-abuse: cap submissions per IP (burst + hourly). CV uploads are heavy,
  // so this also guards against storage/bandwidth abuse.
  const ip = getClientIp(request);
  const tooMany =
    !(await rateLimit("forms-careers", ip, 5, 60)).success ||
    !(await rateLimit("forms-careers-hr", ip, 20, 3600)).success;
  if (tooMany) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  const client = getFormsClient();
  if (!client) {
    return NextResponse.json({ error: "Submissions are not configured." }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field — silently accept & drop.
  if (honeypotTripped(formData.get(HONEYPOT_FIELD))) {
    return NextResponse.json({ ok: true });
  }

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!fullName || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const doc: { _type: string; [key: string]: unknown } = {
    _type: "careerApplication",
    status: "new",
    createdAt: new Date().toISOString(),
  };
  for (const key of TEXT_FIELDS) {
    doc[key] = String(formData.get(key) ?? "");
  }

  const cv = formData.get("cv");
  if (cv instanceof File && cv.size > 0) {
    if (!allowedCvTypes.has(cv.type)) {
      return NextResponse.json({ error: "CV must be a PDF or Word document." }, { status: 400 });
    }
    if (cv.size > maxCvBytes) {
      return NextResponse.json({ error: "CV must be 10 MB or smaller." }, { status: 400 });
    }

    try {
      const buffer = Buffer.from(await cv.arrayBuffer());
      // Verify the bytes really are a PDF / Word doc, not a spoofed Content-Type.
      const sniffed = sniffMime(buffer);
      const cvOk =
        sniffed === "application/pdf" ||
        sniffed === "application/msword" ||
        (sniffed === "application/zip" &&
          cv.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      if (!cvOk) {
        return NextResponse.json(
          { error: "CV must be a valid PDF or Word document." },
          { status: 400 },
        );
      }
      const asset = await client.assets.upload("file", buffer, {
        filename: cv.name,
        contentType: cv.type,
      });
      doc.cv = { _type: "file", asset: { _type: "reference", _ref: asset._id } };
    } catch {
      return NextResponse.json({ error: "Could not upload the CV." }, { status: 502 });
    }
  }

  try {
    await client.create(doc);
  } catch {
    return NextResponse.json({ error: "Could not save the application." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
