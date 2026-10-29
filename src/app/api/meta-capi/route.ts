import { NextResponse } from "next/server";

// Meta Conversions API relay. The GTM Meta pixel tags (swissblue.sa and the letsbook.me booking pages) send each
// event to the browser pixel and, with the same event_id, here via navigator.sendBeacon; this route forwards it
// server-side so Meta can deduplicate the pair and still count events the browser pixel lost (iOS, blockers).
// Needs Vercel env META_CAPI_TOKEN (Events Manager → dataset → Settings → Conversions API → Generate access token);
// without it the route accepts and drops events, so the GTM side can go live first.

export const dynamic = "force-dynamic";

const PIXEL_ID = process.env.META_PIXEL_ID || "1030509523387234";
const GRAPH_VERSION = "v23.0";
const EVENTS = new Set(["PageView", "ViewContent", "InitiateCheckout", "Purchase", "Lead", "Contact"]);
const ALLOWED_ORIGINS = [/^https:\/\/(www\.)?swissblue\.sa$/, /^https:\/\/([a-z0-9-]+\.)?letsbook\.me$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/];

type Incoming = {
  event_name?: unknown;
  event_id?: unknown;
  event_source_url?: unknown;
  value?: unknown;
  currency?: unknown;
  content_ids?: unknown;
  content_name?: unknown;
  fbp?: unknown;
  fbc?: unknown;
};

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.some((re) => re.test(origin))) return {};
  return { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST, OPTIONS", "Vary": "Origin" };
}

const str = (v: unknown, max = 500) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

export function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: { ...corsHeaders(request.headers.get("origin")), "Access-Control-Allow-Headers": "Content-Type" },
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  if (origin && !headers["Access-Control-Allow-Origin"]) {
    return NextResponse.json({ ok: false, error: "origin" }, { status: 403 });
  }

  let body: Incoming;
  try {
    // sendBeacon posts text/plain (no CORS preflight), so parse the raw text.
    body = JSON.parse(await request.text()) as Incoming;
  } catch {
    return NextResponse.json({ ok: false, error: "json" }, { status: 400, headers });
  }

  const eventName = str(body.event_name, 40);
  const eventId = str(body.event_id, 100);
  if (!eventName || !EVENTS.has(eventName) || !eventId) {
    return NextResponse.json({ ok: false, error: "event" }, { status: 400, headers });
  }

  const token = process.env.META_CAPI_TOKEN;
  if (!token) return NextResponse.json({ ok: true, sent: false }, { headers });

  const value = Number(body.value);
  const customData: Record<string, unknown> = {};
  if (Number.isFinite(value) && value > 0 && value < 1_000_000) {
    customData.value = value;
    customData.currency = str(body.currency, 3) || "SAR";
  }
  if (Array.isArray(body.content_ids)) {
    customData.content_ids = body.content_ids.filter((x) => typeof x === "string").slice(0, 10);
  }
  const contentName = str(body.content_name, 200);
  if (contentName) customData.content_name = contentName;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userData: Record<string, string> = {};
  if (ip) userData.client_ip_address = ip;
  const ua = request.headers.get("user-agent");
  if (ua) userData.client_user_agent = ua;
  const fbp = str(body.fbp, 200);
  if (fbp) userData.fbp = fbp;
  const fbc = str(body.fbc, 500);
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: str(body.event_source_url, 1000) || request.headers.get("referer") || undefined,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    });
    return NextResponse.json({ ok: res.ok, sent: res.ok }, { status: res.ok ? 200 : 502, headers });
  } catch {
    return NextResponse.json({ ok: false, sent: false }, { status: 502, headers });
  }
}
