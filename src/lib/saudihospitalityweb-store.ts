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

export interface ShowcaseConfig {
  hero: {
    titleAr: string;
    titleEn: string;
    subtitleAr: string;
    subtitleEn: string;
    badgeAr: string;
    badgeEn: string;
  };
  metrics: {
    aiSpeed: string;
    directFee: string;
    propertiesCount: string;
    pageSpeed: string;
  };
  roiDefaults: {
    roomsCount: number;
    adr: number;
    occupancy: number;
    otaCommissionRate: number;
    directShareRate: number;
  };
  aiPrompts: {
    ar: Array<{ q: string; a: string }>;
    en: Array<{ q: string; a: string }>;
  };
}

export const initialShowcaseConfig: ShowcaseConfig = {
  hero: {
    titleAr: "الجيل الجديد من منصات الضيافة الرقمية الذكية",
    titleEn: "The Intelligent Digital Platform for Modern Saudi Hospitality",
    subtitleAr:
      "منصة فندقية متكاملة تعتمد الهوية البصرية الفاخرة لسويس بلو، تجمع بين الذكاء الاصطناعي على مدار الساعة، محرك حجز مباشر لتعظيم الإيرادات وهوامش الأرباح، وتجربة ضيافة سعودية أصيلة.",
    subtitleEn:
      "A high-converting digital powerhouse reflecting Swiss Blue's luxury art direction, blending 24/7 AI Concierge intelligence, frictionless direct booking, and authentic bilingual resonance across Jeddah, Riyadh, and Jazan.",
    badgeAr: "المنظومة الرقمية المتطورة للضيافة الفندقية في المملكة العربية السعودية",
    badgeEn: "Next-Generation Saudi Hospitality Ecosystem",
  },
  metrics: {
    aiSpeed: "< 2s",
    directFee: "0%",
    propertiesCount: "6",
    pageSpeed: "0.8s",
  },
  roiDefaults: {
    roomsCount: 45,
    adr: 380,
    occupancy: 75,
    otaCommissionRate: 18,
    directShareRate: 35,
  },
  aiPrompts: {
    ar: [
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
    en: [
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
