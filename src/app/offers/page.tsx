import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FeatureChipGrid } from "@/components/feature-chip";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.offersPage;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "offersSubpage") && (
      <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {content.offers.map((offer, index) => (
            <article
              className="offer-card reveal-slide-up"
              key={offer.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <h3>{rich(offer.title)}</h3>
              <p>{rich(offer.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.benefitsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            {rich(content.benefitsIntro.title)}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.benefitsIntro.text)}
          </p>
        </div>
        <FeatureChipGrid items={content.benefits} variant="sparkle" columns={2} />
      </section>
      <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.offers.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.offers.cta} />
      </>
      )}
    </PageShell>
  );
}
