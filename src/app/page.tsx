import Image from "next/image";
import Link from "next/link";
import { LanguageToggle } from "@/components/site";

const BOOKING_URL =
  "https://letsbook.me/booking/yanoljacloudsolution?checkin=2026-05-19&checkout=2026-05-20&adults=2&children=0";

const featuredProperties = [
  {
    title: "فندق سويس بلو جدة",
    location: "جدة",
    units: "76 غرفة وجناح",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
    description:
      "عنوان فندقي عصري لرحلات العمل والإقامات القصيرة وتجارب الأجنحة الراقية بالقرب من أجواء البحر الأحمر.",
    href: "https://swissbluehotels.com/swiss-blue-hera/",
    internalHref: "/hotels/swiss-blue-jeddah",
  },
  {
    title: "سويس بلو للشقق الفندقية جازان",
    location: "جازان",
    units: "55 شقة فندقية",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg",
    description:
      "استوديوهات وشقق بغرفة نوم وخيارات عائلية تمنح الضيوف راحة عملية للإقامات القصيرة والممتدة.",
    href: "https://swissbluehotels.com/04_swissblue-jazan/",
    internalHref: "/hotels/swiss-blue-jazan",
  },
  {
    title: "شقق الزهراء الفندقية",
    location: "جدة",
    units: "46 شقة",
    image:
      "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg",
    description:
      "خيار شقق فندقية على طريق الأمير سلطان للضيوف الذين يبحثون عن المساحة وسهولة الوصول وإطلالات المدينة.",
    href: "https://swissbluehotels.com/02_swissblue-al-zahra/",
    internalHref: "/hotels/al-zahraa-serviced-apartments",
  },
];

const portfolio = [
  "فندق سويس بلو جدة",
  "سويس بلو للشقق الفندقية جازان",
  "شقق الزهراء الفندقية",
  "شقق السامر الفندقية",
  "شقق فيناس الرياض الفندقية",
  "شقق توليب الروضة الفندقية",
];

const stayTypes = [
  {
    title: "الغرف",
    subtitle: "سوبيريور وديلوكس",
    description:
      "أساسيات راقية لرحلات العمل وزيارات المدينة والإقامات السريعة التي تحتاج إلى راحة واضحة وسهولة في الاختيار.",
  },
  {
    title: "الأجنحة",
    subtitle: "جونيور إلى رئاسي",
    description:
      "مساحات أوسع وتجربة أكثر تميزا للضيوف الذين يبحثون عن إقامة بمستوى أعلى وخصوصية أكبر.",
  },
  {
    title: "الشقق الفندقية",
    subtitle: "استوديو إلى ثلاث غرف",
    description:
      "راحة سكنية بخدمات فندقية للعائلات والإقامات الطويلة والضيوف الذين يفضلون المساحة والمرونة.",
  },
  {
    title: "إطلالات المدينة",
    subtitle: "فئات مختارة ومميزة",
    description:
      "مسارات ترقية واضحة للضيوف الذين يقدرون الإطلالة والموقع وتجربة الإقامة الأكثر حضورا.",
  },
];

const services = [
  "بوفيه إفطار",
  "إنترنت عالي السرعة",
  "مطعم ومقهى",
  "مسبح داخلي",
  "نادي رياضي مجهز",
  "قاعات اجتماعات",
  "خدمة الغرف",
  "خدمة سيارات الأجرة",
  "خزنة آمنة",
  "قهوة وشاي وميني بار",
];

const offers = [
  {
    title: "إقامة أعمال",
    description:
      "وصول سريع، غرف متصلة، مساحات اجتماعات، وخدمات عملية تساعد الضيف على إنجاز يومه بثقة.",
  },
  {
    title: "إقامة عائلية",
    description:
      "شقق متعددة الغرف ومساحات معيشة وخدمات فندقية تمنح العائلة خصوصية وراحة خلال الزيارات الطويلة.",
  },
  {
    title: "عطلة البحر الأحمر",
    description:
      "إقامة قريبة من حيوية جدة وتجارب الساحل والمطاعم والتسوق وخطط نهاية الأسبوع.",
  },
];

