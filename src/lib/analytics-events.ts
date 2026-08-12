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
  }
}

/** Sends non-identifying product signals after the visitor has accepted analytics cookies. */
export function trackAnalyticsEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", name, {
    page_path: window.location.pathname,
    ...parameters,
  });
}
