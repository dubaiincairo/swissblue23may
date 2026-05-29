import Link from "next/link";
import { rich } from "@/components/rich-text";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FeatureChipGrid } from "@/components/feature-chip";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ServicedApartmentsPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.servicedApartments;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "servicedApartmentsPage") && (
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
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.benefits.map((benefit, index) => (
            <div
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(benefit)}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{rich(content.includedIntro.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {rich(content.includedIntro.title)}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
            {rich(content.includedIntro.text)}
          </p>
        </div>
        <FeatureChipGrid items={content.included} variant="check" columns={2} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.propertiesIntro.eyebrow)}</span>
          <h2>{rich(content.propertiesIntro.title)}</h2>
          <p>{rich(content.propertiesIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.properties.map((property, index) => (
            <article
              className="content-card reveal-slide-up"
              key={property.slug}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]">
                <span>{rich(property.city)}</span>
                <span>{rich(property.units)}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold">{rich(property.name)}</h3>
              <Link
                className="mt-5 inline-flex text-sm font-bold text-[var(--primary)]"
                href={`/hotels/${property.slug}`}
              >
                عرض التفاصيل
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.idealForIntro.eyebrow)}</span>
          <h2>{rich(content.idealForIntro.title)}</h2>
          <p>{rich(content.idealForIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.idealFor.map((item, index) => (
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

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(content.longStay.eyebrow)}</span>
          <h2>{rich(content.longStay.title)}</h2>
          <p>{rich(content.longStay.text)}</p>
        </div>
      </section>

      <CtaBand title="استكشف الشقق الفندقية واحجز مباشرة." cta="استعرض التوفر" />
        </>
      )}
    </PageShell>
  );
}
