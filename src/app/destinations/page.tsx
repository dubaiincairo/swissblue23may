import Image from "next/image";
import { CtaBand, PageHero, PageShell } from "@/components/site";
import { destinations, heroImage } from "@/lib/content";

export default function DestinationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="الوجهات"
        title="أقم في وجهات المملكة."
        text="تربط سويس بلو ضيوفها بإقامات عملية ومريحة في عدد من أكثر مدن المملكة نشاطا، مع حضور في جدة وجازان والرياض."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article className="property-card" key={destination.title}>
              <figure className="relative h-72 overflow-hidden">
                <Image
                  className="object-cover transition duration-500 hover:scale-105"
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
              <div className="p-5">
                <h2 className="text-2xl font-bold">{destination.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="اختر المدينة الأقرب لرحلتك." cta="احجز الآن" />
    </PageShell>
  );
}
