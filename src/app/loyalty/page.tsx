import { rich } from "@/components/rich-text";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function LoyaltyPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const pageContent = ar.subpages.loyaltyPage;
  const loyaltyProgram = ar.homepage.loyalty;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "loyaltySubpage") && (
      <>
      <PageHero
        eyebrow={pageContent.hero.eyebrow}
        title={pageContent.hero.title}
        text={pageContent.hero.text}
        image={pageContent.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(loyaltyProgram.subtitle)}</span>
          <h2>{rich(loyaltyProgram.title)}</h2>
          <p>{rich(loyaltyProgram.description)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {loyaltyProgram.benefits.map((benefit, index) => (
            <article
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(benefit)}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(pageContent.tiersIntro.eyebrow)}</span>
          <h2>{rich(pageContent.tiersIntro.title)}</h2>
          <p>{rich(pageContent.tiersIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageContent.tiers.map((tier, index) => (
            <article
              className="content-card reveal-slide-up"
              key={tier.name}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <h3 className="text-2xl font-bold text-[var(--primary)]">{rich(tier.name)}</h3>
              <span className="mt-1 block text-xs font-bold text-[var(--text-secondary)]">
                {rich(tier.threshold)}
              </span>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
                {tier.perks.map((perk) => (
                  <li key={perk}>• {rich(perk)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        {[pageContent.earn, pageContent.redeem].map((block) => (
          <div className="feature-panel reveal-slide-up" key={block.title}>
            <span className="eyebrow">{rich(block.eyebrow)}</span>
            <h2>{rich(block.title)}</h2>
            <ul className="mt-4 grid gap-2 text-sm leading-7 text-[var(--text-secondary)]">
              {block.items.map((item) => (
                <li key={item}>• {rich(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(pageContent.howItWorksIntro.eyebrow)}</span>
          <h2>{rich(pageContent.howItWorksIntro.title)}</h2>
          <p>{rich(pageContent.howItWorksIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pageContent.howItWorks.map((step, index) => (
            <article
              className="content-card reveal-slide-up"
              key={step.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="text-3xl font-bold text-[var(--primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg font-bold">{rich(step.title)}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(step.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="ابدأ من الحجز المباشر للحصول على مزايا أوضح." cta="تحقق من التوفر" />
      </>
      )}
    </PageShell>
  );
}
