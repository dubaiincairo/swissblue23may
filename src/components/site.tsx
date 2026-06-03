import Image from "next/image";
import Link from "next/link";
import { rich } from "@/components/rich-text";
import MobileNav from "@/components/mobile-nav";
import PaymentMethods from "@/components/payment-methods";
import { SocialLinks, mergeSocial } from "@/components/social-links";
import { BOOKING_URL, heroImage, jazanImage, jeddahImage } from "@/lib/content";
import { getEditableContent, usableLogo } from "@/lib/editable-content";

function resolveMediaImage(
  image: string,
  media: Awaited<ReturnType<typeof getEditableContent>>["ar"]["media"],
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

function arabicHref(href: string) {
  if (href === "/") {
    return "/ar";
  }

  if (href.startsWith("/ar") || href.startsWith("/en") || href.startsWith("http")) {
    return href;
  }

  return `/ar${href}`;
}

export async function SiteHeader() {
  const { ar, en } = await getEditableContent();
  const logo = usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo);
  const mobileGroups = ar.navGroups.map((group) => ({
    label: group.label,
    links: group.links.map((item) => ({ href: arabicHref(item.href), label: item.label })),
  }));

  return (
    <>
      <nav className="site-nav" aria-label="التنقل الرئيسي">
        <div className="nav-shell">
          <Link
            className="nav-logo"
            href="/ar"
            aria-label="الرئيسية لفنادق سويس بلو"
          >
            {logo ? (
              <Image
                className="nav-logo-image h-10 w-auto object-contain"
                src={logo}
                alt="فنادق سويس بلو"
                width={210}
                height={88}
                priority
              />
            ) : null}
          </Link>
          <div className="nav-side">
            <div className="nav-group-row">
              {ar.navGroups.map((group) => (
                <div className="nav-dropdown" key={group.label}>
                  <button className="nav-parent" type="button" aria-haspopup="true">
                    {rich(group.label)}
                  </button>
                  <div className="nav-menu">
                    {group.links.map((item) => (
                      <Link href={arabicHref(item.href)} key={`${group.label}-${item.href}`}>
                        {rich(item.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="nav-actions">
            <LanguageToggle current="ar" />
            <a className="btn btn-primary nav-book-btn" href={BOOKING_URL}>
              {ar.ui.bookNow}
            </a>
            <MobileNav
              groups={mobileGroups}
              locale="ar"
              bookingUrl={BOOKING_URL}
              labels={ar.ui.mobileNav}
              bookLabel={ar.ui.bookNow}
            />
          </div>
        </div>
      </nav>
    </>
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
        href="/ar"
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
  return <SiteFooterContent />;
}

async function SiteFooterContent() {
  const { ar, en } = await getEditableContent();
  const logo = usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo);
  const social = mergeSocial(ar.social, en.social);

  return (
    <footer className="site-footer border-t border-[var(--border)] bg-white" aria-label="تذييل الموقع">
      <h2 className="sr-only">معلومات سويس بلو وروابط الموقع</h2>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-[var(--text-secondary)] sm:px-6 lg:grid-cols-[1.05fr_1.65fr_0.9fr] lg:items-start lg:px-8">
        <div>
          <Link href="/ar" className="inline-block" aria-label="الرئيسية لفنادق سويس بلو">
            {logo ? (
              <Image
                className="h-12 w-auto"
                src={logo}
                alt="فنادق سويس بلو"
                width={190}
                height={80}
              />
            ) : null}
          </Link>
          <p className="mt-5 max-w-sm leading-7">{rich(ar.footerMeta.description)}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="مدن التشغيل">
            {ar.footerMeta.cityBadges.map((badge) => (
              <li className="footer-badge" key={badge}>
                {rich(badge)}
              </li>
            ))}
          </ul>
          <SocialLinks social={social} heading="تابعنا" />
        </div>

        <nav className="grid gap-8 sm:grid-cols-3" aria-label="روابط التذييل">
          {ar.footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                {rich(section.title)}
              </h3>
              <div className="mt-4 grid gap-3">
                {section.links.map((item) => (
                  <Link
                    className="font-semibold leading-5 transition hover:text-[var(--primary)]"
                    href={arabicHref(item.href)}
                    key={`${section.title}-${item.href}`}
                  >
                    {rich(item.label)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="footer-contact">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{rich(ar.footerMeta.supportHeading)}</h3>
          <ul className="mt-4 grid gap-3">
            {ar.footerContact.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ul>
          <Link className="btn btn-secondary mt-3 w-full justify-center" href="/ar/contact">
            {rich(ar.footerMeta.contactCta)}
          </Link>
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <PaymentMethods locale="ar" label={ar.ui.payments.label} />
        </div>
      </div>
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs font-semibold text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{rich(ar.footerMeta.copyright)}</p>
          <p>{rich(ar.footerMeta.tagline)}</p>
        </div>
      </div>
    </footer>
  );
}

export async function PageHero({
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
  const { ar } = await getEditableContent();

  return (
    <section className="subpage-hero relative overflow-hidden">
      <Image
        className="absolute inset-0 h-full w-full object-cover kenburns-active"
        src={resolveMediaImage(image, ar.media)}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(8,28,70,0.84),rgba(18,70,168,0.56)_52%,rgba(8,28,70,0.14))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <span className="hero-kicker reveal-slide-down">{rich(eyebrow)}</span>
        <h1 className="t-h1 mt-5 max-w-4xl reveal-slide-up">
          {rich(title)}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/82 sm:text-lg reveal-slide-up" style={{ "--delay": "150ms" } as React.CSSProperties}>
          {rich(text)}
        </p>
      </div>
    </section>
  );
}

export function CtaBand({
  eyebrow = "احجز مباشرة",
  title = "جاهزون لاستقبالكم",
  text = "قارن بين الغرف والأجنحة والشقق الفندقية ضمن تجربة حجز واضحة تليق بضيوف الضيافة الحديثة.",
  cta = "احجز الآن",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: string;
}) {
  return (
    <section className="closing-cta mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--bluehost-deep)] px-6 py-12 text-white sm:px-10 lg:px-14 reveal-scale-up">
        <div className="relative max-w-3xl">
          <span className="eyebrow text-white/72">{rich(eyebrow)}</span>
          <h2 className="t-h2 mt-4">
            {rich(title)}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
            {rich(text)}
          </p>
          <a className="btn btn-hero mt-8 bg-white text-[var(--primary)]" href={BOOKING_URL}>
            {rich(cta)}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]" dir="rtl">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}
