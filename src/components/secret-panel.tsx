"use client";

// Swiss Blue content studio (admin panel).
import { useEffect, useMemo, useState } from "react";
import { RichEditor } from "@/components/rich-editor";
import { RephraseButton } from "@/components/rephrase-button";
import { StockPhotoPicker } from "@/components/stock-photo-picker";
import { TranslateButton } from "@/components/translate-button";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };
type JsonObject = { [key: string]: JsonValue };
type Language = "ar" | "en";
type StatusTone = "ready" | "dirty" | "saving" | "error";

type AdminSection = {
  id: string;
  group: string;
  label: string;
  description: string;
  path: string[];
};

type AdminSectionTranslation = {
  group: string;
  label: string;
  description: string;
};

const languages: Record<Language, { label: string; short: string; previewHref: string }> = {
  en: { label: "English", short: "EN", previewHref: "/en" },
  ar: { label: "العربية", short: "AR", previewHref: "/ar" },
};

const adminSections: AdminSection[] = [
  {
    id: "navGroups",
    group: "Site-wide",
    label: "Navigation",
    description: "Main menu groups, dropdown labels, and page links.",
    path: ["navGroups"],
  },
  {
    id: "media",
    group: "Site-wide",
    label: "Website photos",
    description: "Logo, the three hero slides, city photos, and shared images.",
    path: ["media"],
  },
  {
    id: "hospitalityGallery",
    group: "Site-wide",
    label: "Hospitality gallery",
    description: "Homepage hospitality gallery photos and captions.",
    path: ["media", "gallery"],
  },
  {
    id: "footerSections",
    group: "Site-wide",
    label: "Footer links",
    description: "Footer columns and supporting site links.",
    path: ["footerSections"],
  },
  {
    id: "footerContact",
    group: "Site-wide",
    label: "Footer support",
    description: "Support bullets shown beside the footer booking action.",
    path: ["footerContact"],
  },
  {
    id: "hero",
    group: "Homepage",
    label: "Hero & booking",
    description: "Main banner headline, supporting copy, and primary actions.",
    path: ["homepage", "hero"],
  },
  {
    id: "highlights",
    group: "Homepage",
    label: "Key numbers",
    description: "The four statistics displayed under the hero section.",
    path: ["homepage", "highlights"],
  },
  {
    id: "properties",
    group: "Homepage",
    label: "Property cards",
    description: "The six hospitality property cards shown on the homepage.",
    path: ["homepage", "properties"],
  },
  {
    id: "loyalty",
    group: "Homepage",
    label: "Loyalty program",
    description: "Program headline, intro text, and guest benefits.",
    path: ["homepage", "loyalty"],
  },
  {
    id: "destinations",
    group: "Homepage",
    label: "Destinations",
    description: "Jeddah, Riyadh, and Jazan cards and city guidance.",
    path: ["homepage", "destinations"],
  },
  {
    id: "offers",
    group: "Homepage",
    label: "Offers",
    description: "Business, family, and monthly-stay offer blocks.",
    path: ["homepage", "offers"],
  },
  {
    id: "services",
    group: "Homepage",
    label: "Services",
    description: "Service section text and amenity list.",
    path: ["homepage", "services"],
  },
  {
    id: "categories",
    group: "Homepage",
    label: "Stay categories",
    description: "Hotel, apart-hotel, and serviced-apartment comparison.",
    path: ["homepage", "categories"],
  },
  {
    id: "testimonials",
    group: "Homepage",
    label: "Guest testimonials",
    description: "Reviews shown on the homepage. Pull real testimonials from Google Maps, Booking.com, Agoda, Expedia, and other platforms.",
    path: ["homepage", "testimonials"],
  },
  {
    id: "cta",
    group: "Homepage",
    label: "Closing CTA",
    description: "Final booking call-to-action at the bottom of the page.",
    path: ["homepage", "cta"],
  },
  {
    id: "homepageFaq",
    group: "Homepage",
    label: "Homepage FAQ",
    description: "Questions shown near the bottom of the homepage.",
    path: ["faq", "homepage"],
  },
  {
    id: "hotelsSubpage",
    group: "Stay",
    label: "Hotels page",
    description: "Hotels page hero and introduction text.",
    path: ["subpages", "hotelsPage"],
  },
  {
    id: "roomsSuitesPage",
    group: "Stay",
    label: "Rooms & Suites page",
    description: "Rooms page hero, classification principles, table intro, and classifications table.",
    path: ["subpages", "roomsSuites"],
  },
  {
    id: "servicedApartmentsPage",
    group: "Stay",
    label: "Serviced Apartments page",
    description: "Serviced Apartments page hero banner.",
    path: ["subpages", "servicedApartments"],
  },
  {
    id: "amenitiesServicesPage",
    group: "Stay",
    label: "Amenities & Services page",
    description: "Amenities & Services page hero banner.",
    path: ["subpages", "amenitiesServices"],
  },
  {
    id: "propertyFaq",
    group: "Stay",
    label: "Property FAQ",
    description: "Questions shown on every hotel detail page.",
    path: ["faq", "property"],
  },
  {
    id: "destinationsSubpage",
    group: "Experience",
    label: "Destinations page",
    description: "Destinations page hero banner.",
    path: ["subpages", "destinationsPage"],
  },
  {
    id: "diningPage",
    group: "Experience",
    label: "Dining page",
    description: "Dining page hero banner, introduction text, and food services list.",
    path: ["subpages", "dining"],
  },
  {
    id: "offersSubpage",
    group: "Offers",
    label: "Offers page",
    description: "Offers page hero, main offers, and booking benefits lists.",
    path: ["subpages", "offersPage"],
  },
  {
    id: "loyaltySubpage",
    group: "Offers",
    label: "Loyalty page",
    description: "Loyalty page hero banner.",
    path: ["subpages", "loyaltyPage"],
  },
  {
    id: "corporateDealsSubpage",
    group: "Business",
    label: "Corporate Deals page",
    description: "Corporate Deals page hero banner.",
    path: ["subpages", "corporateDealsPage"],
  },
  {
    id: "meetingsEventsPage",
    group: "Business",
    label: "Meetings & Events page",
    description: "Meetings page hero, intro, documents, and corporate deal features.",
    path: ["subpages", "meetingsEvents"],
  },
  {
    id: "groupBookingsPage",
    group: "Business",
    label: "Group Bookings page",
    description: "Group Bookings page hero, introduction text, and requirements list.",
    path: ["subpages", "groupBookings"],
  },
  {
    id: "careersSubpage",
    group: "Community",
    label: "Careers page",
    description: "Hero, why-join cards, departments, and apply panel.",
    path: ["subpages", "careersPage"],
  },
  {
    id: "csrSubpage",
    group: "Community",
    label: "Social Responsibility page",
    description: "Hero, pillars, initiatives, and reporting.",
    path: ["subpages", "csrPage"],
  },
  {
    id: "reservationOfficeSubpage",
    group: "Contact Us",
    label: "Central Reservation page",
    description: "Hero, channels (phone / WhatsApp / email), services, and benefits.",
    path: ["subpages", "reservationOfficePage"],
  },
  {
    id: "feedbackSubpage",
    group: "Contact Us",
    label: "Complaints & Suggestions page",
    description: "Hero, channels, process steps, categories, and escalation path.",
    path: ["subpages", "feedbackPage"],
  },
  {
    id: "contactPage",
    group: "Contact Us",
    label: "Contact page",
    description: "Contact page hero, channels lists, and direct booking intro.",
    path: ["subpages", "contact"],
  },
  {
    id: "aboutPage",
    group: "Company",
    label: "About page",
    description: "About page hero banner, philosophy paragraph, and brand pillars.",
    path: ["subpages", "about"],
  },
  {
    id: "faqSubpage",
    group: "Company",
    label: "FAQ page",
    description: "FAQ page hero banner.",
    path: ["subpages", "faqPage"],
  },
  {
    id: "faqCategories",
    group: "Company",
    label: "Full FAQ page",
    description: "FAQ categories and questions shown on the full FAQ page.",
    path: ["faq", "categories"],
  },
];

