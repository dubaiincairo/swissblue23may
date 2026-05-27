import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { FaqCategoryList } from "@/components/faq-accordion";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function FaqPageEn() {
  const { en } = await getEditableContent();
  const content = en.subpages.faqPage;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        text={content.hero.text}
        image={content.hero.image}
      />
      <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading reveal-slide-up">
          <span className="eyebrow">Swiss Blue FAQ</span>
          <h2>Frequently Asked Questions by Category</h2>
        </div>
        <FaqCategoryList categories={en.faq.categories} />
      </section>
      <CtaBandEn title="Still need help?" cta="Contact us" />
    </PageShellEn>
  );
}
