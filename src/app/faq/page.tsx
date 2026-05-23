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
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4">
          {faqs.map((faq) => (
            <article className="content-card" key={faq.question}>
              <h2 className="text-xl font-bold">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="ما زلت تحتاج إلى مساعدة؟" cta="تواصل معنا" />
    </PageShell>
  );
}