const arabicSectionLabels: Record<string, AdminSectionTranslation> = {
  navGroups: {
    group: "إعدادات الموقع",
    label: "القائمة الرئيسية",
    description: "مجموعات القائمة، عناوين القوائم المنسدلة، وروابط الصفحات.",
  },
  media: {
    group: "إعدادات الموقع",
    label: "صور الموقع",
    description: "الشعار، شرائح البانر الثلاث، صور المدن، والصور المشتركة.",
  },
  hospitalityGallery: {
    group: "إعدادات الموقع",
    label: "معرض الضيافة",
    description: "صور معرض الضيافة في الصفحة الرئيسية وعناوينها.",
  },
  footerSections: {
    group: "إعدادات الموقع",
    label: "روابط الفوتر",
    description: "أعمدة الفوتر وروابط الموقع المساندة.",
  },
  footerContact: {
    group: "إعدادات الموقع",
    label: "دعم الفوتر",
    description: "نقاط الدعم المعروضة بجانب زر الحجز في الفوتر.",
  },
  hero: {
    group: "الصفحة الرئيسية",
    label: "البانر والحجز",
    description: "عنوان البانر الرئيسي، النص المساند، وأزرار الإجراء.",
  },
  highlights: {
    group: "الصفحة الرئيسية",
    label: "الأرقام الرئيسية",
    description: "الأرقام الأربعة المعروضة أسفل البانر.",
  },
  properties: {
    group: "الصفحة الرئيسية",
    label: "بطاقات الفنادق",
    description: "بطاقات منشآت الضيافة المعروضة في الصفحة الرئيسية.",
  },
  loyalty: {
    group: "الصفحة الرئيسية",
    label: "برنامج الولاء",
    description: "عنوان البرنامج، النص التعريفي، ومزايا الضيوف.",
  },
  destinations: {
    group: "الصفحة الرئيسية",
    label: "الوجهات",
    description: "بطاقات جدة والرياض وجازان ومحتوى المدن.",
  },
  offers: {
    group: "الصفحة الرئيسية",
    label: "العروض",
    description: "محتوى عروض الأعمال والعائلات والإقامات الشهرية.",
  },
  services: {
    group: "الصفحة الرئيسية",
    label: "الخدمات",
    description: "نص قسم الخدمات وقائمة المرافق.",
  },
  categories: {
    group: "الصفحة الرئيسية",
    label: "فئات الإقامة",
    description: "مقارنة الفندق والشقق الفندقية والشقق المخدومة.",
  },
  testimonials: {
    group: "الصفحة الرئيسية",
    label: "آراء الضيوف",
    description: "آراء حقيقية من ضيوفنا عبر جوجل، Booking.com، Agoda، Expedia وغيرها.",
  },
  cta: {
    group: "الصفحة الرئيسية",
    label: "دعوة الإجراء الختامية",
    description: "دعوة الحجز في نهاية الصفحة.",
  },
  homepageFaq: {
    group: "الصفحة الرئيسية",
    label: "أسئلة الصفحة الرئيسية",
    description: "الأسئلة المعروضة قرب نهاية الصفحة الرئيسية.",
  },
  hotelsSubpage: {
    group: "الإقامة",
    label: "صفحة الفنادق والوجهات",
    description: "بانر صفحة الفنادق والنص التعريفي المساعد.",
  },
  roomsSuitesPage: {
    group: "الإقامة",
    label: "صفحة الغرف والأجنحة",
    description: "بانر صفحة الغرف، مبادئ التصنيف، مقدمة الجدول، وجدول التصنيفات المعتمد.",
  },
  servicedApartmentsPage: {
    group: "الإقامة",
    label: "صفحة الشقق الفندقية",
    description: "بانر صفحة الشقق الفندقية والخيارات المتاحة.",
  },
  amenitiesServicesPage: {
    group: "الإقامة",
    label: "صفحة الخدمات والمرافق",
    description: "بانر صفحة الخدمات والمرافق الأساسية للضيوف.",
  },
  propertyFaq: {
    group: "الإقامة",
    label: "أسئلة صفحات الفنادق",
    description: "الأسئلة المعروضة في كل صفحة فندق.",
  },
  destinationsSubpage: {
    group: "التجربة",
    label: "صفحة المدن والوجهات",
    description: "بانر صفحة وجهات سويس بلو والمدن الرئيسية.",
  },
  diningPage: {
    group: "التجربة",
    label: "صفحة الطعام",
    description: "بانر صفحة الطعام، النص التعريفي، وقائمة خدمات الطعام.",
  },
  offersSubpage: {
    group: "العروض",
    label: "صفحة العروض",
    description: "بانر صفحة العروض، العروض الرئيسية، ومزايا الحجز المباشر.",
  },
  loyaltySubpage: {
    group: "العروض",
    label: "صفحة برنامج الولاء",
    description: "بانر صفحة برنامج الولاء والمزايا المباشرة للضيوف.",
  },
  corporateDealsSubpage: {
    group: "الأعمال",
    label: "صفحة تعاقدات الشركات",
    description: "بانر صفحة تعاقدات الشركات والتعريف بالحلول.",
  },
  meetingsEventsPage: {
    group: "الأعمال",
    label: "صفحة الاجتماعات والمناسبات",
    description: "بانر صفحة الاجتماعات، النص التعريفي، المستندات، ومزايا صفقات الشركات.",
  },
  groupBookingsPage: {
    group: "الأعمال",
    label: "صفحة حجوزات المجموعات",
    description: "بانر صفحة حجوزات المجموعات، النص التعريفي، وقائمة المتطلبات.",
  },
  careersSubpage: {
    group: "المجتمع",
    label: "صفحة الوظائف",
    description: "البانر، بطاقات لماذا الانضمام، الأقسام، ولوحة التقديم.",
  },
  csrSubpage: {
    group: "المجتمع",
    label: "صفحة المسؤولية الاجتماعية",
    description: "البانر، الركائز، المبادرات، والشفافية.",
  },
  reservationOfficeSubpage: {
    group: "تواصل معنا",
    label: "صفحة مكتب الحجوزات المركزي",
    description: "البانر، قنوات التواصل (هاتف / واتساب / بريد)، الخدمات، والميزات.",
  },
  feedbackSubpage: {
    group: "تواصل معنا",
    label: "صفحة الشكاوى والاقتراحات",
    description: "البانر، قنوات الاستلام، خطوات المعالجة، الفئات، ومسار التصعيد.",
  },
  contactPage: {
    group: "تواصل معنا",
    label: "صفحة اتصل بنا",
    description: "بانر صفحة اتصل بنا، قنوات الاتصال، ومقدمة الحجز المباشر.",
  },
  aboutPage: {
    group: "عن الشركة",
    label: "صفحة من نحن",
    description: "بانر صفحة من نحن، فقرة الفلسفة، وركائز العلامة التجارية.",
  },
  faqSubpage: {
    group: "عن الشركة",
    label: "صفحة الأسئلة الشائعة",
    description: "بانر صفحة الأسئلة الشائعة والمعلومات المساعدة.",
  },
  faqCategories: {
    group: "عن الشركة",
    label: "صفحة الأسئلة الشائعة الكاملة",
    description: "تصنيفات الأسئلة والأسئلة المعروضة في صفحة الأسئلة الشائعة الكاملة.",
  },
};

