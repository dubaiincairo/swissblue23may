import Image from "next/image";
import Link from "next/link";
import { rich } from "@/components/rich-text";
import { SocialLinks, mergeSocial } from "@/components/social-links";
import PaymentMethods from "@/components/payment-methods";
import { getEditableContent, isSectionHidden, usableLogo } from "@/lib/editable-content";

// Shared pieces of the /stay ad landing pages: fixed amenity list, hotline banner and compact footer.

export const HOTLINE = "920019474";

export const STAY_AMENITIES = {
  ar: ["واي فاي مجاني", "خدمة سيارات", "ميني بار", "استقبال 24/7", "مسبح داخلي", "نادي رياضي"],
  en: ["Free Wi-Fi", "Car service", "Mini bar", "24/7 reception", "Indoor pool", "Fitness gym"],
} as const;

const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export function StayHotlineBanner({ locale }: { locale: "ar" | "en" }) {
  const ar = locale === "ar";
  return (
    <div className="stay-hotline-wrap">
      <a className="stay-hotline reveal-scale-up" href={`tel:${HOTLINE}`} aria-label={ar ? `الخط الساخن ${HOTLINE}` : `Hotline ${HOTLINE}`}>
        <span className="stay-hotline-icon">{PhoneIcon}</span>
        <span className="stay-hotline-label">{ar ? "الخط الساخن" : "Hotline"}</span>
        <span className="stay-hotline-number" dir="ltr">{HOTLINE}</span>
      </a>
    </div>
  );
}

function localHref(href: string, isAr: boolean) {
  if (!isAr || href.startsWith("/ar") || href.startsWith("/en") || href.startsWith("http")) return href;
  return href === "/" ? "/ar" : `/ar${href}`;
}

// Same content as the site footer (brand, link columns, payments, copyright) in a tighter layout.
// Phone and WhatsApp are left out on purpose: the page already has the hotline button and the WhatsApp float.
export async function StayFooter({ locale }: { locale: "ar" | "en" }) {
  const { ar, en, hiddenSections } = await getEditableContent();
  const isAr = locale === "ar";
  const content = isAr ? ar : en;
  const logo = isAr
    ? usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo)
    : usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo);
  const social = isAr ? mergeSocial(ar.social, en.social) : mergeSocial(en.social, ar.social);
  const hideRoomsSuites = isSectionHidden(hiddenSections, "roomsSuitesPage");
  const sections = content.footerSections
    .map((section) => ({
      ...section,
      links: section.links.filter(
        (item) =>
          !(hideRoomsSuites && item.href.includes("rooms-suites")) &&
          !item.href.includes("/booking/yanoljacloudsolution"),
      ),
    }))
    .filter((section) => section.links.length > 0);

  return (
    <footer className="stay-footer" aria-label={isAr ? "تذييل الموقع" : "Site footer"}>
      <div className="stay-footer-inner">
        <div className="stay-footer-brand">
          <Link href={isAr ? "/ar" : "/en"} aria-label="Swiss Blue">
            {logo ? <Image className="h-10 w-auto" src={logo} alt="Swiss Blue" width={160} height={64} /> : null}
          </Link>
          <p className="stay-footer-desc">{rich(content.footerMeta.description)}</p>
          <SocialLinks social={social} />
        </div>
        <nav className="stay-footer-links" aria-label={isAr ? "روابط التذييل" : "Footer links"}>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="stay-footer-title">{rich(section.title)}</h3>
              <ul>
                {section.links.map((item) => (
                  <li key={`${section.title}-${item.href}`}>
                    <Link href={localHref(item.href, isAr)}>{rich(item.label)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="stay-footer-bottom">
        <PaymentMethods locale={locale} label={content.ui.payments.label} />
        <p className="stay-footer-copy">{rich(content.footerMeta.copyright)}</p>
      </div>
    </footer>
  );
}
