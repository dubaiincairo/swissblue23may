"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Layers3,
  Monitor,
  PanelBottom,
  PanelRight,
  Rows3,
  ShieldCheck,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState } from "react";

type Locale = "en" | "ar";
type LayoutId = "side" | "horizontal" | "glass" | "dock";
type ViewportId = "desktop" | "tablet" | "mobile";

type PropertyOption = {
  city: string;
  slug: string;
  title: string;
};

type LocalePreview = {
  bestRateLabel: string;
  bookLabel: string;
  eyebrow: string;
  helperText: string;
  heroImage: string;
  heroText: string;
  heroTitle: string;
  logo: string;
  properties: PropertyOption[];
  propertyLabel: string;
  secureLabel: string;
};

type ReservationLayoutLabProps = {
  bookingUrl: string;
  initialLocale?: Locale;
  previews: Record<Locale, LocalePreview>;
};

const layoutIcons = {
  side: PanelRight,
  horizontal: Rows3,
  glass: Layers3,
  dock: PanelBottom,
} satisfies Record<LayoutId, typeof PanelRight>;

const viewportIcons = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
} satisfies Record<ViewportId, typeof Monitor>;

const copy = {
  en: {
    back: "Back to Content Studio",
    currentSafe: "Live homepage unchanged",
    language: "Website language",
    layouts: {
      side: "Compact side card",
      horizontal: "Horizontal bar",
      glass: "Glass panel",
      dock: "Bottom dock",
    },
    recommended: "Recommended",
    selected: "Selected for review",
    title: "Reservation layout lab",
    viewport: "Preview size",
    viewports: { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" },
  },
  ar: {
    back: "العودة إلى استوديو المحتوى",
    currentSafe: "الصفحة المباشرة لم تتغير",
    language: "لغة الموقع",
    layouts: {
      side: "بطاقة جانبية مدمجة",
      horizontal: "شريط أفقي",
      glass: "لوحة زجاجية",
      dock: "شريط سفلي",
    },
    recommended: "موصى به",
    selected: "محدد للمراجعة",
    title: "مختبر تخطيطات الحجز",
    viewport: "حجم المعاينة",
    viewports: { desktop: "سطح المكتب", tablet: "جهاز لوحي", mobile: "هاتف" },
  },
} as const;

const layoutIds: LayoutId[] = ["side", "horizontal", "glass", "dock"];
const viewportIds: ViewportId[] = ["desktop", "tablet", "mobile"];

function ReservationWidget({
  bookingUrl,
  layout,
  locale,
  preview,
  selectedSlug,
  onPropertyChange,
}: {
  bookingUrl: string;
  layout: LayoutId;
  locale: Locale;
  preview: LocalePreview;
  selectedSlug: string;
  onPropertyChange: (slug: string) => void;
}) {
  return (
    <section className={`reservation-lab-widget is-${layout}`} aria-label={preview.bookLabel}>
      <div className="reservation-lab-widget-intro">
        <span>{preview.eyebrow}</span>
        <strong>{preview.bookLabel}</strong>
        <p>{preview.helperText}</p>
      </div>

      <label className="reservation-lab-property">
        <span>{preview.propertyLabel}</span>
        <span className="reservation-lab-property-control">
          <select value={selectedSlug} onChange={(event) => onPropertyChange(event.target.value)}>
            {preview.properties.map((property) => (
              <option key={property.slug} value={property.slug}>
                {property.title} - {property.city}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </span>
      </label>

      <a className="reservation-lab-book" href={bookingUrl} target="_blank" rel="noreferrer">
        <span>{preview.bookLabel}</span>
        <ArrowUpRight aria-hidden="true" />
      </a>

      <div className="reservation-lab-assurance" aria-label={locale === "ar" ? "مزايا الحجز" : "Booking benefits"}>
        <span>
          <ShieldCheck aria-hidden="true" />
          {preview.secureLabel}
        </span>
        <span>
          <BadgeCheck aria-hidden="true" />
          {preview.bestRateLabel}
        </span>
      </div>
    </section>
  );
}

export default function ReservationLayoutLab({ bookingUrl, initialLocale = "en", previews }: ReservationLayoutLabProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [layout, setLayout] = useState<LayoutId>("glass");
  const [viewport, setViewport] = useState<ViewportId>("desktop");
  const [selectedSlug, setSelectedSlug] = useState(previews[initialLocale].properties[0]?.slug ?? "");
  const ui = copy[locale];
  const preview = previews[locale];

  function switchLocale(nextLocale: Locale) {
    const nextPreview = previews[nextLocale];
    const nextSlug = nextPreview.properties.some((property) => property.slug === selectedSlug)
      ? selectedSlug
      : nextPreview.properties[0]?.slug ?? "";

    setLocale(nextLocale);
    setSelectedSlug(nextSlug);
  }

  return (
    <main className="reservation-lab-page" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <div className="reservation-lab-shell">
        <header className="reservation-lab-header">
          <div>
            <Link className="admin-secondary-back" href={locale === "ar" ? "/admin/ar" : "/admin"}>
              {ui.back}
            </Link>
            <div className="reservation-lab-heading-row">
              <h1>{ui.title}</h1>
              <span className="reservation-lab-safe-status">
                <ShieldCheck aria-hidden="true" />
                {ui.currentSafe}
              </span>
            </div>
          </div>

          <div className="reservation-lab-language" role="group" aria-label={ui.language}>
            <button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => switchLocale("en")}>
              English
            </button>
            <button type="button" className={locale === "ar" ? "active" : ""} aria-pressed={locale === "ar"} onClick={() => switchLocale("ar")}>
              العربية
            </button>
          </div>
        </header>

        <section className="reservation-lab-layout-picker" aria-label={ui.title}>
          {layoutIds.map((layoutId) => {
            const Icon = layoutIcons[layoutId];
            const selected = layout === layoutId;

            return (
              <button
                key={layoutId}
                type="button"
                className={`reservation-lab-layout-choice${selected ? " active" : ""}`}
                aria-pressed={selected}
                onClick={() => setLayout(layoutId)}
              >
                <span className="reservation-lab-layout-icon">
                  <Icon aria-hidden="true" />
                </span>
                <strong>{ui.layouts[layoutId]}</strong>
                {layoutId === "glass" ? <small>{ui.recommended}</small> : null}
                {selected ? <Check className="reservation-lab-layout-check" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </section>

        <section className="reservation-lab-preview-panel">
          <div className="reservation-lab-preview-toolbar">
            <span>{ui.selected}: {ui.layouts[layout]}</span>
            <div className="reservation-lab-viewports" role="group" aria-label={ui.viewport}>
              {viewportIds.map((viewportId) => {
                const Icon = viewportIcons[viewportId];
                const selected = viewport === viewportId;

                return (
                  <button
                    key={viewportId}
                    type="button"
                    className={selected ? "active" : ""}
                    aria-label={ui.viewports[viewportId]}
                    aria-pressed={selected}
                    title={ui.viewports[viewportId]}
                    onClick={() => setViewport(viewportId)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{ui.viewports[viewportId]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="reservation-lab-canvas">
            <div className={`reservation-lab-device is-${viewport}`}>
              <div className={`reservation-lab-stage is-${layout}`} dir={locale === "ar" ? "rtl" : "ltr"}>
                <Image
                  className="reservation-lab-stage-image"
                  src={preview.heroImage}
                  alt=""
                  fill
                  preload
                  sizes="(max-width: 640px) 390px, (max-width: 1024px) 768px, 1180px"
                />
                <div className="reservation-lab-stage-overlay" />

                <div className="reservation-lab-stage-brand">
                  {preview.logo ? (
                    <Image src={preview.logo} alt="Swiss Blue" width={150} height={64} />
                  ) : null}
                  <span>{ui.title}</span>
                </div>

                <div className="reservation-lab-stage-copy">
                  <span>{preview.eyebrow}</span>
                  <h2>{preview.heroTitle}</h2>
                  <p>{preview.heroText}</p>
                </div>

                <ReservationWidget
                  bookingUrl={bookingUrl}
                  layout={layout}
                  locale={locale}
                  preview={preview}
                  selectedSlug={selectedSlug}
                  onPropertyChange={setSelectedSlug}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