const fieldLabels: Record<string, string> = {
  amenities: "Amenities",
  applyIntro: "Apply panel",
  benefits: "Benefits",
  careersPage: "Careers page",
  categories: "Categories",
  categoriesIntro: "Categories intro",
  csrPage: "Social Responsibility page",
  departments: "Departments",
  departmentsIntro: "Departments intro",
  email: "Email address",
  escalationIntro: "Escalation intro",
  feedbackPage: "Complaints & Suggestions page",
  initiatives: "Initiatives",
  initiativesIntro: "Initiatives intro",
  process: "Process steps",
  reportingIntro: "Reporting intro",
  reservationOfficePage: "Central Reservation page",
  services: "Services",
  servicesIntro: "Services intro",
  whyJoin: "Why join us",
  button: "Button label",
  city: "City",
  count: "Count",
  cta: "Button label",
  description: "Description",
  destination: "Destination label",
  eyebrow: "Small heading",
  faqCategories: "FAQ categories",
  gallery: "Gallery images",
  hero: "Main banner",
  href: "Link URL",
  howToEnjoy: "How to enjoy",
  image: "Photo",
  arabicLogo: "Arabic logo",
  jazan: "Jazan photo",
  jeddah: "Jeddah photo",
  items: "Cards",
  label: "Label",
  landmarks: "Nearby landmarks",
  links: "Links",
  logo: "Logo",
  locationHighlight: "Location highlight",
  mainHero: "Hero fallback photo",
  mainHeroSlides: "Hero photos/videos",
  mapQuery: "Google Maps search",
  media: "Website photos",
  primaryCta: "Primary button",
  positioning: "Positioning paragraph",
  question: "Question",
  secondaryCta: "Secondary button",
  secondaryHref: "Secondary button URL",
  slug: "Page slug",
  source: "Source URL",
  platform: "Booking platform",
  quote: "Review quote",
  rating: "Rating (1–5)",
  role: "Stay type",
  name: "Guest name",
  kind: "Media type",
  summary: "Short summary",
  text: "Body text",
  title: "Title",
  type: "Type",
  unitTypes: "Unit types",
  units: "Unit count",
  value: "Value",
  philosophy: "Brand philosophy",
  pillars: "Brand pillars",
  intro: "Introduction",
  options: "Food services list",
  principles: "Principles",
  detailsIntro: "Details introduction",
  classifications: "Classifications list",
  property: "Property",
  rows: "Table rows",
  bedrooms: "Bedrooms",
  bedConfig: "Bed configuration",
  view: "View",
  bathrooms: "Bathrooms",
  livingRooms: "Living rooms",
  totalUnits: "Total units count",
  rooms: "Room numbers",
  deals: "Corporate deals feature",
  documentsIntro: "Documents intro",
  documents: "Required documents",
  channels: "Contact channels",
  bookingIntro: "Booking panel intro",
  offers: "Offers list",
  benefitsIntro: "Direct booking intro",
};

