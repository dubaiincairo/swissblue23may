import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, offers } from "@/lib/content";

const bookingBenefits = [
  "وضوح أكبر في الفئة والسعر قبل تأكيد الحجز",
  "دعم مباشر من فريق الحجوزات",
  "أولوية في تلبية طلبات الضيف حسب التوفر",
  "مسار مناسب للعائلات والإقامات الشهرية",
];

export default function OffersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="العروض والخصومات الخاصة"
        title="عروض مصممة حول سبب الإقامة."
        text="صفحة العروض تجمع الإقامة العائلية، الإقامة الشهرية، ومزايا الحجز المباشر بطريقة تسهل على الضيف اختيار العرض المناسب والتواصل بثقة."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">العروض الرئيسية</span>
          <h2>ثلاثة مسارات واضحة للضيف.</h2>
          <p>
            بدلا من عروض عامة، توضح الصفحة الاحتياج الفعلي: عائلة تحتاج مساحة،
            ضيف يحتاج إقامة شهرية، أو عميل يريد مزايا الحجز المباشر.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {offers.map((offer, index) => (
            <article
              className="offer-card reveal-slide-up"
              key={offer.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">مزايا الحجز المباشر</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            قيمة أوضح عندما تبدأ من قنوات سويس بلو.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            هذه المزايا تساعد الموقع على تحويل الزائر من التصفح إلى الحجز أو
            التواصل دون إرباك أو عروض غير واضحة.
          </p>
        </div>
        <div className="amenity-grid">
          {bookingBenefits.map((benefit, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={benefit}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {benefit}
            </div>
          ))}
        </div>
      </section>
      <CtaBand title="ابدأ من العرض المناسب لرحلتك." cta="عرض التوفر" />
    </PageShell>
  );
}
