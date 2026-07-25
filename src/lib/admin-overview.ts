import { createSign } from "node:crypto";
import { getFormsClient } from "@/sanity/lib/forms";

export type OverviewRange = 7 | 30 | 90;

type LeadRecord = {
  _id: string;
  _type: "careerApplication" | "corporateRequest" | "chatLead";
  createdAt?: string;
  status?: string;
  fullName?: string;
  company?: string;
  contact?: string;
  kind?: string;
};

type GaRow = { dimensionValues?: Array<{ value?: string }>; metricValues?: Array<{ value?: string }> };
type GaReport = { rows?: GaRow[] };

export type OverviewData = {
  range: OverviewRange;
  updatedAt: string;
  sources: {
    ga4: { status: "connected" | "not-configured" | "unavailable"; message?: string; propertyBreakdownReady: boolean };
    leads: { status: "connected" | "unavailable"; message?: string };
  };
  kpis: {
    visitors: number | null;
    engagedSessions: number | null;
    bookingClicks: number | null;
    leads: number;
    leadConversionRate: number | null;
  };
  changes: { visitors: number | null; bookingClicks: number | null; leads: number | null };
  trafficTrend: Array<{ date: string; visitors: number; bookingClicks: number }>;
  acquisition: Array<{ label: string; value: number }>;
  pages: Array<{ label: string; value: number }>;
  propertyInterest: Array<{ label: string; value: number }>;
  audience: { devices: Array<{ label: string; value: number }>; countries: Array<{ label: string; value: number }>; locales: Array<{ label: string; value: number }> };
  leads: { careers: number; corporate: number; chat: number; unreviewed: number; recent: Array<{ id: string; kind: string; name: string; createdAt: string }> };
};

function dateKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

function asNumber(value: string | undefined) {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function percentChange(current: number | null, previous: number | null) {
  if (current === null || previous === null || previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

function emptyData(range: OverviewRange): OverviewData {
  return {
    range,
    updatedAt: new Date().toISOString(),
    sources: {
      ga4: { status: "not-configured", message: "Google Analytics 4 is not connected yet.", propertyBreakdownReady: false },
      leads: { status: "unavailable", message: "Submission storage is not available." },
    },
    kpis: { visitors: null, engagedSessions: null, bookingClicks: null, leads: 0, leadConversionRate: null },
    changes: { visitors: null, bookingClicks: null, leads: null },
    trafficTrend: [],
    acquisition: [],
    pages: [],
    propertyInterest: [],
    audience: { devices: [], countries: [], locales: [] },
    leads: { careers: 0, corporate: 0, chat: 0, unreviewed: 0, recent: [] },
  };
}

function base64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

async function googleAccessToken(serviceAccount: { client_email?: string; private_key?: string }) {
  if (!serviceAccount.client_email || !serviceAccount.private_key) throw new Error("The Google service account is incomplete.");
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64Url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }))}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(serviceAccount.private_key, "base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  const body = (await response.json()) as { access_token?: string; error_description?: string };
  if (!response.ok || !body.access_token) throw new Error(body.error_description || "Could not authenticate with Google Analytics.");
  return body.access_token;
}

