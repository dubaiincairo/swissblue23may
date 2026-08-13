"use client";

import Link from "next/link";
import {
  Check,
  CircleCheck,
  LayoutList,
  Monitor,
  PanelsTopLeft,
  ShieldCheck,
  Smartphone,
  Tablet,
} from "lucide-react";
import { useState } from "react";
import styles from "./loyalty-layout-lab.module.css";

type Locale = "en" | "ar";
type LayoutId = "rail" | "strip";
type ViewportId = "desktop" | "tablet" | "mobile";

type LoyaltyContent = {
  benefits: string[];
  description: string;
  note: string;
  subtitle: string;
  title: string;
};

type LoyaltyLayoutLabProps = {
  initialLocale: Locale;
  previews: Record<Locale, LoyaltyContent>;
};

const copy = {
  en: {
    back: "Back to Content Studio",
    choose: "Choose for review",
    currentSafe: "Homepage remains unchanged",
    layouts: {
      rail: {
        description: "A balanced split with compact benefit rows and a clear action area.",
        name: "Compact benefit rail",
      },
      strip: {
        description: "A shallower editorial band with benefits arranged in one efficient rhythm.",
        name: "Editorial benefit strip",
      },
    },
    selected: "Selected in this lab",
    title: "Loyalty section design lab",
    viewport: "Preview size",
    viewports: { desktop: "Desktop", mobile: "Mobile", tablet: "Tablet" },
  },
  ar: {
    back: "العودة إلى استوديو المحتوى",
    choose: "اختيار للمراجعة",
    currentSafe: "الصفحة الرئيسية لم تتغير",
    layouts: {
      rail: {
        description: "تقسيم متوازن مع صفوف مزايا مدمجة ومساحة واضحة للإجراء.",
        name: "مسار المزايا المدمج",
      },
      strip: {
        description: "شريط تحريري أقل ارتفاعًا يرتب المزايا بإيقاع بصري واضح.",
        name: "شريط المزايا التحريري",
      },
    },
    selected: "محدد داخل المختبر",
    title: "مختبر تصميم قسم الولاء",
    viewport: "حجم المعاينة",
    viewports: { desktop: "سطح المكتب", mobile: "هاتف", tablet: "جهاز لوحي" },
  },
} as const;

const viewportIcons = {
  desktop: Monitor,
  tablet: Tablet,
  mobile: Smartphone,
} satisfies Record<ViewportId, typeof Monitor>;

const viewportIds: ViewportId[] = ["desktop", "tablet", "mobile"];
const layoutIds: LayoutId[] = ["rail", "strip"];

function BenefitItem({ children, compact = false }: { children: string; compact?: boolean }) {
  return (
    <li className={compact ? styles.compactBenefit : styles.railBenefit}>
      <span className={styles.benefitIcon} aria-hidden="true">
        <Check />
      </span>
      <span>{children}</span>
    </li>
  );
}

function LoyaltyPreview({
  content,
  layout,
  locale,
}: {
  content: LoyaltyContent;
  layout: LayoutId;
  locale: Locale;
}) {
  const isArabic = locale === "ar";
  const cta = isArabic ? "انضم إلى برنامج الولاء" : "Join the loyalty program";

  if (layout === "strip") {
    return (
      <section className={`${styles.previewSection} ${styles.stripSection}`}>
        <div className={styles.stripTop}>
          <div className={styles.stripCopy}>
            <span className={styles.eyebrow}>{content.subtitle}</span>
            <h2>{content.title}</h2>
            <p>{content.description}</p>
          </div>
          <div className={styles.stripAction}>
            <button type="button">{cta}</button>
            <span>{content.note}</span>
          </div>
        </div>
        <ul className={styles.stripBenefits}>
          {content.benefits.map((benefit) => (
            <BenefitItem compact key={benefit}>
              {benefit}
            </BenefitItem>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className={`${styles.previewSection} ${styles.railSection}`}>
      <div className={styles.railCopy}>
        <span className={styles.eyebrow}>{content.subtitle}</span>
        <h2>{content.title}</h2>
        <p>{content.description}</p>
        <div className={styles.railAction}>
          <button type="button">{cta}</button>
          <span>{content.note}</span>
        </div>
      </div>
      <ul className={styles.railBenefits}>
        {content.benefits.map((benefit) => (
          <BenefitItem key={benefit}>{benefit}</BenefitItem>
        ))}
      </ul>
    </section>
  );
}

export default function LoyaltyLayoutLab({
  initialLocale,
  previews,
}: LoyaltyLayoutLabProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [selectedLayout, setSelectedLayout] = useState<LayoutId>("rail");
  const [viewport, setViewport] = useState<ViewportId>("desktop");
  const ui = copy[locale];

  return (
    <main
      className={styles.page}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Link href={locale === "ar" ? "/admin/ar" : "/admin"}>
              {ui.back}
            </Link>
            <div className={styles.titleRow}>
              <h1>{ui.title}</h1>
              <span className={styles.safeStatus}>
                <ShieldCheck aria-hidden="true" />
                {ui.currentSafe}
              </span>
            </div>
          </div>
          <div className={styles.language} role="group" aria-label="Language">
            <button
              type="button"
              className={locale === "en" ? styles.active : ""}
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
            >
              English
            </button>
            <button
              type="button"
              className={locale === "ar" ? styles.active : ""}
              aria-pressed={locale === "ar"}
              onClick={() => setLocale("ar")}
            >
              العربية
            </button>
          </div>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.layoutPicker}>
            {layoutIds.map((layoutId) => {
              const Icon = layoutId === "rail" ? LayoutList : PanelsTopLeft;
              const selected = selectedLayout === layoutId;
              return (
                <button
                  type="button"
                  key={layoutId}
                  className={selected ? styles.activeChoice : ""}
                  aria-pressed={selected}
                  onClick={() => setSelectedLayout(layoutId)}
                >
                  <Icon aria-hidden="true" />
                  <span>
                    <strong>{ui.layouts[layoutId].name}</strong>
                    <small>{ui.layouts[layoutId].description}</small>
                  </span>
                  {selected ? <CircleCheck aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          <div className={styles.viewportPicker}>
            <span>{ui.viewport}</span>
            <div role="group" aria-label={ui.viewport}>
              {viewportIds.map((viewportId) => {
                const Icon = viewportIcons[viewportId];
                return (
                  <button
                    type="button"
                    key={viewportId}
                    className={viewport === viewportId ? styles.active : ""}
                    aria-label={ui.viewports[viewportId]}
                    aria-pressed={viewport === viewportId}
                    title={ui.viewports[viewportId]}
                    onClick={() => setViewport(viewportId)}
                  >
                    <Icon aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <section className={styles.comparison}>
          {layoutIds.map((layoutId, index) => {
            const selected = selectedLayout === layoutId;
            return (
              <article className={styles.option} key={layoutId}>
                <div className={styles.optionHeader}>
                  <div>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h2>{ui.layouts[layoutId].name}</h2>
                    <p>{ui.layouts[layoutId].description}</p>
                  </div>
                  <button
                    type="button"
                    className={selected ? styles.selectedButton : ""}
                    onClick={() => setSelectedLayout(layoutId)}
                  >
                    {selected ? (
                      <>
                        <CircleCheck aria-hidden="true" />
                        {ui.selected}
                      </>
                    ) : (
                      ui.choose
                    )}
                  </button>
                </div>
                <div className={`${styles.stage} ${styles[viewport]}`}>
                  <div className={styles.viewport}>
                    <LoyaltyPreview
                      content={previews[locale]}
                      layout={layoutId}
                      locale={locale}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
