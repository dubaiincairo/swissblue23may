import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { faqsEn, heroImage } from "@/lib/content-en";

export default function FaqPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="FAQ" title="Quick answers before you book." text="Find useful information about accommodation types, direct booking, services, long stays, and corporate options." image={heroImage} /><section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4">{faqsEn.map((faq) => <article className="content-card" key={faq.question}><h2 className="text-xl font-bold">{faq.question}</h2><p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{faq.answer}</p></article>)}</div></section><CtaBandEn title="Still need help?" cta="Contact us" /></PageShellEn>;
}
