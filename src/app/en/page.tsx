import Image from "next/image";
import Link from "next/link";
import { CtaBandEn, PageShellEn } from "@/components/site-en";
import {
  BOOKING_URL,
  accommodationCategoriesEn,
  destinationsEn,
  heroImage,
  hotelsEn,
  loyaltyProgramEn,
  offersEn,
  servicesEn,
} from "@/lib/content-en";

const highlightsEn = [
  { value: "6", label: "Hospitality properties" },
  { value: "282", label: "Rooms and apartments" },
  { value: "3", label: "Saudi cities" },
  { value: "24h", label: "Guest support" },
];

export default function EnglishHomePage() {
  return (
    <PageShellEn>
      <section className="hotel-hero relative overflow-hidden">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
          alt="Red Sea coastline near Swiss Blue Hotels"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,70,0.78),rgba(18,70,168,0.46)_48%,rgba(8,28,70,0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-10 text-white">
            <span className="hero-kicker">Hotels and apart-hotels in Saudi Arabia</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.02] text-balance sm:text-[68px] lg:text-[82px]">
              Swiss Blue, a clearer stay for every journey.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-xl">
              A hospitality portfolio of hotels, apart-hotels, and serviced
              apartments in Jeddah, Jazan, and Riyadh, designed for business,
              families, and monthly stays.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                Book your stay
              </a>
              <Link className="btn btn-glass" href="/en/hotels">
                Explore properties
              </Link>
            </div>
          </div>
          <div className="booking-bar">
            <div className="booking-field">
              <span>Destination</span>
              <strong>Jeddah, Riyadh, Jazan</strong>
            </div>
            <div className="booking-field">
              <span>Check-in</span>
              <strong>19 May 2026</strong>
            </div>
            <div className="booking-field">
              <span>Check-out</span>
              <strong>20 May 2026</strong>
            </div>
            <div className="booking-field">
              <span>Guests</span>
              <strong>2 adults</strong>
            </div>
            <a className="btn btn-primary min-h-[54px] justify-center" href={BOOKING_URL}>
              Check availability
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {highlightsEn.map((item) => (
            <div className="stat-tile" key={item.label}>
              <div className="font-mono text-3xl font-bold text-[var(--primary)]">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Hospitality properties</span>
          <h2>Six destinations, each with a clear reason to book.</h2>
          <p>
            Property cards help guests compare the city, stay type, and unit
            count before moving into the detailed property page.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotelsEn.map((hotel) => (
            <article className="property-card" key={hotel.slug}>
              <figure className="relative h-72 overflow-hidden">
                <Image
                  className="object-cover transition duration-500 hover:scale-105"
                  src={hotel.image}
                  alt={hotel.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]">
                  <span>{hotel.city}</span>
                  <span>{hotel.units}</span>
                </div>
                <p className="mt-3 text-xs font-bold text-[var(--text-tertiary)]">
                  {hotel.type}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{hotel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {hotel.summary}
                </p>
                <Link
                  className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]"
                  href={`/en/hotels/${hotel.slug}`}
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <span className="eyebrow text-white/72">{loyaltyProgramEn.subtitle}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              {loyaltyProgramEn.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">
              {loyaltyProgramEn.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {loyaltyProgramEn.benefits.map((benefit) => (
              <div className="brand-point" key={benefit}>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Destinations</span>
          <h2>Choose the city that fits your trip.</h2>
          <p>
            Swiss Blue is present in cities shaped by business, leisure, family
            visits, and longer stays.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {destinationsEn.map((destination) => (
            <article className="property-card" key={destination.title}>
              <figure className="relative h-64 overflow-hidden">
                <Image
                  className="object-cover"
                  src={destination.image}
                  alt={destination.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
              <div className="p-5">
                <h3 className="text-2xl font-bold">{destination.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
                <Link
                  className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]"
                  href="/en/destinations"
                >
                  Explore destination
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="feature-panel">
            <span className="eyebrow">Offers and occasions</span>
            <h2>Book the stay around the reason for travel.</h2>
            <p>
              Guide guests from travel intent to the right choice, from business
              trips to family apartment stays and monthly stays.
            </p>
            <Link className="btn btn-primary mt-8" href="/en/offers">
              View offers
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {offersEn.slice(0, 3).map((offer) => (
              <article className="offer-card" key={offer.title}>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            Everyday details that make the stay easier.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            Some services vary by property, but the experience is built around
            clear booking, daily hospitality, fast connectivity, and practical
            guest support.
          </p>
        </div>
        <div className="amenity-grid">
          {servicesEn.map((service) => (
            <div className="amenity-pill" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Stay categories</span>
          <h2>The difference between hotels, apart-hotels, and serviced apartments.</h2>
          <p>
            This comparison makes booking clearer for guests and helps
            companies and families choose the right category for trip purpose and
            stay length.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {accommodationCategoriesEn.map((category) => (
            <article className="stay-card" key={category.title}>
              <span>Stay category</span>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBandEn
        title="Find your next Swiss Blue stay."
        text="Compare hotels, apart-hotels, and serviced apartments, then move to direct booking in one step."
        cta="Book now"
      />
    </PageShellEn>
  );
}