const arabicFieldLabels: Record<string, string> = {
  amenities: "المرافق",
  answer: "الإجابة",
  applyIntro: "لوحة التقديم",
  benefits: "المزايا",
  button: "نص الزر",
  careersPage: "صفحة الوظائف",
  categories: "الفئات",
  categoriesIntro: "تقديم الفئات",
  csrPage: "صفحة المسؤولية الاجتماعية",
  departments: "الأقسام",
  departmentsIntro: "تقديم الأقسام",
  email: "البريد الإلكتروني",
  escalationIntro: "تقديم مسار التصعيد",
  feedbackPage: "صفحة الشكاوى والاقتراحات",
  initiatives: "المبادرات",
  initiativesIntro: "تقديم المبادرات",
  process: "خطوات المعالجة",
  reportingIntro: "تقديم الشفافية",
  reservationOfficePage: "صفحة مكتب الحجوزات المركزي",
  services: "الخدمات",
  servicesIntro: "تقديم الخدمات",
  whyJoin: "لماذا الانضمام",
  city: "المدينة",
  count: "العدد",
  cta: "نص الزر",
  description: "الوصف",
  destination: "نص الوجهة",
  eyebrow: "العنوان الصغير",
  faqCategories: "تصنيفات الأسئلة الشائعة",
  gallery: "صور المعرض",
  hero: "البانر الرئيسي",
  href: "رابط الصفحة",
  howToEnjoy: "طريقة الاستفادة",
  image: "الصورة",
  arabicLogo: "الشعار العربي",
  jazan: "صورة جازان",
  jeddah: "صورة جدة",
  items: "البطاقات",
  label: "التسمية",
  landmarks: "المعالم القريبة",
  links: "الروابط",
  logo: "الشعار",
  locationHighlight: "ميزة الموقع",
  mainHero: "صورة احتياطية للبانر",
  mainHeroSlides: "صور وفيديوهات البانر",
  mapQuery: "بحث خرائط Google",
  media: "صور الموقع",
  primaryCta: "الزر الرئيسي",
  positioning: "نص التمركز",
  question: "السؤال",
  secondaryCta: "الزر الثانوي",
  secondaryHref: "رابط الزر الثانوي",
  slug: "رابط الصفحة المختصر",
  source: "رابط الملف",
  platform: "منصة الحجز",
  quote: "نص الرأي",
  rating: "التقييم (1–5)",
  role: "نوع الإقامة",
  name: "اسم الضيف",
  kind: "نوع الملف",
  summary: "الملخص",
  text: "النص",
  title: "العنوان",
  type: "النوع",
  unitTypes: "أنواع الوحدات",
  units: "عدد الوحدات",
  value: "القيمة",
  philosophy: "فلسفة العلامة",
  pillars: "ركائز العلامة",
  intro: "القسم التعريفي",
  options: "خيارات خدمات الطعام",
  principles: "مبادئ التصنيف",
  detailsIntro: "مقدمة تفاصيل الوحدات",
  classifications: "تصنيفات الوحدات",
  property: "المنشأة",
  rows: "صفوف الجدول",
  bedrooms: "غرف النوم",
  bedConfig: "تكوين الأسرّة",
  view: "الإطلالة",
  bathrooms: "دورات المياه",
  livingRooms: "غرف المعيشة",
  totalUnits: "إجمالي الوحدات",
  rooms: "أرقام الغرف",
  deals: "صفقات ومزايا الشركات",
  documentsIntro: "مقدمة المستندات المطلوبة",
  documents: "المستندات المطلوبة",
  channels: "قنوات الاتصال",
  bookingIntro: "مقدمة لوحة الحجز المباشر",
  offers: "قائمة العروض",
  benefitsIntro: "مقدمة مزايا الحجز المباشر",
};

const fieldOrder = [
  "eyebrow",
  "title",
  "question",
  "answer",
  "text",
  "description",
  "summary",
  "positioning",
  "primaryCta",
  "secondaryCta",
  "secondaryHref",
  "cta",
  "href",
  "button",
  "logo",
  "arabicLogo",
  "mainHero",
  "mainHeroSlides",
  "destination",
  "jeddah",
  "jazan",
  "city",
  "type",
  "units",
  "value",
  "label",
  "slug",
  "image",
  "count",
  "unitTypes",
  "amenities",
  "benefits",
  "locationHighlight",
  "landmarks",
  "mapQuery",
  "gallery",
  "howToEnjoy",
  "links",
  "items",
  "source",
  "kind",
];

function sectionCopy(section: AdminSection, language: Language) {
  return language === "ar"
    ? arabicSectionLabels[section.id] ?? section
    : section;
}

function labelFor(key: string, language: Language = "en") {
  if (language === "ar") {
    return arabicFieldLabels[key] ?? fieldLabels[key] ?? key.replace(/([A-Z])/g, " $1");
  }

  return fieldLabels[key] ?? key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function orderedEntries(object: JsonObject) {
  return Object.entries(object)
    .map(([key, value], index) => ({ key, value, index }))
    .sort((left, right) => {
      const leftOrder = fieldOrder.indexOf(left.key);
      const rightOrder = fieldOrder.indexOf(right.key);
      const leftRank = leftOrder === -1 ? 1000 + left.index : leftOrder;
      const rightRank = rightOrder === -1 ? 1000 + right.index : rightOrder;

      return leftRank - rightRank;
    });
}

function shouldShowField(path: Array<string | number>, key: string) {
  const isRootMediaField =
    path.length === 2 &&
    (path[0] === "ar" || path[0] === "en") &&
    path[1] === "media";

  if (isRootMediaField && key === "mainHero") {
    return false;
  }

  // Room-number classifications table removed from admin panel — data is no
  // longer surfaced on the property pages so there is nothing to edit here.
  if (key === "classifications" && path.some((p) => p === "roomsSuites")) {
    return false;
  }

  return true;
}

function getAtPath(value: JsonValue, path: Array<string | number>): JsonValue {
  return path.reduce<JsonValue>((current, segment) => {
    if (Array.isArray(current)) {
      return current[segment as number];
    }

    if (current && typeof current === "object") {
      return (current as JsonObject)[segment as string];
    }

    return null;
  }, value);
}

function setAtPath(value: JsonValue, path: Array<string | number>, nextValue: JsonValue): JsonValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(value)) {
    return value.map((item, index) =>
      index === head ? setAtPath(item, tail, nextValue) : item,
    );
  }

  if (value && typeof value === "object") {
    return {
      ...(value as JsonObject),
      [head]: setAtPath((value as JsonObject)[head as string], tail, nextValue),
    };
  }

  return value;
}

function reorderAtPath(value: JsonValue, path: Array<string | number>, from: number, to: number): JsonValue {
  const target = getAtPath(value, path);

  if (!Array.isArray(target) || from === to) {
    return value;
  }

  const nextArray = [...target];
  const [moved] = nextArray.splice(from, 1);
  nextArray.splice(to, 0, moved);

  return setAtPath(value, path, nextArray as JsonValue);
}

function cloneTemplate(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return [];
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as JsonObject).map(([key, item]) => [key, cloneTemplate(item)]),
    );
  }

  if (typeof value === "number") {
    return 0;
  }

  if (typeof value === "boolean") {
    return false;
  }

  return "";
}

