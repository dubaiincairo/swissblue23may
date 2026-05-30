import React from "react";
import { ServiceTiles } from "@/components/service-tiles";

type Category = {
  readonly key: string;
  readonly title: string;
  readonly titleEn: string;
  readonly description: string;
  readonly descriptionEn: string;
  readonly icon: React.ReactNode;
  readonly match: ReadonlyArray<RegExp>;
};

const ConnectIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12.55a11 11 0 0 1 14 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const DiningIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 2v7a3 3 0 0 0 3 3v10" />
    <path d="M6 2v10" />
    <path d="M9 2v7a3 3 0 0 1-3 3" />
    <path d="M18 2c-1.5 0-3 2-3 5v4h3v11" />
  </svg>
);

const WellnessIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
  </svg>
);

const BusinessIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

const TransportIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 17h14l1-6a2 2 0 0 0-1.4-1.9L17 8H7L5.4 9.1A2 2 0 0 0 4 11Z" />
    <path d="M9 8V5h6v3" />
    <circle cx="7.5" cy="17.5" r="1.8" />
    <circle cx="16.5" cy="17.5" r="1.8" />
  </svg>
);

const InRoomIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 8h13v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
    <path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16" />
    <path d="M6 2c0 1 1 1 1 2s-1 1-1 2" />
    <path d="M10 2c0 1 1 1 1 2s-1 1-1 2" />
  </svg>
);

const SafetyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="5" width="16" height="14" rx="2" />
    <circle cx="14" cy="12" r="3" />
  </svg>
);

const SparkleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="M5.6 5.6 8 8" />
    <path d="M16 16l2.4 2.4" />
    <path d="M5.6 18.4 8 16" />
    <path d="M16 8l2.4-2.4" />
  </svg>
);

const categories: ReadonlyArray<Category> = [
  {
    key: "connect",
    title: "الاتصال والإنتاجية",
    titleEn: "Connectivity & productivity",
    description: "أساسيات تجعل العمل من الغرفة سهلا، سواء لرحلات الأعمال أو الإقامات الطويلة.",
    descriptionEn: "Daily essentials that keep work fast and uninterrupted, whether on a business trip or a long stay.",
    icon: ConnectIcon,
    match: [/wi-?fi|internet|smart.?tv|television|satellite|إنترنت/i],
  },
  {
    key: "dining",
    title: "تجربة الطعام",
    titleEn: "Dining experience",
    description: "من الإفطار اليومي إلى المطعم والمقهى وخدمة الغرف، خيارات طعام لكل وقت من اليوم.",
    descriptionEn: "From the morning buffet to the restaurant, café, and room service, food options for every part of the day.",
    icon: DiningIcon,
    match: [/breakfast|restaurant|cafe|إفطار|مطعم|مقهى|بوفيه/i],
  },
  {
    key: "inroom",
    title: "تفاصيل داخل الوحدة",
    titleEn: "In-room comforts",
    description: "تجهيزات تجعل الإقامة أقرب لإحساس البيت، مع راحة فندقية يومية.",
    descriptionEn: "Touches that make the stay feel like home, with the daily comfort of a hotel.",
    icon: InRoomIcon,
    match: [/coffee|tea|minibar|room\s*service|housekeeping|turndown|toiletries|قهوة|شاي|ميني\s*بار|خدمة\s*الغرف|تدبير|غسيل/i],
  },
  {
    key: "wellness",
    title: "العافية والترفيه",
    titleEn: "Wellness & leisure",
    description: "خيارات للحفاظ على نمط حياة نشط أو الاسترخاء قليلا أثناء الإقامة.",
    descriptionEn: "Options to stay active or simply unwind during the stay.",
    icon: WellnessIcon,
    match: [/gym|fitness|pool|sauna|steam\s*room|spa|نادي\s*رياضي|مسبح|سباحة|ساونا/i],
  },
  {
    key: "business",
    title: "للشركات والإقامات الممتدة",
    titleEn: "Business & long stay",
    description: "أدوات وعقود تجعل سويس بلو خيارا عمليا للوفود والإقامات الشهرية.",
    descriptionEn: "Tools and contracts that make Swiss Blue a practical choice for delegations and monthly stays.",
    icon: BusinessIcon,
    match: [/meeting|conference|corporate|long\s*stay|monthly|قاعات|اجتماعات|شركات|شهري|إقامات\s*طويلة|إقامات\s*شهرية|دعم/i],
  },
  {
    key: "transport",
    title: "التنقل والوصول",
    titleEn: "Transport & access",
    description: "وصول مريح بين الفندق والمدينة، مع تنسيق على الطلب حسب الوجهة.",
    descriptionEn: "Smooth access between the hotel and the city, with on-demand coordination by destination.",
    icon: TransportIcon,
    match: [/taxi|airport|transfer|parking|valet|سيارات\s*الأجرة|نقل|مواقف/i],
  },
  {
    key: "safety",
    title: "الأمان وراحة البال",
    titleEn: "Safety & peace of mind",
    description: "إجراءات أمان على مدار اليوم لإقامة آمنة وموثوقة.",
    descriptionEn: "Round-the-clock safety steps for a confident, reliable stay.",
    icon: SafetyIcon,
    match: [/safe|locker|security|surveillance|cctv|fire\s*safety|emergency|خزنة|آمنة|أمان|أمن|طوارئ/i],
  },
];

const otherCategory: Category = {
  key: "other",
  title: "خدمات إضافية",
  titleEn: "Additional services",
  description: "خدمات تكميلية تختلف حسب الوجهة وتزيد من راحة الإقامة.",
  descriptionEn: "Complementary services that vary by destination and enrich the stay.",
  icon: SparkleIcon,
  match: [],
};

function groupServices(items: readonly string[]) {
  const groups = new Map<string, string[]>();

  for (const category of categories) {
    groups.set(category.key, []);
  }
  groups.set(otherCategory.key, []);

  for (const item of items) {
    let assigned = false;
    for (const category of categories) {
      if (category.match.some((re) => re.test(item))) {
        groups.get(category.key)!.push(item);
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      groups.get(otherCategory.key)!.push(item);
    }
  }

  return [...categories, otherCategory]
    .map((category) => ({ category, items: groups.get(category.key) ?? [] }))
    .filter((group) => group.items.length > 0);
}

export function CategorizedAmenities({
  items,
  locale,
}: {
  items: readonly string[];
  locale: "ar" | "en";
}) {
  const groups = groupServices(items);

  return (
    <div className="amenities-section">
      {groups.map(({ category, items: groupItems }, index) => (
        <section
          className="amenities-category reveal-slide-up"
          key={category.key}
          style={{ "--delay": `${index * 90}ms` } as React.CSSProperties}
        >
          <div className="amenities-category-head">
            <span className="amenities-category-icon" aria-hidden="true">
              {category.icon}
            </span>
            <div>
              <h3>{locale === "ar" ? category.title : category.titleEn}</h3>
              <p>{locale === "ar" ? category.description : category.descriptionEn}</p>
            </div>
          </div>
          <ServiceTiles items={groupItems} locale={locale} />
        </section>
      ))}
    </div>
  );
}
