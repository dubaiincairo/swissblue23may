import { CtaBand, PageHero, PageShell } from "@/components/site";
import { rich } from "@/components/rich-text";
import CareersOpenings from "@/components/careers-openings";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.careersPage;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "careersSubpage") && (
        <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.intro.eyebrow)}</span>
          <h2>{rich(content.intro.title)}</h2>
          <p>{rich(content.intro.text)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {content.whyJoin.map((item, index) => (
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.departmentsIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.departmentsIntro.title)}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.departmentsIntro.text)}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.departments.map((dept, index) => (
            <article
              className="content-card reveal-slide-up"
              key={dept.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{rich(dept.title)}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {rich(dept.text)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CareersOpenings locale="ar" />

      <CtaBand title="ابحث عن دورك القادم في سويس بلو." cta="أرسل سيرتك الذاتية" />
        </>
      )}
    </PageShell>
  );
}
