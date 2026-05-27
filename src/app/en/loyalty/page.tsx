import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage, loyaltyProgramEn } from "@/lib/content-en";

export default function LoyaltyPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Loyalty Program"
        title="Direct benefits for returning Swiss Blue guests."
        text="A loyalty program connecting repeat guests to direct-booking offers, upgrade priority when available, and faster reservations support."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{loyaltyProgramEn.subtitle}</span>
          <h2>{loyaltyProgramEn.title}</h2>
          <p>{loyaltyProgramEn.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {loyaltyProgramEn.benefits.map((benefit, index) => (
            <article
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {benefit}
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Start with direct booking for clearer benefits." cta="Check availability" />
    </PageShellEn>
  );
}