function isPlainObject(value: JsonValue): value is JsonObject {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function itemTitle(value: JsonValue, fallback: string) {
  if (isPlainObject(value)) {
    const title = value.question ?? value.title ?? value.label ?? value.name ?? value.city ?? value.value ?? value.slug;
    return typeof title === "string" || typeof title === "number" ? String(title) : fallback;
  }

  if (typeof value === "string" && value.trim()) {
    return value.length > 54 ? `${value.slice(0, 54)}...` : value;
  }

  return fallback;
}

function isLongField(name: string, value: string) {
  return (
    value.length > 86 ||
    ["description", "locationHighlight", "positioning", "summary", "text"].includes(name)
  );
}

function isImageField(name: string, path: Array<string | number>, value: string) {
  const imageKeys = new Set([
    "image",
    "logo",
    "arabicLogo",
    "mainHero",
    "jeddah",
    "jazan",
  ]);
  const isGalleryImage = path.some((segment) => segment === "gallery") && name === "image";
  const isHeroSlideSource = path.some((segment) => segment === "mainHeroSlides") && name === "source";
  const looksLikeImage =
    /^https?:\/\//.test(value) &&
    /\.(avif|jpe?g|png|svg|webp|mp4|mov|webm)(\?|$)/i.test(value);

  return imageKeys.has(name) || isGalleryImage || isHeroSlideSource || (name === "gallery" && looksLikeImage);
}

function imageGuidance(name: string, path: Array<string | number>) {
  const location = path.join(".");

  if (name === "logo" || name === "arabicLogo") {
    return "Recommended: SVG or transparent PNG, around 380 x 160 px. The same logo is used everywhere; over the dark hero it is auto-inverted to white. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("mainHeroSlides")) {
    return "Recommended: 1920 x 1080 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG, MP4, MOV, WebM.";
  }

  if (name === "mainHero" || location.includes("hero")) {
    return "Recommended: 1920 x 1080 px or wider landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("gallery")) {
    return "Recommended: 1600 x 1100 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
  }

  return "Recommended: 1200 x 800 px landscape. Accepted: JPG, PNG, WebP, AVIF, SVG.";
}

function localizedImageGuidance(name: string, path: Array<string | number>, language: Language) {
  if (language !== "ar") {
    return imageGuidance(name, path);
  }

  const location = path.join(".");

  if (name === "logo" || name === "arabicLogo") {
    return "المقاس المقترح: SVG أو PNG شفاف بحجم يقارب 380 x 160 بكسل. يتم استخدام نفس الشعار في كل مكان، ويتم قلب لونه تلقائيا إلى الأبيض فوق البانر الداكن. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("mainHeroSlides")) {
    return "المقاس المقترح: 1920 x 1080 بكسل بنسبة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG, MP4, MOV, WebM.";
  }

  if (name === "mainHero" || location.includes("hero")) {
    return "المقاس المقترح: 1920 x 1080 بكسل أو صورة أفقية أكبر. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  if (location.includes("gallery")) {
    return "المقاس المقترح: 1600 x 1100 بكسل بصورة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
  }

  return "المقاس المقترح: 1200 x 800 بكسل بصورة أفقية. الصيغ المقبولة: JPG, PNG, WebP, AVIF, SVG.";
}

function isLogoField(name: string) {
  return name === "logo" || name === "arabicLogo";
}

function acceptsVideo(name: string, path: Array<string | number>) {
  return path.some((segment) => segment === "mainHeroSlides") && name === "source";
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read the logo image."));
    };
    image.src = url;
  });
}

function colorDistance(
  red: number,
  green: number,
  blue: number,
  targetRed: number,
  targetGreen: number,
  targetBlue: number,
) {
  return Math.sqrt(
    (red - targetRed) ** 2 +
      (green - targetGreen) ** 2 +
      (blue - targetBlue) ** 2,
  );
}

async function removeLogoBackground(file: File) {
  if (file.type === "image/svg+xml") {
    return file;
  }

  const image = await loadImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;
  const samplePoints = [
    [0, 0],
    [canvas.width - 1, 0],
    [0, canvas.height - 1],
    [canvas.width - 1, canvas.height - 1],
  ];
  const background = samplePoints.reduce(
    (total, [x, y]) => {
      const index = (y * canvas.width + x) * 4;
      return {
        red: total.red + data[index],
        green: total.green + data[index + 1],
        blue: total.blue + data[index + 2],
      };
    },
    { red: 0, green: 0, blue: 0 },
  );
  const targetRed = background.red / samplePoints.length;
  const targetGreen = background.green / samplePoints.length;
  const targetBlue = background.blue / samplePoints.length;

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const distance = colorDistance(red, green, blue, targetRed, targetGreen, targetBlue);
    const isNearWhite = red > 242 && green > 242 && blue > 242;

    if (distance < 44 || isNearWhite) {
      data[index + 3] = 0;
    } else if (distance < 72) {
      data[index + 3] = Math.min(data[index + 3], Math.round(((distance - 44) / 28) * 255));
    }
  }

  context.putImageData(imageData, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) {
    return file;
  }

  const cleanName = file.name.replace(/\.[^.]+$/, "");
  return new File([blob], `${cleanName}-transparent.png`, { type: "image/png" });
}

