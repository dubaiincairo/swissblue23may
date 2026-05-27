import { CtaBand, PageHero, PageShell } from "@/components/site";
import { heroImage, loyaltyProgram } from "@/lib/content";

export default function LoyaltyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="برنامج الولاء"
        title="مزايا مباشرة لضيوف سويس بلو الدائمين."
        text="برنامج ولاء يربط الضيوف المتكررين بعروض الحجز المباشر، أولوية الترقية عند توفرها، ودعم أسرع من فريق الحجوزات."
        image={heroImage}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{loyaltyProgram.subtitle}</span>
          <h2>{loyaltyProgram.title}</h2>
          <p>{loyaltyProgram.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {loyaltyProgram.benefits.map((benefit, index) => (
            <article
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {benefit}
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="ابدأ من الحجز المباشر للحصول على مزايا أوضح." cta="تحقق من التوفر" />
    </PageShell>
  );
}
