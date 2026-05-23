import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, offers } from "@/lib/content";

export default function OffersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="العروض"
        title="عروض تناسب كل طريقة سفر."
        text="اكتشف عروض الحجز المباشر المصممة حول احتياجات الضيوف الفعلية، من رحلات العمل والإقامات العائلية إلى الإقامات الطويلة وعطلات نهاية الأسبوع."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {offers.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="ابدأ من العرض المناسب لرحلتك." cta="عرض التوفر" />
    </PageShell>
  );
}
