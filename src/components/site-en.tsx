import Image from "next/image";
import Link from "next/link";
import { BOOKING_URL, heroImage, jazanImage, jeddahImage } from "@/lib/content-en";
import { LanguageToggle } from "@/components/site";
import { getEditableContent } from "@/lib/editable-content";

function resolveMediaImage(
  image: string,
  media: Awaited<ReturnType<typeof getEditableContent>>["en"]["media"],
) {
  if (image === heroImage) {
    return media.mainHero;
  }

  if (image === jeddahImage) {
    return media.jeddah;
  }

  if (image === jazanImage) {
    return media.jazan;
  }

  return image;
}

export async function SiteHeaderEn() {
  const { ar, en } = await getEditableContent();
  const logo = en.media.logo || ar.media.logo || ar.media.arabicLogo;
  const dedicatedLight = en.media.lightLogo || ar.media.lightLogo || ar.media.arabicLightLogo;
  const lightLogo = dedicatedLight || logo;
  const lightNeedsInvert = !dedicatedLight;

  return (
    <>
      <nav className="site-nav">
        <div className="nav-shell">
          <Link className="nav-logo" href="/en" aria-label="Swiss Blue Hotels home">
            {lightLogo ? (
              <Image
                className={`nav-logo--light h-10 w-auto object-contain${
                  lightNeedsInvert ? " nav-logo--needs-invert" : ""
                }`}
                src={lightLogo}
                alt="Swiss Blue Hotels"
                width={210}
                height={88}
                priority
              />
            ) : null}
            {logo ? (
              <Image
                className="nav-logo--dark h-10 w-auto object-contain"
                src={logo}
                alt="Swiss Blue Hotels"
                width={210}
                height={88}
                priority
              />
            ) : null}
          </Link>
          <div className="nav-side">
            <div className="nav-group-row">
              {en.navGroups.map((group) => (
                <div className="nav-dropdown" key={group.label}>
                  <button className="nav-parent" type="button">
                    {group.label}
                  </button>
                  <div className="nav-menu">
                    {group.links.map((item) => (
                      <Link href={item.href} key={`${group.label}-${item.href}`}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="nav-actions">
            <LanguageToggle current="en" />
            <a className="btn btn-primary" href={BOOKING_URL}>
              Book now
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export function SiteFooterEn() {
  return <SiteFooterEnContent />;
}

async function SiteFooterEnContent() {
  const { ar, en } = await getEditableContent();
  const logo = en.media.logo || ar.media.logo || ar.media.arabicLogo;

  return (
    <footer className="site-footer border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-[var(--text-secondary)] sm:px-6 lg:grid-cols-[1.05fr_1.65fr_0.9fr] lg:items-start lg:px-8">
        <div>
          {logo ? (
            <Image
              className="h-12 w-auto"
              src={logo}
              alt="Swiss Blue Hotels"
              width={190}
              height={80}
            />
          ) : null}
          <p className="mt-5 max-w-sm leading-7">
            Hotels, suites, and serviced apartments in Jeddah, Riyadh, and Jazan, with a clear booking journey for individual guests, companies, and long stays.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="footer-badge">Jeddah</span>
            <span className="footer-badge">Riyadh</span>
            <span className="footer-badge">Jazan</span>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {en.footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{section.title}</h2>
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
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Support & Booking</h2>
          <ul className="mt-4 grid gap-3">
            {en.footerContact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a className="btn btn-primary mt-6 justify-center" href={BOOKING_URL}>
            Check availability
          </a>
          <Link className="btn btn-secondary mt-3 justify-center" href="/en/contact">
            Contact us
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs font-semibold text-[var(--text-tertiary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 SwissBlue Hotels. All rights reserved.</p>
          <p>Direct booking | Saudi hospitality | Corporate and family stays</p>
        </div>
      </div>
    </footer>
  );
}

export async function PageHeroEn({
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
  const { en } = await getEditableContent();

  return (
    <section className="subpage-hero relative overflow-hidden" dir="ltr">
      <Image
        className="absolute inset-0 h-full w-full object-cover kenburns-active"
        src={resolveMediaImage(image, en.media)}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,70,0.84),rgba(18,70,168,0.56)_52%,rgba(8,28,70,0.14))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <span className="hero-kicker reveal-slide-down"> {eyebrow}</span>
        <h1 className="mt-5 max-w-4xl text-[38px] font-bold leading-[1.08] text-balance sm:text-[58px] reveal-slide-up">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg reveal-slide-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
          {text}
        </p>
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
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14 reveal-scale-up">
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
