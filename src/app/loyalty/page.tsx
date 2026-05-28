import { rich } from "@/components/rich-text";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function LoyaltyPage() {
  const { ar } = await getEditableContent();
  const pageContent = ar.subpages.loyaltyPage;
  const loyaltyProgram = ar.homepage.loyalty;

  return (
    <PageShell>
      <PageHero
        eyebrow={pageContent.hero.eyebrow}
        title={pageContent.hero.title}
        text={pageContent.hero.text}
        image={pageContent.hero.image}
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">{rich(loyaltyProgram.subtitle)}</span>
          <h2>{rich(loyaltyProgram.title)}</h2>
          <p>{rich(loyaltyProgram.description)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {loyaltyProgram.benefits.map((benefit, index) => (
            <article
              className="content-card reveal-slide-up"
              key={benefit}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              {rich(benefit)}
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="ابدأ من الحجز المباشر للحصول على مزايا أوضح." cta="تحقق من التوفر" />
    </PageShell>
  );
}
