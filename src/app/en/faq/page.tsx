import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { FaqCategoryList } from "@/components/faq-accordion";
import { heroImage } from "@/lib/content-en";
import { getEditableContent } from "@/lib/editable-content";

export default async function FaqPageEn() {
  const { en } = await getEditableContent();

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="FAQ"
        title="Quick answers before you book."
        text="Find useful information about accommodation types, direct booking, services, long stays, and corporate options."
        image={heroImage}
      />
      <section className="faq-section mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading">
          <span className="eyebrow">Swiss Blue FAQ</span>
          <h2>Frequently Asked Questions by Category</h2>
        </div>
        <FaqCategoryList categories={en.faq.categories} />
      </section>
      <CtaBandEn title="Still need help?" cta="Contact us" />
    </PageShellEn>
  );
}
