export interface InboundLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  source: string;
  status: "new" | "contacted" | "demo_scheduled" | "partnered" | "archived";
  notes?: string;
  createdAt: string;
}

export interface SaudiHospitalityContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    livePreviewCta: string;
    heroImage: string;
  };
  metrics: {
    aiSpeed: { val: string; label: string; hint: string };
    directFee: { val: string; label: string; hint: string };
    propertiesCount: { val: string; label: string; hint: string };
    pageSpeed: { val: string; label: string; hint: string };
  };
  aiConcierge: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    agentName: string;
    agentStatus: string;
    initialGreeting: string;
    prompts: Array<{ q: string; a: string }>;
  };
  roiCalculator: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    cardTitle: string;
    defaultRooms: number;
    defaultAdr: number;
    defaultOccupancy: number;
    otaCommissionRate: number;
    directShareRate: number;
    footnote: string;
  };
  bilingualParity: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    arCard: { badge: string; title: string; desc: string };
    enCard: { badge: string; title: string; desc: string };
  };
  headlessCms: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    promoAlert: string;
    amenityBadge: { label: string; badge: string };
  };
  propertiesSection: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    items: Array<{
      slug: string;
      title: string;
      city: string;
      type: string;
      units: string;
      summary: string;
      image: string;
    }>;
  };
  performanceSeo: {
    badge: string;
    title: string;
    description: string;
    bulletPoints: string[];
    ctaText: string;
    lcpSpeed: string;
    clsDrift: string;
    seoScore: string;
  };
  pillars: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      badge: string;
      icon: string;
    }>;
  };
  advantageMatrix: {
    badge: string;
    title: string;
    subtitle: string;
    headers: { role: string; problem: string; solution: string };
    rows: Array<{
      role: string;
      problem: string;
      solution: string;
    }>;
  };
  techSpecs: {
    badge: string;
    title: string;
    subtitle: string;
    specs: Array<{
      title: string;
      description: string;
    }>;
  };
  ctaFooter: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    copyright: string;
    locationTag: string;
  };
}

export interface BilingualSaudiHospitalityStore {
  ar: SaudiHospitalityContent;
  en: SaudiHospitalityContent;
}

