import { rich } from "@/components/rich-text";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ServicedApartmentsPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.servicedApartments;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
      <CtaBandEn title="Explore serviced apartments and book direct." cta="Check availability" />
    </PageShellEn>
  );
}
