import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { rich } from "@/components/rich-text";
import { diningGalleryPhotos } from "@/lib/content";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function DiningPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.dining;

  return (
    <PageShell>
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
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.options.map((item, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span>خدمة طعام</span>
              <h3>{rich(item.title)}</h3>
              <p>{rich(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">معرض الطعام</span>
          <h2>أجواء الطعام في فنادق سويس بلو.</h2>
          <p>
            صور توضح طبيعة الإفطار والمطعم والمقهى وخدمة الغرف عبر منشآتنا،
            لتكوين توقعات واقعية قبل الحجز.
          </p>
        </div>
        <div className="mt-8">
          <PhotoGalleryLightbox images={[...diningGalleryPhotos]} locale="ar" />
        </div>
      </section>

      <CtaBand title="اختر إقامة تجعل يومك أسهل." cta="احجز إقامتك" />
    </PageShell>
  );
}
