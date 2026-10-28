import Image from "next/image";
import Link from "next/link";
import { rich } from "@/components/rich-text";
import { SocialLinks, mergeSocial } from "@/components/social-links";
import PaymentMethods from "@/components/payment-methods";
import { getEditableContent, isSectionHidden, usableLogo } from "@/lib/editable-content";
import { whatsappNumber } from "@/lib/whatsapp-numbers";

// Shared pieces of the /stay ad landing pages: fixed amenity list, hotline banner and compact footer.

export const HOTLINE = "920019474";

// Two-word card labels for the property amenities, keeping each branch's own list and order.
const SHORT_LABELS: Record<string, string> = {
  "إنترنت عالي السرعة": "واي فاي مجاني",
  "خدمة سيارات الأجرة": "خدمة سيارات",
  "قهوة وشاي وميني بار": "ميني بار",
  "استقبال ودعم للضيوف": "استقبال 24/7",
  "نادي رياضي مجهز": "نادي رياضي",
  "مسبح داخلي في وجهة مختارة": "مسبح داخلي",
  "خدمة تنظيف دورية": "خدمة تنظيف",
  "دعم للحجوزات الطويلة": "إقامات طويلة",
  "دعم للإقامة الشهرية": "إقامة شهرية",
  "خيارات إقامة شهرية": "إقامة شهرية",
  "خدمات مناسبة للشركات": "خدمات الشركات",
  "High-speed Wi-Fi": "Free Wi-Fi",
  "Taxi service": "Car service",
  "Coffee, tea, and minibar": "Mini bar",
  "Guest reception and support": "24/7 reception",
  "Fully equipped gym": "Fitness gym",
  "Indoor pool at selected property": "Indoor pool",
  "Scheduled housekeeping": "Housekeeping",
  "Long-stay booking support": "Long stays",
  "Monthly-stay support": "Monthly stays",
  "Monthly-stay options": "Monthly stays",
  "Corporate-friendly services": "Corporate services",
};

// Dropped first when a list has an odd count, so the two-column grid stays even.
const LEAST_IMPORTANT = ["قاعات اجتماعات", "Meeting rooms", "مواقف قريبة", "Nearby parking", "خزنة آمنة", "Safe locker"];

export function stayAmenities(items: readonly string[]): string[] {
  const short = items.map((item) => {
    const match = item.match(/^(.*?)(\s*\((?:Soon|قريباً)\))?$/i);
    const label = match?.[1] ?? item;
    return (SHORT_LABELS[label] ?? label) + (match?.[2] ?? "");
  });
  if (short.length % 2 === 0) return short;
  const drop = LEAST_IMPORTANT.map((label) => short.indexOf(label)).find((index) => index >= 0);
  return short.filter((_, index) => index !== (drop ?? short.length - 1));
}

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

/** 966126790008 -> +966 12 679 0008 */
function formatWhatsapp(digits: string): string {
  const m = digits.match(/^966(\d{2})(\d{3})(\d{4})$/);
  return m ? `+966 ${m[1]} ${m[2]} ${m[3]}` : `+${digits}`;
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
          {/* Numbers as plain text: Google verifies the ads' call and WhatsApp assets against the landing page text. */}
          <p className="stay-footer-numbers">
            <span>{isAr ? "الخط الساخن" : "Hotline"}: <span dir="ltr">{HOTLINE}</span></span>
            <span>{isAr ? "واتساب" : "WhatsApp"}: <span dir="ltr">{formatWhatsapp(whatsappNumber())}</span></span>
          </p>
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
          <div>
            <h3 className="stay-footer-title">{isAr ? "مدننا" : "Our cities"}</h3>
            <ul className="stay-footer-cities">
              {content.footerMeta.cityBadges.map((city) => (
                <li key={city}>{rich(city)}</li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="stay-footer-bottom">
        <PaymentMethods locale={locale} label={content.ui.payments.label} />
        <p className="stay-footer-copy">{rich(content.footerMeta.copyright)}</p>
      </div>
    </footer>
  );
}
