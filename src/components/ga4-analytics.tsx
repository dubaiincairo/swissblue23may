"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

export default function Ga4Analytics({ measurementId }: { measurementId?: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!measurementId) return;

    const update = () => {
      try {
        setEnabled(window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted");
      } catch {
        setEnabled(false);
      }
    };

    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, [measurementId]);

  useEffect(() => {
    if (!enabled) return;

    function trackBookingLink(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !anchor.href.includes("letsbook.me/booking/")) return;
      window.gtag?.("event", "booking_cta_click", {
        page_path: window.location.pathname,
        placement: "booking_link",
      });
    }

    document.addEventListener("click", trackBookingLink);
    return () => document.removeEventListener("click", trackBookingLink);
  }, [enabled]);

  if (!measurementId || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="swiss-blue-ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
