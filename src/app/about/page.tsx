import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage } from "@/lib/content";

const pillars = [
  "فئات إقامة واضحة",
  "مواقع قريبة من المدينة",
  "راحة لرجال الأعمال والعائلات",
  "مرونة الشقق الفندقية",
  "ثقة في الحجز المباشر",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="من نحن"
        title="محفظة ضيافة سعودية بخيارات واضحة."
        text="سويس بلو للفنادق هي محفظة ضيافة تقدم فنادق وشققا فندقية في وجهات حضرية رئيسية، للضيوف الذين يقدرون وضوح الاختيار والراحة العملية والخدمة الودية."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">فلسفة العلامة</span>
          <h2>إقامة مفهومة من أول لحظة.</h2>
          <p>
            تركز سويس بلو على تحويل خيارات الغرف والشقق إلى فئات سهلة الفهم
            والحجز، مع خدمات عملية تناسب رحلات العمل والعائلات والإقامات الطويلة.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div className="content-card" key={pillar}>
              {pillar}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="استكشف فنادقنا وشققنا الفندقية." cta="عرض الفنادق" />
    </PageShell>
  );
}
