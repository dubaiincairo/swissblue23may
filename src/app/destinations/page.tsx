import Image from "next/image";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { destinations, heroImage } from "@/lib/content";

export default function DestinationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الوجهات"
        title="جدة، الرياض، وجازان ضمن تجربة واحدة."
        text="تعرف على طبيعة كل مدينة، أفضل طرق الاستمتاع بها، ونوع الإقامة الأنسب لرحلتك سواء كانت للأعمال أو العائلة أو الإقامة الطويلة."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {destinations.map((destination) => (
            <article
              className="property-card grid overflow-hidden lg:grid-cols-[0.86fr_1.14fr]"
              key={destination.title}
            >
              <figure className="relative min-h-[320px] overflow-hidden">
                <Image
                  className="object-cover transition duration-500 hover:scale-105"
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </figure>
              <div className="p-6 lg:p-8">
                <span className="eyebrow">وجهة سويس بلو</span>
                <h2 className="mt-4 text-3xl font-bold">{destination.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-bold">كيف تستمتع بالمدينة؟</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {destination.howToEnjoy.map((item) => (
                      <li className="amenity-pill" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اختر المدينة الأقرب لرحلتك." cta="احجز الآن" />
    </PageShell>
  );
}
