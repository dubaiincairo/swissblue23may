import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { rich } from "@/components/rich-text";
import { diningGalleryPhotosEn } from "@/lib/content-en";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function DiningPageEn() {
  const { en, hiddenSections } = await getEditableContent();
  const content = en.subpages.dining;

  return (
    <PageShellEn>
      {!isSectionHidden(hiddenSections, "diningPage") && (
      <>
      <PageHeroEn
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
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.options.map((item, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span>Food service</span>
              <h3>{rich(item.title)}</h3>
              <p>{rich(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">Dining gallery</span>
          <h2>A taste of the Swiss Blue dining mood.</h2>
          <p>
            Scenes from breakfast, restaurants, lobby cafés, and in-room dining
            across our properties — a quick way to set the right expectation
            before booking.
          </p>
        </div>
        <div className="mt-8">
          <PhotoGalleryLightbox images={[...diningGalleryPhotosEn]} locale="en" />
        </div>
      </section>

      <CtaBandEn eyebrow={en.closingCtas.eyebrow} title={en.closingCtas.pages.dining.title} text={en.closingCtas.defaultText} cta={en.closingCtas.pages.dining.cta} />
      </>
      )}
    </PageShellEn>
  );
}
