import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, navItemsEn } from "@/lib/content-en";
import { LanguageToggle } from "@/components/site";

export function SiteHeaderEn() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/94 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/en" aria-label="Swiss Blue Hotels home">
          <Image
            className="h-10 w-auto"
            src="https://swissbluehotels.com/wp-content/uploads/2024/03/%D9%84%D9%88%D8%AC%D9%88-%D8%B3%D9%88%D9%8A%D8%B3-%D8%A8%D9%84%D9%88.png"
            alt="Swiss Blue Hotels"
            width={190}
            height={80}
            priority
          />
        </Link>
        <div className="hidden items-center gap-4 text-xs font-semibold text-[var(--text-secondary)] xl:flex">
          {navItemsEn.map((item) => (
            <Link className="transition hover:text-[var(--primary)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle current="en" />
          <a className="btn btn-primary" href={BOOKING_URL}>
            Book now
          </a>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooterEn() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 text-sm text-[var(--text-secondary)] sm:px-6 lg:grid-cols-[1fr_1.4fr_auto] lg:items-start lg:px-8">
        <div>
          <p className="font-bold text-[var(--text-primary)]">Swiss Blue Hotels</p>
          <p className="mt-2 leading-6">
            Hotels, suites, and serviced apartments for clearer, more comfortable city stays in Saudi Arabia.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {navItemsEn.map((item) => (
            <Link className="font-semibold transition hover:text-[var(--primary)]" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <a className="btn btn-secondary justify-center" href={BOOKING_URL}>
          Check availability
        </a>
      </div>
    </footer>
  );
}

export function PageHeroEn({
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
    <section className="subpage-hero relative overflow-hidden" dir="ltr">
      <Image className="absolute inset-0 h-full w-full object-cover" src={image} alt="" fill priority sizes="100vw" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,70,0.84),rgba(18,70,168,0.56)_52%,rgba(8,28,70,0.14))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <span className="hero-kicker"> {eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-[38px] font-bold leading-[1.08] text-balance sm:text-[58px]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function CtaBandEn({
  title = "Find your next Swiss Blue stay.",
  text = "Compare rooms, suites, and serviced apartments with a clear booking journey built for modern hospitality guests.",
  cta = "Book now",
}: {
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14">
        <div className="relative max-w-3xl">
          <span className="eyebrow text-white/72">Book direct</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[52px]">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">{text}</p>
          <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageShellEn({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]" dir="ltr">
      <SiteHeaderEn />
      {children}
      <SiteFooterEn />
    </main>
  );
}
