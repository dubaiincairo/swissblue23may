import { CtaBand, PageHero, PageShell } from "@/components/site";
import { FaqCategoryList } from "@/components/faq-accordion";
import { getEditableContent, isSectionHidden } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const { ar, hiddenSections } = await getEditableContent();
  const content = ar.subpages.faqPage;

  return (
    <PageShell>
      {!isSectionHidden(hiddenSections, "faqSubpage") && (
        <>
          <PageHero
            eyebrow={content.hero.eyebrow}
            title={content.hero.title}
            text={content.hero.text}
            image={content.hero.image}
          />
        </>
      )}
      {!isSectionHidden(hiddenSections, "faqCategories") && (
        <>
          <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" dir="rtl">
            <div className="faq-heading reveal-slide-up">
              <span className="eyebrow">أسئلة سويس بلو</span>
              <h2>الأسئلة الشائعة حسب التصنيف</h2>
            </div>
            <FaqCategoryList categories={ar.faq.categories} />
          </section>
          <CtaBand eyebrow={ar.closingCtas.eyebrow} title={ar.closingCtas.pages.faq.title} text={ar.closingCtas.defaultText} cta={ar.closingCtas.pages.faq.cta} />
        </>
      )}
    </PageShell>
  );
}
