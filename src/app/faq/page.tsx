import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FaqCategoryList } from "@/components/faq-accordion";
import { heroImage } from "@/lib/content";
import { getEditableContent } from "@/lib/editable-content";

export default async function FaqPage() {
  const { ar } = await getEditableContent();

  return (
    <PageShell>
      <PageHero
        eyebrow="الأسئلة الشائعة"
        title="إجابات سريعة قبل الحجز."
        text="تعرف على أهم المعلومات حول أنواع الإقامة والحجز المباشر والخدمات والإقامات الطويلة وخيارات الشركات."
        image={heroImage}
      />
      <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" dir="rtl">
        <div className="faq-heading reveal-slide-up">
          <span className="eyebrow">أسئلة سويس بلو</span>
          <h2>الأسئلة الشائعة حسب التصنيف</h2>
        </div>
        <FaqCategoryList categories={ar.faq.categories} />
      </section>
      <CtaBand title="ما زلت تحتاج إلى مساعدة؟" cta="تواصل معنا" />
    </PageShell>
  );
}
