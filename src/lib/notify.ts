/**
 * Form-submission notifications: email (Brevo) + WhatsApp (Meta Cloud API).
 *
 * Both channels are best-effort and fully env-driven. If the relevant
 * credentials are missing the channel is skipped (logged, never thrown), so a
 * submission is always saved to Sanity regardless of notification config.
 *
 * Required env vars:
 *   Email (Brevo / Sendinblue transactional API):
 *     BREVO_API_KEY          - Brevo API key (starts with "xkeysib-")
 *     BREVO_FROM_EMAIL       - sender on an authenticated domain, e.g. notifications@swissblue.sa
 *     BREVO_FROM_NAME        - sender display name (default "Swiss Blue")
 *     CAREERS_NOTIFY_TO      - recipient for job applications (default careers@swissblue.sa)
 *     B2B_NOTIFY_TO          - recipient for B2B requests (default reservations@swissblue.sa)
 *   WhatsApp (Meta Cloud API):
 *     WHATSAPP_PHONE_NUMBER_ID  - sender phone-number id
 *     WHATSAPP_ACCESS_TOKEN     - permanent (system-user) access token
 *     WHATSAPP_TO               - recipient in E.164 (e.g. 9665XXXXXXXX)
 *     WHATSAPP_TEMPLATE_NAME    - approved template name (default new_form_submission)
 *     WHATSAPP_TEMPLATE_LANG    - template language code (default en)
 *     WHATSAPP_GRAPH_VERSION    - Graph API version (default v22.0)
 *
 * The WhatsApp template must have a body with exactly 5 positional variables:
 *   {{1}} submission type   {{2}} name/company   {{3}} email   {{4}} phone   {{5}} summary
 */

const BRAND = "#2b6fe8";

function env(name: string): string {
  const v = process.env[name];
  return typeof v === "string" ? v.trim() : "";
}

function text(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  return String(value).trim();
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Meta rejects template variables that are empty or contain newlines, tabs, or
 * more than four consecutive spaces. Collapse whitespace, truncate, and fall
 * back to an em dash for empties.
 */
function waVar(value: unknown, max = 700): string {
  let s = text(value).replace(/\s+/g, " ").trim();
  if (s.length > max) s = `${s.slice(0, max - 1)}…`;
  return s || "—";
}

async function fetchWithTimeout(url: string, init: RequestInit, ms: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Email (Brevo transactional API)
// ---------------------------------------------------------------------------

export type EmailAttachment = { filename: string; content: string; contentType?: string };

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  cc?: string | string[];
  attachments?: EmailAttachment[];
}): Promise<void> {
  const apiKey = env("BREVO_API_KEY");
  const fromEmail = env("BREVO_FROM_EMAIL");
  const fromName = env("BREVO_FROM_NAME") || "Swiss Blue";
  if (!apiKey || !fromEmail) {
    console.warn("[notify] email skipped — BREVO_API_KEY/BREVO_FROM_EMAIL not set");
    return;
  }

  const toList = (Array.isArray(opts.to) ? opts.to : [opts.to]).map((email) => ({ email }));

  const body: Record<string, unknown> = {
    sender: { name: fromName, email: fromEmail },
    to: toList,
    subject: opts.subject,
    htmlContent: opts.html,
  };
  if (opts.cc) {
    body.cc = (Array.isArray(opts.cc) ? opts.cc : [opts.cc]).map((email) => ({ email }));
  }
  if (opts.replyTo) body.replyTo = { email: opts.replyTo };
  if (opts.attachments?.length) {
    // Brevo infers the content type from the filename; base64 content only.
    body.attachment = opts.attachments.map((a) => ({ name: a.filename, content: a.content }));
  }

  const res = await fetchWithTimeout(
    "https://api.brevo.com/v3/smtp/email",
    {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
    },
    20000,
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Brevo ${res.status}: ${detail}`);
  }
}

// ---------------------------------------------------------------------------
// WhatsApp (Meta Cloud API)
// ---------------------------------------------------------------------------

/** Sends a pre-approved template message with positional body params {{1}}..{{n}}. */
export async function sendWhatsAppTemplate(params: string[]): Promise<void> {
  const phoneId = env("WHATSAPP_PHONE_NUMBER_ID");
  const token = env("WHATSAPP_ACCESS_TOKEN");
  const to = env("WHATSAPP_TO").replace(/\D/g, "");
  const template = env("WHATSAPP_TEMPLATE_NAME") || "new_form_submission";
  const lang = env("WHATSAPP_TEMPLATE_LANG") || "en";
  const version = env("WHATSAPP_GRAPH_VERSION") || "v22.0";

  if (!phoneId || !token || !to) {
    console.warn("[notify] whatsapp skipped — WhatsApp env not fully set");
    return;
  }

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: template,
      language: { code: lang },
      components: [
        {
          type: "body",
          parameters: params.map((value) => ({ type: "text", text: waVar(value) })),
        },
      ],
    },
  };

  const res = await fetchWithTimeout(
    `https://graph.facebook.com/${version}/${phoneId}/messages`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    10000,
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`WhatsApp ${res.status}: ${detail}`);
  }
}

