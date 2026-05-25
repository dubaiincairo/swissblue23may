import { createClient } from "next-sanity";
import {
  accommodationCategories,
  BOOKING_URL,
  destinations,
  footerContact,
  footerSections,
  heroImage,
  hotels,
  loyaltyProgram,
  navGroups,
  services,
} from "@/lib/content";
import {
  accommodationCategoriesEn,
  destinationsEn,
  footerContactEn,
  footerSectionsEn,
  hotelsEn,
  loyaltyProgramEn,
  navGroupsEn,
  offersEn,
  servicesEn,
} from "@/lib/content-en";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const documentId = "site-content-singleton";

const homeOffers = [
  {
    title: "إقامة أعمال",
    text: "راحة يومية، إنترنت سريع، دعم للاجتماعات، ومواقع عملية داخل المدن لرحلات أكثر إنتاجية.",
  },
  {
    title: "إقامة عائلية في شقة",
    text: "مساحات متعددة الغرف، خصوصية أعلى، وراحة الشقق المخدومة لزيارات عائلية أسهل.",
  },
  {
    title: "إقامة شهرية",
    text: "قيمة أفضل للضيوف الذين يحتاجون إلى قاعدة إقامة موثوقة لفترة طويلة في جدة أو جازان أو الرياض.",
  },
];

const highlights = [
  { value: "6", label: "وجهات فندقية" },
  { value: "282", label: "غرفة وشقة" },
  { value: "3", label: "مدن سعودية" },
  { value: "24", label: "ساعة لخدمة الضيوف" },
];

const highlightsEn = [
  { value: "6", label: "Hospitality properties" },
  { value: "282", label: "Rooms and apartments" },
  { value: "3", label: "Saudi cities" },
  { value: "24h", label: "Guest support" },
];

export const defaultSiteContent = {
  ar: {
    navGroups,
    footerSections,
    footerContact,
    homepage: {
      hero: {
        eyebrow: "فنادق وشقق فندقية في السعودية",
        title: "سويس بلو، إقامة أوضح لكل رحلة.",
        text: "محفظة ضيافة تجمع الفنادق والشقق الفندقية والشقق المخدومة في جدة وجازان والرياض، مصممة للأعمال والعائلات والإقامات الشهرية.",
        primaryCta: "احجز إقامتك",
        secondaryCta: "استكشف الفنادق",
        secondaryHref: "/hotels",
        destination: "جدة، الرياض، جازان",
      },
      highlights,
      properties: {
        eyebrow: "منشآت الضيافة",
        title: "ست وجهات، ولكل إقامة سبب واضح للاختيار.",
        text: "صممت بطاقات الفنادق لتساعد الضيف على مقارنة المدينة، نوع الإقامة، وعدد الوحدات بسرعة قبل الانتقال إلى صفحة الفندق التفصيلية.",
        items: hotels,
      },
      loyalty: loyaltyProgram,
      destinations: {
        eyebrow: "الوجهات",
        title: "اختر المدينة التي تناسب رحلتك.",
        text: "تقدم سويس بلو حضورها في مدن تجمع بين الأعمال، الترفيه، الزيارات العائلية، والإقامات الطويلة.",
        items: destinations,
      },
      offers: {
        eyebrow: "العروض والمناسبات",
        title: "احجز الإقامة حسب سبب الرحلة.",
        text: "ساعد الضيوف على الانتقال من نية السفر إلى الخيار المناسب، من رحلات الأعمال إلى الإقامة العائلية والإقامة الشهرية.",
        cta: "عرض العروض",
        href: "/offers",
        items: homeOffers,
      },
      services: {
        eyebrow: "الخدمات",
        title: "تفاصيل يومية تجعل الإقامة أسهل.",
        text: "تختلف بعض الخدمات حسب الوجهة، لكن التجربة مصممة حول أساسيات الراحة: الحجز الواضح، الضيافة اليومية، الاتصال السريع، والدعم العملي.",
        items: services,
      },
      categories: {
        eyebrow: "فئات الإقامة",
        title: "الفرق بين الفندق، الشقق الفندقية، والشقق المخدومة.",
        text: "هذا التقسيم يجعل قرار الحجز أكثر وضوحا للضيف، ويساعد فرق الشركات والعائلات على اختيار الفئة المناسبة لمدة الإقامة وطبيعة الرحلة.",
        items: accommodationCategories,
      },
      cta: {
        eyebrow: "جاهزون لاستقبالكم",
        title: "اعثر على إقامتك القادمة مع سويس بلو.",
        text: "قارن بين الفنادق والشقق الفندقية والشقق المخدومة، ثم انتقل إلى الحجز المباشر بخطوة واحدة.",
        button: "احجز الآن",
      },
    },
  },
  en: {
    navGroups: navGroupsEn,
    footerSections: footerSectionsEn,
    footerContact: footerContactEn,
    homepage: {
      hero: {
        eyebrow: "Hotels and apart-hotels in Saudi Arabia",
        title: "Swiss Blue, a clearer stay for every journey.",
        text: "A hospitality portfolio of hotels, apart-hotels, and serviced apartments in Jeddah, Jazan, and Riyadh, designed for business, families, and monthly stays.",
        primaryCta: "Book your stay",
        secondaryCta: "Explore properties",
        secondaryHref: "/en/hotels",
        destination: "Jeddah, Riyadh, Jazan",
      },
      highlights: highlightsEn,
      properties: {
        eyebrow: "Hospitality properties",
        title: "Six destinations, each with a clear reason to book.",
        text: "Property cards help guests compare the city, stay type, and unit count before moving into the detailed property page.",
        items: hotelsEn,
      },
      loyalty: loyaltyProgramEn,
      destinations: {
        eyebrow: "Destinations",
        title: "Choose the city that fits your trip.",
        text: "Swiss Blue is present in cities shaped by business, leisure, family visits, and longer stays.",
        items: destinationsEn,
      },
      offers: {
        eyebrow: "Offers and occasions",
        title: "Book the stay around the reason for travel.",
        text: "Guide guests from travel intent to the right choice, from business trips to family apartment stays and monthly stays.",
        cta: "View offers",
        href: "/en/offers",
        items: offersEn.slice(0, 3),
      },
      services: {
        eyebrow: "Services",
        title: "Everyday details that make the stay easier.",
        text: "Some services vary by property, but the experience is built around clear booking, daily hospitality, fast connectivity, and practical guest support.",
        items: servicesEn,
      },
      categories: {
        eyebrow: "Stay categories",
        title: "The difference between hotels, apart-hotels, and serviced apartments.",
        text: "This comparison makes booking clearer for guests and helps companies and families choose the right category for trip purpose and stay length.",
        items: accommodationCategoriesEn,
      },
      cta: {
        eyebrow: "Book direct",
        title: "Find your next Swiss Blue stay.",
        text: "Compare hotels, apart-hotels, and serviced apartments, then move to direct booking in one step.",
        button: "Book now",
      },
    },
  },
};

