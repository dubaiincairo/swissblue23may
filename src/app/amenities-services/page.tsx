import { CtaBand, PageHero, PageShell } from "@/components/site";
import { CategorizedAmenities } from "@/components/amenities-categorized";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AmenitiesServicesPage() {
  const { ar } = await getEditableContent();
  const content = ar.subpages.amenitiesServices;
  const services = ar.homepage.services.items;

  return (
    <PageShell>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-right">
          <span className="eyebrow">خدماتنا</span>
          <h2>كل خدمة تنتمي إلى عائلة واضحة تخدم رحلة الضيف.</h2>
          <p>
            بدلا من قائمة طويلة من المرافق، رتبنا الخدمات في فئات سهلة الفهم
            تساعد الضيف وفريق الحجز على رؤية ما يهمه فعلا، من الاتصال والطعام
            إلى الأعمال والعافية والتنقل.
          </p>
        </div>
        <div className="mt-10">
          <CategorizedAmenities items={services} locale="ar" />
        </div>
      </section>
      <CtaBand title="احجز إقامة مدعومة بكل أساسيات الراحة." cta="احجز الآن" />
    </PageShell>
  );
}
