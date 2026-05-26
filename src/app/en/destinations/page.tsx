import Image from "next/image";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { heroImage } from "@/lib/content-en";
import { getEditableContent } from "@/lib/editable-content";

export default async function DestinationsPageEn() {
  const { en } = await getEditableContent();
  const destinationsEn = en.homepage.destinations.items;

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow="Destinations"
        title="Jeddah, Riyadh, and Jazan in one hospitality experience."
        text="Learn about each city, the best ways to enjoy it, and the stay type that fits your trip, whether for business, family, or long-stay travel."
        image={heroImage}
      />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {destinationsEn.map((destination) => (
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
                <span className="eyebrow">Swiss Blue destination</span>
                <h2 className="mt-4 text-3xl font-bold">{destination.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
                <div className="mt-6">
                  <h3 className="text-lg font-bold">How to enjoy the city?</h3>
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
      <CtaBandEn title="Choose the city closest to your trip." cta="Book now" />
    </PageShellEn>
  );
}
