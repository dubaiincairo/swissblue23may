"use client";

import { useState } from "react";
import { BarChart3, BriefcaseBusiness, ExternalLink, Globe2, UsersRound } from "lucide-react";
import type { OverviewData, OverviewRange } from "@/lib/admin-overview";

type Props = { initialData: OverviewData; locale: "ar" | "en"; canSeeSubmissions: boolean };

const RANGES: OverviewRange[] = [7, 30, 90];

function format(value: number | null, locale: "ar" | "en") {
  if (value === null) return "—";
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en", { maximumFractionDigits: 1 }).format(value);
}

function Trend({ value, locale }: { value: number | null; locale: "ar" | "en" }) {
  if (value === null) return <span className="admin-overview-trend is-neutral">{locale === "ar" ? "لا توجد مقارنة" : "No comparison yet"}</span>;
  const up = value >= 0;
  return <span className={`admin-overview-trend ${up ? "is-up" : "is-down"}`}>{up ? "+" : ""}{format(value, locale)}% {locale === "ar" ? "مقارنة بالفترة السابقة" : "vs previous period"}</span>;
}

function MetricCard({ label, value, trend, locale, suffix = "" }: { label: string; value: number | null; trend?: number | null; locale: "ar" | "en"; suffix?: string }) {
  return <article className="admin-overview-metric">
    <span>{label}</span>
    <strong>{format(value, locale)}{suffix}</strong>
    {trend !== undefined ? <Trend value={trend} locale={locale} /> : <small>{locale === "ar" ? "ضمن الفترة المحددة" : "In selected period"}</small>}
  </article>;
}

function RankedList({ items, empty, locale }: { items: Array<{ label: string; value: number }>; empty: string; locale: "ar" | "en" }) {
  const maximum = Math.max(...items.map((item) => item.value), 1);
  if (!items.length) return <p className="admin-overview-empty">{empty}</p>;
  return <div className="admin-overview-ranked-list">
    {items.map((item) => <div className="admin-overview-ranked-row" key={item.label}>
      <span title={item.label}>{item.label}</span>
      <div aria-hidden="true"><i style={{ width: `${Math.max((item.value / maximum) * 100, 4)}%` }} /></div>
      <strong>{format(item.value, locale)}</strong>
    </div>)}
  </div>;
}

function TrafficChart({ data, locale }: { data: OverviewData["trafficTrend"]; locale: "ar" | "en" }) {
  const maximum = Math.max(...data.map((item) => Math.max(item.visitors, item.bookingClicks)), 1);
  if (!data.length) return <p className="admin-overview-empty">{locale === "ar" ? "ستظهر حركة الزيارات بعد ربط Google Analytics 4." : "Traffic trends will appear once Google Analytics 4 is connected."}</p>;
  return <div className="admin-overview-chart" role="img" aria-label={locale === "ar" ? "اتجاه الزيارات اليومية" : "Daily visitor trend"}>
    {data.map((item) => <div className="admin-overview-chart-day" key={item.date} title={`${item.date}: ${item.visitors} visitors, ${item.bookingClicks} booking clicks`}>
      <i className="admin-overview-chart-visitors" style={{ height: `${Math.max((item.visitors / maximum) * 100, item.visitors ? 4 : 0)}%` }} />
      <i className="admin-overview-chart-bookings" style={{ height: `${Math.max((item.bookingClicks / maximum) * 100, item.bookingClicks ? 4 : 0)}%` }} />
    </div>)}
  </div>;
}

