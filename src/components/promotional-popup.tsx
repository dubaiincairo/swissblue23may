"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type Locale = "ar" | "en";

type PromotionalPopupItem = {
  id: string;
  enabled: boolean;
  designStyle: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  meal: string;
  alternative: string;
  eligibility: string;
  bookingWindow: string;
  stayWindow: string;
  activeFrom: string;
  activeUntil: string;
  ctaLabel: string;
  ctaHref: string;
  dismissLabel: string;
};

type PromotionalPopupSettings = {
  displayDelayMs: number;
  items: PromotionalPopupItem[];
};

function dismissalKey(locale: Locale, item: PromotionalPopupItem) {
  return `swissblue-promotion:${locale}:${item.id}:${item.activeUntil}`;
}

function isActive(item: PromotionalPopupItem, now: Date) {
  if (!item.enabled) return false;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const starts = item.activeFrom
    ? new Date(`${item.activeFrom}T00:00:00`).getTime()
    : Number.NEGATIVE_INFINITY;
  const ends = item.activeUntil
    ? new Date(`${item.activeUntil}T23:59:59`).getTime()
    : Number.POSITIVE_INFINITY;

  return (Number.isNaN(starts) || today >= starts) && (Number.isNaN(ends) || today <= ends);
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 3v3M17 3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function DinnerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M3.5 18.5h17M6 18.5a6 6 0 0 1 12 0M12 8.5v-2M9.5 6h5" />
    </svg>
  );
}

function PromotionalPopupForLocale({
  locale,
  settings,
}: {
  locale: Locale;
  settings: PromotionalPopupSettings;
}) {
  const [promotion, setPromotion] = useState<PromotionalPopupItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    if (promotion) {
      window.sessionStorage.setItem(
        dismissalKey(locale, promotion),
        "dismissed",
      );
    }
    setPromotion(null);
  }, [locale, promotion]);

  useEffect(() => {
    const item = settings.items.find((candidate) => isActive(candidate, new Date()));
    if (!item) return;

    if (window.sessionStorage.getItem(dismissalKey(locale, item))) return;

    const timer = window.setTimeout(
      () => setPromotion(item),
      Math.max(0, settings.displayDelayMs || 0),
    );
    return () => window.clearTimeout(timer);
  }, [locale, settings]);

  useEffect(() => {
    if (!promotion) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [dismiss, promotion]);

  if (!promotion) return null;

  const style = ["midnight", "light", "immersive"].includes(promotion.designStyle)
    ? promotion.designStyle
    : "midnight";

  return (
    <div
      className="promotion-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <section
        className={`promotion-modal promotion-modal-${style}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="promotion-title"
        aria-describedby="promotion-description"
      >
        <button
          ref={closeButtonRef}
          className="promotion-close"
          type="button"
          aria-label={promotion.dismissLabel}
          onClick={dismiss}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="promotion-media">
          <Image
            src={promotion.image}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 420px"
            className="promotion-image"
          />
          <div className="promotion-media-shade" />
          <div className="promotion-media-caption">
            <DinnerIcon />
            <span>{promotion.meal}</span>
          </div>
        </div>

        <div className="promotion-content">
          <p className="promotion-eyebrow">{promotion.eyebrow}</p>
          <h2 id="promotion-title">{promotion.title}</h2>
          <p id="promotion-description" className="promotion-description">
            {promotion.description}
          </p>

          <div className="promotion-meal">
            <DinnerIcon />
            <div>
              <strong>{promotion.meal}</strong>
              <span>{promotion.alternative}</span>
            </div>
          </div>

          <p className="promotion-eligibility">{promotion.eligibility}</p>

          <div className="promotion-dates">
            <div><CalendarIcon /><span>{promotion.bookingWindow}</span></div>
            <div><CalendarIcon /><span>{promotion.stayWindow}</span></div>
          </div>

          <a className="promotion-cta" href={promotion.ctaHref} onClick={dismiss}>
            <span>{promotion.ctaLabel}</span>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default function PromotionalPopup({
  settings,
}: {
  settings: Record<Locale, PromotionalPopupSettings>;
}) {
  const pathname = usePathname();
  const locale: Locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";

  return (
    <PromotionalPopupForLocale
      key={locale}
      locale={locale}
      settings={settings[locale]}
    />
  );
}
