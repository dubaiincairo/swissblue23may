import { createClient } from "next-sanity";
import {
  accommodationCategories,
  BOOKING_URL,
  destinations,
  footerContact,
  footerSections,
  heroImage,
  hotels,
  jazanImage,
  jeddahImage,
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
import { faqCategories, homepageFaqs, propertyFaqs } from "@/lib/faq-content";
import { faqCategoriesEn, homepageFaqsEn, propertyFaqsEn } from "@/lib/faq-content-en";
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

export const defaultLogoImage =
  "https://swissbluehotels.com/wp-content/uploads/2024/03/%D9%84%D9%88%D8%AC%D9%88-%D8%B3%D9%88%D9%8A%D8%B3-%D8%A8%D9%84%D9%88.png";

const galleryImages = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=82",
    title: "استقبال بروح الضيافة",
  },
  {
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=82",
    title: "راحة فندقية داخل المدينة",
  },
  {
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=82",
    title: "غرف وأجنحة هادئة",
  },
  {
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=82",
    title: "إقامات بطابع الشقق",
  },
  {
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82",
    title: "مساحات طعام واستراحة",
  },
];

const galleryImagesEn = [
  { ...galleryImages[0], title: "Resort-style arrival" },
  { ...galleryImages[1], title: "City hotel comfort" },
  { ...galleryImages[2], title: "Quiet rooms and suites" },
  { ...galleryImages[3], title: "Apartment-style stays" },
  { ...galleryImages[4], title: "Dining and lounge spaces" },
];

const heroSlides = [
  {
    kind: "image",
    source: heroImage,
    alt: "إطلالة ساحلية بالقرب من وجهات سويس بلو",
  },
  {
    kind: "image",
    source: jeddahImage,
    alt: "مشهد حضري في جدة",
  },
  {
    kind: "image",
    source: jazanImage,
    alt: "وجهة طبيعية في جازان",
  },
];

const heroSlidesEn = [
  { ...heroSlides[0], alt: "Coastal view near Swiss Blue destinations" },
  { ...heroSlides[1], alt: "Urban scene in Jeddah" },
  { ...heroSlides[2], alt: "Natural destination in Jazan" },
];

export const defaultSiteContent = {
  ar: {
    navGroups,
    footerSections,
    footerContact,
    media: {
      logo: defaultLogoImage,
      arabicLogo: defaultLogoImage,
      mainHero: heroImage,
      mainHeroSlides: heroSlides,
      jeddah: jeddahImage,
      jazan: jazanImage,
      gallery: galleryImages,
    },
    faq: {
      homepage: homepageFaqs,
      property: propertyFaqs,
      categories: faqCategories,
    },
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
    media: {
      logo: defaultLogoImage,
      mainHero: heroImage,
      mainHeroSlides: heroSlidesEn,
      jeddah: jeddahImage,
      jazan: jazanImage,
      gallery: galleryImagesEn,
    },
    faq: {
      homepage: homepageFaqsEn,
      property: propertyFaqsEn,
      categories: faqCategoriesEn,
    },
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

function sharedImageValue(
  left: string,
  right: string,
  leftDefault: string,
  rightDefault: string,
) {
  if (left === leftDefault && right !== rightDefault) {
    return [right, right] as const;
  }

  if (right === rightDefault && left !== leftDefault) {
    return [left, left] as const;
  }

  return [left, right] as const;
}

function syncMediaGallery(
  arGallery: EditableSiteContent["ar"]["media"]["gallery"],
  enGallery: EditableSiteContent["en"]["media"]["gallery"],
) {
  const maxLength = Math.max(arGallery.length, enGallery.length);

  return {
    ar: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arGallery[index] ?? defaultSiteContent.ar.media.gallery[index];
      const enItem = enGallery[index] ?? defaultSiteContent.en.media.gallery[index];

      if (!arItem) {
        return arItem;
      }

      if (!enItem) {
        return arItem;
      }

      const [image] = sharedImageValue(
        arItem.image,
        enItem.image,
        defaultSiteContent.ar.media.gallery[index]?.image ?? arItem.image,
        defaultSiteContent.en.media.gallery[index]?.image ?? enItem.image,
      );

      return { ...arItem, image };
    }).filter(Boolean) as EditableSiteContent["ar"]["media"]["gallery"],
    en: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arGallery[index] ?? defaultSiteContent.ar.media.gallery[index];
      const enItem = enGallery[index] ?? defaultSiteContent.en.media.gallery[index];

      if (!enItem) {
        return enItem;
      }

      if (!arItem) {
        return enItem;
      }

      const [, image] = sharedImageValue(
        arItem.image,
        enItem.image,
        defaultSiteContent.ar.media.gallery[index]?.image ?? arItem.image,
        defaultSiteContent.en.media.gallery[index]?.image ?? enItem.image,
      );

      return { ...enItem, image };
    }).filter(Boolean) as EditableSiteContent["en"]["media"]["gallery"],
  };
}

