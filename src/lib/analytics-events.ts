"use client";

export type AnalyticsEventName =
  | "booking_cta_click"
  | "property_selected"
  | "career_application_submitted"
  | "corporate_request_submitted"
  | "chat_opened"
  | "chat_lead_submitted";

type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, parameters?: AnalyticsParameters) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Sends non-identifying product signals after the visitor has accepted analytics cookies. */
export function trackAnalyticsEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") return;

  const payload: Record<string, unknown> = {
    event: name,
    page_path: window.location.pathname,
    ...parameters,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, {
      page_path: window.location.pathname,
      ...parameters,
    });
  }
}
