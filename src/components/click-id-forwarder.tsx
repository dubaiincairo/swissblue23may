"use client";

import { useEffect } from "react";
import { captureClickId, installBookingLinkDecorator } from "@/lib/click-id";

/**
 * Keeps the Google Ads click id from the landing page and adds it to letsbook.me
 * booking links as a hash fragment, so bookings on the booking engine can be
 * attributed to the ad click. Stores nothing but that id, in localStorage.
 */
export default function ClickIdForwarder() {
  useEffect(() => {
    captureClickId();
    return installBookingLinkDecorator();
  }, []);
  return null;
}
