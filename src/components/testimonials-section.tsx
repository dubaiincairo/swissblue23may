import Image from "next/image";
import { rich } from "@/components/rich-text";

export type Testimonial = {
  readonly name: string;
  readonly role: string;
  readonly image: string;
  readonly quote: string;
  readonly platform: string;
  readonly rating: number;
};

export type TestimonialsContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly text: string;
  readonly items: readonly Testimonial[];
};

const SOURCE_ACCENTS: Record<string, string> = {
  "Google Maps": "#1a73e8",
  "Google": "#1a73e8",
  "Booking.com": "#003580",
  "Booking": "#003580",
  "Agoda": "#5392ff",
  "Expedia": "#fcc60a",
  "TripAdvisor": "#00aa6c",
  "Trivago": "#e32212",
};

function accentFor(source: string) {
  return SOURCE_ACCENTS[source] ?? "var(--primary)";
}

function clampRating(rating: number) {
  if (Number.isFinite(rating)) {
    return Math.min(5, Math.max(0, Math.round(rating)));
  }
  return 5;
}

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function TestimonialsSection({
  content,
  locale,
}: {
  content: TestimonialsContent;
  locale: "ar" | "en";
}) {
  const isRtl = locale === "ar";

  if (!content?.items?.length) {
    return null;
  }

  return (
    <section
      className="testimonials-section section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="section-heading reveal-slide-left">
        <span className="eyebrow">{rich(content.eyebrow)}</span>
        <h2>{rich(content.title)}</h2>
        <p>{rich(content.text)}</p>
      </div>

      <div className="testimonials-grid">
        {content.items.map((item, index) => {
          const rating = clampRating(item.rating);
          const accent = accentFor(item.platform);

          return (
            <article
              key={`${item.name}-${index}`}
              className="testimonial-card reveal-slide-up"
              style={{
                "--delay": `${index * 90}ms`,
                "--testimonial-accent": accent,
              } as React.CSSProperties}
            >
              <div className="testimonial-quote-mark" aria-hidden="true">
                &ldquo;
              </div>

              <p className="testimonial-quote">{rich(item.quote)}</p>

              <div className="testimonial-meta">
                <div className="testimonial-avatar">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span aria-hidden="true">{initialsFor(item.name)}</span>
                  )}
                </div>
                <div className="testimonial-identity">
                  <strong>{rich(item.name)}</strong>
                  {item.role ? <span>{rich(item.role)}</span> : null}
                  <div
                    className="testimonial-rating"
                    aria-label={
                      isRtl
                        ? `${rating} من 5 نجوم`
                        : `${rating} out of 5 stars`
                    }
                  >
                    {Array.from({ length: 5 }, (_, starIndex) => (
                      <span
                        key={starIndex}
                        className={starIndex < rating ? "is-filled" : ""}
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="testimonial-source">
                <span className="testimonial-source-dot" aria-hidden="true" />
                <span>{rich(item.platform)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