function ImageFieldEditor({
  name,
  value,
  path,
  language,
  onChange,
}: {
  name: string;
  value: string;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
}) {
  const [uploadStatus, setUploadStatus] = useState("");
  const [pickerSource, setPickerSource] = useState<"unsplash" | "pexels" | null>(null);

  function handleStockSelect(asset: { url: string; width?: number; height?: number }) {
    onChange(path, asset.url);
    if (path.at(-1) === "source") {
      onChange([...path.slice(0, -1), "kind"], "image");
    }
    setUploadStatus(
      asset.width && asset.height
        ? language === "ar"
          ? `تم الاستيراد بحجم ${asset.width} x ${asset.height} بكسل. احفظ التغييرات للنشر.`
          : `Imported ${asset.width} x ${asset.height}px. Save changes to publish.`
        : language === "ar"
          ? "تم الاستيراد. احفظ التغييرات للنشر."
          : "Imported. Save changes to publish.",
    );
    setPickerSource(null);
  }

  async function uploadImage(file: File | undefined) {
    if (!file) {
      return;
    }

    setUploadStatus(isLogoField(name) ? "Removing logo background..." : "Uploading image...");

    try {
      const uploadFile = isLogoField(name) && file.type.startsWith("image/")
        ? await removeLogoBackground(file)
        : file;
      const formData = new FormData();
      formData.append("file", uploadFile);

      setUploadStatus("Uploading image...");
      const response = await fetch("/api/site-content/upload", {
        body: formData,
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Upload failed.");
      }

      onChange(path, data.url);
      if (path.at(-1) === "source" && typeof data.type === "string") {
        onChange([...path.slice(0, -1), "kind"], data.type);
      }
      setUploadStatus(
        data.width && data.height
          ? language === "ar"
            ? `تم الرفع بحجم ${data.width} x ${data.height} بكسل${isLogoField(name) ? " مع خلفية شفافة" : ""}. احفظ التغييرات للنشر.`
            : `Uploaded ${data.width} x ${data.height}px${isLogoField(name) ? " with transparent background" : ""}. Save changes to publish.`
          : language === "ar" ? "تم الرفع. احفظ التغييرات للنشر." : "Uploaded. Save changes to publish.",
      );
    } catch (error) {
      setUploadStatus(error instanceof Error ? error.message : "Upload failed. Please try again.");
    }
  }

  return (
    <div className="admin-field admin-image-field">
      <span>{labelFor(name, language)}</span>
      <div className="admin-image-control">
        <div className="admin-image-preview">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" />
          ) : (
            <span>{language === "ar" ? "لم يتم اختيار ملف" : "No photo selected"}</span>
          )}
        </div>
        <div className="admin-image-tools">
          <p>{localizedImageGuidance(name, path, language)}</p>
          <div className="admin-image-actions">
            <label className="admin-image-source-icon admin-image-source-upload">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v12" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
              <span>
                {language === "ar"
                  ? acceptsVideo(name, path) ? "رفع ملف" : "رفع صورة"
                  : acceptsVideo(name, path) ? "Upload media" : "Upload photo"}
              </span>
              <input
                accept={
                  acceptsVideo(name, path)
                    ? "image/avif,image/jpeg,image/png,image/svg+xml,image/webp,video/mp4,video/quicktime,video/webm"
                    : "image/avif,image/jpeg,image/png,image/svg+xml,image/webp"
                }
                type="file"
                onChange={(event) => uploadImage(event.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              className="admin-image-source-icon admin-image-source-unsplash"
              onClick={() => setPickerSource("unsplash")}
              aria-label={language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"}
              title={language === "ar" ? "ابحث في Unsplash" : "Search Unsplash"}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
                <path d="M10 9V0h12v9H10zM22 14h10v18H0V14h10v9h12v-9z" />
              </svg>
              <span>Unsplash</span>
            </button>
            <button
              type="button"
              className="admin-image-source-icon admin-image-source-pexels"
              onClick={() => setPickerSource("pexels")}
              aria-label={language === "ar" ? "ابحث في Pexels" : "Search Pexels"}
              title={language === "ar" ? "ابحث في Pexels" : "Search Pexels"}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
                <path d="M5 0h13a9 9 0 0 1 9 9v3a9 9 0 0 1-9 9h-5v11H5V0zm8 13h5a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4h-5v8z" />
              </svg>
              <span>Pexels</span>
            </button>
          </div>
          {uploadStatus ? <small>{uploadStatus}</small> : null}
        </div>
      </div>
      <input
        type="url"
        value={value}
        placeholder={language === "ar" ? "أو الصق رابط الملف" : "Or paste an image URL"}
        onChange={(event) => onChange(path, event.target.value)}
      />
      {pickerSource ? (
        <StockPhotoPicker
          language={language}
          initialQuery={labelFor(name, "en")}
          initialSource={pickerSource}
          onSelect={handleStockSelect}
          onClose={() => setPickerSource(null)}
        />
      ) : null}
    </div>
  );
}

function countEditableFields(value: JsonValue): number {
  if (Array.isArray(value)) {
    return value.reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  if (isPlainObject(value)) {
    return Object.values(value).reduce<number>((total, item) => total + countEditableFields(item), 0);
  }

  return value === null ? 0 : 1;
}

function sectionMeta(value: JsonValue | null, language: Language) {
  if (!value) {
    return language === "ar" ? "جار التحميل" : "Loading";
  }

  if (Array.isArray(value)) {
    return language === "ar" ? `${value.length} عنصر` : `${value.length} items`;
  }

  if (isPlainObject(value)) {
    const fieldCount = countEditableFields(value);
    return language === "ar" ? `${fieldCount} حقل قابل للتعديل` : `${fieldCount} editable fields`;
  }

  return language === "ar" ? "حقل واحد قابل للتعديل" : "1 editable field";
}

function statusLabel(status: string, language: Language) {
  const labels: Record<string, Record<Language, string>> = {
    loading: {
      ar: "جار تحميل المحتوى...",
      en: "Loading content...",
    },
    ready: {
      ar: "جاهز للتعديل",
      en: "Ready to edit",
    },
    loadError: {
      ar: "تعذر تحميل المحتوى.",
      en: "Could not load content.",
    },
    dirty: {
      ar: "توجد تغييرات غير محفوظة",
      en: "Unsaved changes",
    },
    saving: {
      ar: "جار حفظ التغييرات...",
      en: "Saving changes...",
    },
    saved: {
      ar: "تم الحفظ. الصفحات العامة تتحدث تلقائيا.",
      en: "Saved. Public pages update automatically.",
    },
    saveError: {
      ar: "فشل الحفظ. يرجى المحاولة مرة أخرى.",
      en: "Save failed. Please try again.",
    },
  };

  return labels[status]?.[language] ?? status;
}

function StringFieldEditor({
  name,
  value,
  path,
  language,
  onChange,
  isNumber,
}: {
  name: string;
  value: string;
  path: Array<string | number>;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  isNumber?: boolean;
}) {
  const isUrl = ["href", "image", "secondaryHref", "source"].includes(name);
  const isOpaque = ["slug", "type", "kind", "mapQuery"].includes(name);

  if (isUrl) {
    return (
      <label className="admin-field">
        <span>{labelFor(name, language)}</span>
        <input
          type="url"
          value={value}
          onChange={(event) => onChange(path, event.target.value)}
        />
      </label>
    );
  }

  if (isNumber) {
    return (
      <label className="admin-field">
        <span>{labelFor(name, language)}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(path, Number(event.target.value))}
        />
      </label>
    );
  }

  if (isLongField(name, value)) {
    return (
      <div className="admin-field">
        <span className="admin-field-label-row">
          <span>{labelFor(name, language)}</span>
          {!isOpaque ? (
            <span className="admin-field-actions">
              <RephraseButton value={value} language={language} path={path} isHtml onChange={onChange} />
              <TranslateButton value={value} sourceLanguage={language} path={path} isHtml onChange={onChange} />
            </span>
          ) : null}
        </span>
        <RichEditor
          value={value}
          onChange={(html) => onChange(path, html)}
          dir={language === "ar" ? "rtl" : "ltr"}
          ariaLabel={labelFor(name, language)}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className="admin-field">
      <span className="admin-field-label-row">
        <span>{labelFor(name, language)}</span>
        {!isOpaque ? (
          <span className="admin-field-actions">
            <RephraseButton value={value} language={language} path={path} onChange={onChange} />
            <TranslateButton value={value} sourceLanguage={language} path={path} onChange={onChange} />
          </span>
        ) : null}
      </span>
      <input
        type="text"
        aria-label={labelFor(name, language)}
        value={value}
        onChange={(event) => onChange(path, event.target.value)}
      />
    </div>
  );
}

function FieldEditor({
  name,
  value,
  path,
  level = 0,
  language,
  onChange,
  onReorder,
}: {
  name: string;
  value: JsonValue;
  path: Array<string | number>;
  level?: number;
  language: Language;
  onChange: (path: Array<string | number>, value: JsonValue) => void;
  onReorder: (path: Array<string | number>, from: number, to: number) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (typeof value === "string" || typeof value === "number") {
    const stringValue = String(value);

    if (typeof value === "string" && isImageField(name, path, value)) {
      return <ImageFieldEditor name={name} value={value} path={path} language={language} onChange={onChange} />;
    }

    return (
      <StringFieldEditor
        name={name}
        value={stringValue}
        path={path}
        language={language}
        onChange={onChange}
        isNumber={typeof value === "number"}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-check">
        <input
          checked={value}
          type="checkbox"
          onChange={(event) => onChange(path, event.target.checked)}
        />
        <span>{labelFor(name, language)}</span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    const primitiveList = value.every((item) => !isPlainObject(item) && !Array.isArray(item));

    return (
      <section className="admin-array">
        <div className="admin-array-head">
          <div>
            <h4>{labelFor(name, language)}</h4>
              <p>
                {language === "ar"
                  ? `${value.length} عنصر. استخدم مقبض السحب لتغيير الترتيب.`
                  : `${value.length} items. Use the drag handle to reorder.`}
              </p>
          </div>
          <button type="button" onClick={() => onChange(path, [...value, cloneTemplate(value[0] ?? "")])}>
            {language === "ar" ? "إضافة عنصر" : "Add item"}
          </button>
        </div>

        <div className={primitiveList ? "admin-list-editor" : "admin-array-list"}>
          {value.map((item, index) => {
            const fallback = `${labelFor(name, language)} ${index + 1}`;

            if (primitiveList) {
              return (
                <div
                  className="admin-list-row"
                  key={`${path.join(".")}-${index}`}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (dragIndex !== null) {
                      onReorder(path, dragIndex, index);
                      setDragIndex(null);
                    }
                  }}
                >
                  <span
                    className="admin-drag-handle"
                    draggable
                    aria-label={language === "ar" ? "اسحب لتغيير ترتيب العنصر" : "Drag item to reorder"}
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => setDragIndex(null)}
                  >
                    ::
                  </span>
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    language={language}
                    onChange={onChange}
                    onReorder={onReorder}
                  />
                  <button
                    className="admin-remove"
                    type="button"
                    onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                  >
                    {language === "ar" ? "حذف" : "Delete"}
                  </button>
                </div>
              );
            }

            return (
              <details
                className="admin-array-item"
                key={`${path.join(".")}-${index}`}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) {
                    onReorder(path, dragIndex, index);
                    setDragIndex(null);
                  }
                }}
              >
                <summary className="admin-item-summary">
                  <span
                    className="admin-drag-handle"
                    draggable
                    aria-label={language === "ar" ? "اسحب لتغيير ترتيب العنصر" : "Drag item to reorder"}
                    onClick={(event) => event.preventDefault()}
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => setDragIndex(null)}
                  >
                    ::
                  </span>
                  <span>
                    <strong>{itemTitle(item, fallback)}</strong>
                    <small>{fallback}</small>
                  </span>
                  <button
                    className="admin-remove"
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      onChange(path, value.filter((_, itemIndex) => itemIndex !== index));
                    }}
                  >
                    {language === "ar" ? "حذف" : "Delete"}
                  </button>
                </summary>
                <div className="admin-nested">
                  <FieldEditor
                    name={name}
                    value={item}
                    path={[...path, index]}
                    level={level + 1}
                    language={language}
                    onChange={onChange}
                    onReorder={onReorder}
                  />
                </div>
              </details>
            );
          })}
        </div>
      </section>
    );
  }

  if (isPlainObject(value)) {
    return (
      <section className={level === 0 ? "admin-object admin-object-root" : "admin-object"}>
        {level > 0 ? <h3>{labelFor(name, language)}</h3> : null}
        <div className="admin-field-grid">
          {orderedEntries(value).filter(({ key }) => shouldShowField(path, key)).map(({ key, value: item }) => (
            <FieldEditor
              key={`${path.join(".")}-${key}`}
              name={key}
              value={item}
              path={[...path, key]}
              level={level + 1}
              language={language}
              onChange={onChange}
              onReorder={onReorder}
            />
          ))}
        </div>
      </section>
    );
  }

  return null;
}

