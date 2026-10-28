import Image from "next/image";
import Link from "next/link";
import { rich } from "@/components/rich-text";
import { SocialLinks, mergeSocial } from "@/components/social-links";
import { getEditableContent, usableLogo } from "@/lib/editable-content";
import { whatsappNumber } from "@/lib/whatsapp-numbers";

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
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <a className="stay-hotline reveal-scale-up" href={`tel:${HOTLINE}`}>
        <span className="stay-hotline-icon">{PhoneIcon}</span>
        <span className="stay-hotline-copy">
          <span className="stay-hotline-label">{ar ? "الخط الساخن" : "Hotline"}</span>
          <span className="stay-hotline-number" dir="ltr">{HOTLINE}</span>
        </span>
        <span className="stay-hotline-cta">{ar ? "اتصل الآن" : "Call now"}</span>
      </a>
    </section>
  );
}

export async function StayFooter({ locale }: { locale: "ar" | "en" }) {
  const { ar, en } = await getEditableContent();
  const isAr = locale === "ar";
  const content = isAr ? ar : en;
  const logo = isAr
    ? usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo)
    : usableLogo(en.media.logo) || usableLogo(ar.media.arabicLogo);
  const social = isAr ? mergeSocial(ar.social, en.social) : mergeSocial(en.social, ar.social);
  const wa = whatsappNumber();

  return (
    <footer className="stay-footer" aria-label={isAr ? "تذييل الموقع" : "Site footer"}>
      <div className="stay-footer-row">
        <Link href={isAr ? "/ar" : "/en"} aria-label="Swiss Blue">
          {logo ? <Image className="h-10 w-auto" src={logo} alt="Swiss Blue" width={160} height={64} /> : null}
        </Link>
        <div className="stay-footer-actions">
          <a className="btn btn-secondary" href={`tel:${HOTLINE}`}>
            {isAr ? "اتصل" : "Call"} <span dir="ltr">{HOTLINE}</span>
          </a>
          <a className="btn btn-secondary" href={`https://wa.me/${wa}`} target="_blank" rel="noopener">
            {isAr ? "واتساب" : "WhatsApp"}
          </a>
        </div>
        <SocialLinks social={social} />
      </div>
      <p className="stay-footer-copy">{rich(content.footerMeta.copyright)}</p>
    </footer>
  );
}