const highlights = [
  { value: "6", label: "وجهات فندقية" },
  { value: "282", label: "غرفة وشقة" },
  { value: "3", label: "مدن سعودية" },
  { value: "24", label: "ساعة لخدمة الضيوف" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            className="flex items-center gap-3"
            href="#top"
            aria-label="الرئيسية لفنادق سويس بلو"
          >
            <Image
              className="h-10 w-auto"
              src="https://swissbluehotels.com/wp-content/uploads/2024/03/%D9%84%D9%88%D8%AC%D9%88-%D8%B3%D9%88%D9%8A%D8%B3-%D8%A8%D9%84%D9%88.png"
              alt="فنادق سويس بلو"
              width={190}
              height={80}
              priority
            />
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold text-[var(--text-secondary)] lg:flex">
            <Link className="transition hover:text-[var(--primary)]" href="/hotels">
              الفنادق
            </Link>
            <Link className="transition hover:text-[var(--primary)]" href="/rooms-suites">
              الغرف والأجنحة
            </Link>
            <Link className="transition hover:text-[var(--primary)]" href="/offers">
              العروض
            </Link>
            <Link className="transition hover:text-[var(--primary)]" href="/amenities-services">
              الخدمات
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle current="ar" />
            <a className="btn btn-primary" href={BOOKING_URL}>
              احجز الآن
            </a>
          </div>
        </div>
      </nav>

      <section id="top" className="hotel-hero relative overflow-hidden">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg"
          alt="إطلالة ساحلية على البحر الأحمر بالقرب من وجهات سويس بلو"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.82),rgba(18,70,168,0.5)_48%,rgba(8,28,70,0.08))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,var(--background))]" />

        <div className="relative mx-auto flex min-h-[760px] max-w-7xl flex-col justify-between px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl pt-10 text-white">
            <span className="hero-kicker">فنادق سويس بلو</span>
            <h1 className="mt-5 text-[42px] font-bold leading-[1.12] text-balance sm:text-[64px] lg:text-[76px]">
              إقامة راقية في قلب وجهات المملكة.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/84 sm:text-xl">
              فنادق وأجنحة وشقق فندقية مصممة لرحلات العمل والإقامات العائلية
              وعطلات المدينة والزيارات الطويلة في جدة وجازان والرياض.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary btn-hero" href={BOOKING_URL}>
                احجز إقامتك
              </a>
              <Link className="btn btn-glass" href="/hotels">
                استكشف الوجهات
              </Link>
            </div>
          </div>

          <div className="booking-bar">
            <div className="booking-field">
              <span>الوجهة</span>
              <strong>المملكة العربية السعودية</strong>
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

      <section
        id="properties"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="section-heading">
          <span className="eyebrow">فنادق مختارة</span>
          <h2>اختر الإقامة التي تناسب رحلتك.</h2>
          <p>
            محفظة حديثة من الغرف الفندقية والأجنحة الراقية والشقق المخدومة،
            منظمة بطريقة تساعد الضيوف على مقارنة الموقع والمساحة ونمط الإقامة
            بثقة وسهولة.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProperties.map((hotel) => (
            <article className="property-card" key={hotel.title}>
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
                  <span>{hotel.location}</span>
                  <span>{hotel.units}</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{hotel.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                  {hotel.description}
                </p>
                <Link className="mt-6 inline-flex text-sm font-bold text-[var(--primary)]" href={hotel.internalHref}>
                  عرض الفندق
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
          <div>
            <span className="eyebrow text-white/72">ميزة سويس بلو</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-[46px]">
              ضيافة واضحة بروح سلاسل الفنادق الحديثة.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "فئات غرف سهلة الفهم للضيوف",
              "فنادق وشقق فندقية ضمن محفظة واحدة",
              "مستويات قيمة واضحة من القياسي إلى الفاخر",
              "مراجعة دورية تعزز الأداء والمبيعات",
            ].map((item) => (
              <div className="brand-point" key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stays" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="section-heading">
          <span className="eyebrow">غرف وأجنحة وشقق</span>
          <h2>كل فئة تحمل وعدا واضحا للضيف.</h2>
          <p>
            من الغرف العملية إلى الشقق المطلة على المدينة، صممت فئات الإقامة
            حول ما يبحث عنه الضيف فعليا: المساحة، الإطلالة، مدة الإقامة،
            الخصوصية، وهدف الرحلة.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stayTypes.map((stay) => (
            <article className="stay-card" key={stay.title}>
              <span>{stay.subtitle}</span>
              <h3>{stay.title}</h3>
              <p>{stay.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="offers" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="feature-panel">
            <span className="eyebrow">العروض والمناسبات</span>
            <h2>احجز الإقامة حسب سبب الرحلة.</h2>
            <p>
              الصفحة الرئيسية الفندقية الناجحة تقود الضيف من نيته إلى الخيار
              المناسب. لذلك تظهر الرحلات بطريقة تجعل المحفظة أسهل في التصفح
              وأكثر وضوحا تجاريا.
            </p>
            <a className="btn btn-primary mt-8" href={BOOKING_URL}>
              استعرض الإقامات المتاحة
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {offers.map((offer) => (
              <article className="offer-card" key={offer.title}>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8"
      >
        <div>
          <span className="eyebrow">الخدمات والمرافق</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[46px]">
            تفاصيل الراحة التي يتوقعها الضيوف من علامة فندقية موثوقة.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-secondary)]">
            تجمع التجربة بين أساسيات الفندق ومرونة الشقق الفندقية، لتمنح
            الضيف راحة عملية سواء كانت الإقامة ليلة واحدة أو عدة أسابيع.
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
        <div className="portfolio-strip">
          <div>
            <span className="eyebrow">المحفظة الكاملة</span>
            <h2>ست وجهات في جدة وجازان والرياض.</h2>
          </div>
          <div className="portfolio-list">
            {portfolio.map((property) => (
              <span key={property}>{property}</span>
            ))}
          </div>
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
              قارن بين الغرف والأجنحة والشقق الفندقية ضمن تجربة حجز واضحة
              تليق بضيوف الضيافة الحديثة.
            </p>
            <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
              احجز الآن
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>تصور الصفحة الرئيسية لفنادق سويس بلو</p>
          <Link className="font-semibold text-[var(--primary)]" href="/contact">
            تواصل معنا
          </Link>
        </div>
      </footer>
    </main>
  );
}
