import { notFound } from "next/navigation";
import { FaqAccordion } from "@/components/faq-accordion";
import PhotoGalleryLightbox from "@/components/photo-gallery-lightbox";
import PropertyMap from "@/components/property-map";
import { CtaBandEn, PageHeroEn, PageShellEn } from "@/components/site-en";
import { hotelsEn } from "@/lib/content-en";
import { getEditableContent, BOOKING_URL } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return hotelsEn.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelDetailPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { en } = await getEditableContent();
  const hotel = en.homepage.properties.items.find((item) => item.slug === slug);
  const classification = en.subpages.roomsSuites.classifications.find(
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
        <div className="feature-panel reveal-scale-up">
          <span className="eyebrow">Property positioning</span>
          <h2>{hotel.title}</h2>
          <p>{hotel.positioning}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{hotel.units}</div>
              <div className="stat-tile-label mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                Total inventory
              </div>
            </div>
            <div className="stat-tile">
              <div className="text-2xl font-bold text-[var(--primary)]">{hotel.city}</div>
              <div className="stat-tile-label mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                City
              </div>
            </div>
          </div>
          <a className="btn btn-primary mt-8" href={BOOKING_URL}>
            Check availability
          </a>
        </div>

        <div className="grid gap-4">
          <div className="content-card reveal-slide-up" style={{ "--delay": "100ms" } as React.CSSProperties}>
            <span className="eyebrow">Location highlight</span>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              {hotel.locationHighlight}
            </p>
          </div>
          <div className="content-card reveal-slide-up" style={{ "--delay": "200ms" } as React.CSSProperties}>
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
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">Unit types</span>
          <h2>Clear stay categories with unit counts.</h2>
          <p>
            These categories help guests and booking managers choose the right
            layout by stay length, guest count, and purpose of travel.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(classification?.rows ?? hotel.unitTypes).map((unit, index) => (
            <article
              className="unit-card reveal-slide-up"
              key={"type" in unit ? `${unit.type}-${unit.rooms}` : unit.title}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
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
        <div className="reveal-slide-up">
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
          {hotel.amenities.map((amenity, index) => (
            <div
              className="amenity-pill reveal-elastic-pop"
              key={amenity}
              style={{ "--delay": `${index * 40}ms` } as React.CSSProperties}
            >
              {amenity}
            </div>
          ))}
        </div>
      </section>

      <PropertyMap city={hotel.city} locale="en" query={hotel.mapQuery} title={hotel.title} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-up">
          <span className="eyebrow">Photo gallery</span>
          <h2>A visual glimpse of the stay experience.</h2>
        </div>
        <div className="mt-8">
          <PhotoGalleryLightbox
            images={hotel.gallery.map((image, index) => ({
              image,
              title: `${hotel.title} image ${index + 1}`,
            }))}
            locale="en"
            variant="property"
          />
        </div>
      </section>

      <section className="faq-section mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading reveal-slide-up">
          <span className="eyebrow">Property FAQ</span>
          <h2>Important information about {hotel.title}.</h2>
        </div>
        <FaqAccordion items={en.faq.property} />
      </section>

      <CtaBandEn title={`Book your stay at ${hotel.title}.`} cta="Check availability" />
    </PageShellEn>
  );
}
