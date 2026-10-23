"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

function validMeasurementId(value?: string) {
  return /^G-[A-Z0-9]+$/i.test(value?.trim() ?? "") ? value?.trim() : undefined;
}

function validContainerId(value?: string) {
  return /^GTM-[A-Z0-9]+$/i.test(value?.trim() ?? "") ? value?.trim() : undefined;
}

export default function Ga4Analytics({
  measurementId,
  containerId,
  requireConsent = true,
}: {
  measurementId?: string;
  containerId?: string;
  requireConsent?: boolean;
}) {
  const ga4Id = validMeasurementId(measurementId);
  const gtmId = validContainerId(containerId);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!ga4Id && !gtmId) return;

    const update = () => {
      try {
        setEnabled(
          !requireConsent ||
            window.localStorage.getItem(CONSENT_STORAGE_KEY) === "accepted",
        );
      } catch {
        setEnabled(!requireConsent);
      }
    };

    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, [ga4Id, gtmId, requireConsent]);

  useEffect(() => {
    if (!enabled) return;

    if (typeof window !== "undefined") {
      const w = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "sb_cookie_consent_accepted",
      });
    }

    function trackBookingLink(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || !anchor.href.includes("letsbook.me/booking/")) return;
      // Links that send their own richer booking_cta_click opt out to avoid double counting.
      if (anchor.dataset.analyticsTracked) return;

      if (typeof window !== "undefined") {
        const w = window as unknown as {
          dataLayer?: Array<Record<string, unknown>>;
          gtag?: (command: string, eventName: string, params: Record<string, unknown>) => void;
        };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "booking_cta_click",
          page_path: window.location.pathname,
          placement: "booking_link",
        });
        w.gtag?.("event", "booking_cta_click", {
          page_path: window.location.pathname,
          placement: "booking_link",
        });
      }
    }

    document.addEventListener("click", trackBookingLink);
    return () => document.removeEventListener("click", trackBookingLink);
  }, [enabled]);

  // When GTM is configured, the container snippet is rendered in the root layout <head> and <body>.
  if (gtmId) {
    return null;
  }

  if (!ga4Id || !enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
      <Script id="swiss-blue-ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${ga4Id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
