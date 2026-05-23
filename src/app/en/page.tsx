import Image from "next/image";
import Link from "next/link";
import { CtaBandEn, PageShellEn } from "@/components/site-en";
import { BOOKING_URL, heroImage, hotelsEn, offersEn, servicesEn, stayCategoriesEn } from "@/lib/content-en";

export default function EnglishHomePage() {
  return (
    <PageShellEn>
      <section className="hotel-hero relative overflow-hidden">
        <Image className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Red Sea coastline near Swiss Blue Hotels" fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,70,0.78),rgba(18,70,168,0.46)_48%,rgba(8,28,70,0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-10 text-white">
            <span className="hero-kicker">Swiss Blue Hotels</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.02] text-balance sm:text-[68px] lg:text-[82px]">
              Stay beautifully across Saudi Arabia.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-xl">
              Hotels, suites, and serviced apartments designed for business trips, family stays, city escapes, and longer visits in Jeddah, Jazan, and Riyadh.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>Book your stay</a>
              <Link className="btn btn-glass" href="/en/hotels">Explore hotels</Link>
            </div>
          </div>
          <div className="booking-bar">
            <div className="booking-field"><span>Destination</span><strong>Saudi Arabia</strong></div>
            <div className="booking-field"><span>Check-in</span><strong>19 May 2026</strong></div>
            <div className="booking-field"><span>Check-out</span><strong>20 May 2026</strong></div>
            <div className="booking-field"><span>Guests</span><strong>2 adults</strong></div>
            <a className="btn btn-primary min-h-[54px] justify-center" href={BOOKING_URL}>Check availability</a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[["6", "Properties"], ["282", "Rooms and apartments"], ["3", "Saudi city markets"], ["24h", "Guest support"]].map(([value, label]) => (
            <div className="stat-tile" key={label}><div className="font-mono text-3xl font-bold text-[var(--primary)]">{value}</div><div className="mt-1 text-sm font-semibold text-[var(--text-secondary)]">{label}</div></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">Featured hotels</span>
          <h2>Choose the stay that fits your journey.</h2>
          <p>A modern portfolio of hotel rooms, premium suites, and serviced apartments organized so guests can compare location, layout, and stay style with confidence.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotelsEn.slice(0, 3).map((hotel) => (
            <article className="property-card" key={hotel.slug}>
              <figure className="relative h-72 overflow-hidden"><Image className="object-cover transition duration-500 hover:scale-105" src={hotel.image} alt={hotel.title} fill sizes="(min-width: 1024px) 33vw, 100vw" /></figure>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]"><span>{hotel.city}</span><span>{hotel.units}</span></div>
                <h3 className="mt-4 text-2xl font-bold">{hotel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{hotel.summary}</p>
                <Link className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]" href={`/en/hotels/${hotel.slug}`}>View hotel</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div><span className="eyebrow text-white/72">The Swiss Blue difference</span><h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">Hospitality with the clarity of a modern hotel chain.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">{["Guest-friendly room categories", "Hotels and apartments in one portfolio", "Clear value steps from standard to premium", "Direct booking confidence"].map((item) => <div className="brand-point" key={item}>{item}</div>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading"><span className="eyebrow">Rooms, suites, apartments</span><h2>Every category has a clear promise.</h2><p>From efficient rooms to city-view apartments, the stay collection is built around space, view, duration, privacy, and trip purpose.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{stayCategoriesEn.slice(0, 3).map((stay) => <article className="stay-card" key={stay.title}><span>{stay.subtitle}</span><h3>{stay.title}</h3><p>{stay.text}</p></article>)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="feature-panel"><span className="eyebrow">Offers and occasions</span><h2>Book the stay around the reason for travel.</h2><p>Guide guests from intent to the right choice with offers for business, family, long stay, and weekend travel.</p><Link className="btn btn-primary mt-8" href="/en/offers">View offers</Link></div>
          <div className="grid gap-4 md:grid-cols-3">{offersEn.slice(0, 3).map((offer) => <article className="offer-card" key={offer.title}><h3>{offer.title}</h3><p>{offer.text}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div><span className="eyebrow">Services and amenities</span><h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">Comforts guests expect from a trusted hotel brand.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">Hotel essentials and serviced-apartment convenience for one night or many.</p></div>
        <div className="amenity-grid">{servicesEn.slice(0, 10).map((service) => <div className="amenity-pill" key={service}>{service}</div>)}</div>
      </section>

      <CtaBandEn />
    </PageShellEn>
  );
}