export type EditableSiteContent = typeof defaultSiteContent;

function getSanityClient(token?: string) {
  if (!projectId || !dataset) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}

function mergeContent(content: Partial<EditableSiteContent> | null): EditableSiteContent {
  return {
    ar: {
      ...defaultSiteContent.ar,
      ...(content?.ar ?? {}),
      homepage: {
        ...defaultSiteContent.ar.homepage,
        ...(content?.ar?.homepage ?? {}),
      },
    },
    en: {
      ...defaultSiteContent.en,
      ...(content?.en ?? {}),
      homepage: {
        ...defaultSiteContent.en.homepage,
        ...(content?.en?.homepage ?? {}),
      },
    },
  };
}

export async function getEditableContent(): Promise<EditableSiteContent> {
  const client = getSanityClient(process.env.SANITY_API_READ_TOKEN);

  if (!client) {
    return defaultSiteContent;
  }

  try {
    const document = await client.fetch(
      `*[_id == $id][0]{content}`,
      { id: documentId },
      { cache: "no-store" },
    );
    return mergeContent(document?.content ?? null);
  } catch {
    return defaultSiteContent;
  }
}

export async function getEditableContentVersion() {
  const client = getSanityClient(process.env.SANITY_API_READ_TOKEN);

  if (!client) {
    return "default";
  }

  try {
    const document = await client.fetch(
      `*[_id == $id][0]{updatedAt, _updatedAt}`,
      { id: documentId },
      { cache: "no-store" },
    );

    return document?.updatedAt ?? document?._updatedAt ?? "default";
  } catch {
    return "default";
  }
}

export async function saveEditableContent(content: EditableSiteContent) {
  const client = getSanityClient(process.env.SANITY_API_WRITE_TOKEN);

  if (!client) {
    throw new Error("Sanity write client is not configured.");
  }

  return client.createOrReplace({
    _id: documentId,
    _type: "siteContent",
    title: "Swiss Blue Website Content",
    content,
    updatedAt: new Date().toISOString(),
  });
}

export { BOOKING_URL, heroImage };
