"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { EditableSiteContent } from "@/lib/editable-content";

// Bump this version to re-show the banner to everyone (e.g. after a policy change).
const STORAGE_KEY = "sb-cookie-consent-v2";

type CookieCopy = EditableSiteContent["ar"]["ui"]["cookie"];

export default function CookieBanner({ copy }: { copy: { ar: CookieCopy; en: CookieCopy } }) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const t = copy[locale];
  const policyHref = locale === "en" ? "/en/policy" : "/policy";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, []);

  function dismiss(value: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setVisible(false);
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
