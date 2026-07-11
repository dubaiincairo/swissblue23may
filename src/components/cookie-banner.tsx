"use client";

import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";
import type { EditableSiteContent } from "@/lib/editable-content";

type CookieCopy = EditableSiteContent["ar"]["ui"]["cookie"];

const CONSENT_PENDING = "__pending";
const CONSENT_UNSET = "__unset";

function isAdminPath(pathname: string | null) {
  return Boolean(
    pathname === "/admin" ||
      pathname === "/studio" ||
      pathname?.startsWith("/admin/") ||
      pathname?.startsWith("/studio/"),
  );
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  const timeout = window.setTimeout(onStoreChange, 0);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.clearTimeout(timeout);
  };
}

function getConsentSnapshot() {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? CONSENT_UNSET;
  } catch {
    return "accepted";
  }
}

function getServerConsentSnapshot() {
  return CONSENT_PENDING;
}

export default function CookieBanner({ copy }: { copy: { ar: CookieCopy; en: CookieCopy } }) {
  const pathname = usePathname();
  const isAdmin = isAdminPath(pathname);
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const t = copy[locale];
  const policyHref = locale === "en" ? "/en/policy" : "/policy";
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [dismissedInMemory, setDismissedInMemory] = useState(false);
  const visible = !isAdmin && !dismissedInMemory && consent === CONSENT_UNSET;

  function dismiss(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setDismissedInMemory(true);
    // Let consent-gated widgets (e.g. the website assistant) load now that the
    // banner is dismissed and can no longer overlap it.
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
  }

  if (!visible) {
    return null;
  }

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-label={t.aria}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="cookie-banner-card">
        <div className="cookie-banner-body">
          <strong className="cookie-banner-title">{t.title}</strong>
          <p className="cookie-banner-text">
            {t.text}{" "}
            <a className="cookie-banner-link" href={policyHref}>
              {t.policy}
            </a>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn btn-secondary cookie-banner-btn"
            onClick={() => dismiss("declined")}
          >
            {t.decline}
          </button>
          <button
            type="button"
            className="btn btn-primary cookie-banner-btn"
            onClick={() => dismiss("accepted")}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
