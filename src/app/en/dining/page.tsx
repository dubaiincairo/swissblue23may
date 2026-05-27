import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { diningOptionsEn, jeddahImage } from "@/lib/content-en";

export default function DiningPageEn() {
  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Dining and food services"
        title="Practical dining options throughout the stay."
        text="From breakfast to the cafe, restaurant, and room service, Swiss Blue offers convenient dining experiences for business guests, families, and longer-stay guests."
        image={jeddahImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">Dining experience</span>
          <h2>Every food service has a clear role in the guest journey.</h2>
          <p>
            Some services vary by property, but the content clarifies what to
            expect and makes the stay feel more complete and professional.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {diningOptionsEn.map((item, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <span>Food service</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBandEn title="Choose a stay that makes your day easier." cta="Book your stay" />
    </PageShellEn>
  );
}
