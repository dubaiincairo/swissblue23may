import { CtaBand, PageHero, PageShell } from "@/components/site";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.about;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "aboutPage") && (
        <>
          <PageHero
            eyebrow={content.hero.eyebrow}
            title={content.hero.title}
            text={content.hero.text}
            image={content.hero.image}
          />
          <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="feature-panel reveal-slide-right">
              <span className="eyebrow">{rich(content.philosophy.eyebrow)}</span>
              <h2>{rich(content.philosophy.title)}</h2>
              <p>{rich(content.philosophy.text)}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.pillars.map((pillar, index) => (
                <div
                  className="content-card reveal-slide-up"
                  key={pillar}
                  style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  {rich(pillar)}
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat, index) => (
                <div
                  className="content-card reveal-scale-up text-center"
                  key={stat.label}
                  style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <strong className="block text-4xl font-bold text-[var(--primary)]">
                    {rich(stat.value)}
                  </strong>
                  <span className="mt-2 block text-sm text-[var(--text-secondary)]">
                    {rich(stat.label)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="feature-panel reveal-slide-up">
              <span className="eyebrow">{rich(content.story.eyebrow)}</span>
              <h2>{rich(content.story.title)}</h2>
              {content.story.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-8 text-[var(--text-secondary)]">
                  {rich(paragraph)}
                </p>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="section-heading reveal-slide-up">
              <span className="eyebrow">{rich(content.valuesIntro.eyebrow)}</span>
              <h2>{rich(content.valuesIntro.title)}</h2>
              <p>{rich(content.valuesIntro.text)}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {content.values.map((value, index) => (
                <article
                  className="content-card reveal-slide-up"
                  key={value.title}
                  style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <span className="eyebrow">{rich(value.title)}</span>
                  <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                    {rich(value.text)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.about.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.about.cta} />
        </>
      )}
    </PageShell>
  );
}
