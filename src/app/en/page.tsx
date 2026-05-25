import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageShellEn } from "@/components/site-en";
import HomepageGallery from "@/components/homepage-gallery";
import { BOOKING_URL, getEditableContent, heroImage } from "@/lib/editable-content";
import { homepageFaqsEn } from "@/lib/faq-content-en";

export const dynamic = "force-dynamic";

export default async function EnglishHomePage() {
  const { en } = await getEditableContent();
  const home = en.homepage;

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
            <span className="hero-kicker">{home.hero.eyebrow}</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.02] text-balance sm:text-[68px] lg:text-[82px]">
              {home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-xl">
              {home.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                {home.hero.primaryCta}
              </a>
              <Link className="btn btn-glass" href={home.hero.secondaryHref}>
                {home.hero.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="booking-bar">
            <div className="booking-field">
              <span>Destination</span>
              <strong>{home.hero.destination}</strong>
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
          {home.highlights.map((item) => (
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
          <span className="eyebrow">{home.properties.eyebrow}</span>
          <h2>{home.properties.title}</h2>
          <p>{home.properties.text}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {home.properties.items.map((hotel) => (
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
            <span className="eyebrow text-white/72">{home.loyalty.subtitle}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              {home.loyalty.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">
              {home.loyalty.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {home.loyalty.benefits.map((benefit) => (
              <div className="brand-point" key={benefit}>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageGallery locale="en" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">{home.destinations.eyebrow}</span>
          <h2>{home.destinations.title}</h2>
          <p>{home.destinations.text}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {home.destinations.items.map((destination) => (
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
            <span className="eyebrow">{home.offers.eyebrow}</span>
            <h2>{home.offers.title}</h2>
            <p>{home.offers.text}</p>
            <Link className="btn btn-primary mt-8" href={home.offers.href}>
              {home.offers.cta}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.offers.items.map((offer) => (
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
          <span className="eyebrow">{home.services.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            {home.services.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            {home.services.text}
          </p>
        </div>
        <div className="amenity-grid">
          {home.services.items.map((service) => (
            <div className="amenity-pill" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">{home.categories.eyebrow}</span>
          <h2>{home.categories.title}</h2>
          <p>{home.categories.text}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {home.categories.items.map((category) => (
            <article className="stay-card" key={category.title}>
              <span>Stay category</span>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading">
          <span className="eyebrow">FAQ</span>
          <h2>Quick answers before you book.</h2>
        </div>
        <FaqAccordion items={homepageFaqsEn} />
      </section>

      <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" dir="ltr">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="relative max-w-3xl">
            <span className="eyebrow text-white/72">{home.cta.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[52px]">
              {home.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              {home.cta.text}
            </p>
            <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
              {home.cta.button}
            </a>
          </div>
        </div>
      </section>
    </PageShellEn>
  );
}
