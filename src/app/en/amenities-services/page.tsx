import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { CategorizedAmenities } from "@/components/amenities-categorized";
import { rich } from "@/components/rich-text";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AmenitiesServicesPageEn() {
  const { en, hiddenSections } = await getEditableContent();
  const content = en.subpages.amenitiesServices;
  const services = en.homepage.services.items;

  return (
    <PageShellEn>
      {!isSectionHidden(hiddenSections, "amenitiesServicesPage") && (
        <>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">Our services</span>
          <h2>Every service sits in a clear family that supports the guest journey.</h2>
          <p>
            Instead of a long list of amenities, we organise services into easy
            categories that help guests and the reservations team see what
            actually matters — from connectivity and dining to business,
            wellness, and transport.
          </p>
        </div>
        <div className="mt-10">
          <CategorizedAmenities items={services} locale="en" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">{rich(content.standardsIntro.eyebrow)}</span>
          <h2>{rich(content.standardsIntro.title)}</h2>
          <p>{rich(content.standardsIntro.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.commitments.map((item, index) => (
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

      <CtaBandEn title="Book a stay with the essentials covered." cta="Book now" />
        </>
      )}
    </PageShellEn>
  );
}
