import { CtaBand, PageHero, PageShell } from "@/components/site";
import CorporateDealForm from "@/components/corporate-deal-form";
import { FeatureChipGrid } from "@/components/feature-chip";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function CorporateDealsPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.meetingsEvents;
  const heroContent = ar.subpages.corporateDealsPage.hero;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "corporateDealsSubpage") && (
      <>
      <PageHero
        eyebrow={heroContent.eyebrow}
        title={heroContent.title}
        text={heroContent.text}
        image={heroContent.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.deals.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{rich(item.title)}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(item.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.documentsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.documentsIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.documentsIntro.text)}
          </p>
        </div>
        <FeatureChipGrid items={content.documents} variant="check" columns={2} />
      </section>
      <CorporateDealForm locale="ar" content={ar.subpages.corporateDealsPage.requestForm} />
      <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.corporateDeals.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.corporateDeals.cta} />
      </>
      )}
    </PageShell>
  );
}