function syncHeroSlides(
  arSlides: EditableSiteContent["ar"]["media"]["mainHeroSlides"],
  enSlides: EditableSiteContent["en"]["media"]["mainHeroSlides"],
) {
  const maxLength = Math.max(arSlides.length, enSlides.length);

  return {
    ar: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arSlides[index] ?? defaultSiteContent.ar.media.mainHeroSlides[index];
      const enItem = enSlides[index] ?? defaultSiteContent.en.media.mainHeroSlides[index];

      if (!arItem) {
        return arItem;
      }

      if (!enItem) {
        return arItem;
      }

      const [source] = sharedImageValue(
        arItem.source,
        enItem.source,
        defaultSiteContent.ar.media.mainHeroSlides[index]?.source ?? arItem.source,
        defaultSiteContent.en.media.mainHeroSlides[index]?.source ?? enItem.source,
      );

      return { ...arItem, kind: arItem.kind || enItem.kind, source };
    }).filter(Boolean) as EditableSiteContent["ar"]["media"]["mainHeroSlides"],
    en: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arSlides[index] ?? defaultSiteContent.ar.media.mainHeroSlides[index];
      const enItem = enSlides[index] ?? defaultSiteContent.en.media.mainHeroSlides[index];

      if (!enItem) {
        return enItem;
      }

      if (!arItem) {
        return enItem;
      }

      const [, source] = sharedImageValue(
        arItem.source,
        enItem.source,
        defaultSiteContent.ar.media.mainHeroSlides[index]?.source ?? arItem.source,
        defaultSiteContent.en.media.mainHeroSlides[index]?.source ?? enItem.source,
      );

      return { ...enItem, kind: enItem.kind || arItem.kind, source };
    }).filter(Boolean) as EditableSiteContent["en"]["media"]["mainHeroSlides"],
  };
}

function syncPropertyImages(
  arProperties: EditableSiteContent["ar"]["homepage"]["properties"]["items"],
  enProperties: EditableSiteContent["en"]["homepage"]["properties"]["items"],
) {
  const enBySlug = new Map(enProperties.map((property) => [property.slug, property]));
  const defaultArBySlug = new Map(defaultSiteContent.ar.homepage.properties.items.map((property) => [property.slug, property]));
  const defaultEnBySlug = new Map(defaultSiteContent.en.homepage.properties.items.map((property) => [property.slug, property]));

  const ar = arProperties.map((property) => {
    const enProperty = enBySlug.get(property.slug);
    const arDefault = defaultArBySlug.get(property.slug);
    const enDefault = defaultEnBySlug.get(property.slug);

    if (!enProperty || !arDefault || !enDefault) {
      return property;
    }

    const [image] = sharedImageValue(property.image, enProperty.image, arDefault.image, enDefault.image);
    const gallery = property.gallery.map((galleryImage, index) => {
      const [nextImage] = sharedImageValue(
        galleryImage,
        enProperty.gallery[index] ?? galleryImage,
        arDefault.gallery[index] ?? galleryImage,
        enDefault.gallery[index] ?? enProperty.gallery[index] ?? galleryImage,
      );

      return nextImage;
    });

    return { ...property, image, gallery };
  });

  const arBySlug = new Map(arProperties.map((property) => [property.slug, property]));
  const en = enProperties.map((property) => {
    const arProperty = arBySlug.get(property.slug);
    const arDefault = defaultArBySlug.get(property.slug);
    const enDefault = defaultEnBySlug.get(property.slug);

    if (!arProperty || !arDefault || !enDefault) {
      return property;
    }

    const [, image] = sharedImageValue(arProperty.image, property.image, arDefault.image, enDefault.image);
    const gallery = property.gallery.map((galleryImage, index) => {
      const [, nextImage] = sharedImageValue(
        arProperty.gallery[index] ?? galleryImage,
        galleryImage,
        arDefault.gallery[index] ?? arProperty.gallery[index] ?? galleryImage,
        enDefault.gallery[index] ?? galleryImage,
      );

      return nextImage;
    });

    return { ...property, image, gallery };
  });

  return { ar, en };
}

