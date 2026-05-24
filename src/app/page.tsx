import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";
import {
  BOOKING_URL,
  accommodationCategories,
  destinations,
  heroImage,
  hotels,
  loyaltyProgram,
  services,
} from "@/lib/content";

const highlights = [
  { value: "6", label: "وجهات فندقية" },
  { value: "282", label: "غرفة وشقة" },
  { value: "3", label: "مدن سعودية" },
  { value: "24", label: "ساعة لخدمة الضيوف" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <SiteHeader />

      <section id="top" className="hotel-hero relative overflow-hidden">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={heroImage}
          alt="إطلالة ساحلية على البحر الأحمر بالقرب من وجهات سويس بلو"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.86),rgba(18,70,168,0.58)_48%,rgba(8,28,70,0.12))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-10 text-white">
            <span className="hero-kicker">فنادق وشقق فندقية في السعودية</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.12] text-balance sm:text-[64px] lg:text-[76px]">
              سويس بلو، إقامة أوضح لكل رحلة.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/84 sm:text-xl">
              محفظة ضيافة تجمع الفنادق والشقق الفندقية والشقق المخدومة في جدة
              وجازان والرياض، مصممة للأعمال والعائلات والإقامات الشهرية.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                احجز إقامتك
              </a>
              <Link className="btn btn-glass" href="/hotels">
                استكشف الفنادق
              </Link>
            </div>
          </div>

          <div className="booking-bar">
            <div className="booking-field">
              <span>الوجهة</span>
              <strong>جدة، الرياض، جازان</strong>
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
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((item) => (
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
          <span className="eyebrow">منشآت الضيافة</span>
          <h2>ست وجهات، ولكل إقامة سبب واضح للاختيار.</h2>
          <p>
            صممت بطاقات الفنادق لتساعد الضيف على مقارنة المدينة، نوع الإقامة،
            وعدد الوحدات بسرعة قبل الانتقال إلى صفحة الفندق التفصيلية.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {hotels.map((hotel) => (
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
          <div>
            <span className="eyebrow text-white/72">{loyaltyProgram.subtitle}</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              {loyaltyProgram.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/76">
              {loyaltyProgram.description}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {loyaltyProgram.benefits.map((benefit) => (
              <div className="brand-point" key={benefit}>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">الوجهات</span>
          <h2>اختر المدينة التي تناسب رحلتك.</h2>
          <p>
            تقدم سويس بلو حضورها في مدن تجمع بين الأعمال، الترفيه، الزيارات
            العائلية، والإقامات الطويلة.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {destinations.map((destination) => (
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
                  href="/destinations"
                >
                  اكتشف الوجهة
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <span className="eyebrow">الخدمات</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            تفاصيل يومية تجعل الإقامة أسهل.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            تختلف بعض الخدمات حسب الوجهة، لكن التجربة مصممة حول أساسيات الراحة:
            الحجز الواضح، الضيافة اليومية، الاتصال السريع، والدعم العملي.
          </p>
        </div>
        <div className="amenity-grid">
          {services.map((service) => (
            <div className="amenity-pill" key={service}>
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">فئات الإقامة</span>
          <h2>الفرق بين الفندق، الشقق الفندقية، والشقق المخدومة.</h2>
          <p>
            هذا التقسيم يجعل قرار الحجز أكثر وضوحا للضيف، ويساعد فرق الشركات
            والعائلات على اختيار الفئة المناسبة لمدة الإقامة وطبيعة الرحلة.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {accommodationCategories.map((category) => (
            <article className="stay-card" key={category.title}>
              <span>فئة إقامة</span>
              <h3>{category.title}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="relative max-w-3xl">
            <span className="eyebrow text-white/72">جاهزون لاستقبالكم</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[52px]">
              اعثر على إقامتك القادمة مع سويس بلو.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              قارن بين الفنادق والشقق الفندقية والشقق المخدومة، ثم انتقل إلى
              الحجز المباشر بخطوة واحدة.
            </p>
            <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
              احجز الآن
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
