import Link from "next/link";
import { BOOKING_URL } from "@/lib/editable-content";

export type Partner = {
  readonly name: string;
  readonly accent: string;
  readonly weight: string;
  readonly note: string;
};

export type PartnersContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
  readonly badge: string;
  readonly footnote: string;
  readonly cta: string;
  readonly items: readonly Partner[];
};

export function PartnersSection({
  content,
  locale,
}: {
  content: PartnersContent;
  locale: "ar" | "en";
}) {
  const isRtl = locale === "ar";

  return (
    <section className="partners-section mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" dir={isRtl ? "rtl" : "ltr"}>
      <div className="partners-shell">
        <div className="partners-shell-decor" aria-hidden="true" />
        <div className="partners-head">
          <div className={isRtl ? "reveal-slide-right" : "reveal-slide-left"}>
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="partners-title">{content.title}</h2>
            <p className="partners-text">{content.text}</p>
          </div>
          <div className="partners-badge reveal-elastic-pop" aria-hidden={false}>
            <span className="partners-badge-dot" />
            <span>{content.badge}</span>
          </div>
        </div>

        <div className="partners-grid">
          {content.items.map((partner, index) => (
            <div
              key={partner.name}
              className="partner-card reveal-slide-up"
              style={{
                "--delay": `${index * 40}ms`,
                "--partner-accent": partner.accent,
              } as React.CSSProperties}
            >
              <span className="partner-stripe" aria-hidden="true" />
              <span
                className="partner-mark"
                style={{ fontWeight: partner.weight as React.CSSProperties["fontWeight"] }}
              >
                {partner.name}
              </span>
              <span className="partner-note">{partner.note}</span>
            </div>
          ))}
        </div>

        <div className="partners-footer">
          <p className="partners-footnote">{content.footnote}</p>
          <Link className="btn btn-primary partners-cta" href={BOOKING_URL}>
            {content.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
