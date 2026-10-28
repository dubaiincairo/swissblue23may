"use client";

import { useEffect } from "react";

// Pushes "wa_ad_redirect" for Tag Manager (Google Ads "WhatsApp click (website)" + GA4),
// waits for the tags (max 1.5 s), then opens WhatsApp. The button is the fallback.
export default function WhatsAppRedirect({
  branch,
  href,
  nameAr,
}: {
  branch: string;
  href: string;
  nameAr: string;
}) {
  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(href);
    };
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "wa_ad_redirect",
      wa_branch: branch,
      eventCallback: go,
      eventTimeout: 1500,
    });
    const timer = window.setTimeout(go, 1800);
    return () => window.clearTimeout(timer);
  }, [branch, href]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-lg">جارٍ فتح محادثة واتساب مع {nameAr}…</p>
      <a className="btn btn-primary" href={href}>
        افتح واتساب
      </a>
    </main>
  );
}
