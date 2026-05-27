import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function LoyaltyPageEn() {
  const { en } = await getEditableContent();
  const pageContent = en.subpages.loyaltyPage;
  const loyaltyProgram = en.homepage.loyalty;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={pageContent.hero.eyebrow}
        title={pageContent.hero.title}
        text={pageContent.hero.text}
        image={pageContent.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{loyaltyProgram.subtitle}</span>
          <h2>{loyaltyProgram.title}</h2>
          <p>{loyaltyProgram.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {loyaltyProgram.benefits.map((benefit, index) => (
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
