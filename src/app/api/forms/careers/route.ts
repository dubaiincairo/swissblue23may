import { NextResponse } from "next/server";
import { allowedCvTypes, getFormsClient, isFormsConfigured, maxCvBytes } from "@/sanity/lib/forms";

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
