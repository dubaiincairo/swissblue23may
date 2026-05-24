import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, footerContact, footerSections, navItems } from "@/lib/content";

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/94 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-3"
          href="/"
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
        </Link>
        <div className="hidden items-center gap-3 text-[11px] font-semibold text-[var(--text-secondary)] xl:flex">
          {navItems.map((item) => (
            <Link
              className="whitespace-nowrap transition hover:text-[var(--primary)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle current="ar" />
          <a className="btn btn-primary" href={BOOKING_URL}>
            احجز الآن
          </a>
        </div>
      </div>
    </nav>
  );
}

export function LanguageToggle({
  current,
}: {
  current: "ar" | "en";
}) {
  return (
    <div
      className="language-toggle"
      aria-label="تبديل اللغة"
      dir="ltr"
    >
      <Link
        className={current === "ar" ? "active" : ""}
        href="/"
        aria-current={current === "ar" ? "page" : undefined}
      >
        AR
      </Link>
      <Link
        className={current === "en" ? "active" : ""}
        href="/en"
        aria-current={current === "en" ? "page" : undefined}
      >
        EN
      </Link>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-[var(--text-secondary)] sm:px-6 lg:grid-cols-[1.05fr_1.65fr_0.9fr] lg:items-start lg:px-8">
        <div>
          <Image
            className="h-12 w-auto"
            src="https://swissbluehotels.com/wp-content/uploads/2024/03/%D9%84%D9%88%D8%AC%D9%88-%D8%B3%D9%88%D9%8A%D8%B3-%D8%A8%D9%84%D9%88.png"
            alt="فنادق سويس بلو"
            width={190}
            height={80}
          />
          <p className="mt-5 max-w-sm leading-7">
            فنادق وأجنحة وشقق فندقية في جدة والرياض وجازان، بتجربة حجز واضحة
            للضيوف الأفراد والشركات والإقامات الطويلة.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="footer-badge">جدة</span>
            <span className="footer-badge">الرياض</span>
            <span className="footer-badge">جازان</span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">
                {section.title}
              </h2>
              <div className="mt-4 grid gap-3">
                {section.links.map((item) => (
                  <Link
                    className="font-semibold leading-5 transition hover:text-[var(--primary)]"
                    href={item.href}
                    key={`${section.title}-${item.href}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-contact">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">الدعم والحجز</h2>
          <ul className="mt-4 grid gap-3">
            {footerContact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="btn btn-primary mt-6 justify-center" href={BOOKING_URL}>
            تحقق من التوفر
          </a>
          <Link className="btn btn-secondary mt-3 justify-center" href="/contact">
            تواصل معنا
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs font-semibold text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 SwissBlue Hotels. جميع الحقوق محفوظة.</p>
          <p>حجز مباشر | ضيافة سعودية | إقامة للشركات والعائلات</p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="subpage-hero relative overflow-hidden">
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.84),rgba(18,70,168,0.56)_52%,rgba(8,28,70,0.14))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <span className="hero-kicker">{eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-[38px] font-bold leading-[1.15] text-balance sm:text-[58px]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">
          {text}
        </p>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "جاهزون لاستقبالكم",
  text = "قارن بين الغرف والأجنحة والشقق الفندقية ضمن تجربة حجز واضحة تليق بضيوف الضيافة الحديثة.",
  cta = "احجز الآن",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14">
        <div className="relative max-w-3xl">
          <span className="eyebrow text-white/72">احجز مباشرة</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[52px]">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
            {text}
          </p>
          <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