function syncDestinationImages(
  arDestinations: EditableSiteContent["ar"]["homepage"]["destinations"]["items"],
  enDestinations: EditableSiteContent["en"]["homepage"]["destinations"]["items"],
) {
  const maxLength = Math.max(arDestinations.length, enDestinations.length);

  return {
    ar: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arDestinations[index];
      const enItem = enDestinations[index];
      const arDefault = defaultSiteContent.ar.homepage.destinations.items[index];
      const enDefault = defaultSiteContent.en.homepage.destinations.items[index];

      if (!arItem || !enItem || !arDefault || !enDefault) {
        return arItem;
      }

      const [image] = sharedImageValue(arItem.image, enItem.image, arDefault.image, enDefault.image);
      return { ...arItem, image };
    }).filter(Boolean) as EditableSiteContent["ar"]["homepage"]["destinations"]["items"],
    en: Array.from({ length: maxLength }, (_, index) => {
      const arItem = arDestinations[index];
      const enItem = enDestinations[index];
      const arDefault = defaultSiteContent.ar.homepage.destinations.items[index];
      const enDefault = defaultSiteContent.en.homepage.destinations.items[index];

      if (!arItem || !enItem || !arDefault || !enDefault) {
        return enItem;
      }

      const [, image] = sharedImageValue(arItem.image, enItem.image, arDefault.image, enDefault.image);
      return { ...enItem, image };
    }).filter(Boolean) as EditableSiteContent["en"]["homepage"]["destinations"]["items"],
  };
}

function syncSharedImages(content: EditableSiteContent): EditableSiteContent {
  const [logoAr, logoEn] = sharedImageValue(
    content.ar.media.logo,
    content.en.media.logo,
    defaultSiteContent.ar.media.logo,
    defaultSiteContent.en.media.logo,
  );
  const [mainHeroAr, mainHeroEn] = sharedImageValue(
    content.ar.media.mainHero,
    content.en.media.mainHero,
    defaultSiteContent.ar.media.mainHero,
    defaultSiteContent.en.media.mainHero,
  );
  const [jeddahAr, jeddahEn] = sharedImageValue(
    content.ar.media.jeddah,
    content.en.media.jeddah,
    defaultSiteContent.ar.media.jeddah,
    defaultSiteContent.en.media.jeddah,
  );
  const [jazanAr, jazanEn] = sharedImageValue(
    content.ar.media.jazan,
    content.en.media.jazan,
    defaultSiteContent.ar.media.jazan,
    defaultSiteContent.en.media.jazan,
  );
  const syncedGallery = syncMediaGallery(content.ar.media.gallery, content.en.media.gallery);
  const syncedHeroSlides = syncHeroSlides(
    content.ar.media.mainHeroSlides,
    content.en.media.mainHeroSlides,
  );
  const syncedProperties = syncPropertyImages(
    content.ar.homepage.properties.items,
    content.en.homepage.properties.items,
  );
  const syncedDestinations = syncDestinationImages(
    content.ar.homepage.destinations.items,
    content.en.homepage.destinations.items,
  );

  return {
    ar: {
      ...content.ar,
      media: {
        ...content.ar.media,
        logo: logoAr,
        arabicLogo: content.ar.media.arabicLogo,
        mainHero: mainHeroAr,
        mainHeroSlides: syncedHeroSlides.ar,
        jeddah: jeddahAr,
        jazan: jazanAr,
        gallery: syncedGallery.ar,
      },
      homepage: {
        ...content.ar.homepage,
        properties: {
          ...content.ar.homepage.properties,
          items: syncedProperties.ar,
        },
        destinations: {
          ...content.ar.homepage.destinations,
          items: syncedDestinations.ar,
        },
      },
    },
    en: {
      ...content.en,
      media: {
        ...content.en.media,
        logo: logoEn,
        mainHero: mainHeroEn,
        mainHeroSlides: syncedHeroSlides.en,
        jeddah: jeddahEn,
        jazan: jazanEn,
        gallery: syncedGallery.en,
      },
      homepage: {
        ...content.en.homepage,
        properties: {
          ...content.en.homepage.properties,
          items: syncedProperties.en,
        },
        destinations: {
          ...content.en.homepage.destinations,
          items: syncedDestinations.en,
        },
      },
    },
  };
}

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
  return syncSharedImages({
    ar: {
      ...defaultSiteContent.ar,
      ...(content?.ar ?? {}),
      media: {
        ...defaultSiteContent.ar.media,
        ...(content?.ar?.media ?? {}),
      },
      faq: {
        ...defaultSiteContent.ar.faq,
        ...(content?.ar?.faq ?? {}),
      },
      homepage: {
        ...defaultSiteContent.ar.homepage,
        ...(content?.ar?.homepage ?? {}),
      },
    },
    en: {
      ...defaultSiteContent.en,
      ...(content?.en ?? {}),
      media: {
        ...defaultSiteContent.en.media,
        ...(content?.en?.media ?? {}),
      },
      faq: {
        ...defaultSiteContent.en.faq,
        ...(content?.en?.faq ?? {}),
      },
      homepage: {
        ...defaultSiteContent.en.homepage,
        ...(content?.en?.homepage ?? {}),
      },
    },
  });
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
