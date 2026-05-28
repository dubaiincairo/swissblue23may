import Image from "next/image";
import Link from "next/link";
import { AnimatedCounter } from "@/components/animated-counter";
import { FaqAccordion } from "@/components/faq-accordion";
import HeroMediaCarousel from "@/components/hero-media-carousel";
import { SiteFooter, SiteHeader } from "@/components/site";
import HomepageGallery from "@/components/homepage-gallery";
import { PartnersSection } from "@/components/partners-section";
import { ServiceTiles } from "@/components/service-tiles";
import { BOOKING_URL, getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { ar } = await getEditableContent();
  const home = ar.homepage;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]" dir="rtl">
      <SiteHeader />

      <section id="top" className="hotel-hero relative overflow-hidden">
        <HeroMediaCarousel
          slides={ar.media.mainHeroSlides}
          fallbackImage={ar.media.mainHero}
          fallbackAlt="إطلالة ساحلية على البحر الأحمر بالقرب من وجهات سويس بلو"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.86),rgba(18,70,168,0.58)_48%,rgba(8,28,70,0.12))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />

        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-between gap-10 px-4 pb-8 pt-20 sm:px-6 lg:min-h-[100svh] lg:px-8">
          <div className="max-w-3xl pt-10 text-white">
            <span className="hero-kicker reveal-slide-down">{home.hero.eyebrow}</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.12] text-balance sm:text-[64px] lg:text-[76px] reveal-slide-up">
              {home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/84 sm:text-xl reveal-slide-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
              {home.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 reveal-slide-up" style={{ "--delay": "300ms" } as React.CSSProperties}>
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                {home.hero.primaryCta}
              </a>
              <Link className="btn btn-glass" href={home.hero.secondaryHref}>
                {home.hero.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="booking-bar reveal-scale-up" style={{ "--delay": "450ms" } as React.CSSProperties}>
            <div className="booking-field">
              <span>الوجهة</span>
              <strong>{home.hero.destination}</strong>
            </div>
            <div className="booking-field">
              <span>تاريخ الوصول</span>
              <strong>19 مايو 2026</strong>
            </div>
            <div className="booking-field">
              <span>تاريخ المغادرة</span>
              <strong>20 مايو 2026</strong>
            </div>
            <div className="booking-field">
              <span>الضيوف</span>
              <strong>بالغان</strong>
            </div>
            <a className="btn btn-primary min-h-[54px] justify-center" href={BOOKING_URL}>
              تحقق من التوفر
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
                <span>{item.label}</span>
              </div>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-right">
          <span className="eyebrow">{home.properties.eyebrow}</span>
          <h2>{home.properties.title}</h2>
          <p>{home.properties.text}</p>
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
                  href={`/hotels/${hotel.slug}`}
                >
                  عرض التفاصيل
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div className="reveal-slide-right">
            <span className="eyebrow text-white/72">{home.loyalty.subtitle}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              {home.loyalty.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">
              {home.loyalty.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {home.loyalty.benefits.map((benefit, index) => (
              <div
                className="brand-point reveal-elastic-pop"
                key={benefit}
                style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageGallery images={ar.media.gallery} locale="ar" />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-right">
          <span className="eyebrow">{home.destinations.eyebrow}</span>
          <h2>{home.destinations.title}</h2>
          <p>{home.destinations.text}</p>
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
                <h3 className="text-2xl font-bold">{destination.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {destination.text}
                </p>
                <Link
                  className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]"
                  href="/destinations"
                >
                  اكتشف الوجهة
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="feature-panel reveal-slide-right">
            <span className="eyebrow">{home.offers.eyebrow}</span>
            <h2>{home.offers.title}</h2>
            <p>{home.offers.text}</p>
            <Link className="btn btn-primary mt-8" href={home.offers.href}>
              {home.offers.cta}
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {home.offers.items.map((offer, index) => (
              <article
                className="offer-card reveal-slide-left"
                key={offer.title}
                style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div className="reveal-slide-right">
          <span className="eyebrow">{home.services.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            {home.services.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            {home.services.text}
          </p>
        </div>
        <ServiceTiles items={home.services.items} locale="ar" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading reveal-slide-right">
          <span className="eyebrow">{home.categories.eyebrow}</span>
          <h2>{home.categories.title}</h2>
          <p>{home.categories.text}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {home.categories.items.map((category, index) => (
            <article
              className="stay-card reveal-slide-up"
              key={category.title}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <span>فئة إقامة</span>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <PartnersSection content={home.partners} locale="ar" />

      <section className="faq-section mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8" dir="rtl">
        <div className="faq-heading reveal-slide-right">
          <span className="eyebrow">الأسئلة الشائعة</span>
          <h2>إجابات مختصرة قبل الحجز.</h2>
        </div>
        <FaqAccordion items={ar.faq.homepage} />
      </section>

      <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14 reveal-scale-up">
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

      <SiteFooter />
    </main>
  );
}
