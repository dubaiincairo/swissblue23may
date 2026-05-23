import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { apartmentBenefitsEn, jeddahImage } from "@/lib/content-en";

export default function ServicedApartmentsPageEn() {
  return <PageShellEn><PageHeroEn eyebrow="Serviced apartments" title="Serviced apartments for longer, easier stays." text="Swiss Blue serviced apartments are ideal for families, business relocation, extended city visits, and guests who prefer more space with hotel support." image={jeddahImage} /><section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{apartmentBenefitsEn.map((benefit) => <div className="content-card" key={benefit}>{benefit}</div>)}</div></section><CtaBandEn title="Explore serviced apartments and book direct." cta="Check availability" /></PageShellEn>;
}
