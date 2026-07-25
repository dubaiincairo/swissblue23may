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

  if ((!ga4Id && !gtmId) || !enabled) return null;

  // GTM owns all downstream tags when configured, avoiding a duplicate GA4 page view.
  if (gtmId) {
    return (
      <>
        <Script id="swiss-blue-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      </>
    );
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
      <Script id="swiss-blue-ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', '${ga4Id}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
