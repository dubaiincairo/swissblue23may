import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { BOOKING_URL, hotelsEn, roomClassificationsEn } from "@/lib/content-en";

export function generateStaticParams() {
  return hotelsEn.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = hotelsEn.find((item) => item.slug === slug);
  const classification = roomClassificationsEn.find(
    (item) => item.property === hotel?.title,
  );

  if (!hotel) {
    notFound();
  }

  return (
    <PageShellEn>
      <PageHeroEn
        eyebrow={`${hotel.city} | ${hotel.type}`}
        title={hotel.title}
        text={hotel.summary}
        image={hotel.image}
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="feature-panel">
          <span className="eyebrow">Property positioning</span>
          <h2>{hotel.title}</h2>
          <p>{hotel.positioning}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{hotel.units}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                Total inventory
              </div>
            </div>
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{hotel.city}</div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                City
              </div>
            </div>
          </div>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            Check availability
          </a>
        </div>

        <div className="grid gap-4">
          <div className="content-card">
            <span className="eyebrow">Location highlight</span>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              {hotel.locationHighlight}
            </p>
          </div>
          <div className="content-card">
            <span className="eyebrow">Nearby landmarks</span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {hotel.landmarks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Unit types</span>
          <h2>Clear stay categories with unit counts.</h2>
          <p>
            These categories help guests and booking managers choose the right
            layout by stay length, guest count, and purpose of travel.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(classification?.rows ?? hotel.unitTypes).map((unit) => (
            <article
              className="unit-card"
              key={"type" in unit ? `${unit.type}-${unit.rooms}` : unit.title}
            >
              <span>
                {"totalUnits" in unit ? `${unit.totalUnits} units` : unit.count}
              </span>
              <h3>{"type" in unit ? unit.type : unit.title}</h3>
              <p>
                {"type" in unit
                  ? `${unit.bedrooms} bedroom(s) | ${unit.bedConfig} | ${unit.view} | Rooms: ${unit.rooms}`
                  : unit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <span className="eyebrow">Amenities and services</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            What guests need inside this property.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            Each property page shows expected services so comparison between
            hotels and apartments stays clear.
          </p>
        </div>
        <div className="amenity-grid">
          {hotel.amenities.map((amenity) => (
            <div className="amenity-pill" key={amenity}>
              {amenity}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Photo gallery</span>
          <h2>A visual glimpse of the stay experience.</h2>
        </div>
        <div className="gallery-grid mt-8">
          {hotel.gallery.map((image, index) => (
            <figure className="relative overflow-hidden" key={`${image}-${index}`}>
              <Image
                className="object-cover"
                src={image}
                alt={`${hotel.title} image ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </figure>
          ))}
        </div>
      </section>

      <CtaBandEn title={`Book your stay at ${hotel.title}.`} cta="Check availability" />
    </PageShellEn>
  );
}
