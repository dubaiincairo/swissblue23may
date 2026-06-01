export const BOOKING_URL =
  "https://letsbook.me/booking/yanoljacloudsolution?checkin=2026-05-19&checkout=2026-05-20&adults=2&children=0";

export const heroImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg";

export const jazanImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg";

export const jeddahImage =
  "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg";

// Curated hospitality shots used to enrich property-page galleries so every
// hotel shows a full, homepage-quality gallery (deduped with the hotel's own
// images and capped). Same known-good images the homepage gallery uses.
export const propertyGallerySupplement = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=82",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=82",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=82",
];

export const navItems = [
  { label: "منشآت الضيافة", href: "/hotels" },
  { label: "الغرف والأجنحة", href: "/rooms-suites" },
  { label: "العروض والتخفيضات", href: "/offers" },
  { label: "برنامج الولاء", href: "/loyalty" },
  { label: "الخدمات", href: "/amenities-services" },
  { label: "الوجهات / المدن", href: "/destinations" },
  { label: "تجربة الطعام", href: "/dining" },
  { label: "تعاقدات الشركات", href: "/corporate-deals" },
  { label: "حجوزات المجموعات", href: "/group-bookings" },
  { label: "من نحن؟", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export const navGroups = [
  {
    label: "الإقامة",
    links: [
      { label: "الضيافة والمنشآت", href: "/hotels" },
      { label: "الخدمات والمرافق", href: "/amenities-services" },
    ],
  },
  {
    label: "التجربة",
    links: [
      { label: "الوجهات والمعالم", href: "/destinations" },
      { label: "المطاعم", href: "/dining" },
    ],
  },
  {
    label: "العروض",
    links: [
      { label: "العروض الخاصة", href: "/offers" },
      { label: "عضوية سويس بلو", href: "/loyalty" },
    ],
  },
  {
    label: "الأعمال",
    links: [
      { label: "المجموعات وعقود الشركات", href: "/corporate-deals" },
      { label: "الاجتماعات والفعاليات", href: "/meetings-events" },
    ],
  },
  {
    label: "المجتمع",
    links: [
      { label: "الوظائف", href: "/careers" },
      { label: "المسؤولية الاجتماعية", href: "/social-responsibility" },
    ],
  },
  {
    label: "تواصل معنا",
    links: [
      { label: "مكتب الحجوزات المركزي", href: "/central-reservation" },
      { label: "الشكاوى والاقتراحات", href: "/feedback" },
    ],
  },
];

export const footerSections = [
  {
    title: "استكشف سويس بلو",
    links: [
      { label: "منشآت الضيافة", href: "/hotels" },
      { label: "الغرف والأجنحة", href: "/rooms-suites" },
      { label: "العروض والتخفيضات", href: "/offers" },
      { label: "برنامج الولاء", href: "/loyalty" },
      { label: "الوجهات / المدن", href: "/destinations" },
    ],
  },
  {
    title: "الخدمات والتجارب",
    links: [
      { label: "الخدمات والمرافق", href: "/amenities-services" },
      { label: "تجربة الطعام", href: "/dining" },
      { label: "تعاقدات الشركات", href: "/corporate-deals" },
      { label: "حجوزات المجموعات", href: "/group-bookings" },
      { label: "الأسئلة الشائعة", href: "/faq" },
    ],
  },
  {
    title: "الشركة",
    links: [
      { label: "من نحن؟", href: "/about" },
      { label: "تواصل معنا", href: "/contact" },
      { label: "سياسة الفنادق", href: "/policy" },
      { label: "الحجز المباشر", href: BOOKING_URL },
    ],
  },
];

export const footerContact = [
  "نظام حجز مركزي للضيوف الأفراد",
  "مختص صفقات الشركات والمجموعات",
];

export const propertyAmenities = [
  "إنترنت عالي السرعة",
  "بوفيه إفطار",
  "مطعم ومقهى",
  "خدمة الغرف",
  "خدمة سيارات الأجرة",
  "خزنة آمنة",
  "قهوة وشاي وميني بار",
  "استقبال ودعم للضيوف",
];

export const hotels = [
  {
    slug: "swiss-blue-jeddah",
    title: "فندق سويس بلو جدة",
    city: "جدة",
    type: "فندق",
    units: "76 غرفة وجناح",
    image: heroImage,
    summary:
      "فندق حضري عملي لضيوف الأعمال والزيارات العائلية والإقامات القصيرة، مع فئات غرف وأجنحة واضحة بالقرب من حيوية جدة والبحر الأحمر.",
    positioning:
      "يمثل فندق سويس بلو جدة الوجهة الفندقية الكاملة داخل المحفظة، حيث يجمع بين الغرف العملية والأجنحة الراقية وخدمات الضيافة اليومية. صمم ليخدم ضيف الأعمال الذي يحتاج إلى موقع واضح وخدمة سريعة، والعائلة التي تبحث عن راحة فندقية، والضيف الذي يريد إقامة قصيرة قريبة من أهم وجهات جدة.",
    unitTypes: [
      {
        title: "غرف سوبيريور",
        count: "24 غرفة",
        description:
          "غرف مريحة للإقامات القصيرة ورحلات العمل، مع تجهيزات أساسية واضحة وسهولة في الحجز.",
      },
      {
        title: "غرف ديلوكس",
        count: "28 غرفة",
        description:
          "مساحة أفضل وراحة أعلى لضيوف المدينة الذين يرغبون في ترقية عملية دون تعقيد.",
      },
      {
        title: "أجنحة جونيور",
        count: "12 جناح",
        description:
          "أجنحة مناسبة للضيوف الذين يحتاجون إلى مساحة إضافية وخصوصية أكبر خلال الإقامة.",
      },
      {
        title: "أجنحة تنفيذية",
        count: "10 أجنحة",
        description:
          "تجربة أكثر رحابة مع مساحة معيشة مناسبة للأعمال والإقامات الأطول.",
      },
      {
        title: "جناح رئاسي",
        count: "2 جناح",
        description:
          "أعلى فئات الفندق للضيوف الذين يبحثون عن مستوى استثنائي من المساحة والخصوصية.",
      },
    ],
    amenities: [
      ...propertyAmenities,
      "قاعات اجتماعات",
      "نادي رياضي مجهز",
      "مسبح داخلي في وجهة مختارة",
    ],
    locationHighlight:
      "موقع عملي في جدة يربط الضيوف بمناطق الأعمال والتسوق والمطاعم ووجهات البحر الأحمر.",
    landmarks: ["كورنيش جدة", "جدة التاريخية البلد", "رد سي مول", "مطار الملك عبدالعزيز"],
    gallery: [heroImage, jeddahImage, jazanImage],
    mapQuery: "Swiss Blue Hotel Heraa Jeddah Saudi Arabia",
    source: "https://swissbluehotels.com/swiss-blue-hera/",
  },
  {
    slug: "swiss-blue-jazan",
    title: "سويس بلو للشقق الفندقية جازان",
    city: "جازان",
    type: "شقق فندقية",
    units: "55 شقة فندقية",
    image: jazanImage,
    summary:
      "شقق فندقية عملية في جازان للإقامات القصيرة والممتدة، مناسبة للعائلات وضيوف الأعمال والزيارات الإقليمية.",
    positioning:
      "توفر سويس بلو للشقق الفندقية جازان خيارا مرنا لمن يحتاج إلى مساحة أكبر من الغرفة التقليدية مع راحة الخدمات الفندقية. تخدم الوجهة ضيوف الأعمال والعائلات والضيوف الذين يفضلون إقامة طويلة أكثر هدوءا وعملية.",
    unitTypes: [
      {
        title: "استوديوهات",
        count: "20 استوديو",
        description:
          "وحدات عملية لضيوف الأعمال والإقامات القصيرة، تجمع بين الراحة والبساطة.",
      },
      {
        title: "شقق غرفة نوم",
        count: "22 شقة",
        description:
          "خيار مناسب للضيوف الذين يحتاجون إلى مساحة معيشة مستقلة وراحة يومية.",
      },
      {
        title: "شقق عائلية بغرفتين",
        count: "10 شقق",
        description:
          "مساحات أوسع للعائلات والمجموعات الصغيرة مع خصوصية أفضل وتوزيع عملي.",
      },
      {
        title: "شقق مميزة طويلة الإقامة",
        count: "3 شقق",
        description:
          "وحدات مختارة للضيوف الذين يحتاجون إلى إقامة ممتدة وقاعدة مريحة داخل المدينة.",
      },
    ],
    amenities: [...propertyAmenities, "مواقف سيارات", "غسيل ملابس عند الطلب"],
    locationHighlight:
      "موقع يخدم حركة الأعمال والزيارات الإقليمية في جازان، مع وصول مريح للخدمات اليومية.",
    landmarks: ["واجهة جازان البحرية", "مطار جازان", "مراكز الأعمال", "الأسواق والمطاعم"],
    gallery: [jazanImage, heroImage, jeddahImage],
    mapQuery: "Swiss Blue Jazan Saudi Arabia",
    source: "https://swissbluehotels.com/04_swissblue-jazan/",
  },
  {
    slug: "al-zahraa-serviced-apartments",
    title: "شقق الزهراء الفندقية",
    city: "جدة",
    type: "شقق فندقية",
    units: "46 شقة",
    image: jeddahImage,
    summary:
      "شقق مخدومة على طريق الأمير سلطان للضيوف الذين يبحثون عن موقع عملي ومساحة مريحة وإطلالات مدينة مختارة.",
    positioning:
      "تخدم شقق الزهراء الفندقية الضيوف الذين يفضلون تجربة شقة مخدومة في جدة مع سهولة الوصول إلى الخدمات والمطاعم ومراكز التسوق. الفئات مناسبة للعائلات، وضيوف الأعمال، والإقامات المتوسطة التي تحتاج إلى مساحة وخصوصية.",
    unitTypes: [
      {
        title: "استوديوهات",
        count: "14 استوديو",
        description:
          "اختيار واضح للضيوف المنفردين أو رحلات العمل القصيرة مع تجهيزات عملية.",
      },
      {
        title: "شقق غرفة نوم",
        count: "18 شقة",
        description:
          "مساحة مستقلة للضيوف الذين يحتاجون إلى راحة يومية وخصوصية أكثر.",
      },
      {
        title: "شقق غرفتين",
        count: "10 شقق",
        description:
          "تصميم مناسب للعائلات والمجموعات الصغيرة مع مساحة معيشة أوسع.",
      },
      {
        title: "شقق بإطلالة المدينة",
        count: "4 شقق",
        description:
          "فئة مميزة للضيوف الذين يفضلون الإطلالة والموقع ضمن تجربة إقامة أعلى.",
      },
    ],
    amenities: [...propertyAmenities, "خدمة تنظيف دورية", "مواقف قريبة"],
    locationHighlight:
      "موقع على طريق الأمير سلطان بالقرب من وجهات التسوق والمطاعم والخدمات الحيوية في جدة.",
    landmarks: ["طريق الأمير سلطان", "رد سي مول", "الواجهة البحرية", "المطاعم والمقاهي"],
    gallery: [jeddahImage, heroImage, jazanImage],
    mapQuery: "Swiss Blue Al Zahra Jeddah Saudi Arabia",
    source: "https://swissbluehotels.com/02_swissblue-al-zahra/",
  },
  {
    slug: "al-samer-serviced-apartments",
    title: "شقق السامر الفندقية",
    city: "جدة",
    type: "شقق مخدومة",
    units: "33 شقة",
    image: heroImage,
    summary:
      "شقق واستوديوهات مخدومة في جدة لضيوف الأعمال والعائلات، مع خيارات عملية بغرفة أو غرفتين وإطلالات مختارة.",
    positioning:
      "تمثل شقق السامر خيارا مناسبا للضيوف الباحثين عن إقامة مخدومة سهلة داخل جدة. تجمع بين الخصوصية والمساحة والخدمة العملية، وتناسب الإقامات القصيرة والمتوسطة للضيوف الذين يفضلون نمط الشقق.",
    unitTypes: [
      {
        title: "استوديوهات أعمال",
        count: "12 استوديو",
        description:
          "وحدات عملية ومباشرة لضيوف الأعمال والإقامات الفردية القصيرة.",
      },
      {
        title: "شقق غرفة نوم",
        count: "13 شقة",
        description:
          "خيار مريح بإحساس سكني وخدمات فندقية أساسية.",
      },
      {
        title: "شقق غرفتين",
        count: "6 شقق",
        description:
          "مساحة مناسبة للعائلات والمجموعات الصغيرة مع توزيع عملي للخصوصية.",
      },
      {
        title: "شقق بإطلالة المدينة",
        count: "2 شقة",
        description:
          "فئة مميزة للضيوف الذين يرغبون في قيمة إضافية وإطلالة أفضل.",
      },
    ],
    amenities: [...propertyAmenities, "خدمة تنظيف", "دعم للحجوزات الطويلة"],
    locationHighlight:
      "موقع مناسب للتنقل داخل جدة والوصول إلى الأحياء السكنية والخدمات اليومية.",
    landmarks: ["طرق جدة الرئيسية", "مناطق الخدمات اليومية", "المطاعم", "مراكز التسوق"],
    gallery: [heroImage, jeddahImage, jazanImage],
    mapQuery: "Swiss Blue Al Samer Jeddah Saudi Arabia",
    source: "https://swissbluehotels.com/03_swissblue-al-samer/",
  },
  {
    slug: "vinas-riyadh-serviced-apartments",
    title: "شقق فيناس الرياض الفندقية",
    city: "الرياض",
    type: "شقق مخدومة",
    units: "35 شقة",
    image: jeddahImage,
    summary:
      "شقق مخدومة في الرياض بخيارات غرفة وغرفتين وثلاث غرف للضيوف الذين يحتاجون إلى إقامة أطول ومساحة أكبر.",
    positioning:
      "توفر شقق فيناس الرياض قاعدة مريحة في العاصمة لضيوف الأعمال والعائلات والإقامات الطويلة. تركز التجربة على المساحة والخصوصية والقدرة على الاستقرار لفترة أطول مع دعم فندقي عملي.",
    unitTypes: [
      {
        title: "شقق غرفة نوم",
        count: "14 شقة",
        description:
          "وحدات مناسبة لضيوف الأعمال أو الأزواج الباحثين عن إقامة عملية في الرياض.",
      },
      {
        title: "شقق غرفتين",
        count: "15 شقة",
        description:
          "خيار مرن للعائلات والمجموعات الصغيرة مع مساحة معيشة أفضل.",
      },
      {
        title: "شقق ثلاث غرف",
        count: "6 شقق",
        description:
          "فئة واسعة للعائلات الأكبر والإقامات الطويلة وحجوزات الشركات.",
      },
    ],
    amenities: [...propertyAmenities, "دعم للإقامة الشهرية", "خدمات مناسبة للشركات"],
    locationHighlight:
      "موقع يخدم التنقل داخل الرياض والوصول إلى مناطق الأعمال ونمط الحياة والخدمات اليومية.",
    landmarks: ["مناطق الأعمال", "طرق الرياض الرئيسية", "مراكز التسوق", "المطاعم والمقاهي"],
    gallery: [jeddahImage, heroImage, jazanImage],
    mapQuery: "Vinas Serviced Apartments Riyadh Saudi Arabia",
    source: "https://swissbluehotels.com/",
  },
  {
    slug: "tulip-alrawdah-serviced-apartments",
    title: "شقق توليب الروضة الفندقية",
    city: "الرياض",
    type: "شقق فندقية",
    units: "37 شقة",
    image: jazanImage,
    summary:
      "استوديوهات وشقق بغرفة وغرفتين في الرياض مع خيارات بإطلالة المدينة للإقامات العملية والعائلية.",
    positioning:
      "تجمع شقق توليب الروضة بين مرونة الشقق الفندقية والخدمات اليومية التي يحتاجها الضيف. تناسب الوجهة الإقامات القصيرة والمتوسطة، خصوصا للضيوف الذين يبحثون عن خيارات متعددة للمساحة داخل الرياض.",
    unitTypes: [
      {
        title: "استوديوهات",
        count: "13 استوديو",
        description:
          "إقامة عملية ومريحة لضيوف الأعمال والزيارات القصيرة.",
      },
      {
        title: "شقق غرفة نوم",
        count: "15 شقة",
        description:
          "خيار مستقل للضيوف الذين يحتاجون إلى مساحة إضافية وراحة يومية.",
      },
      {
        title: "شقق غرفتين",
        count: "7 شقق",
        description:
          "مساحات مناسبة للعائلات والمجموعات الصغيرة.",
      },
      {
        title: "شقق بإطلالة المدينة",
        count: "2 شقة",
        description:
          "فئة مختارة للضيوف الذين يفضلون إطلالة وقيمة أعلى.",
      },
    ],
    amenities: [...propertyAmenities, "خدمة تنظيف", "خيارات إقامة شهرية"],
    locationHighlight:
      "موقع عملي داخل الرياض بالقرب من الأحياء النشطة والخدمات اليومية ومناطق الحركة الرئيسية.",
    landmarks: ["أحياء الرياض", "مناطق الأعمال", "المطاعم والمقاهي", "الخدمات اليومية"],
    gallery: [jazanImage, jeddahImage, heroImage],
    mapQuery: "Tulip Al Rawdah Riyadh Saudi Arabia",
    source: "https://swissbluehotels.com/",
  },
];

export const roomClassifications = [
  {
    property: "فندق سويس بلو جدة",
    total: "76 وحدة",
    rows: [
      {
        type: "غرفة سوبيريور كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "10",
        rooms: "111, 211, 311, 411, 511, 611, 701, 702, 703, 704",
      },
      {
        type: "غرفة سوبيريور توأم",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "6",
        rooms: "110, 210, 310, 410, 510, 610",
      },
      {
        type: "غرفة ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "6",
        rooms: "105, 205, 305, 405, 505, 605",
      },
      {
        type: "جناح جونيور",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "6",
        rooms: "104, 204, 304, 404, 504, 604",
      },
      {
        type: "جناح جونيور ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "24",
        rooms:
          "101, 103, 108, 112, 201, 203, 208, 212, 301, 303, 308, 312, 401, 403, 408, 412, 501, 503, 508, 512, 601, 603, 608, 612",
      },
      {
        type: "جناح جونيور ديلوكس توأم",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "12",
        rooms: "102, 107, 202, 207, 302, 307, 402, 407, 502, 507, 602, 607",
      },
      {
        type: "جناح تنفيذي",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "6",
        rooms: "109, 209, 309, 409, 509, 609",
      },
      {
        type: "جناح رئاسي",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "6",
        rooms: "106, 206, 306, 406, 506, 606",
      },
    ],
  },
  {
    property: "سويس بلو للشقق الفندقية جازان",
    total: "55 وحدة",
    rows: [
      {
        type: "استوديو ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "1",
        rooms: "601",
      },
      {
        type: "شقة سوبيريور بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "25",
        rooms:
          "101, 102, 103, 204, 205, 206, 207, 304, 305, 306, 307, 404, 405, 406, 407, 504, 505, 506, 507, 602, 603, 604, 605, 606, 607",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "8",
        rooms: "201, 210, 301, 310, 401, 410, 501, 510",
      },
      {
        type: "شقة بريميوم بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "4",
        rooms: "211, 311, 411, 511",
      },
      {
        type: "شقة عائلية بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "9",
        rooms: "104, 203, 208, 303, 308, 403, 408, 503, 508",
      },
      {
        type: "شقة سوبيريور بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "4",
        rooms: "202, 302, 402, 502",
      },
      {
        type: "شقة ديلوكس بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "4",
        rooms: "209, 309, 409, 509",
      },
    ],
  },
  {
    property: "شقق الزهراء الفندقية",
    total: "46 وحدة",
    rows: [
      {
        type: "استوديو ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "1",
        rooms: "101",
      },
      {
        type: "استوديو ديلوكس مزدوج",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "1",
        rooms: "102",
      },
      {
        type: "شقة سوبيريور بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "18",
        rooms: "202, 203, 204, 205, 302, 303, 304, 305, 402, 403, 404, 405, 502, 503, 504, 505, 602, 604",
      },
      {
        type: "شقة سوبيريور بإطلالة المدينة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "12",
        rooms: "206, 208, 209, 306, 308, 309, 406, 408, 409, 506, 508, 509",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "إطلالة خلفية",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "1",
        rooms: "603",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة وإطلالة المدينة",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "4",
        rooms: "207, 307, 407, 507",
      },
      {
        type: "شقة سوبيريور بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة خلفية",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "5",
        rooms: "201, 301, 401, 501, 601",
      },
      {
        type: "شقة ديلوكس بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "4",
        rooms: "210, 310, 410, 510",
      },
    ],
  },
  {
    property: "شقق السامر الفندقية",
    total: "33 وحدة",
    rows: [
      {
        type: "استوديو ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "كينغ / سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "5",
        rooms: "101, 401, 501, 601, 703",
      },
      {
        type: "استوديو ديلوكس مزدوج",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "3",
        rooms: "201, 202, 301",
      },
      {
        type: "شقة سوبيريور بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "3",
        rooms: "504, 604, 704",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "2",
        rooms: "304, 404",
      },
      {
        type: "شقة بريميوم بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "5",
        rooms: "306, 406, 506, 606, 204, 701",
      },
      {
        type: "شقة عائلية بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "1",
        rooms: "702",
      },
      {
        type: "شقة سوبيريور بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "5",
        rooms: "203, 305, 405, 505, 605",
      },
      {
        type: "شقة ديلوكس بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "8",
        rooms: "302, 303, 402, 403, 502, 503, 602, 603",
      },
    ],
  },
  {
    property: "شقق فيناس الرياض الفندقية",
    total: "35 وحدة",
    rows: [
      {
        type: "شقة سوبيريور بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "5",
        rooms: "101, 202, 302, 401, 402",
      },
      {
        type: "شقة سوبيريور بإطلالة المدينة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "9",
        rooms: "204, 205, 205C, 304, 305, 305C, 404, SV, SV1",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "2",
        totalUnits: "6",
        rooms: "203, 203C, 303, 303C, 403, 403C",
      },
      {
        type: "شقة بريميوم بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "1",
        rooms: "101C",
      },
      {
        type: "شقة عائلية بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1 أو 2",
        livingRooms: "1",
        totalUnits: "10",
        rooms: "102, 103C, 104, 201, 207C, 208, 301, 307, 307C, 308",
      },
      {
        type: "شقة سوبيريور بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "1",
        totalUnits: "2",
        rooms: "206, 306",
      },
      {
        type: "شقة ديلوكس بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "2",
        livingRooms: "2",
        totalUnits: "1",
        rooms: "207",
      },
      {
        type: "شقة سوبيريور بثلاث غرف نوم",
        bedrooms: "3",
        bedConfig: "سوبر كينغ + 4 أسرّة مفردة",
        view: "بدون إطلالة",
        bathrooms: "2",
        livingRooms: "2",
        totalUnits: "1",
        rooms: "103",
      },
    ],
  },
  {
    property: "شقق توليب الروضة الفندقية",
    total: "37 وحدة",
    rows: [
      {
        type: "استوديو كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "7",
        rooms: "101, 207, 305, SV1, SV2, SV3, SV4",
      },
      {
        type: "استوديو ديلوكس كينغ",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "0",
        totalUnits: "1",
        rooms: "215",
      },
      {
        type: "شقة سوبيريور بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "16",
        rooms: "203, 204, 204C, 205, 206, 208, 209, 209C, 301, 302, 303, 304, 304C, 306, 307, 307C",
      },
      {
        type: "شقة سوبيريور بإطلالة المدينة",
        bedrooms: "1",
        bedConfig: "سرير سوبر كينغ",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "7",
        rooms: "201, 210, 211, 212, 212C, 213, 213C",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "2",
        rooms: "203C, 303C",
      },
      {
        type: "شقة ديلوكس بغرفة نوم واحدة وإطلالة المدينة",
        bedrooms: "1",
        bedConfig: "سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "1",
        rooms: "211C",
      },
      {
        type: "شقة ديلوكس بغرفتي نوم",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "بدون إطلالة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "2",
        rooms: "207C, 305C",
      },
      {
        type: "شقة بغرفتي نوم وإطلالة المدينة",
        bedrooms: "2",
        bedConfig: "سوبر كينغ + سريران مفردان",
        view: "إطلالة المدينة",
        bathrooms: "1",
        livingRooms: "1",
        totalUnits: "2",
        rooms: "202, 214",
      },
    ],
  },
];

export const loyaltyProgram = {
  title: "برنامج ولاء سويس بلو",
  subtitle: "مزايا مباشرة لضيوفنا الدائمين",
  description:
    "برنامج ولاء مصمم لضيوف الأعمال والعائلات والإقامات الطويلة، يمنحهم أولوية في العروض، وترقيات حسب التوفر، ومزايا للحجز المباشر عبر قنوات سويس بلو.",
  benefits: [
    "أفضلية في عروض الحجز المباشر",
    "أولوية للترقية عند توفرها",
    "مزايا للإقامات الشهرية والمتكررة",
    "دعم أسرع من فريق الحجوزات",
  ],
};

export const accommodationCategories = [
  {
    title: "الفنادق",
    text: "غرف وأجنحة وخدمات فندقية كاملة لضيوف الأعمال والزيارات القصيرة والضيوف الباحثين عن تجربة أكثر مباشرة.",
  },
  {
    title: "الشقق الفندقية",
    text: "خيار يجمع بين راحة الفندق ومساحة الشقة، مناسب للعائلات والإقامات المتوسطة والضيوف الذين يريدون مرونة أكبر.",
  },
  {
    title: "الشقق المخدومة",
    text: "إقامة أطول ومساحة أوسع وخصوصية أعلى، مناسبة للشركات والانتقالات والإقامات الشهرية.",
  },
];

export const corporateDeals = [
  {
    title: "حجوزات المجموعات",
    text: "تنسيق احترافي لحجوزات الفرق والوفود، مع تنظيم أنواع الوحدات وتواريخ الوصول والمغادرة واحتياجات الضيوف.",
  },
  {
    title: "قاعات الاجتماعات",
    text: "حلول عملية للاجتماعات الصغيرة والمتوسطة، تشمل الضيافة الأساسية وخيارات الإقامة المصاحبة عند الحاجة.",
  },
  {
    title: "التعاقد الرسمي",
    text: "إجراءات واضحة لعقود الشركات تشمل المستندات النظامية، بيانات المنشأة، خطابات الاعتماد، وشروط الدفع والحجز.",
  },
  {
    title: "تواصل مهني",
    text: "مسار تواصل مخصص لمسؤولي الموارد البشرية والمشتريات والإدارة التنفيذية لضمان سرعة الرد ودقة العروض.",
  },
];

// Curated, validated (HTTP 200) imagery for each city's guest gallery.
const jeddahPhotos = [
  "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
];

const riyadhPhotos = [
  "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1400&q=80",
];

const jazanPhotos = [
  "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1583077874340-79db6564672e?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=80",
];

export const destinations = [
  {
    title: "جدة",
    text: "مدينة البحر الأحمر، تجمع بين الأعمال والتسوق والمطاعم والواجهة البحرية وجدة التاريخية. مناسبة لعطلات نهاية الأسبوع، الزيارات العائلية، ورحلات الأعمال.",
    howToEnjoy: ["زيارة كورنيش جدة والواجهة البحرية", "اكتشاف البلد التاريخية", "تجربة المطاعم والمقاهي", "التسوق في المراكز الحديثة"],
    image: heroImage,
    photos: jeddahPhotos,
    badge: "وجهة البحر الأحمر",
    stats: [
      { label: "فنادق وشقق", value: "4 منشآت" },
      { label: "أقرب مطار", value: "KAIA" },
      { label: "أفضل موسم", value: "أكتوبر – مارس" },
    ],
  },
  {
    title: "الرياض",
    text: "العاصمة الأسرع نموا في المنطقة، وجهة للأعمال والفعاليات ونمط الحياة الحديث، ومناسبة للإقامات الطويلة وحجوزات الشركات.",
    howToEnjoy: ["زيارة بوليفارد الرياض والوجهات الترفيهية", "تنظيم اجتماعات الأعمال", "اكتشاف المطاعم الراقية", "الإقامة الشهرية للمهام المؤسسية"],
    image: jeddahImage,
    photos: riyadhPhotos,
    badge: "العاصمة وعاصمة الأعمال",
    stats: [
      { label: "فنادق وشقق", value: "2 منشأة" },
      { label: "أقرب مطار", value: "RUH" },
      { label: "أفضل موسم", value: "نوفمبر – أبريل" },
    ],
  },
  {
    title: "جازان",
    text: "مدينة جنوبية نابضة بالحياة، مناسبة للزيارات الإقليمية ورحلات الأعمال والإقامات الهادئة، مع قرب من البحر والطبيعة والخدمات اليومية.",
    howToEnjoy: ["زيارة الواجهة البحرية", "استكشاف الأسواق المحلية", "تنظيم زيارات الأعمال الإقليمية", "اختيار شقة فندقية لإقامة أطول"],
    image: jazanImage,
    photos: jazanPhotos,
    badge: "بوابة الجنوب",
    stats: [
      { label: "فنادق وشقق", value: "منشأة واحدة" },
      { label: "أقرب مطار", value: "GIZ" },
      { label: "أفضل موسم", value: "نوفمبر – مارس" },
    ],
  },
];

export const diningGalleryPhotos = [
  {
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1400&q=80",
    title: "بوفيه إفطار",
  },
  {
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    title: "أجواء المطعم",
  },
  {
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80",
    title: "مقهى لوبي",
  },
  {
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=80",
    title: "تجارب عشاء",
  },
  {
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    title: "خدمة الغرف",
  },
];

export const diningOptions = [
  {
    title: "الإفطار",
    text: "بوفيه إفطار عملي يبدأ به الضيف يومه براحة، مناسب لرحلات العمل والعائلات والإقامات القصيرة.",
  },
  {
    title: "المقهى",
    text: "مساحة سهلة للقاء سريع أو قهوة يومية أو انتظار مريح داخل الوجهة.",
  },
  {
    title: "المطعم",
    text: "خيارات طعام يومية تخدم الضيوف داخل الفندق أو الشقق الفندقية حسب توفر الخدمة في كل وجهة.",
  },
  {
    title: "خدمة الغرف",
    text: "راحة إضافية للضيوف الذين يفضلون تناول الطعام داخل الغرفة أو الشقة عند توفر الخدمة.",
  },
];

export const contactChannels = [
  {
    title: "نظام الحجز المركزي",
    text: "فريق متخصص لمساعدة الضيوف في اختيار الوجهة والفئة المناسبة وتأكيد الحجز عبر القنوات المباشرة.",
  },
  {
    title: "مختص صفقات الشركات",
    text: "مسار مباشر لحجوزات الشركات والمجموعات والإقامات الطويلة والتعاقدات الرسمية.",
  },
  {
    title: "SwissBlue Concierge AI",
    text: "مساعد محادثة ذكي لدعم الضيوف في الأسئلة السريعة، اختيار الفندق، مقارنة الفئات، وتوجيه الطلبات للفريق المختص.",
  },
];

export const services = [
  "إنترنت عالي السرعة",
  "بوفيه إفطار",
  "مطعم ومقهى",
  "خدمة الغرف",
  "قاعات اجتماعات",
  "نادي رياضي في وجهات مختارة",
  "مسبح داخلي في وجهات مختارة",
  "خدمة سيارات الأجرة",
  "خزنة آمنة",
  "قهوة وشاي وميني بار",
  "مواقف وخدمات وصول حسب الوجهة",
  "دعم للإقامات الشهرية والشركات",
];

export const faqs = [
  {
    question: "ما أوقات تسجيل الوصول والمغادرة في فنادق سويس بلو؟",
    answer:
      "تختلف الأوقات حسب المنشأة، لكن يمكن لفريق الحجز تأكيد وقت الوصول والمغادرة المناسب عند اختيار الفندق أو الشقة الفندقية.",
  },
  {
    question: "هل تسمح فنادق سويس بلو باصطحاب الحيوانات الأليفة؟",
    answer:
      "تختلف سياسة الحيوانات الأليفة حسب المنشأة ونوع الوحدة. يفضل التأكد من فريق الحجز قبل تأكيد الإقامة.",
  },
  {
    question: "ما خيارات المواقف المتوفرة لدى سويس بلو؟",
    answer:
      "توفر بعض المنشآت مواقف أو خدمات وصول حسب الموقع. يمكن تأكيد تفاصيل المواقف عند اختيار الفندق أو الشقة.",
  },
  {
    question: "ما المرافق المتوفرة في منشآت سويس بلو؟",
    answer:
      "تشمل الخدمات حسب المنشأة الإنترنت عالي السرعة، الإفطار، المطعم أو المقهى، خدمة الغرف، دعم الضيوف، وقاعات اجتماعات أو نادي رياضي في وجهات مختارة.",
  },
  {
    question: "هل يتوفر إنترنت Wi-Fi داخل الغرف والشقق؟",
    answer:
      "نعم، صممت تجربة سويس بلو حول الاتصال العملي للضيوف، مع توفر الإنترنت في الغرف والشقق حسب كل منشأة.",
  },
  {
    question: "ما أقرب مطار لوجهات سويس بلو؟",
    answer:
      "يعتمد ذلك على المدينة: مطار الملك عبدالعزيز في جدة، مطار الملك خالد في الرياض، ومطار الملك عبدالله في جازان.",
  },
  {
    question: "هل تتوفر خدمة النقل من وإلى المطار؟",
    answer:
      "يمكن لفريق الحجز أو خدمة الضيوف المساعدة في ترتيب خيارات النقل أو سيارات الأجرة حسب المدينة والتوفر.",
  },
  {
    question: "هل يمكن طلب عروض شهرية أو أسعار شركات؟",
    answer:
      "نعم، يمكن لفريق صفقات الشركات تقديم عروض للإقامات الشهرية وحجوزات المجموعات والتعاقدات الرسمية.",
  },
  {
    question: "هل يمكن الحجز مباشرة عبر الموقع؟",
    answer:
      "نعم، يمكن التحقق من التوفر والحجز مباشرة من خلال رابط الحجز أو التواصل مع نظام الحجز المركزي.",
  },
];