export const initialSaudiHospitalityContent: BilingualSaudiHospitalityStore = {
  ar: {
    hero: {
      badge: "المنظومة الرقمية المتطورة للضيافة الفندقية في المملكة العربية السعودية",
      title: "الجيل الجديد من منصات الضيافة الرقمية الذكية",
      subtitle:
        "منصة فندقية متكاملة تعتمد الهوية البصرية الفاخرة لسويس بلو، تجمع بين الذكاء الاصطناعي على مدار الساعة، محرك حجز مباشر لتعظيم الإيرادات وهوامش الأرباح، وتجربة ضيافة سعودية أصيلة تجمع بين الفنادق والشقق المخدومة.",
      primaryCta: "طلب استعراض حي للمنصة",
      secondaryCta: "حفظ ملف العرض (PDF)",
      livePreviewCta: "معاينة الموقع المباشر",
      heroImage:
        "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
    },
    metrics: {
      aiSpeed: { val: "< 2s", label: "سرعة استجابة المساعد الذكي", hint: "رد فوري ومبيعات آلية 24/7" },
      directFee: { val: "0%", label: "عمولات وسيط على الحجز المباشر", hint: "توفير 18% مقارنة بمنصات OTA" },
      propertiesCount: { val: "6", label: "منشآت في محفظة موحدة", hint: "جدة • الرياض • جازان" },
      pageSpeed: { val: "0.8s", label: "زمن تحميل الصفحة القياسي", hint: "Next.js 16 + Vercel Edge" },
    },
    aiConcierge: {
      badge: "الميزة الحصرية",
      title: "مساعد فندقي ذكي يعمل على مدار الساعة لزيادة المبيعات",
      description:
        "مدمج بالكامل في رحلة الضيف، يجيب باللغتين العربية والإنجليزية على جميع الاستفسارات الفندقية، يوصي بالغرف المناسبة، ويجمع بيانات الحجوزات وتعاقدات الشركات آلياً إلى لوحة التحكم.",
      bulletPoints: [
        "استجابة فورية فائقة السرعة في أقل من ثانيتين.",
        "التقاط بيانات العميل المهتم (الاسم، الجوال، التواريخ) وتحويلها كفرصة بيعية.",
        "معرفة تامة بتفاصيل جميع الفنادق والخدمات والمطاعم وعروض الشركات.",
      ],
      ctaText: "طلب تجربة المساعد الذكي لعلامتك",
      agentName: "سارة العتيبي - المرشد الذكي",
      agentStatus: "متصلة الآن • الرد فوري",
      initialGreeting: "مرحباً بك! أنا سارة، المساعد الذكي لفنادق سويس بلو. كيف يمكنني مساعدتك في استكشاف منشآتنا أو ترتيب حجزك اليوم؟",
      prompts: [
        {
          q: "ما هي مزايا شقق فيناس بالرياض؟",
          a: "تتميز شقق فيناس الرياض بموقع استراتيجي بالقرب من واجهة الرياض والبوليفارد، مع وحدات مجهزة بالكامل ومطابخ حديثة وخدمة واي فاي فائقة السرعة، ومثالية للإقامات الطويلة ورحلات الأعمال.",
        },
        {
          q: "هل توجد أسعار خاصة لتعاقدات الشركات؟",
          a: "نعم بالتأكيد! توفر سويس بلو تعاقدات مؤسسية بخصومات تصل إلى 25% مع تسهيلات فواتير شهرية وخدمة مدير حسابات مخصص. هل ترغب في تسجيل بيانات شركتك الآن؟",
        },
        {
          q: "كيف يمكنني حجز جناح عائلي في جدة؟",
          a: "يمكنك الحجز مباشرة عبر محرك الحجز في ثوانٍ مع الحصول على أفضل سعر مضمون، أو يمكنني توجيهك لأجنحة التوليب أو الزهراء الفندقية المجهزة للعائلات.",
        },
      ],
    },
    roiCalculator: {
      badge: "تحقيق أعلى هوامش ربحية",
      title: "محرك حجز مباشر يوفر عمولات منصات السفر بنسبة 100%",
      description:
        "تم تصميم تدفق الحجز السريع لتقليل خطوات إتمام الطلب إلى النصف، مع التكامل المباشر مع أنظمة إدارة الفنادق (PMS)، مما يحافظ على ولاء العميل وهوامش الربح الكاملة.",
      bulletPoints: [
        "توفير 15% - 20% من عمولات وكالات السفر الإلكترونية (OTAs).",
        "تقويم أسعار وتوافر فوري ومتجاوب على جميع الهواتف الذكية.",
        "عروض حصرية ورموز ترويجية لزيادة تكرار الحجوزات.",
      ],
      ctaText: "حساب العائد المتوقع لمنشأتك",
      cardTitle: "حاسبة التوفير المالي من الحجز المباشر",
      defaultRooms: 45,
      defaultAdr: 380,
      defaultOccupancy: 75,
      otaCommissionRate: 18,
      directShareRate: 35,
      footnote: "* بحساب تحويل 35% من الحجوزات إلى المنصة المباشرة بعمولة 18%.",
    },
    bilingualParity: {
      badge: "تناغم ثقافي وتصميمي",
      title: "هوية ثنائية اللغة مبنية من الصفر وليست مجرد ترجمة آلية",
      description:
        "تصميم متناسق تماماً يدعم خطوط Noto Kufi وCairo الفاخرة للواجهة العربية مع Geist للإنجليزية، مما يمنح الضيوف السعوديين والدوليين تجربة تصفح أصيلة تعكس كرم الضيافة السعودية.",
      bulletPoints: [
        "توجيه بصري متكامل RTL / LTR بدون أخطاء محاذاة.",
        "محتوى محلي مصمم خصيصاً للوجهات (الرياض، جدة، جازان).",
        "تبديل لغة فوري مع الاحتفاظ بنفس مسار الصفحة.",
      ],
      ctaText: "استكشاف تفاصيل التجربة",
      arCard: {
        badge: "الواجهة العربية (RTL) • Noto Kufi Arabic",
        title: "إقامة راقية في قلب وجهات المملكة",
        desc: "فنادق وأجنحة وشقق فندقية لاختيارات أوضح وإقامات أريح في جدة والرياض وجازان.",
      },
      enCard: {
        badge: "English Interface (LTR) • Inter / Geist Sans",
        title: "Stay Beautifully Across Saudi Arabia",
        desc: "Hotels, suites, and serviced apartments designed for seamless city visits in Jeddah, Riyadh, and Jazan.",
      },
    },
    headlessCms: {
      badge: "مرونة تسويقية فورية",
      title: "لوحة تحكم Sanity v3 لتحديث الأسعار والعروض في ثوانٍ",
      description:
        "تمكن إدارة الفنادق وفريق التسويق من إطلاق باقات المواسم، تعديل الصور والخدمات، وتحديث شارات الحجوزات فورياً دون الحاجة لكتابة أي كود برمجي أو انتظار فرق التطوير.",
      bulletPoints: [
        "تعديل فوري للبانرات الترويجية وعروض نهاية الأسبوع.",
        "إدارة متزامنة للمحتوى العربي والإنجليزي من شاشة واحدة.",
        "نظام إعادة صياغة النصوص بالذكاء الاصطناعي بنقرة زر.",
      ],
      ctaText: "طلب استعراض لوحة التحكم",
      promoAlert: "احجز 3 ليالٍ واحصل على خصم 20% في عطلة نهاية الأسبوع",
      amenityBadge: { label: "بوفيه إفطار فاخر", badge: "قريباً" },
    },
    propertiesSection: {
      badge: "محفظة فندقية موحدة",
      title: "إدارة متكاملة لـ 6 منشآت فندقية وشقق مخدومة في 3 مدن",
      description:
        "منصة واحدة تجمع الفنادق والأجنحة والشقق الفندقية في جدة والرياض وجازان، تتيح للزوار والشركات استكشاف كافة الخيارات والمقارنة بين الوحدات وحجز الإقامة المناسبة بسهولة تامة.",
      bulletPoints: [
        "صفحات مستقلة لكل فندق بمعرض صور وموقع تفاعلي وخريطة معالم.",
        "تصنيف دقيق لوحدات الأعمال، العائلات، والإقامات الطويلة.",
        "تكامل مع نظام تخطيط الموارد والفواتير (ERP/PMS Connector).",
      ],
      ctaText: "ضم منشأتك إلى المنظومة",
      items: [
        {
          slug: "swiss-blue-jeddah",
          title: "فندق سويس بلو جدة",
          city: "جدة",
          type: "فندق سويس بلو",
          units: "44 وحدة",
          summary: "إقامة فندقية متكاملة في قلب شارع حراء بجدة بالقرب من المطار والكورنيش.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
        },
        {
          slug: "swiss-blue-jazan",
          title: "فندق سويس بلو جازان",
          city: "جازان",
          type: "فندق سويس بلو",
          units: "50 وحدة",
          summary: "إطلالة بانورامية ساحرة على كورنيش جازان الجنوبي ومطعم عالمي راقٍ.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg",
        },
        {
          slug: "vinas-riyadh-serviced-apartments",
          title: "شقق فيناس الرياض الفندقية",
          city: "الرياض",
          type: "شقق فندقية مخدومة",
          units: "38 شقة",
          summary: "شقق مفروشة بالكامل للعائلات ورجال الأعمال في موقع استراتيجي بطريق المطار.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg",
        },
        {
          slug: "tulip-alrawdah-serviced-apartments",
          title: "شقق توليب الروضة الفندقية",
          city: "جدة",
          type: "شقق فندقية مخدومة",
          units: "36 شقة",
          summary: "أجنحة وشقق فسيحة في حي الروضة الراقي بالقرب من أهم المراكز والمطاعم.",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=82",
        },
        {
          slug: "al-zahraa-serviced-apartments",
          title: "شقق سويس بلو الزهراء",
          city: "جدة",
          type: "شقق فندقية مخدومة",
          units: "32 وحدة",
          summary: "راحة وخصوصية تامة في حي الزهراء بجدة مع خدمات فندقية 24/7.",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=82",
        },
        {
          slug: "al-samer-serviced-apartments",
          title: "شقق سويس بلو السامر",
          city: "جدة",
          type: "شقق فندقية مخدومة",
          units: "40 وحدة",
          summary: "شقق مجهزة بالكامل تناسب الإقامات الطويلة ورحلات الأعمال العائلية.",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=82",
        },
      ],
    },
    performanceSeo: {
      badge: "سرعة وأرشفة استثنائية",
      title: "بنية سحابية فائقة السرعة على Next.js 16 وVercel Edge",
      description:
        "سرعة تحميل قياسية تقل عن ثانية واحدة (0.8s) مع توافق كامل مع معايير Google Core Web Vitals وبيانات منظمة Schema JSON-LD لكل فندق وغرفة لضمان صدارة محركات البحث.",
      bulletPoints: [
        "سرعة LCP قياسية 0.8 ثانية وتحميل فوري على شبكات 5G والجوال.",
        "بيانات منظمة متكاملة (LodgingBusiness, Hotel, FAQPage).",
        "تتبع دقيق لمعدلات التحويل والأحداث عبر Google Analytics 4.",
      ],
      ctaText: "طلب التقرير التقني الكامل",
      lcpSpeed: "0.8s",
      clsDrift: "0.0",
      seoScore: "100",
    },
    pillars: {
      badge: "المنظومة السداسية المتكاملة",
      title: "ركائز القوة الست في تجربة سويس بلو الرقمية",
      subtitle: "بنية متناغمة تغطي كافة جوانب التسويق الفندقي، خدمة العملاء، إدارة الحجوزات، والربط المؤسسي.",
      items: [
        {
          title: "المرشد الذكي الفندقي (سارة)",
          description: "مساعد محادثة فندقي مدعوم بالذكاء الاصطناعي، يوجه الضيوف لاختيار الغرفة الأنسب، يوضح وسائل الراحة، ويجمع بيانات الحجز فورياً.",
          badge: "دعم عربي/إنجليزي فوري 24/7",
          icon: "bot",
        },
        {
          title: "محرك حجز مباشر عالي التحويل",
          description: "تجربة حجز مبسطة في خطوتين مع تقويم تواريخ متقدم، دعم للأكواد الترويجية، وربط مباشر مع محركات الـ PMS.",
          badge: "توفير حتى 20% في العمولات",
          icon: "trending",
        },
        {
          title: "هوية ثنائية وتناغم ثقافي",
          description: "تصميم متقن يدعم الخطوط العربية الفاخرة وتوجيه الـ RTL الأصيل، يمنح النزيل المحلي والدولي تجربة راقية.",
          badge: "100% تطابق وتناغم بصري",
          icon: "languages",
        },
        {
          title: "إدارة محتوى سحابية فورية (Sanity)",
          description: "لوحة تحكم مرنة تتيح لفريق التسويق إطلاق العروض الموسمية، تعديل الأسعار، وتحديث شارات الخدمات في ثوانٍ.",
          badge: "تحديث فوري بدون توقف",
          icon: "sliders",
        },
        {
          title: "بوابة عقود الشركات ومجموعات العمل",
          description: "قنوات مخصصة لاستقبال طلبات الشركات والجهات الحكومية وحجوزات الوفود والمناسبات مع توجيه آلي للمبيعات.",
          badge: "مسار مبيعات B2B آلي",
          icon: "briefcase",
        },
        {
          title: "أرشفة Google SEO وتحليلات GA4",
          description: "بيانات هيكلية Schema JSON-LD متوافقة مع محركات البحث لصدارة نتائج Google، مع تتبع دقيق لسلوك النزلاء.",
          badge: "صدارة محركات البحث",
          icon: "chart",
        },
      ],
    },
    advantageMatrix: {
      badge: "مصفوفة القيمة المضافة",
      title: "كيف تصنع المنصة فارقاً استراتيجياً لكل طرف؟",
      subtitle: "عائد استثماري واضح وتجربة رقمية استثنائية لملاك الفنادق، الشركات، والنزلاء على حد سواء.",
      headers: {
        role: "الفئة المستفيدة",
        problem: "أهم التحديات التقليدية",
        solution: "الحل الاستراتيجي في منصة سويس بلو",
      },
      rows: [
        {
          role: "ملاك الفنادق والمستثمرون",
          problem: "نزيف العمولات المرتفعة لمنصات الـ OTA (15-20%)، صعوبة تحديث الأسعار والعروض، وفقدان بيانات العملاء المباشرة.",
          solution: "تحويل 35%+ من الحجوزات إلى القناة المباشرة، إدارة محتوى فورية من Sanity، وامتلاك قاعدة بيانات ولاء متكاملة.",
        },
        {
          role: "الشركات والجهات الحكومية",
          problem: "بطء معالجة طلبات الإقامات الطويلة، غياب الشفافية في الأسعار المؤسسية، وصعوبة تنسيق حجوزات الوفود.",
          solution: "بوابة B2B مخصصة لاستقبال العقود وتوفير أسعار تفضيلية فورية، مع متابعة مركزية عبر فريق المبيعات والمساعد الذكي.",
        },
        {
          role: "النزلاء والمسافرون",
          problem: "مواقع بطيئة، ترجمات آلية ركيكة، صعوبة المقارنة بين الشقق الفندقية والغرف، وعدم توفر ردود فورية خارج أوقات العمل.",
          solution: "تصفح فائق السرعة في أقل من ثانية، مساعد ذكي يجيب على مدار الساعة، ومقارنة واضحة لجميع وحدات الإقامة.",
        },
      ],
    },
    techSpecs: {
      badge: "المواصفات والمعايير التقنية",
      title: "بنية سحابية مبنية بأحدث معايير الويب العالمية",
      subtitle: "تقنيات متقدمة تضمن أعلى درجات الأمان، التوفر السحابي، والتكامل السلس مع أنظمة الضيافة.",
      specs: [
        {
          title: "Next.js 16 App Router",
          description: "محرك عرض فائق الحداثة مع Turbopack يضمن تحميلاً فورياً وتجاوباً مثالياً على كافة المتصفحات.",
        },
        {
          title: "Vercel Global Edge Network",
          description: "توزيع جغرافي ذكي يضمن استجابة فائقة السرعة للزوار في المملكة ودول الخليج وحول العالم.",
        },
        {
          title: "Sanity Studio v3 (Headless)",
          description: "إدارة محتوى مرنة بدون خادم تضمن أمان البيانات وتحديث العروض فورياً دون إعادة نشر الكود.",
        },
        {
          title: "ERP & PMS Integration Ready",
          description: "جاهزية كاملة للربط مع أنظمة إدارة الفنادق eZee Absolute وبرامج التخطيط المالي Odoo ERP.",
        },
      ],
    },
    ctaFooter: {
      badge: "خطوتك القادمة نحو الريادة الرقمية",
      title: "جاهز لترقية حضور منشأتك وتحقيق أعلى معدلات حجز مباشر؟",
      subtitle: "تواصل معنا اليوم لاستعراض حي للمنصة والاطلاع على كيفية تطبيق هذه الحلول المتقدمة لخدمة أهدافك الفندقية والاستثمارية.",
      primaryCta: "طلب استشارة وعرض تجريبي",
      secondaryCta: "طباعة أو تصدير ملف العرض",
      copyright: "© 2026 Saudi Hospitality Web • سويس بلو للضيافة. جميع الحقوق محفوظة.",
      locationTag: "المملكة العربية السعودية • الرياض • جدة • جازان",
    },
  },
  en: {
    hero: {
      badge: "Next-Generation Saudi Hospitality Ecosystem",
      title: "The Intelligent Digital Platform for Modern Saudi Hospitality",
      subtitle:
        "A high-converting digital powerhouse reflecting Swiss Blue's luxury art direction, blending 24/7 AI Concierge intelligence, frictionless direct booking, and authentic bilingual resonance across Jeddah, Riyadh, and Jazan.",
      primaryCta: "Schedule a Live Demo",
      secondaryCta: "Export Deck (PDF)",
      livePreviewCta: "Preview Live Website",
      heroImage:
        "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
    },
    metrics: {
      aiSpeed: { val: "< 2s", label: "AI Concierge Speed", hint: "Instant 24/7 guest answers" },
      directFee: { val: "0%", label: "Direct Channel Fees", hint: "Save up to 18% vs OTAs" },
      propertiesCount: { val: "6", label: "Integrated Properties", hint: "Jeddah • Riyadh • Jazan" },
      pageSpeed: { val: "0.8s", label: "Average Page Load Speed", hint: "Next.js 16 + Vercel Edge" },
    },
    aiConcierge: {
      badge: "Flagship AI Capability",
      title: "24/7 Intelligent Concierge Driving Direct Conversion",
      description:
        "A native conversational AI agent answering property inquiries in Arabic and English, recommending room categories, and capturing qualified booking & B2B leads instantly.",
      bulletPoints: [
        "Ultra-fast response time in under 2 seconds.",
        "Automated guest lead capture directly to the CRM.",
        "Trained on all 6 properties, policies, amenities, and B2B packages.",
      ],
      ctaText: "Request AI Demo for Your Brand",
      agentName: "Sarah Al-Otaibi - AI Concierge",
      agentStatus: "Online • Instant Answers",
      initialGreeting: "Welcome! I'm Sarah, your Swiss Blue AI Concierge. How can I assist you with exploring our properties or securing your reservation today?",
      prompts: [
        {
          q: "What makes Vinas Riyadh ideal for business?",
          a: "Vinas Riyadh Serviced Apartments offer strategic access to Riyadh Front and the business district, featuring full kitchens, high-speed fiber Wi-Fi, and 24/7 dedicated support for corporate travelers.",
        },
        {
          q: "Do you offer corporate rates & long stays?",
          a: "Yes! We provide tailored B2B corporate contracts with up to 25% preferential savings, centralized invoicing, and dedicated corporate account management. Would you like to connect with our B2B team?",
        },
        {
          q: "How fast is the direct booking engine?",
          a: "Direct booking takes less than 30 seconds with real-time rate calculation, instant confirmation, zero OTA markup, and direct PMS integration.",
        },
      ],
    },
    roiCalculator: {
      badge: "Direct Revenue Optimization",
      title: "High-Converting Direct Booking Slashing OTA Commissions",
      description:
        "Streamlined 2-step booking funnel deeply linked with PMS engines, driving guests away from commission-heavy OTAs like Booking.com and Agoda directly into your direct revenue channel.",
      bulletPoints: [
        "Saves 15% - 20% in recurring third-party booking commissions.",
        "Mobile-first real-time date & room inventory picker.",
        "Built-in promo codes & loyalty reward incentives.",
      ],
      ctaText: "Calculate Brand ROI",
      cardTitle: "Direct Booking Savings Calculator",
      defaultRooms: 45,
      defaultAdr: 380,
      defaultOccupancy: 75,
      otaCommissionRate: 18,
      directShareRate: 35,
      footnote: "* Assuming 35% direct conversion capture vs 18% OTA fee.",
    },
    bilingualParity: {
      badge: "Cultural & Design Excellence",
      title: "100% Native Bilingual Parity (True Arabic RTL + English LTR)",
      description:
        "Engineered from the ground up with mirrored layout architecture, typography balancing (Noto Kufi / Cairo paired with Geist), and authentic Saudi cultural tone of voice.",
      bulletPoints: [
        "Zero CSS layout distortion across both writing directions.",
        "Localized destination copy tailored to Saudi & international travelers.",
        "Instant locale switching with persistent deep-page routing.",
      ],
      ctaText: "Explore Bilingual Architecture",
      arCard: {
        badge: "الواجهة العربية (RTL) • Noto Kufi Arabic",
        title: "إقامة راقية في قلب وجهات المملكة",
        desc: "فنادق وأجنحة وشقق فندقية لاختيارات أوضح وإقامات أريح في جدة والرياض وجازان.",
      },
      enCard: {
        badge: "English Interface (LTR) • Inter / Geist Sans",
        title: "Stay Beautifully Across Saudi Arabia",
        desc: "Hotels, suites, and serviced apartments designed for seamless city visits in Jeddah, Riyadh, and Jazan.",
      },
    },
    headlessCms: {
      badge: "Agile Content Management",
      title: "Real-Time Headless CMS: Instant Promotional Power",
      description:
        "Empowers your marketing and revenue operations to launch seasonal campaigns, adjust room descriptions, toggle amenity badges (e.g. 'Breakfast Buffet - Soon'), and publish gallery updates in seconds.",
      bulletPoints: [
        "Zero-downtime seasonal promo banners and flash sales.",
        "Unified bilingual editing environment in Sanity Studio v3.",
        "AI-assisted marketing copy rephrasing built right in.",
      ],
      ctaText: "Request CMS Walkthrough",
      promoAlert: "Book 3 Nights & Save 20% on Weekend Escapes",
      amenityBadge: { label: "Breakfast Buffet", badge: "Soon" },
    },
    propertiesSection: {
      badge: "Unified Property Portfolio",
      title: "Seamless Portfolio Management Across 6 Saudi Properties",
      description:
        "Unifies hotels and serviced apartments across Jeddah, Riyadh, and Jazan into a single digital powerhouse with dedicated unit inventories, custom floor plans, and city hubs.",
      bulletPoints: [
        "Individual property showcase pages with interactive maps.",
        "Granular categorization for corporate, family, and extended stays.",
        "Full readiness for Odoo ERP and eZee Absolute PMS synchronization.",
      ],
      ctaText: "Onboard Your Hotel Property",
      items: [
        {
          slug: "swiss-blue-jeddah",
          title: "Swiss Blue Hotel Jeddah",
          city: "Jeddah",
          type: "Swiss Blue Hotel",
          units: "44 Units",
          summary: "Full-service hospitality stay in Heraa District close to the airport and North Corniche.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-saad-alaiyadhi-131639221-10141408-scaled.jpg",
        },
        {
          slug: "swiss-blue-jazan",
          title: "Swiss Blue Hotel Jazan",
          city: "Jazan",
          type: "Swiss Blue Hotel",
          units: "50 Units",
          summary: "Panoramic Red Sea views on South Corniche with international dining and meeting facilities.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-jepoyous-18500929-2.jpg",
        },
        {
          slug: "vinas-riyadh-serviced-apartments",
          title: "Vinas Riyadh Serviced Apartments",
          city: "Riyadh",
          type: "Serviced Apartments",
          units: "38 Units",
          summary: "Fully furnished business suites on Airport Road, ideal for corporate travel and long stays.",
          image: "https://swissbluehotels.com/wp-content/uploads/2025/07/pexels-abdullah-alallah-314142096-28506330.jpg",
        },
        {
          slug: "tulip-alrawdah-serviced-apartments",
          title: "Tulip Alrawdah Serviced Apartments",
          city: "Jeddah",
          type: "Serviced Apartments",
          units: "36 Units",
          summary: "Premium residential suites in Al-Rawdah district near Jeddah's best cafes and retail hubs.",
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=82",
        },
        {
          slug: "al-zahraa-serviced-apartments",
          title: "Swiss Blue Al-Zahraa Apartments",
          city: "Jeddah",
          type: "Serviced Apartments",
          units: "32 Units",
          summary: "Quiet residential setting with 24/7 hotel service in prime Al-Zahraa district.",
          image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=82",
        },
        {
          slug: "al-samer-serviced-apartments",
          title: "Swiss Blue Al-Samer Apartments",
          city: "Jeddah",
          type: "Serviced Apartments",
          units: "40 Units",
          summary: "Spacious multi-bedroom units suited for families and long-term contractor stays.",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=82",
        },
      ],
    },
    performanceSeo: {
      badge: "Cloud Speed & SEO Architecture",
      title: "Sub-Second Edge Rendering & Google Schema Mastery",
      description:
        "Built with Next.js 16 Turbopack and deployed on Vercel Global Edge network, delivering sub-second LCP and Google Rich Snippet dominance for Saudi hospitality keywords.",
      bulletPoints: [
        "0.8s LCP load time with zero layout shift (CLS: 0.0).",
        "Complete JSON-LD structured data for Google Search rich cards.",
        "Real-time conversion tracking & event telemetry via GA4.",
      ],
      ctaText: "Request Full Technical Audit",
      lcpSpeed: "0.8s",
      clsDrift: "0.0",
      seoScore: "100",
    },
    pillars: {
      badge: "Six Architectural Pillars",
      title: "Engineered for Direct Hospitality Growth",
      subtitle: "A synchronized digital infrastructure uniting marketing, booking operations, customer support, and enterprise sales.",
      items: [
        {
          title: "24/7 AI Concierge (Sarah)",
          description: "Native conversational AI assistant answering property queries, recommending suites, and automatically qualifying guest and B2B leads.",
          badge: "Instant AR & EN Support",
          icon: "bot",
        },
        {
          title: "High-Conversion Direct Booking",
          description: "Streamlined 2-step reservation flow with dynamic calendar, promo code engine, and deep integration with hotel PMS systems.",
          badge: "Cut OTA Commissions",
          icon: "trending",
        },
        {
          title: "Bilingual RTL/LTR Parity",
          description: "Bespoke typography (Noto Kufi / Cairo & Geist) and flawless mirrored layouts ensuring cultural resonance for GCC and international guests.",
          badge: "100% Visual Symmetry",
          icon: "languages",
        },
        {
          title: "Real-Time Headless CMS (Sanity)",
          description: "Agile singleton studio allowing marketing teams to update seasonal rates, badges (e.g. 'Soon'), and banners instantly without code deployments.",
          badge: "Zero-Downtime Agility",
          icon: "sliders",
        },
        {
          title: "Corporate B2B & Group Funnels",
          description: "Dedicated RFQ ingestion pipelines for corporate accounts, government delegations, long-term contractor stays, and event bookings.",
          badge: "Automated Inquiries",
          icon: "briefcase",
        },
        {
          title: "Google Schema SEO & GA4",
          description: "Structured JSON-LD schema (Hotel, LodgingBusiness, FAQPage) for Google Rich Snippets, coupled with GA4 conversion telemetry.",
          badge: "Search Dominance",
          icon: "chart",
        },
      ],
    },
    advantageMatrix: {
      badge: "Value Creation Matrix",
      title: "Strategic Advantages Across Key Stakeholders",
      subtitle: "How the Swiss Blue digital ecosystem solves core friction points for hotel owners, enterprise partners, and guests.",
      headers: {
        role: "Stakeholder",
        problem: "Traditional Friction Points",
        solution: "Swiss Blue Solution",
      },
      rows: [
        {
          role: "Hotel Owners & Investors",
          problem: "High OTA commission bleed (15-20%), lack of direct guest relationships, and slow manual website updates.",
          solution: "Captures 35%+ direct revenue, offers instant Sanity CMS promotional agility, and builds persistent brand loyalty.",
        },
        {
          role: "Corporate & Government Accounts",
          problem: "Clunky booking processes for long-term project teams, delayed RFP quotes, and disjointed group invoicing.",
          solution: "Dedicated B2B contract portal with preferential tier discounts, rapid response workflows, and dedicated accounts.",
        },
        {
          role: "Guests & Extended Travelers",
          problem: "Slow mobile websites, awkward machine translations, and unanswered inquiries during off-hours.",
          solution: "Sub-second loading, authentic cultural tone of voice, clear serviced apartment unit previews, and 24/7 AI guidance.",
        },
      ],
    },
    techSpecs: {
      badge: "Enterprise Technical Standards",
      title: "Engineered with Modern Web & Cloud Best Practices",
      subtitle: "High-performance, secure, and ready for seamless integration with hotel hospitality software.",
      specs: [
        {
          title: "Next.js 16 App Router",
          description: "Cutting-edge React server components and Turbopack compiler delivering frictionless transitions.",
        },
        {
          title: "Vercel Global Edge Network",
          description: "Ultra-low latency edge CDN serving regional GCC and worldwide travelers within milliseconds.",
        },
        {
          title: "Sanity Studio v3 (Headless)",
          description: "Structured headless content management with live previews, media asset pipelines, and AI copy assistance.",
        },
        {
          title: "ERP & PMS Connector Suite",
          description: "Engineered for synchronization with eZee Absolute PMS and Odoo 19 Enterprise financial suites.",
        },
      ],
    },
    ctaFooter: {
      badge: "Accelerate Your Digital Presence",
      title: "Ready to Experience the Platform in Action?",
      subtitle: "Connect with our team to arrange a live platform walkthrough and explore how Swiss Blue's digital architecture drives superior direct booking conversion.",
      primaryCta: "Request Live Demo",
      secondaryCta: "Export Presentation Deck",
      copyright: "© 2026 Saudi Hospitality Web • Swiss Blue Hospitality. All rights reserved.",
      locationTag: "Kingdom of Saudi Arabia • Riyadh • Jeddah • Jazan",
    },
  },
};

