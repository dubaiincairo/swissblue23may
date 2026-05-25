import { CtaBand, PageHero, PageShell } from "@/components/site";
import { faqs, heroImage } from "@/lib/content";

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="إجابات سريعة قبل الحجز."
        text="تعرف على أهم المعلومات حول أنواع الإقامة والحجز المباشر والخدمات والإقامات الطويلة وخيارات الشركات."
        image={heroImage}
      />
      <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="faq-heading">
          <span className="eyebrow">Swiss Blue FAQ</span>
          <h2>الأسئلة الأكثر شيوعا</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <strong aria-hidden="true">⌄</strong>
              </summary>
              <p>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand title="ما زلت تحتاج إلى مساعدة؟" cta="تواصل معنا" />
    </PageShell>
  );
}