export default function OverviewDashboard({ initialData, locale, canSeeSubmissions }: Props) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const isArabic = locale === "ar";
  const copy = isArabic ? {
    eyebrow: "نظرة عامة", title: "صحة الموقع وفرص الضيافة", intro: "تجمع هذه الصفحة اهتمام الزوار مع الطلبات الواردة. النقرات تشير إلى نية الحجز وليست حجوزات مؤكدة.", updated: "آخر تحديث", visitors: "الزوار", engaged: "الجلسات المتفاعلة", booking: "نقرات الحجز", leads: "إجمالي الطلبات", conversion: "تحويل الطلبات", traffic: "حركة الزيارات", acquisition: "مصادر الزيارات", pages: "الصفحات الأكثر زيارة", property: "اهتمام المنشآت", audience: "الجمهور", devices: "الأجهزة", countries: "أهم الدول", languages: "اللغة", leadsTitle: "الطلبات الواردة", careers: "وظائف", corporate: "شركات", chat: "محادثة", action: "يحتاج إلى متابعة", noData: "لا توجد بيانات ضمن هذه الفترة.", setup: "ربط Google Analytics 4", setupText: "ستستمر الطلبات الواردة بالظهور الآن. أضف بيانات GA4 الآمنة في Vercel لتظهر الزيارات والأداء.", dimensions: "فعّل الأبعاد المخصصة لاسم المنشأة في GA4 لعرض الاهتمام بكل منشأة.", open: "فتح الطلبات", retry: "تحديث البيانات",
  } : {
    eyebrow: "Overview", title: "Website health and hospitality demand", intro: "This page combines visitor interest with incoming leads. Booking clicks measure intent, not confirmed reservations.", updated: "Updated", visitors: "Visitors", engaged: "Engaged sessions", booking: "Booking clicks", leads: "Total leads", conversion: "Lead conversion", traffic: "Traffic trend", acquisition: "Acquisition", pages: "Top pages", property: "Property interest", audience: "Audience", devices: "Devices", countries: "Top countries", languages: "Language", leadsTitle: "Incoming leads", careers: "Careers", corporate: "Corporate", chat: "Chat", action: "Needs attention", noData: "No data for this period.", setup: "Connect Google Analytics 4", setupText: "Incoming leads will continue to appear now. Add the secure GA4 values in Vercel to unlock traffic and performance insight.", dimensions: "Enable the property slug custom dimension in GA4 to show property-level interest.", open: "Open submissions", retry: "Refresh data",
  };

  async function setRange(range: OverviewRange) {
    if (range === data.range || loading) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/overview?range=${range}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load overview");
      setData(await response.json() as OverviewData);
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/overview?range=${data.range}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load overview");
      setData(await response.json() as OverviewData);
    } finally {
      setLoading(false);
    }
  }

  return <main className="admin-overview-page" dir={isArabic ? "rtl" : "ltr"} lang={locale}>
    <header className="admin-overview-header">
      <div>
        <p>{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <span>{copy.intro}</span>
      </div>
      <div className="admin-overview-header-actions">
        <span className="admin-overview-updated">{copy.updated}: {new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(data.updatedAt))}</span>
        <div className="admin-overview-ranges" aria-label={isArabic ? "نطاق التاريخ" : "Date range"}>
          {RANGES.map((range) => <button type="button" key={range} className={data.range === range ? "is-active" : ""} onClick={() => setRange(range)} disabled={loading}>{range} {isArabic ? "يوم" : "days"}</button>)}
        </div>
      </div>
    </header>

    {data.sources.ga4.status !== "connected" ? <section className="admin-overview-setup">
      <Globe2 aria-hidden="true" />
      <div><strong>{copy.setup}</strong><p>{data.sources.ga4.message || copy.setupText}</p></div>
    </section> : null}

    <section className="admin-overview-metrics" aria-label={copy.eyebrow}>
      <MetricCard label={copy.visitors} value={data.kpis.visitors} trend={data.changes.visitors} locale={locale} />
      <MetricCard label={copy.engaged} value={data.kpis.engagedSessions} locale={locale} />
      <MetricCard label={copy.booking} value={data.kpis.bookingClicks} trend={data.changes.bookingClicks} locale={locale} />
      <MetricCard label={copy.leads} value={data.kpis.leads} trend={data.changes.leads} locale={locale} />
      <MetricCard label={copy.conversion} value={data.kpis.leadConversionRate} locale={locale} suffix="%" />
    </section>

    <section className="admin-overview-grid admin-overview-grid-primary">
      <article className="admin-overview-panel admin-overview-panel-wide"><div className="admin-overview-panel-title"><BarChart3 aria-hidden="true" /><h2>{copy.traffic}</h2></div><TrafficChart data={data.trafficTrend} locale={locale} /><div className="admin-overview-legend"><span><i />{copy.visitors}</span><span><i />{copy.booking}</span></div></article>
      <article className="admin-overview-panel"><div className="admin-overview-panel-title"><BriefcaseBusiness aria-hidden="true" /><h2>{copy.leadsTitle}</h2></div><div className="admin-overview-lead-split"><span><strong>{format(data.leads.careers, locale)}</strong>{copy.careers}</span><span><strong>{format(data.leads.corporate, locale)}</strong>{copy.corporate}</span><span><strong>{format(data.leads.chat, locale)}</strong>{copy.chat}</span></div><p className="admin-overview-attention"><strong>{format(data.leads.unreviewed, locale)}</strong> {copy.action}</p>{canSeeSubmissions ? <a href="/admin/submissions">{copy.open}<ExternalLink aria-hidden="true" /></a> : null}</article>
    </section>

    <section className="admin-overview-grid">
      <article className="admin-overview-panel"><h2>{copy.acquisition}</h2><RankedList items={data.acquisition} empty={copy.noData} locale={locale} /></article>
      <article className="admin-overview-panel"><h2>{copy.pages}</h2><RankedList items={data.pages} empty={copy.noData} locale={locale} /></article>
      <article className="admin-overview-panel"><h2>{copy.property}</h2>{data.sources.ga4.propertyBreakdownReady ? <RankedList items={data.propertyInterest} empty={copy.noData} locale={locale} /> : <p className="admin-overview-empty">{copy.dimensions}</p>}</article>
    </section>

    <section className="admin-overview-grid">
      <article className="admin-overview-panel"><div className="admin-overview-panel-title"><UsersRound aria-hidden="true" /><h2>{copy.audience}: {copy.devices}</h2></div><RankedList items={data.audience.devices} empty={copy.noData} locale={locale} /></article>
      <article className="admin-overview-panel"><h2>{copy.countries}</h2><RankedList items={data.audience.countries} empty={copy.noData} locale={locale} /></article>
      <article className="admin-overview-panel"><h2>{copy.languages}</h2><RankedList items={data.audience.locales} empty={copy.noData} locale={locale} /></article>
    </section>

    <section className="admin-overview-panel admin-overview-actions">
      <div>
        <h2>{copy.action}</h2>
        <div className="admin-overview-action-list">
          {data.leads.unreviewed ? <p>{format(data.leads.unreviewed, locale)} {copy.leadsTitle.toLowerCase()} {copy.action.toLowerCase()}</p> : null}
          {data.kpis.visitors && data.kpis.bookingClicks === 0 ? <p>{isArabic ? "لم تُسجّل أي نقرات حجز رغم وجود زيارات." : "Visitors arrived, but no booking-intent clicks were recorded."}</p> : null}
          {canSeeSubmissions && data.leads.recent.map((lead) => <a href="/admin/submissions" key={lead.id}><span><strong>{lead.name}</strong><small>{lead.kind}</small></span><ExternalLink aria-hidden="true" /></a>)}
          {!data.leads.unreviewed && !(data.kpis.visitors && data.kpis.bookingClicks === 0) && !data.leads.recent.length ? <p>{copy.noData}</p> : null}
        </div>
      </div>
      <button type="button" onClick={refresh} disabled={loading}>{loading ? "…" : copy.retry}</button>
    </section>
  </main>;
}