export const sampleInitialLeads: InboundLead[] = [
  {
    id: "lead-101",
    name: "سلطان العتيبي",
    company: "مجموعة الضيافة الذهبية - الرياض",
    email: "sultan@golden-hospitality.sa",
    phone: "+966 50 123 4567",
    interest: "عرض المنصة للشركاء والمستثمرين",
    source: "/saudihospitalityweb",
    status: "new",
    notes: "مهتم بربط فندق 70 غرفة بالرياض مع محرك الحجز المباشر والمساعد الذكي.",
    createdAt: "2026-08-24T14:30:00.000Z",
  },
  {
    id: "lead-102",
    name: "فهد الدوسري",
    company: "شركة التطوير الفندقي العالمية",
    email: "fahad@al-tatawur.com",
    phone: "+966 55 987 6543",
    interest: "عقود الشركات والإقامات الطويلة (B2B)",
    source: "/saudihospitalityweb",
    status: "contacted",
    notes: "تم إرسال ملف العرض التقديمي، بانتظار تحديد موعد الاجتماع الافتراضي.",
    createdAt: "2026-08-23T11:15:00.000Z",
  },
  {
    id: "lead-103",
    name: "Marcus Vance",
    company: "Gulf Hospitality Holdings",
    email: "m.vance@gulfholdings.ae",
    phone: "+971 50 444 8899",
    interest: "Platform Live Demo & Tech Integration",
    source: "/en/saudihospitalityweb",
    status: "demo_scheduled",
    notes: "Demo scheduled for Wednesday 2 PM with IT and revenue management teams.",
    createdAt: "2026-08-22T09:40:00.000Z",
  },
];