// ---------------------------------------------------------------------------
// Shared rendering
// ---------------------------------------------------------------------------

function emailShell(heading: string, subtitle: string, rows: Array<[string, string]>): string {
  const cells = rows
    .filter(([, value]) => text(value).length > 0)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 14px;border-bottom:1px solid #eef1f6;color:#64748b;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 14px;border-bottom:1px solid #eef1f6;color:#0f172a;font-size:14px">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`,
    )
    .join("");

  return `
  <div style="background:#f4f6fb;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,.06)">
      <tr><td style="background:${BRAND};padding:20px 24px;color:#ffffff">
        <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.85">Swiss Blue Hotel</div>
        <div style="font-size:20px;font-weight:800;margin-top:2px">${escapeHtml(heading)}</div>
        ${subtitle ? `<div style="font-size:14px;margin-top:4px;opacity:.92">${escapeHtml(subtitle)}</div>` : ""}
      </td></tr>
      <tr><td style="padding:8px 10px 18px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cells}</table>
      </td></tr>
      <tr><td style="padding:0 24px 22px;color:#94a3b8;font-size:12px">
        Sent automatically from the Swiss Blue website. Reply to this email to reach the applicant/contact directly.
      </td></tr>
    </table>
  </div>`;
}

async function runAll(tasks: Array<Promise<void>>, label: string): Promise<void> {
  const results = await Promise.allSettled(tasks);
  for (const r of results) {
    if (r.status === "rejected") console.error(`[notify:${label}]`, r.reason);
  }
}

// ---------------------------------------------------------------------------
// High-level notifiers (one per form)
// ---------------------------------------------------------------------------

export async function notifyCareerApplication(
  doc: Record<string, unknown>,
  cv?: { filename: string; base64: string; contentType: string; url?: string },
): Promise<void> {
  const get = (key: string) => text(doc[key]);
  const fullName = get("fullName");
  const position = get("position");
  const email = get("email");
  const phone = get("phone");

  const rows: Array<[string, string]> = [
    ["Position", position],
    ["Full name", fullName],
    ["Email", email],
    ["Phone", phone],
    ["Nationality", get("nationality")],
    ["Location", get("location")],
    ["Experience", get("yearsExperience")],
    ["Current title", get("currentTitle")],
    ["Expected salary", get("expectedSalary")],
    ["Notice period", get("noticePeriod")],
    ["LinkedIn", get("linkedin")],
    ["Message", get("message")],
    ["Language", get("locale")],
  ];
  if (cv?.url) rows.push(["CV", cv.url]);

  const html = emailShell(
    "New job application",
    [fullName, position].filter(Boolean).join(" — "),
    rows,
  );

  await runAll(
    [
      sendEmail({
        to: env("CAREERS_NOTIFY_TO") || "careers@swissblue.sa",
        subject: `New job application — ${fullName || "Applicant"}${position ? ` · ${position}` : ""}`,
        html,
        replyTo: email || undefined,
        attachments: cv ? [{ filename: cv.filename, content: cv.base64, contentType: cv.contentType }] : undefined,
      }),
      sendWhatsAppTemplate([
        "Job Application",
        fullName,
        email,
        phone,
        [position, get("message")].filter(Boolean).join(" — "),
      ]),
    ],
    "careerApplication",
  );
}

export async function notifyCorporateRequest(doc: Record<string, unknown>): Promise<void> {
  const get = (key: string) => text(doc[key]);
  const company = get("company");
  const contact = get("contact");
  const email = get("email");
  const phone = get("phone");
  const requestType = get("requestType");

  const rows: Array<[string, string]> = [
    ["Company", company],
    ["Sector", get("sector")],
    ["Contact", contact],
    ["Job title", get("jobTitle")],
    ["Email", email],
    ["Phone", phone],
    ["City", get("city")],
    ["Property type", get("propertyType")],
    ["Request type", requestType],
    ["Guests", get("guests")],
    ["Units", get("units")],
    ["Budget", get("budget")],
    ["Arrival", get("arrival")],
    ["Departure", get("departure")],
    ["Documents", get("documents")],
    ["Preferred contact", get("preferredContact")],
    ["Message", get("message")],
    ["Language", get("locale")],
  ];

  const html = emailShell("New B2B / corporate request", company, rows);

  await runAll(
    [
      sendEmail({
        to: env("B2B_NOTIFY_TO") || "reservations@swissblue.sa",
        subject: `New B2B request — ${company || "Company"}`,
        html,
        replyTo: email || undefined,
      }),
      sendWhatsAppTemplate([
        "B2B Request",
        [company, contact ? `(${contact})` : ""].filter(Boolean).join(" "),
        email,
        phone,
        [requestType, get("message")].filter(Boolean).join(" — "),
      ]),
    ],
    "corporateRequest",
  );
}
