import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/components/animated-counter";
import { FaqAccordion } from "@/components/faq-accordion";
import HeroMediaCarousel from "@/components/hero-media-carousel";
import { PageShellEn } from "@/components/site-en";
import HomepageGallery from "@/components/homepage-gallery";
import { PartnersSection } from "@/components/partners-section";
import { rich } from "@/components/rich-text";
import { ServiceTiles } from "@/components/service-tiles";
import { BOOKING_URL, getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function EnglishHomePage() {
  const { en } = await getEditableContent();
  const home = en.homepage;

  return (
    <PageShellEn>
      <section className="hotel-hero relative overflow-hidden">
        <HeroMediaCarousel
          slides={en.media.mainHeroSlides}
          fallbackImage={en.media.mainHero}
          fallbackAlt="Red Sea coastline near Swiss Blue Hotels"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,70,0.78),rgba(18,70,168,0.46)_48%,rgba(8,28,70,0.1))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between gap-10 px-4 pb-8 pt-20 sm:px-6 lg:min-h-[100svh] lg:px-8">
          <div className="max-w-3xl pt-3 text-white">
            <span className="hero-kicker reveal-slide-down">{rich(home.hero.eyebrow)}</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.02] text-balance sm:text-[68px] lg:text-[82px] reveal-slide-up">
              {rich(home.hero.title)}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-xl reveal-slide-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
              {rich(home.hero.text)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 reveal-slide-up" style={{ "--delay": "300ms" } as React.CSSProperties}>
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                {rich(home.hero.primaryCta)}
              </a>
              <Link className="btn btn-glass" href={home.hero.secondaryHref}>
                {rich(home.hero.secondaryCta)}
              </Link>
            </div>
          </div>
          <div className="booking-bar reveal-scale-up" style={{ "--delay": "450ms" } as React.CSSProperties}>
            <div className="booking-field">
              <span>Destination</span>
              <strong>{rich(home.hero.destination)}</strong>
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
        <div className="insight-grid">
          {home.highlights.map((item, index) => (
            <article
              className="insight-card reveal-slide-up"
              key={item.label}
              style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
            >
              <div>
                <strong>
                  <AnimatedCounter value={item.value} />
                </strong>
                <span>{rich(item.label)}</span>
              </div>
              <p>{rich(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">{rich(home.properties.eyebrow)}</span>
          <h2>{rich(home.properties.title)}</h2>
          <p>{rich(home.properties.text)}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {home.properties.items.map((hotel, index) => (
            <article
              className="property-card reveal-slide-up"
              key={hotel.slug}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <figure className="relative h-72 overflow-hidden">
                <Image
                  className="object-cover"
                  src={hotel.image}
                  alt={hotel.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4 text-xs font-bold text-[var(--primary)]">
                  <span>{rich(hotel.city)}</span>
                  <span>{rich(hotel.units)}</span>
                </div>
                <p className="mt-3 text-xs font-bold text-[var(--text-tertiary)]">
                  {rich(hotel.type)}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{rich(hotel.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {rich(hotel.summary)}
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
          <div className="reveal-slide-left">
            <span className="eyebrow text-white/72">{rich(home.loyalty.subtitle)}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              {rich(home.loyalty.title)}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">
              {rich(home.loyalty.description)}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {home.loyalty.benefits.map((benefit, index) => (
              <div
                className="brand-point reveal-elastic-pop"
                key={benefit}
                style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
              >
                {rich(benefit)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageGallery images={en.media.gallery} locale="en" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">{rich(home.destinations.eyebrow)}</span>
          <h2>{rich(home.destinations.title)}</h2>
          <p>{rich(home.destinations.text)}</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {home.destinations.items.map((destination, index) => (
            <article
              className="property-card reveal-slide-up"
              key={destination.title}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
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
                <h3 className="text-2xl font-bold">{rich(destination.title)}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {rich(destination.text)}
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
          <div className="feature-panel reveal-slide-left">
            <span className="eyebrow">{rich(home.offers.eyebrow)}</span>
            <h2>{rich(home.offers.title)}</h2>
            <p>{rich(home.offers.text)}</p>
            <Link className="btn btn-primary mt-8" href={home.offers.href}>
              {rich(home.offers.cta)}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.offers.items.map((offer, index) => (
              <article
                className="offer-card reveal-slide-right"
                key={offer.title}
                style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <h3>{rich(offer.title)}</h3>
                <p>{rich(offer.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div className="reveal-slide-left">
          <span className="eyebrow">{rich(home.services.eyebrow)}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            {rich(home.services.title)}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            {rich(home.services.text)}
          </p>
        </div>
        <ServiceTiles items={home.services.items} locale="en" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-left">
          <span className="eyebrow">{rich(home.categories.eyebrow)}</span>
          <h2>{rich(home.categories.title)}</h2>
          <p>{rich(home.categories.text)}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {home.categories.items.map((category, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={category.title}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <span>Stay category</span>
              <h3>{rich(category.title)}</h3>
              <p>{rich(category.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnersSection content={home.partners} locale="en" />

      <section className="faq-section mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" dir="ltr">
        <div className="faq-heading reveal-slide-left">
          <span className="eyebrow">FAQ</span>
          <h2>Quick answers before you book.</h2>
        </div>
        <FaqAccordion items={en.faq.homepage} />
      </section>

      <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" dir="ltr">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14 reveal-scale-up">
          <div className="relative max-w-3xl">
            <span className="eyebrow text-white/72">{rich(home.cta.eyebrow)}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[52px]">
              {rich(home.cta.title)}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              {rich(home.cta.text)}
            </p>
            <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
              {rich(home.cta.button)}
            </a>
          </div>
        </div>
      </section>
    </PageShellEn>
  );
}
