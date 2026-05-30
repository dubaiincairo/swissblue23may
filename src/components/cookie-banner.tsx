"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Bump this version to re-show the banner to everyone (e.g. after a policy change).
const STORAGE_KEY = "sb-cookie-consent-v2";

const COPY = {
  ar: {
    title: "نحترم خصوصيتك",
    text: "يستخدم موقع سويس بلو ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة لتشغيل الموقع بشكل سليم، وتذكّر تفضيلاتك مثل اللغة والعملة والوجهة، وتحليل أداء الصفحات، وتحسين تجربتك أثناء البحث عن إقامتك وإتمام الحجز. يمكنك قبول جميع ملفات الارتباط أو الاكتفاء بالملفات الضرورية فقط، ولك تغيير اختيارك في أي وقت. لمعرفة المزيد حول كيفية تعاملنا مع بياناتك، يرجى الاطلاع على",
    accept: "قبول الكل",
    decline: "الضرورية فقط",
    policy: "سياسة الخصوصية",
    policyHref: "/policy",
    aria: "إشعار ملفات تعريف الارتباط",
  },
  en: {
    title: "We value your privacy",
    text: "The Swiss Blue website uses cookies and similar technologies to run the site properly, remember your preferences such as language, currency, and destination, analyse page performance, and improve your experience while you search for a stay and complete your booking. You can accept all cookies or keep only the essential ones, and you can change your choice at any time. To learn more about how we handle your data, please read our",
    accept: "Accept all",
    decline: "Essential only",
    policy: "Privacy policy",
    policyHref: "/en/policy",
    aria: "Cookie notice",
  },
} as const;

export default function CookieBanner() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "ar";
  const t = COPY[locale];
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
            <a className="cookie-banner-link" href={t.policyHref}>
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