// Structural sections that must always render — hiding them would break the site layout.
const NON_HIDEABLE_SECTIONS = new Set(["navGroups", "media", "footerSections", "footerContact"]);

export default function SecretPanel({ language = "en" }: { language?: Language }) {
  const [content, setContent] = useState<JsonObject | null>(null);
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState("hero");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [statusTone, setStatusTone] = useState<StatusTone>("ready");

  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setContent(data.content);
        setHiddenSections(Array.isArray(data.hiddenSections) ? data.hiddenSections : []);
        setStatus("ready");
        setStatusTone("ready");
      })
      .catch(() => {
        setStatus("loadError");
        setStatusTone("error");
      });
  }, []);

  const selectedSection = adminSections.find((section) => section.id === selectedId) ?? adminSections[0];
  const selectedSectionCopy = sectionCopy(selectedSection, language);
  const activePath = [language, ...selectedSection.path];
  const sectionValue = content ? getAtPath(content, activePath) : null;
  const selectedHideable = !NON_HIDEABLE_SECTIONS.has(selectedSection.id);
  const selectedHidden = hiddenSections.includes(selectedSection.id);

  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return adminSections;
    }

    return adminSections.filter((section) => {
      const copy = sectionCopy(section, language);
      return `${section.group} ${section.label} ${section.description} ${copy.group} ${copy.label} ${copy.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [language, query]);

  const groupedSections = useMemo(() => {
    return filteredSections.reduce<Record<string, AdminSection[]>>((groups, section) => {
      groups[section.group] = [...(groups[section.group] ?? []), section];
      return groups;
    }, {});
  }, [filteredSections]);

  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set([selectedSection.group]));

  function toggleGroup(group: string) {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  }

  function updateValue(path: Array<string | number>, value: JsonValue) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return setAtPath(current, path, value) as JsonObject;
    });
    setStatus("dirty");
    setStatusTone("dirty");
  }

  function reorderValue(path: Array<string | number>, from: number, to: number) {
    setContent((current) => {
      if (!current) {
        return current;
      }

      return reorderAtPath(current, path, from, to) as JsonObject;
    });
    setStatus("dirty");
    setStatusTone("dirty");
  }

  function toggleHidden(id: string) {
    if (NON_HIDEABLE_SECTIONS.has(id)) {
      return;
    }
    setHiddenSections((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
    setStatus("dirty");
    setStatusTone("dirty");
  }

  async function save() {
    if (!content || statusTone === "saving") {
      return;
    }

    setStatus("saving");
    setStatusTone("saving");

    try {
      const response = await fetch("/api/site-content", {
        body: JSON.stringify({ content, hiddenSections }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Save failed.");
      }

      setContent(data.content);
      if (Array.isArray(data.hiddenSections)) {
        setHiddenSections(data.hiddenSections);
      }
      setStatus("saved");
      setStatusTone("ready");
    } catch {
      setStatus("saveError");
      setStatusTone("error");
    }
  }

  return (
    <main className="admin-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">SB</span>
          <div>
            <p>{language === "ar" ? "إدارة سويس بلو" : "Swiss Blue CMS"}</p>
            <h1>{language === "ar" ? "استوديو المحتوى" : "Content Studio"}</h1>
          </div>
        </div>

        <div className="admin-mode-card">
          <span>{language === "ar" ? "لوحة عربية" : "English panel"}</span>
          <p>
            {language === "ar"
              ? "هذه اللوحة مخصصة لتعديل النسخة العربية فقط."
              : "This panel edits the English website only."}
          </p>
          <a href={language === "ar" ? "/secretpanel" : "/secretpanel/ar"}>
            {language === "ar" ? "الانتقال للوحة الإنجليزية" : "Switch to Arabic panel"}
          </a>
        </div>

        <label className="admin-search">
          <span>{language === "ar" ? "البحث في الأقسام" : "Search sections"}</span>
          <input
            type="search"
            value={query}
            placeholder={language === "ar" ? "ابحث عن الرئيسية، الفوتر، العروض..." : "Find homepage, footer, offers..."}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>

        <nav className="admin-section-list" aria-label={language === "ar" ? "أقسام لوحة الإدارة" : "CMS sections"}>
          {Object.entries(groupedSections).map(([group, sections]) => {
            const localizedGroup = sectionCopy(sections[0], language).group;
            const isSearching = query.trim().length > 0;
            const isOpen = isSearching || openGroups.has(group);

            return (
              <div className={`admin-nav-group${isOpen ? " is-open" : ""}`} key={group}>
                <button
                  type="button"
                  className="admin-nav-group-toggle"
                  onClick={() => toggleGroup(group)}
                  aria-expanded={isOpen}
                >
                  <span className="admin-nav-group-caret" aria-hidden="true" />
                  <span>{localizedGroup}</span>
                </button>
                {isOpen
                  ? sections.map((section) => {
                      const copy = sectionCopy(section, language);

                      return (
                        <button
                          className={selectedSection.id === section.id ? "active" : ""}
                          key={section.id}
                          type="button"
                          onClick={() => setSelectedId(section.id)}
                        >
                          <span>
                            {copy.label}
                            {hiddenSections.includes(section.id) ? (
                              <span className="admin-hidden-badge">
                                {language === "ar" ? "مخفي" : "Hidden"}
                              </span>
                            ) : null}
                          </span>
                          <small>{copy.description}</small>
                        </button>
                      );
                    })
                  : null}
              </div>
            );
          })}
        </nav>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              {selectedSectionCopy.group} / {languages[language].label}
            </p>
            <h2>{selectedSectionCopy.label}</h2>
            <p>{selectedSectionCopy.description}</p>
          </div>

          <div className="admin-actions">
            <span className={`admin-status ${statusTone}`}>{statusLabel(status, language)}</span>
            {selectedHideable ? (
              <button
                type="button"
                className={`admin-hide-toggle${selectedHidden ? " is-hidden" : ""}`}
                onClick={() => toggleHidden(selectedSection.id)}
                aria-pressed={selectedHidden}
              >
                {selectedHidden
                  ? language === "ar"
                    ? "إظهار القسم"
                    : "Show section"
                  : language === "ar"
                    ? "إخفاء القسم"
                    : "Hide section"}
              </button>
            ) : null}
            <a className="admin-preview" href={languages[language].previewHref} target="_blank" rel="noreferrer">
              {language === "ar" ? "معاينة الموقع" : "Preview site"}
            </a>
            <button className="admin-save" type="button" onClick={save}>
              {language === "ar" ? "حفظ التغييرات" : "Save changes"}
            </button>
          </div>
        </header>

        <div className="admin-editor-grid">
          <section className="admin-panel admin-content-panel" dir={language === "ar" ? "rtl" : "ltr"}>
            <div className="admin-panel-head">
              <div>
                <p className="admin-kicker">
                  {language === "ar" ? "محتوى عربي" : `${languages[language].short} content`}
                </p>
                <h3>{selectedSectionCopy.label}</h3>
              </div>
              <span>{sectionMeta(sectionValue, language)}</span>
            </div>

            {selectedHidden ? (
              <div className="admin-hidden-note">
                {language === "ar"
                  ? 'هذا القسم مخفي حاليًا من الموقع المباشر. اضغط "إظهار القسم" ثم احفظ لإعادته.'
                  : 'This section is hidden from the live site. Click "Show section", then save, to restore it.'}
              </div>
            ) : null}

            {sectionValue ? (
              <FieldEditor
                name={selectedSection.id}
                value={sectionValue}
                path={activePath}
                language={language}
                onChange={updateValue}
                onReorder={reorderValue}
              />
            ) : (
              <div className="content-card">{language === "ar" ? "جار تحميل المحرر..." : "Loading editor..."}</div>
            )}
          </section>

          <aside className="admin-help">
            <p className="admin-kicker">{language === "ar" ? "دليل التحرير" : "Editing guide"}</p>
            <h3>{language === "ar" ? "طريقة العمل" : "Workflow"}</h3>
            <ul>
              <li>{language === "ar" ? "استخدم اللوحة المناسبة للنسخة التي تريد تعديلها." : "Use the panel that matches the website version you want to edit."}</li>
              <li>{language === "ar" ? "اختر القسم من القائمة الجانبية." : "Choose a section from the sidebar."}</li>
              <li>{language === "ar" ? "استخدم مقبض السحب فقط لتغيير ترتيب البطاقات." : "Use the drag handle only to reorder repeated cards."}</li>
              <li>{language === "ar" ? "احفظ بعد الانتهاء من مجموعة التعديلات." : "Save once you finish a group of edits."}</li>
            </ul>
            <div>
              <strong>{language === "ar" ? "تحديث مباشر" : "Live update"}</strong>
              <p>
                {language === "ar"
                  ? "يتم حفظ المحتوى في نظام الإدارة، وتتحدث الصفحات العامة بدون إعادة نشر."
                  : "Saved content is stored in the CMS backend and public pages refresh without redeploy."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
