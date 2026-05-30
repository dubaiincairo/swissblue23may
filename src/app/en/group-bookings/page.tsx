import { rich } from "@/components/rich-text";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { FeatureChipGrid } from "@/components/feature-chip";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function GroupBookingsPageEn() {
  const { en, hiddenSections } = await getEditableContent();
  const content = en.subpages.groupBookings;

  return (
    <PageShellEn>
      {!isSectionHidden(hiddenSections, "groupBookingsPage") && (
      <>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(item)}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.eligibility.eyebrow)}</span>
          <h2>{rich(content.eligibility.title)}</h2>
          <p>{rich(content.eligibility.text)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.processIntro.eyebrow)}</span>
          <h2>{rich(content.processIntro.title)}</h2>
          <p>{rich(content.processIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.process.map((step, index) => (
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

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.inclusionsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.inclusionsIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.inclusionsIntro.text)}
          </p>
        </div>
        <FeatureChipGrid items={content.inclusions} variant="check" columns={2} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.idealForIntro.eyebrow)}</span>
          <h2>{rich(content.idealForIntro.title)}</h2>
          <p>{rich(content.idealForIntro.text)}</p>
        </div>
        <div className="mt-8">
          <FeatureChipGrid items={content.idealFor} variant="sparkle" columns={2} />
        </div>
      </section>

      <CtaBandEn eyebrow={en.closingCtas.eyebrow} title={en.closingCtas.pages.groupBookings.title} text={en.closingCtas.defaultText} cta={en.closingCtas.pages.groupBookings.cta} />
      </>
      )}
    </PageShellEn>
  );
}