async function gaReports(propertyId: string, accessToken: string, requests: unknown[]) {
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(propertyId)}:batchRunReports`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ requests }),
    cache: "no-store",
  });
  const body = (await response.json()) as { reports?: GaReport[]; error?: { message?: string } };
  if (!response.ok) throw new Error(body.error?.message || "Google Analytics reporting is unavailable.");
  return body.reports ?? [];
}

function eventFilter(eventName: string) {
  return { filter: { fieldName: "eventName", stringFilter: { matchType: "EXACT", value: eventName } } };
}

async function loadLeads(range: OverviewRange, data: OverviewData) {
  const client = getFormsClient();
  if (!client) return;
  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - range + 1);
  const previousStart = new Date(start);
  previousStart.setUTCDate(previousStart.getUTCDate() - range);
  const records = await client.fetch<LeadRecord[]>(
    `*[_type in ["careerApplication", "corporateRequest", "chatLead"] && createdAt >= $from]{_id, _type, createdAt, status, fullName, company, contact, kind}`,
    { from: previousStart.toISOString() },
    { cache: "no-store" },
  );
  const inCurrent = records.filter((record) => record.createdAt && record.createdAt >= start.toISOString());
  const inPrevious = records.filter((record) => record.createdAt && record.createdAt < start.toISOString());
  const count = (type: LeadRecord["_type"]) => inCurrent.filter((record) => record._type === type).length;
  const total = inCurrent.length;
  data.sources.leads = { status: "connected" };
  data.kpis.leads = total;
  data.changes.leads = percentChange(total, inPrevious.length);
  data.leads = {
    careers: count("careerApplication"),
    corporate: count("corporateRequest"),
    chat: count("chatLead"),
    unreviewed: inCurrent.filter((record) => record.status !== "reviewed").length,
    recent: [...inCurrent]
      .sort((left, right) => (right.createdAt ?? "").localeCompare(left.createdAt ?? ""))
      .slice(0, 5)
      .map((record) => ({
        id: record._id,
        kind: record._type === "careerApplication" ? "Career application" : record._type === "corporateRequest" ? "Corporate request" : `${record.kind || "Chat"} lead`,
        name: record.fullName || record.company || record.contact || "Unnamed lead",
        createdAt: record.createdAt || "",
      })),
  };
}

async function loadGa4(
  range: OverviewRange,
  data: OverviewData,
  configuredPropertyId?: string,
) {
  const propertyId = configuredPropertyId || process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
  const rawServiceAccount = process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON;
  if (!propertyId || !rawServiceAccount) return;
  let serviceAccount: { client_email?: string; private_key?: string };
  try {
    serviceAccount = JSON.parse(rawServiceAccount) as { client_email?: string; private_key?: string };
  } catch {
    data.sources.ga4 = { status: "unavailable", message: "The Google service account JSON is invalid.", propertyBreakdownReady: false };
    return;
  }

  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - range + 1);
  const previousEnd = new Date(start);
  previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setUTCDate(previousStart.getUTCDate() - range + 1);
  const currentRange = { startDate: dateKey(start), endDate: dateKey(end) };
  const previousRange = { startDate: dateKey(previousStart), endDate: dateKey(previousEnd) };

  try {
    const token = await googleAccessToken(serviceAccount);
    const reports = await gaReports(propertyId, token, [
      { dateRanges: [currentRange], metrics: [{ name: "activeUsers" }, { name: "engagedSessions" }] },
      { dateRanges: [previousRange], metrics: [{ name: "activeUsers" }] },
      { dateRanges: [currentRange], metrics: [{ name: "eventCount" }], dimensionFilter: eventFilter("booking_cta_click") },
      { dateRanges: [previousRange], metrics: [{ name: "eventCount" }], dimensionFilter: eventFilter("booking_cta_click") },
      { dateRanges: [currentRange], dimensions: [{ name: "date" }], metrics: [{ name: "activeUsers" }], orderBys: [{ dimension: { dimensionName: "date" } }] },
      { dateRanges: [currentRange], dimensions: [{ name: "date" }], metrics: [{ name: "eventCount" }], dimensionFilter: eventFilter("booking_cta_click"), orderBys: [{ dimension: { dimensionName: "date" } }] },
      { dateRanges: [currentRange], dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }], orderBys: [{ metric: { metricName: "sessions" }, desc: true }], limit: "6" },
      { dateRanges: [currentRange], dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }], limit: "8" },
      { dateRanges: [currentRange], dimensions: [{ name: "deviceCategory" }], metrics: [{ name: "activeUsers" }], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }] },
      { dateRanges: [currentRange], dimensions: [{ name: "country" }], metrics: [{ name: "activeUsers" }], orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }], limit: "5" },
    ]);
    const metric = (report: GaReport | undefined, index = 0) => asNumber(report?.rows?.[0]?.metricValues?.[index]?.value);
    const list = (report: GaReport | undefined) => (report?.rows ?? []).map((row) => ({ label: row.dimensionValues?.[0]?.value || "Other", value: asNumber(row.metricValues?.[0]?.value) }));
    const visitors = metric(reports[0], 0);
    const bookingClicks = metric(reports[2]);
    data.kpis.visitors = visitors;
    data.kpis.engagedSessions = metric(reports[0], 1);
    data.kpis.bookingClicks = bookingClicks;
    data.kpis.leadConversionRate = visitors > 0 ? Math.round((data.kpis.leads / visitors) * 10000) / 100 : null;
    data.changes.visitors = percentChange(visitors, metric(reports[1]));
    data.changes.bookingClicks = percentChange(bookingClicks, metric(reports[3]));
    const dailyClicks = new Map<string, number>((reports[5]?.rows ?? []).map((row) => {
      const rawDate = row.dimensionValues?.[0]?.value || "";
      const date = rawDate.length === 8 ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6)}` : rawDate;
      return [date, asNumber(row.metricValues?.[0]?.value)] as const;
    }));
    data.trafficTrend = (reports[4]?.rows ?? []).map((row) => {
      const rawDate = row.dimensionValues?.[0]?.value || "";
      const date = rawDate.length === 8 ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6)}` : rawDate;
      return { date, visitors: asNumber(row.metricValues?.[0]?.value), bookingClicks: dailyClicks.get(date) ?? 0 };
    });
    data.acquisition = list(reports[6]);
    data.pages = list(reports[7]);
    data.audience.devices = list(reports[8]);
    data.audience.countries = list(reports[9]);
    data.audience.locales = data.pages.reduce<Array<{ label: string; value: number }>>((items, page) => {
      const label = page.label === "/en" || page.label.startsWith("/en/") ? "English" : "Arabic";
      const existing = items.find((item) => item.label === label);
      if (existing) existing.value += page.value;
      else items.push({ label, value: page.value });
      return items;
    }, []);
    const propertyBreakdownReady = process.env.GA4_PROPERTY_CUSTOM_DIMENSIONS_READY === "true";
    if (propertyBreakdownReady) {
      try {
        const [propertyReport] = await gaReports(propertyId, token, [{
          dateRanges: [currentRange],
          dimensions: [{ name: "customEvent:property_slug" }],
          metrics: [{ name: "eventCount" }],
          dimensionFilter: eventFilter("booking_cta_click"),
          orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
          limit: "8",
        }]);
        data.propertyInterest = list(propertyReport);
      } catch {
        // The page remains useful if the GA custom dimension has not propagated yet.
      }
    }
    data.sources.ga4 = { status: "connected", propertyBreakdownReady };
  } catch (error) {
    data.sources.ga4 = { status: "unavailable", message: error instanceof Error ? error.message : "Google Analytics reporting is unavailable.", propertyBreakdownReady: false };
  }
}

export async function getAdminOverview(
  range: OverviewRange,
  configuredPropertyId?: string,
): Promise<OverviewData> {
  const data = emptyData(range);
  await loadLeads(range, data).catch(() => {
    data.sources.leads = { status: "unavailable", message: "Submission storage could not be reached." };
  });
  await loadGa4(range, data, configuredPropertyId);
  return data;
}

export function parseOverviewRange(value: string | null): OverviewRange {
  return value === "7" || value === "90" ? Number(value) as OverviewRange : 30;
}
