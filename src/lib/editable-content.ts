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
  diningOptions,
  contactChannels,
  roomClassifications,
  corporateDeals,
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
  diningOptionsEn,
  contactChannelsEn,
  roomClassificationsEn,
  corporateDealsEn,
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

const otas = [
  {
    name: "Booking.com",
    accent: "#003580",
    weight: "800",
    note: "أكبر منصة حجز فندقي في العالم",
  },
  {
    name: "Expedia",
    accent: "#fdcc09",
    weight: "800",
    note: "شبكة سفر عالمية رائدة",
  },
  {
    name: "Agoda",
    accent: "#ee2e24",
    weight: "800",
    note: "حضور قوي في الشرق الأوسط وآسيا",
  },
  {
    name: "Almosafer",
    accent: "#7e22ce",
    weight: "700",
    note: "أكبر وكالة سفر رقمية سعودية",
  },
  {
    name: "Wego",
    accent: "#e94e35",
    weight: "800",
    note: "محرك السفر الأول في الخليج",
  },
  {
    name: "Trip.com",
    accent: "#287dfa",
    weight: "800",
    note: "منصة سفر عالمية متكاملة",
  },
  {
    name: "Hotels.com",
    accent: "#d32f2f",
    weight: "800",
    note: "خدمة دولية متخصصة في الفنادق",
  },
  {
    name: "Tajawal",
    accent: "#0e9f8f",
    weight: "800",
    note: "وكالة سفر عربية مفضلة",
  },
  {
    name: "Trivago",
    accent: "#e7363f",
    weight: "800",
    note: "مقارنة فورية بين أسعار الفنادق",
  },
  {
    name: "Airbnb",
    accent: "#ff385c",
    weight: "800",
    note: "خيار شائع لإقامات الشقق الفندقية",
  },
];

const otasEn = [
  {
    name: "Booking.com",
    accent: "#003580",
    weight: "800",
    note: "The world's largest hotel booking platform",
  },
  {
    name: "Expedia",
    accent: "#fdcc09",
    weight: "800",
    note: "A leading global travel network",
  },
  {
    name: "Agoda",
    accent: "#ee2e24",
    weight: "800",
    note: "Strong reach across the Middle East and Asia",
  },
  {
    name: "Almosafer",
    accent: "#7e22ce",
    weight: "700",
    note: "Saudi Arabia's largest digital travel agency",
  },
  {
    name: "Wego",
    accent: "#e94e35",
    weight: "800",
    note: "The GCC's go-to travel search engine",
  },
  {
    name: "Trip.com",
    accent: "#287dfa",
    weight: "800",
    note: "A truly global travel marketplace",
  },
  {
    name: "Hotels.com",
    accent: "#d32f2f",
    weight: "800",
    note: "A worldwide hotel-focused booking site",
  },
  {
    name: "Tajawal",
    accent: "#0e9f8f",
    weight: "800",
    note: "A trusted Arab world travel agency",
  },
  {
    name: "Trivago",
    accent: "#e7363f",
    weight: "800",
    note: "Instant hotel price comparison",
  },
  {
    name: "Airbnb",
    accent: "#ff385c",
    weight: "800",
    note: "A popular pick for apartment-style stays",
  },
];

const partnersSection = {
  eyebrow: "حضور رقمي موثوق",
  title: "اعثر على سويس بلو في أهم منصات الحجز العالمية والإقليمية.",
  text: "نتعاون مع أبرز منصات السفر الرقمية في المملكة العربية السعودية والخليج، لنضمن وضوح الأسعار وسهولة الحجز للضيف، أينما اختار قناة الحجز المفضلة لديه.",
  badge: "+10 وكلاء سفر معتمدين",
  footnote: "للحصول على أفضل سعر مضمون، ننصح بالحجز المباشر من موقع سويس بلو الرسمي.",
  cta: "احجز مباشرة الآن",
  items: otas,
};

const partnersSectionEn = {
  eyebrow: "Trusted digital presence",
  title: "Find Swiss Blue across leading global and regional booking platforms.",
  text: "We partner with the most reputable online travel agencies in Saudi Arabia and the GCC, so guests get clear rates and a smooth booking experience on the channel they prefer.",
  badge: "+10 verified travel partners",
  footnote: "For the best available rate, we always recommend booking direct on the official Swiss Blue website.",
  cta: "Book direct now",
  items: otasEn,
};

const testimonialsSection = {
  eyebrow: "آراء الضيوف",
  title: "تجارب حقيقية يشاركها ضيوفنا من أبرز منصات الحجز.",
  text: "آراء موثقة من ضيوفنا عبر جوجل، Booking.com، Agoda، Expedia، وغيرها، تعكس تجربة الإقامة الفعلية في فنادق وشقق سويس بلو.",
  items: [
    {
      name: "أحمد العتيبي",
      role: "إقامة عائلية في جدة",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/2ec246be46d86c5d72e227e416b8de35f45fcd83-3569x5354.jpg",
      quote: "موقع مميز قريب من كل ما تحتاجه، والاستقبال كان لطيفًا وسريعًا. الغرفة نظيفة والإفطار يستحق التجربة. سنعود بإذن الله.",
      platform: "Google Maps",
      rating: 5,
    },
    {
      name: "سارة المنصور",
      role: "إقامة عمل – جدة",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/a149018b573c9c446871f42b25634bc59f458a9c-3974x5000.jpg",
      quote: "تسجيل دخول سلس، غرف هادئة، وشبكة واي فاي قوية. مناسبة جدًا لرحلات العمل القصيرة عندما تحتاج إلى التركيز.",
      platform: "Booking.com",
      rating: 5,
    },
    {
      name: "محمد القحطاني",
      role: "إقامة شهرية – جازان",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/9b0649eab8612d307f07390358f2edd09327ec1b-4480x6415.jpg",
      quote: "شقة واسعة ومجهزة بالكامل، فريق الصيانة سريع الاستجابة، والسعر الشهري ممتاز مقارنة بالخدمات المقدمة.",
      platform: "Agoda",
      rating: 5,
    },
    {
      name: "ليلى حسن",
      role: "إجازة عائلية – الرياض",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/45f0b6e8ea8bb2b90e471c2103d776756ddf9fbd-4000x5705.jpg",
      quote: "شقة الغرفتين كانت مناسبة جدًا لعائلتنا. نظيفة وعصرية، والفريق كان متعاونًا للغاية مع تأخر وقت وصولنا.",
      platform: "Expedia",
      rating: 4,
    },
    {
      name: "خالد الزهراني",
      role: "ضيف متكرر – جدة",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/2a02d66bb1df7354769704ae22afebdd53cea3d8-4480x6720.jpg",
      quote: "أحرص على الحجز في سويس بلو في كل زيارة لجدة. الخدمة ثابتة الجودة والاستقبال يعرف الضيوف الدائمين.",
      platform: "TripAdvisor",
      rating: 5,
    },
    {
      name: "عمر خليل",
      role: "إقامة منفردة – جازان",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/af728bb74bd33bce0a4188f0b10d2679ea49c225-4160x6240.jpg",
      quote: "قيمة ممتازة مقابل المنطقة. الشقة الفندقية أشعرتني بأنني في بيتي خلال إقامة طويلة، والموقع مريح للتنقل في جازان.",
      platform: "Trivago",
      rating: 4,
    },
  ],
};

const testimonialsSectionEn = {
  eyebrow: "Guest reviews",
  title: "Real experiences shared by our guests on top booking platforms.",
  text: "Verified guest reviews from Google, Booking.com, Agoda, Expedia, and more, reflecting the actual stay experience across Swiss Blue hotels and apartments.",
  items: [
    {
      name: "Ahmed Al-Otaibi",
      role: "Family stay in Jeddah",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/2ec246be46d86c5d72e227e416b8de35f45fcd83-3569x5354.jpg",
      quote: "A great location close to everything we needed. Reception was warm and quick, the room was clean, and breakfast was worth trying. We will be back.",
      platform: "Google Maps",
      rating: 5,
    },
    {
      name: "Sara Al-Mansour",
      role: "Business stay – Jeddah",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/a149018b573c9c446871f42b25634bc59f458a9c-3974x5000.jpg",
      quote: "Smooth check-in, quiet rooms, and a strong Wi-Fi connection. Perfect for short business trips when you need to focus.",
      platform: "Booking.com",
      rating: 5,
    },
    {
      name: "Mohammed Al-Qahtani",
      role: "Monthly stay – Jazan",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/9b0649eab8612d307f07390358f2edd09327ec1b-4480x6415.jpg",
      quote: "Spacious, fully equipped apartment, the maintenance team responds quickly, and the monthly rate is excellent for the services offered.",
      platform: "Agoda",
      rating: 5,
    },
    {
      name: "Layla Hassan",
      role: "Family vacation – Riyadh",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/45f0b6e8ea8bb2b90e471c2103d776756ddf9fbd-4000x5705.jpg",
      quote: "The two-bedroom apartment fit our family perfectly. Clean, modern, and the staff was very accommodating with our late check-in.",
      platform: "Expedia",
      rating: 4,
    },
    {
      name: "Khalid Al-Zahrani",
      role: "Returning guest – Jeddah",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/2a02d66bb1df7354769704ae22afebdd53cea3d8-4480x6720.jpg",
      quote: "I make sure to book Swiss Blue on every visit to Jeddah. The service is consistently good and reception recognises loyal guests.",
      platform: "TripAdvisor",
      rating: 5,
    },
    {
      name: "Omar Khalil",
      role: "Solo traveler – Jazan",
      image: "https://cdn.sanity.io/images/uoj8zwj3/production/af728bb74bd33bce0a4188f0b10d2679ea49c225-4160x6240.jpg",
      quote: "Great value for the area. The apart-hotel felt like home for a longer stay, and the location is convenient for getting around Jazan.",
      platform: "Trivago",
      rating: 4,
    },
  ],
};

const hotelPolicyAr = {
  hero: {
    eyebrow: "سياسة الفنادق",
    title: "سياسات واضحة لإقامة أكثر اطمئنانًا.",
    text: "تجمع هذه الصفحة سياسات الإقامة المعتمدة عبر فنادق سويس بلو والشقق الفندقية والشقق المخدومة، لضمان وضوح كامل قبل الحجز وأثناء الإقامة، بما يتماشى مع أعلى معايير الضيافة في المملكة العربية السعودية والخليج.",
    image: heroImage,
  },
  intro: {
    eyebrow: "تجربة ضيافة مهنية",
    title: "إطار سياسات متناسق عبر كافة فنادقنا وشققنا الفندقية.",
    text: "صُممت سياسات سويس بلو لتغطي الفنادق والشقق الفندقية والشقق المخدومة على حدٍّ سواء، مع مرونة عملية تلبي احتياج ضيوف الأعمال والعائلات وضيوف الإقامة الطويلة. تُراجَع هذه السياسات بشكل دوري بما يتوافق مع الأنظمة السعودية ومعايير هيئة السياحة.",
  },
  principles: [
    "شفافية كاملة في الأسعار والشروط قبل تأكيد الحجز",
    "احترام خصوصية الضيف وسرية بياناته الشخصية",
    "التزام بمعايير النظافة والسلامة والأمان على مدار الساعة",
    "مرونة في الخدمات تتناسب مع طبيعة الإقامة القصيرة والطويلة",
    "تطبيق متوازن للسياسات بما يحفظ راحة جميع الضيوف",
  ],
  sections: [
    {
      title: "الحجز وتأكيد الإقامة",
      items: [
        "يتم تأكيد الحجز فور إتمام عملية الدفع أو ضمان البطاقة الائتمانية بحسب نوع السعر المختار.",
        "يحق للفندق طلب وثيقة هوية سارية المفعول وبيانات تواصل صحيحة لإتمام الحجز.",
        "تخضع جميع الحجوزات لتوفر الوحدات وقد تطبق شروط خاصة على فترات المواسم والمناسبات.",
        "يمكن طلب تعديل الحجز قبل 48 ساعة من تاريخ الوصول وفق التوفر والسياسة التسعيرية.",
      ],
    },
    {
      title: "الدخول والمغادرة",
      items: [
        "يبدأ تسجيل الوصول من الساعة 3:00 عصرًا، وتسجيل المغادرة حتى الساعة 12:00 ظهرًا.",
        "يمكن طلب وصول مبكر أو مغادرة متأخرة حسب التوفر، وقد تطبق رسوم إضافية.",
        "يُلزم الضيف بإبراز هوية وطنية سارية أو جواز سفر عند تسجيل الوصول.",
        "للحجوزات التي تصل بعد منتصف الليل، يرجى إبلاغ فريق الاستقبال لضمان جاهزية الوحدة.",
      ],
    },
    {
      title: "الإلغاء وعدم الحضور",
      items: [
        "يمكن إلغاء الحجوزات القياسية مجانًا قبل 48 ساعة من تاريخ الوصول.",
        "تُحتسب رسوم ليلة واحدة في حال الإلغاء المتأخر أو عدم الحضور دون إشعار.",
        "السياسات الترويجية والأسعار غير القابلة للاسترداد لها شروط مستقلة موضحة عند الحجز.",
        "لحجوزات الشركات والمجموعات، تُطبَّق شروط الاتفاقية الرسمية الموقعة.",
      ],
    },
    {
      title: "الدفع والفوترة",
      items: [
        "نقبل الدفع عبر مدى، فيزا، ماستركارد، أمريكان إكسبريس، ومحافظ آبل باي والمحافظ الرقمية المعتمدة.",
        "تشمل الأسعار المعروضة ضريبة القيمة المضافة 15% ورسوم البلدية حسب الأنظمة المعمول بها.",
        "قد يُطلب مبلغ تأمين قابل للاسترداد عند تسجيل الوصول لتغطية أي استهلاك إضافي.",
        "تُصدر الفواتير الضريبية رسميًا عند المغادرة، ويمكن إرسالها إلكترونيًا عند الطلب.",
      ],
    },
    {
      title: "الأطفال والأسرّة الإضافية",
      items: [
        "نرحب بالأطفال من جميع الأعمار في فنادقنا وشققنا الفندقية.",
        "يقيم الأطفال دون سن السادسة مجانًا عند استخدام الأسرّة الموجودة في الوحدة.",
        "تتوفر أسرّة أطفال (مهد) مجانية حسب التوفر وعند الطلب المسبق.",
        "تُطبق رسوم رمزية على السرير الإضافي للأطفال من سن 6 إلى 12 سنة.",
      ],
    },
    {
      title: "الحيوانات الأليفة",
      items: [
        "لا يُسمح باصطحاب الحيوانات الأليفة داخل الفنادق والشقق الفندقية حفاظًا على راحة جميع الضيوف.",
        "يُستثنى من ذلك الكلاب المدربة لمرافقة ذوي الإعاقة مع إبراز الوثائق الرسمية.",
        "يمكن لفريق الكونسيرج مساعدتكم في ترتيب خدمات إيواء الحيوانات في مرافق قريبة معتمدة.",
      ],
    },
    {
      title: "التدخين",
      items: [
        "جميع غرف وأجنحة وشقق سويس بلو هي مناطق غير مدخنين بالكامل.",
        "تتوفر مناطق مخصصة للتدخين في الأماكن الخارجية أو الشرفات في وجهات مختارة.",
        "تطبق رسوم تنظيف عميق لا تقل عن 500 ريال سعودي في حال التدخين داخل الوحدة.",
        "يشمل ذلك جميع أنواع التدخين بما فيها الشيشة والسجائر الإلكترونية.",
      ],
    },
    {
      title: "الزوار والتجمعات",
      items: [
        "يُسمح للضيوف باستقبال زوارهم في المساحات العامة بالفندق فقط.",
        "يحق للفندق طلب تسجيل بيانات الزائر لدى الاستقبال لأسباب أمنية.",
        "لا يُسمح بالتجمعات أو الحفلات داخل الوحدات السكنية حفاظًا على راحة الجيران.",
        "للمناسبات الخاصة، يمكن حجز قاعات الاجتماعات والصالات بترتيب مسبق.",
      ],
    },
    {
      title: "السلامة والأمن",
      items: [
        "مراقبة أمنية على مدار 24 ساعة في المداخل والمساحات العامة.",
        "نظام كشف دخان ورشاشات إطفاء حريق في جميع الوحدات والممرات.",
        "خزائن آمنة داخل كل وحدة لحفظ الأشياء الثمينة والمستندات.",
        "خطط إخلاء واضحة موضحة داخل كل غرفة باللغتين العربية والإنجليزية.",
      ],
    },
    {
      title: "الخصوصية وحماية البيانات",
      items: [
        "نلتزم بنظام حماية البيانات الشخصية في المملكة العربية السعودية (PDPL).",
        "تُستخدم بياناتك فقط لأغراض الحجز وتحسين تجربة الإقامة.",
        "لا تُشارك بيانات الضيف مع أي طرف ثالث دون موافقة صريحة باستثناء الجهات الرسمية.",
        "يحق للضيف طلب الوصول إلى بياناته أو تعديلها أو حذفها بالتواصل مع فريق الخصوصية.",
      ],
    },
    {
      title: "النظافة والصيانة",
      items: [
        "خدمة تنظيف يومية للغرف الفندقية، وخدمة تنظيف دورية للشقق المخدومة.",
        "تغيير المفروشات والمناشف وفق جدول معتمد يراعي الاستدامة وراحة الضيف.",
        "بروتوكولات تعقيم متقدمة بعد كل مغادرة باستخدام مواد آمنة ومعتمدة.",
        "خدمة صيانة طارئة 24/7 عبر فريق الاستقبال أو الكونسيرج.",
      ],
    },
    {
      title: "الإقامات الطويلة والشقق المخدومة",
      items: [
        "تتوفر باقات شهرية وفصلية للضيوف الذين يحتاجون إلى إقامات ممتدة.",
        "خدمات تنظيف أسبوعية أو نصف أسبوعية حسب طبيعة العقد.",
        "إمكانية تخصيص الوحدة بإضافات معتمدة عند التنسيق مع إدارة الفندق.",
        "فواتير شهرية منتظمة ودعم مخصص من فريق إدارة الحسابات.",
      ],
    },
    {
      title: "إمكانية الوصول والاحتياجات الخاصة",
      items: [
        "تتوفر وحدات مهيأة لذوي الإعاقة في وجهات مختارة، يرجى الإشارة لذلك عند الحجز.",
        "مداخل ومصاعد بمعايير الوصول الشامل، وممرات بعرض مناسب للكراسي المتحركة.",
        "خدمات دعم خاصة عند الطلب: ترتيبات وجبات، نقل، أو ترتيبات وصول إضافية.",
        "فريق ضيافة مدرب على التعامل مع متطلبات الوصول والاحتياجات الخاصة.",
      ],
    },
    {
      title: "المسؤولية والأضرار",
      items: [
        "يتحمل الضيف مسؤولية أي ضرر يلحق بمحتويات الوحدة أو مرافق الفندق.",
        "يُعفى الفندق من مسؤولية الأشياء الثمينة غير المودعة في الخزائن المخصصة.",
        "يمكن الإبلاغ عن المفقودات لدى الاستقبال، وتُحفظ المقتنيات لمدة 30 يومًا.",
        "تخضع كافة المعاملات لأنظمة المملكة العربية السعودية وتختص محاكمها بأي نزاع.",
      ],
    },
    {
      title: "الاستدامة والممارسات المسؤولة",
      items: [
        "برنامج ترشيد استهلاك المياه والطاقة في كافة منشآتنا.",
        "خيار للضيف بإعادة استخدام المناشف والمفروشات لتقليل الأثر البيئي.",
        "مواد تجميل وتنظيف صديقة للبيئة في الوحدات والمرافق العامة.",
        "دعم المنتجات المحلية السعودية في تجارب الطعام والضيافة.",
      ],
    },
  ],
};

const hotelPolicyEn = {
  hero: {
    eyebrow: "Hotel Policy",
    title: "Clear policies for a confident stay.",
    text: "This page brings together the operating policies that apply across Swiss Blue hotels, apart-hotels, and serviced apartments, so guests have complete clarity before booking and during their stay, aligned with the highest hospitality standards across Saudi Arabia and the GCC.",
    image: heroImage,
  },
  intro: {
    eyebrow: "A professional hospitality experience",
    title: "A consistent policy framework across all our hotels and serviced apartments.",
    text: "Swiss Blue policies are designed to cover hotels, apart-hotels, and serviced apartments alike, with practical flexibility that suits business guests, families, and long-stay residents. These policies are reviewed regularly to remain aligned with Saudi regulations and the Ministry of Tourism standards.",
  },
  principles: [
    "Full transparency on rates and terms before booking confirmation",
    "Respect for guest privacy and confidentiality of personal data",
    "Around-the-clock commitment to cleanliness, safety, and security",
    "Service flexibility built around both short and long stays",
    "Balanced policy enforcement that protects every guest's comfort",
  ],
  sections: [
    {
      title: "Reservation & booking confirmation",
      items: [
        "Reservations are confirmed once payment is completed or the credit card guarantee is captured, based on the selected rate.",
        "The hotel may request a valid ID and accurate contact details to finalise the booking.",
        "All bookings are subject to unit availability and may have special terms during high season and major events.",
        "Booking modifications may be requested at least 48 hours before arrival, subject to availability and rate rules.",
      ],
    },
    {
      title: "Check-in & check-out",
      items: [
        "Standard check-in is from 3:00 PM and check-out is until 12:00 noon.",
        "Early check-in or late check-out can be requested based on availability and may incur additional charges.",
        "Guests are required to present a valid national ID or passport on arrival.",
        "For arrivals after midnight, please notify reception in advance so the unit is ready on time.",
      ],
    },
    {
      title: "Cancellation & no-show",
      items: [
        "Standard reservations can be cancelled free of charge up to 48 hours before arrival.",
        "A one-night charge applies for late cancellations or no-shows without notice.",
        "Promotional and non-refundable rates carry their own terms, disclosed at the time of booking.",
        "Corporate and group bookings follow the terms of the signed official agreement.",
      ],
    },
    {
      title: "Payment & invoicing",
      items: [
        "We accept payment via Mada, Visa, Mastercard, American Express, Apple Pay, and approved digital wallets.",
        "Displayed rates include 15% VAT and applicable municipality fees in line with local regulations.",
        "A refundable security deposit may be requested on check-in to cover any incidentals.",
        "Tax invoices are issued officially at check-out and can be emailed on request.",
      ],
    },
    {
      title: "Children & extra beds",
      items: [
        "Children of all ages are welcome across our hotels and serviced apartments.",
        "Children under 6 years stay free of charge when using existing bedding in the unit.",
        "Baby cots are available on request, complimentary and subject to availability.",
        "A nominal extra-bed fee applies for children aged 6 to 12.",
      ],
    },
    {
      title: "Pets",
      items: [
        "Pets are not permitted inside our hotels and serviced apartments, to protect the comfort of all guests.",
        "Trained assistance dogs accompanying guests with disabilities are exempt with the appropriate documentation.",
        "Our concierge team can help arrange pet care at trusted nearby facilities.",
      ],
    },
    {
      title: "Smoking",
      items: [
        "All Swiss Blue rooms, suites, and apartments are fully non-smoking environments.",
        "Designated outdoor smoking areas and balconies are available at selected properties.",
        "A deep-cleaning fee starting from SAR 500 applies if smoking is detected inside any unit.",
        "This applies to all forms of smoking, including shisha and electronic cigarettes.",
      ],
    },
    {
      title: "Visitors & gatherings",
      items: [
        "Guests may receive visitors in the hotel's public areas only.",
        "Reception may request visitor identification for security and registration purposes.",
        "Gatherings and parties are not permitted inside the residential units to preserve neighbours' comfort.",
        "For private events, meeting rooms and function spaces can be reserved in advance.",
      ],
    },
    {
      title: "Safety & security",
      items: [
        "24-hour security monitoring at all entrances and public areas.",
        "Smoke detection systems and fire sprinklers across every unit and corridor.",
        "In-room safes are provided to store valuables and important documents.",
        "Clear evacuation plans are posted in every room in both Arabic and English.",
      ],
    },
    {
      title: "Privacy & data protection",
      items: [
        "We adhere to Saudi Arabia's Personal Data Protection Law (PDPL).",
        "Your data is used only for reservation purposes and to improve your stay experience.",
        "Guest data is not shared with third parties without explicit consent, except for official authorities.",
        "Guests may request access to, correction of, or deletion of their data by contacting the privacy team.",
      ],
    },
    {
      title: "Housekeeping & maintenance",
      items: [
        "Daily housekeeping for hotel rooms, and scheduled cleaning for serviced apartments.",
        "Linen and towel changes follow an approved schedule that balances sustainability and guest comfort.",
        "Advanced sanitisation protocols are applied after every check-out using approved, safe products.",
        "24/7 maintenance support is available via reception or the concierge desk.",
      ],
    },
    {
      title: "Long stays & serviced apartments",
      items: [
        "Monthly and quarterly packages are available for guests needing extended stays.",
        "Weekly or twice-weekly housekeeping plans depending on the chosen agreement.",
        "Optional unit customisation is possible when coordinated with hotel management.",
        "Regular monthly invoicing with dedicated support from the account management team.",
      ],
    },
    {
      title: "Accessibility & special needs",
      items: [
        "Accessible units are available at selected properties; please flag this at the time of booking.",
        "Entrances, lifts, and corridors are designed for universal access and wheelchair use.",
        "Special support services are available on request, including meals, transport, and arrival arrangements.",
        "Our hospitality team is trained to handle accessibility and special-needs requirements with care.",
      ],
    },
    {
      title: "Liability & damages",
      items: [
        "Guests are responsible for any damage to the unit's contents or hotel facilities.",
        "The hotel is not liable for valuables that are not stored in the dedicated safes.",
        "Lost items can be reported at reception and are kept securely for 30 days.",
        "All matters are governed by the laws of the Kingdom of Saudi Arabia and its competent courts.",
      ],
    },
    {
      title: "Sustainability & responsible practices",
      items: [
        "A water and energy conservation programme is in place across all our properties.",
        "Guests can opt to reuse towels and linens to help reduce environmental impact.",
        "Eco-friendly amenities and cleaning materials are used in units and public areas.",
        "We support local Saudi producers across our dining and hospitality experiences.",
      ],
    },
  ],
};

const highlights = [
  {
    value: "+10",
    label: "سنوات خبرة",
    text: "خبراء في تشغيل وإدارة الفنادق والشقق الفندقية داخل السوق السعودي",
  },
  {
    value: "+852",
    label: "ضيف يوميًا",
    text: "طاقة تقديرية لاستقبال أكثر من ثمانمائة وخمسين ضيفًا في وقت واحد",
  },
  {
    value: "24/7",
    label: "استقبال دائم",
    text: "فريق استقبال وخدمة أمتعة لمساعدة الضيوف طوال اليوم والليلة",
  },
  {
    value: "+50",
    label: "موظف لخدمتك",
    text: "فريق تشغيلي وإداري يضمن منظومة فندقية أكثر احترافية وراحة",
  },
];

const highlightsEn = [
  {
    value: "+10",
    label: "Years Experience",
    text: "Experts in operating hotels and serviced apartments across Saudi Arabia",
  },
  {
    value: "+852",
    label: "Daily Guests",
    text: "Estimated capacity to host over eight hundred guests at once",
  },
  {
    value: "24/7",
    label: "Guest Reception",
    text: "Reception and luggage support to help guests day and night",
  },
  {
    value: "+50",
    label: "Service Team",
    text: "Operational and admin teams deliver more professional guest comfort",
  },
];

export const defaultLogoImage = "";

const LEGACY_LOGO_URL_PATTERNS = [/swissbluehotels\.com\/wp-content/i];

export function usableLogo(url: string | undefined | null): string {
  if (!url) {
    return "";
  }
  if (LEGACY_LOGO_URL_PATTERNS.some((pattern) => pattern.test(url))) {
    return "";
  }
  return url;
}

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

const careersRecruitment = {
  culture: {
    eyebrow: "ثقافة العمل لدينا",
    title: "مجتمع ضيافة مهني تفخر بالانتماء إليه.",
    text: "في سويس بلو نبني فريقاً يلتزم بأعلى معايير الضيافة في السوق السعودي والخليجي. نؤمن بأن جودة التجربة تبدأ من جودة الأشخاص، لذلك نستثمر في بيئة عمل قائمة على الاحترام والأخلاق والتطوير المستمر.",
    items: [
      { title: "الأخلاق والنزاهة", text: "نعمل بشفافية ومصداقية في كل تعامل مع الضيف والزميل والشريك، ونلتزم بأعلى معايير المهنية." },
      { title: "الاحترافية", text: "معايير تشغيل واضحة، انضباط في الأداء، واهتمام بالتفاصيل في كل قسم من أقسام المنشأة." },
      { title: "روح الفريق الواحد", text: "نتعاون عبر الأقسام والمنشآت، نتشارك المعرفة، وندعم بعضنا لتقديم تجربة ضيافة متكاملة." },
      { title: "التميز في الخدمة", text: "نتجاوز توقعات الضيف من خلال خدمة سريعة، دقيقة، وصادقة تعكس كرم الضيافة السعودية." },
      { title: "الاحترام", text: "نقدّر تنوع فريقنا وضيوفنا، ونتعامل مع الجميع بكرامة وإنصاف في بيئة عمل آمنة وشاملة." },
      { title: "التطوير المستمر", text: "تدريب منظم، مسارات ترقية داخلية، وفرص نمو حقيقية لكل من يلتزم بمعاييرنا كل يوم." },
    ],
  },
  openingsIntro: {
    eyebrow: "الوظائف المتاحة",
    title: "فرص حالية في فنادق وشقق سويس بلو.",
    text: "اختر الدور الذي يناسب خبرتك، واطلع على التفاصيل الكاملة، ثم قدّم طلبك مباشرة من خلال النموذج المرفق بكل وظيفة.",
  },
  applyLabels: {
    summary: "نبذة عن الدور",
    responsibilities: "المسؤوليات الرئيسية",
    qualifications: "المؤهلات المطلوبة",
    experience: "الخبرة المطلوبة",
    skills: "المهارات والكفاءات",
    apply: "قدّم الآن",
    viewDetails: "عرض التفاصيل والتقديم",
    hideDetails: "إخفاء التفاصيل",
    formHeading: "نموذج التقديم",
    formSub: "املأ بياناتك وأرفق سيرتك الذاتية وسيتواصل معك فريق التوظيف.",
  },
  applyForm: {
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    nationality: "الجنسية",
    location: "المدينة / الدولة الحالية",
    yearsExperience: "سنوات الخبرة",
    currentTitle: "المسمى الوظيفي الحالي",
    expectedSalary: "الراتب المتوقع",
    noticePeriod: "فترة الإشعار",
    linkedin: "حساب لينكدإن",
    cv: "إرفاق السيرة الذاتية",
    cvHint: "PDF أو Word",
    message: "رسالة قصيرة أو خطاب تعريفي",
    messagePlaceholder: "أخبرنا لماذا أنت مناسب لهذا الدور…",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال…",
    success: "تم استلام طلبك بنجاح. سيتواصل معك فريق التوظيف خلال خمسة أيام عمل.",
    error: "تعذّر إرسال الطلب. يرجى المحاولة مرة أخرى.",
    optional: "اختياري",
  },
  jobs: [
    {
      title: "مدير مكتب الاستقبال",
      summary: "قيادة عمليات مكتب الاستقبال على مدار الساعة لضمان تجربة وصول ومغادرة سلسة تعكس معايير سويس بلو.",
      responsibilities: [
        "الإشراف على فريق الاستقبال والنوبات وضمان تغطية الخدمة 24/7.",
        "إدارة إجراءات تسجيل الدخول والمغادرة والتعامل مع طلبات الضيوف وشكاواهم.",
        "مراقبة معدلات الإشغال والتنسيق مع الحجوزات والتدبير الفندقي.",
        "تطبيق معايير الجودة والسلامة والامتثال للأنظمة السعودية.",
      ],
      qualifications: [
        "شهادة في إدارة الضيافة أو الفنادق أو مجال ذي صلة.",
        "إجادة العربية والإنجليزية تحدثاً وكتابة.",
        "معرفة بأنظمة إدارة الفنادق (Opera أو ما يماثلها).",
      ],
      experience: "5+ سنوات في مكتب الاستقبال، منها سنتان في موقع إشرافي.",
      skills: ["قيادة الفرق", "خدمة الضيوف", "حل المشكلات", "إدارة الإيرادات الأساسية"],
    },
    {
      title: "مدير التدبير الفندقي",
      summary: "إدارة قسم التدبير الفندقي لضمان أعلى معايير النظافة والجاهزية في الغرف والمساحات العامة.",
      responsibilities: [
        "جدولة فرق تنظيف الغرف والمساحات العامة ومراقبة الأداء.",
        "ضبط مخزون المفروشات ومستلزمات الضيافة ومواد التنظيف.",
        "تطبيق بروتوكولات التعقيم وفحص الجودة بعد كل مغادرة.",
        "التنسيق مع الصيانة والاستقبال لجاهزية الوحدات.",
      ],
      qualifications: [
        "خبرة في إدارة التدبير الفندقي في فندق أو شقق فندقية.",
        "معرفة بمعايير السلامة والصحة المهنية.",
        "القدرة على إدارة الميزانية والمخزون.",
      ],
      experience: "4+ سنوات في التدبير الفندقي، منها خبرة إشرافية.",
      skills: ["إدارة الجودة", "التنظيم", "قيادة الفرق", "ضبط التكاليف"],
    },
    {
      title: "مشرف الأطعمة والمشروبات",
      summary: "الإشراف على خدمة الإفطار والمطعم وخدمة الغرف لتقديم تجربة طعام متسقة وعالية الجودة.",
      responsibilities: [
        "إدارة فريق الخدمة خلال فترات الذروة وضمان سرعة ودقة التقديم.",
        "متابعة معايير النظافة وسلامة الغذاء (HACCP).",
        "التنسيق مع المطبخ لإدارة القوائم والمخزون.",
        "التعامل مع ملاحظات الضيوف وتحسين الخدمة باستمرار.",
      ],
      qualifications: [
        "شهادة في إدارة الأطعمة والمشروبات أو الضيافة.",
        "معرفة بأنظمة نقاط البيع (POS).",
        "شهادة سلامة غذاء سارية تُعد ميزة.",
      ],
      experience: "3+ سنوات في خدمة الأطعمة والمشروبات بالفنادق.",
      skills: ["خدمة العملاء", "سلامة الغذاء", "إدارة الفريق", "العمل تحت الضغط"],
    },
    {
      title: "موظف علاقات الضيوف",
      summary: "كن الوجه المرحّب لسويس بلو، تبني علاقات مع الضيوف وتضمن تجربة إقامة استثنائية.",
      responsibilities: [
        "استقبال ضيوف كبار الشخصيات والضيوف المتكررين وتلبية احتياجاتهم.",
        "متابعة رضا الضيوف خلال الإقامة وحل الملاحظات فوراً.",
        "إدارة طلبات الكونسيرج والترتيبات الخاصة.",
        "جمع آراء الضيوف ورفع تقارير لتحسين الخدمة.",
      ],
      qualifications: [
        "شهادة في الضيافة أو إدارة الأعمال أو ما يعادلها.",
        "إجادة العربية والإنجليزية، ولغة ثالثة ميزة إضافية.",
        "مظهر احترافي ومهارات تواصل عالية.",
      ],
      experience: "2+ سنة في علاقات الضيوف أو الاستقبال.",
      skills: ["التواصل", "التعاطف", "حل المشكلات", "الانتباه للتفاصيل"],
    },
    {
      title: "موظف حجوزات",
      summary: "إدارة الحجوزات المباشرة وعبر القنوات بدقة لتحقيق أفضل إشغال وإيرادات.",
      responsibilities: [
        "معالجة طلبات الحجز عبر الهاتف والبريد والقنوات الإلكترونية.",
        "تحديث الأسعار والتوفر على منصات الحجز ومحرك الحجز المباشر.",
        "متابعة طلبات الشركات والمجموعات بالتنسيق مع المبيعات.",
        "ضمان دقة بيانات الحجز وتأكيدها للضيوف.",
      ],
      qualifications: [
        "شهادة دبلوم أو بكالوريوس في مجال ذي صلة.",
        "إتقان استخدام الحاسب وأنظمة الحجز.",
        "دقة عالية في إدخال البيانات.",
      ],
      experience: "2+ سنة في الحجوزات أو مراكز الاتصال الفندقية.",
      skills: ["الدقة", "البيع عبر الهاتف", "إدارة القنوات", "خدمة العملاء"],
    },
    {
      title: "فني صيانة وهندسة",
      summary: "ضمان تشغيل آمن وموثوق لجميع مرافق المنشأة من خلال الصيانة الوقائية والإصلاح السريع.",
      responsibilities: [
        "تنفيذ الصيانة الوقائية والدورية للأنظمة الكهربائية والميكانيكية.",
        "الاستجابة لطلبات الصيانة في الغرف والمساحات العامة بسرعة.",
        "متابعة أنظمة التكييف والسباكة والإطفاء.",
        "الالتزام بمعايير السلامة وتوثيق أعمال الصيانة.",
      ],
      qualifications: [
        "دبلوم فني في الكهرباء أو الميكانيكا أو التكييف.",
        "معرفة بأنظمة السلامة من الحرائق.",
        "القدرة على العمل ضمن نظام النوبات.",
      ],
      experience: "3+ سنوات في صيانة الفنادق أو المباني.",
      skills: ["الصيانة الكهربائية", "التكييف والتبريد", "السباكة", "السلامة"],
    },
    {
      title: "مدير مبيعات وحسابات الشركات",
      summary: "تنمية إيرادات الشركات والمجموعات عبر بناء علاقات وعقود طويلة الأمد مع الجهات والشركات.",
      responsibilities: [
        "تطوير محفظة حسابات الشركات والجهات الحكومية ووكالات السفر.",
        "إعداد العروض والتفاوض على العقود والأسعار التفضيلية.",
        "متابعة طلبات المجموعات والاجتماعات والإقامات الشهرية.",
        "تحقيق مستهدفات الإيرادات ورفع التقارير الدورية.",
      ],
      qualifications: [
        "بكالوريوس في إدارة الأعمال أو التسويق أو الضيافة.",
        "سجل مثبت في تحقيق مستهدفات المبيعات.",
        "رخصة قيادة سارية وقدرة على التنقل.",
      ],
      experience: "5+ سنوات في مبيعات الفنادق، منها خبرة في السوق الخليجي.",
      skills: ["التفاوض", "بناء العلاقات", "إدارة الحسابات", "تحليل السوق"],
    },
  ],
};

const careersRecruitmentEn = {
  culture: {
    eyebrow: "Our workplace culture",
    title: "A professional hospitality community you'll be proud to join.",
    text: "At Swiss Blue we build a team that lives up to the highest hospitality standards in the Saudi and GCC market. We believe a great guest experience starts with great people, so we invest in a workplace built on respect, ethics, and continuous development.",
    items: [
      { title: "Ethics & Integrity", text: "We act with transparency and honesty in every interaction with guests, colleagues, and partners, holding ourselves to the highest professional standards." },
      { title: "Professionalism", text: "Clear operating standards, disciplined performance, and attention to detail across every department of the property." },
      { title: "Teamwork", text: "We collaborate across departments and properties, share knowledge, and support one another to deliver a complete hospitality experience." },
      { title: "Service Excellence", text: "We exceed guest expectations through fast, accurate, and genuine service that reflects authentic Saudi hospitality." },
      { title: "Respect", text: "We value the diversity of our team and guests, treating everyone with dignity and fairness in a safe, inclusive environment." },
      { title: "Continuous Development", text: "Structured training, internal promotion paths, and real growth opportunities for everyone who upholds our standards every day." },
    ],
  },
  openingsIntro: {
    eyebrow: "Current openings",
    title: "Open roles across Swiss Blue hotels and apartments.",
    text: "Choose the role that fits your experience, review the full details, then apply directly through the form attached to each position.",
  },
  applyLabels: {
    summary: "Role summary",
    responsibilities: "Key responsibilities",
    qualifications: "Required qualifications",
    experience: "Experience required",
    skills: "Skills & competencies",
    apply: "Apply now",
    viewDetails: "View details & apply",
    hideDetails: "Hide details",
    formHeading: "Application form",
    formSub: "Fill in your details, attach your CV, and our recruitment team will be in touch.",
  },
  applyForm: {
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number",
    nationality: "Nationality",
    location: "Current city / country",
    yearsExperience: "Years of experience",
    currentTitle: "Current job title",
    expectedSalary: "Expected salary",
    noticePeriod: "Notice period",
    linkedin: "LinkedIn profile",
    cv: "CV upload",
    cvHint: "PDF or Word",
    message: "Short message or cover note",
    messagePlaceholder: "Tell us why you're a great fit for this role…",
    submit: "Submit application",
    submitting: "Submitting…",
    success: "Your application has been received. Our recruitment team will be in touch within five business days.",
    error: "Could not send your application. Please try again.",
    optional: "optional",
  },
  jobs: [
    {
      title: "Front Office Manager",
      summary: "Lead round-the-clock front office operations to deliver a seamless arrival and departure experience that reflects Swiss Blue standards.",
      responsibilities: [
        "Supervise the reception team and shifts, ensuring 24/7 service coverage.",
        "Manage check-in/check-out procedures and handle guest requests and complaints.",
        "Monitor occupancy and coordinate with reservations and housekeeping.",
        "Enforce quality, safety, and compliance with Saudi regulations.",
      ],
      qualifications: [
        "Degree in hospitality, hotel management, or a related field.",
        "Fluent in Arabic and English, spoken and written.",
        "Knowledge of property management systems (Opera or similar).",
      ],
      experience: "5+ years in front office, including 2 years in a supervisory role.",
      skills: ["Team leadership", "Guest service", "Problem solving", "Basic revenue management"],
    },
    {
      title: "Executive Housekeeper",
      summary: "Run the housekeeping department to maintain the highest standards of cleanliness and readiness across rooms and public areas.",
      responsibilities: [
        "Schedule room and public-area cleaning teams and monitor performance.",
        "Control inventory of linen, guest amenities, and cleaning supplies.",
        "Apply sanitisation protocols and quality checks after every check-out.",
        "Coordinate with maintenance and reception on unit readiness.",
      ],
      qualifications: [
        "Experience managing housekeeping in a hotel or serviced apartments.",
        "Knowledge of occupational health and safety standards.",
        "Ability to manage budgets and inventory.",
      ],
      experience: "4+ years in housekeeping, including supervisory experience.",
      skills: ["Quality management", "Organisation", "Team leadership", "Cost control"],
    },
    {
      title: "Food & Beverage Supervisor",
      summary: "Oversee breakfast, restaurant, and in-room dining service to deliver a consistent, high-quality food experience.",
      responsibilities: [
        "Manage the service team during peak periods, ensuring speed and accuracy.",
        "Maintain hygiene and food safety standards (HACCP).",
        "Coordinate with the kitchen on menus and inventory.",
        "Handle guest feedback and continuously improve service.",
      ],
      qualifications: [
        "Diploma in food & beverage management or hospitality.",
        "Familiarity with point-of-sale (POS) systems.",
        "A valid food safety certificate is an advantage.",
      ],
      experience: "3+ years in hotel food & beverage service.",
      skills: ["Customer service", "Food safety", "Team management", "Working under pressure"],
    },
    {
      title: "Guest Relations Officer",
      summary: "Be the welcoming face of Swiss Blue, building relationships with guests and ensuring an exceptional stay experience.",
      responsibilities: [
        "Welcome VIP and returning guests and anticipate their needs.",
        "Track guest satisfaction during the stay and resolve feedback promptly.",
        "Manage concierge requests and special arrangements.",
        "Collect guest feedback and report it to improve service.",
      ],
      qualifications: [
        "Degree in hospitality, business administration, or equivalent.",
        "Fluent in Arabic and English; a third language is a plus.",
        "Professional presentation and strong communication skills.",
      ],
      experience: "2+ years in guest relations or front office.",
      skills: ["Communication", "Empathy", "Problem solving", "Attention to detail"],
    },
    {
      title: "Reservations Agent",
      summary: "Manage direct and channel reservations accurately to maximise occupancy and revenue.",
      responsibilities: [
        "Process booking requests via phone, email, and online channels.",
        "Update rates and availability across booking platforms and the direct engine.",
        "Follow up on corporate and group requests with the sales team.",
        "Ensure booking data accuracy and confirm to guests.",
      ],
      qualifications: [
        "Diploma or bachelor's degree in a related field.",
        "Strong computer and reservation-system skills.",
        "High accuracy in data entry.",
      ],
      experience: "2+ years in reservations or hotel call centres.",
      skills: ["Accuracy", "Phone sales", "Channel management", "Customer service"],
    },
    {
      title: "Maintenance / Engineering Technician",
      summary: "Ensure safe, reliable operation of all property facilities through preventive maintenance and fast repairs.",
      responsibilities: [
        "Carry out preventive and routine maintenance on electrical and mechanical systems.",
        "Respond quickly to maintenance requests in rooms and public areas.",
        "Maintain HVAC, plumbing, and fire-fighting systems.",
        "Follow safety standards and document maintenance work.",
      ],
      qualifications: [
        "Technical diploma in electrical, mechanical, or HVAC.",
        "Knowledge of fire safety systems.",
        "Ability to work on a shift rotation.",
      ],
      experience: "3+ years in hotel or building maintenance.",
      skills: ["Electrical maintenance", "HVAC", "Plumbing", "Safety"],
    },
    {
      title: "Sales & Corporate Account Manager",
      summary: "Grow corporate and group revenue by building long-term relationships and contracts with companies and entities.",
      responsibilities: [
        "Develop a portfolio of corporate, government, and travel-agency accounts.",
        "Prepare proposals and negotiate contracts and preferential rates.",
        "Follow up on group, meeting, and monthly-stay requests.",
        "Achieve revenue targets and provide regular reporting.",
      ],
      qualifications: [
        "Bachelor's degree in business, marketing, or hospitality.",
        "Proven track record of meeting sales targets.",
        "Valid driving licence and ability to travel.",
      ],
      experience: "5+ years in hotel sales, including GCC market experience.",
      skills: ["Negotiation", "Relationship building", "Account management", "Market analysis"],
    },
  ],
};

const b2bRequestForm = {
  eyebrow: "نموذج الشركات",
  title: "أرسل طلب إقامة أو تعاقد للشركات.",
  text: "شاركنا احتياج الجهة، التواريخ المتوقعة، عدد الوحدات، وحالة المستندات ليتمكن فريق الشركات من تجهيز عرض أدق.",
  steps: [
    "تحديد الجهة وبيانات التواصل",
    "إدخال تفاصيل الإقامة والوثائق",
    "تجهيز عرض مناسب للمراجعة",
  ],
  note: "مناسب للجهات الحكومية، الشركات، الوفود، الإقامات الشهرية، والاجتماعات.",
  step1Heading: "الخطوة 1 من 2 · المعلومات الأساسية",
  step2Heading: "الخطوة 2 من 2 · تفاصيل الإقامة",
  step1Sub: "عرفنا بالجهة وأفضل وسيلة للتواصل.",
  step2Sub: "أخبرنا الآن بتفاصيل الإقامة لإعداد عرض أدق.",
  fields: {
    company: "اسم الشركة أو الجهة",
    sector: "قطاع الشركة",
    contact: "اسم المسؤول",
    jobTitle: "المسمى الوظيفي",
    email: "البريد الرسمي",
    phone: "رقم الجوال",
    city: "المدينة المفضلة",
    propertyType: "نوع المنشأة المفضل",
    requestType: "نوع الطلب",
    guests: "عدد الضيوف المتوقع",
    units: "عدد الغرف أو الشقق",
    arrival: "تاريخ الوصول المتوقع",
    departure: "تاريخ المغادرة المتوقع",
    budget: "الميزانية المستهدفة",
    documents: "المستندات المتوفرة",
    preferredContact: "طريقة التواصل المفضلة",
    message: "متطلبات إضافية",
  },
  selectPlaceholder: "اختر",
  sectorPlaceholder: "اختر القطاع",
  sectorOptions: ["جهة حكومية", "شركة خاصة", "وكالة سفر أو منظم فعاليات", "منظمة غير ربحية", "قطاع آخر"],
  cityOptions: ["جدة", "الرياض", "جازان", "أكثر من مدينة"],
  propertyTypePlaceholder: "اختر نوع المنشأة",
  propertyTypeOptions: ["فندق", "شقق فندقية", "شقق مخدومة", "مرونة حسب العرض"],
  requestTypeOptions: ["سعر شركات", "حجز مجموعة", "إقامة شهرية", "اجتماعات ومناسبات"],
  documentsOptions: [
    "السجل التجاري وخطاب التفويض متوفران",
    "بعض المستندات متوفرة",
    "نحتاج إلى قائمة المتطلبات",
  ],
  contactOptions: ["مكالمة هاتفية", "واتساب", "بريد إلكتروني"],
  placeholders: {
    jobTitle: "مثال: مدير الموارد البشرية",
    guests: "مثال: 45",
    units: "مثال: 20 غرفة",
    budget: "مثال: 450 ريال لليلة",
    message: "اكتب تفاصيل الطلب أو عدد الضيوف أو شروط الدفع",
  },
  continue: "متابعة إلى تفاصيل الإقامة",
  back: "رجوع",
  submit: "إرسال الطلب",
  success: "تم تجهيز الطلب. سيتابع مختص الشركات معك قريبا.",
  error: "تعذّر إرسال الطلب. يرجى المحاولة مرة أخرى.",
  closeModal: "إغلاق",
  summaryHeading: "تم تأكيد الخطوة 1",
};

const b2bRequestFormEn = {
  eyebrow: "B2B request form",
  title: "Send a corporate accommodation request.",
  text: "Share the business need, expected dates, units, and documentation status. The corporate team can use this information to prepare a more accurate proposal.",
  steps: [
    "Identify the entity and contact details",
    "Add stay specifics and documentation",
    "Receive a proposal ready for review",
  ],
  note: "Suitable for government entities, companies, delegations, monthly stays, and meetings.",
  step1Heading: "Step 1 of 2 · Basic information",
  step2Heading: "Step 2 of 2 · Stay details",
  step1Sub: "Tell us who you are and the best way to follow up.",
  step2Sub: "Now share the stay specifics so the proposal lands accurate.",
  fields: {
    company: "Company name",
    sector: "Company sector",
    contact: "Contact person",
    jobTitle: "Job title",
    email: "Business email",
    phone: "Mobile number",
    city: "Preferred city",
    propertyType: "Preferred property type",
    requestType: "Request type",
    guests: "Expected guests",
    units: "Rooms or apartments",
    arrival: "Expected arrival",
    departure: "Expected departure",
    budget: "Target budget",
    documents: "Documents available",
    preferredContact: "Preferred contact method",
    message: "Additional requirements",
  },
  selectPlaceholder: "Select",
  sectorPlaceholder: "Select sector",
  sectorOptions: ["Government entity", "Private company", "Travel agency or event organizer", "Non-profit organization", "Other sector"],
  cityOptions: ["Jeddah", "Riyadh", "Jazan", "Multiple cities"],
  propertyTypePlaceholder: "Select property type",
  propertyTypeOptions: ["Hotel", "Apart-hotel", "Serviced apartments", "Flexible by proposal"],
  requestTypeOptions: ["Corporate rate", "Group booking", "Monthly stay", "Meetings and events"],
  documentsOptions: [
    "Commercial registration and authorization letter are available",
    "Some documents are available",
    "We need the document checklist",
  ],
  contactOptions: ["Phone call", "WhatsApp", "Email"],
  placeholders: {
    jobTitle: "Example: HR manager",
    guests: "Example: 45",
    units: "Example: 20 rooms",
    budget: "Example: SAR 450 per night",
    message: "Add guest count, payment terms, room setup, or any special needs",
  },
  continue: "Continue to stay details",
  back: "Back",
  submit: "Send business request",
  success: "Request prepared. A corporate specialist will follow up shortly.",
  error: "Could not send your request. Please try again.",
  closeModal: "Close",
  summaryHeading: "Step 1 confirmed",
};

const footerMeta = {
  description: "فنادق وأجنحة وشقق فندقية في جدة والرياض وجازان، بتجربة حجز واضحة للضيوف الأفراد والشركات والإقامات الطويلة.",
  cityBadges: ["جدة", "الرياض", "جازان"],
  supportHeading: "الدعم والحجز",
  contactCta: "تواصل معنا",
  copyright: "© 2026 SwissBlue Hotels. جميع الحقوق محفوظة.",
  tagline: "حجز مباشر | ضيافة سعودية | إقامة للشركات والعائلات",
};

const footerMetaEn = {
  description: "Hotels, suites, and serviced apartments in Jeddah, Riyadh, and Jazan, with a clear booking journey for individual guests, companies, and long stays.",
  cityBadges: ["Jeddah", "Riyadh", "Jazan"],
  supportHeading: "Support & Booking",
  contactCta: "Contact us",
  copyright: "© 2026 SwissBlue Hotels. All rights reserved.",
  tagline: "Direct booking | Saudi hospitality | Corporate and family stays",
};

const uiText = {
  bookNow: "احجز الآن",
  bookingBar: {
    property: "الوجهة",
    checkin: "تاريخ الوصول",
    checkout: "تاريخ المغادرة",
    guests: "الضيوف",
    adult: "بالغ",
    adults: "بالغين",
    search: "تحقق من التوفر",
    less: "إنقاص عدد البالغين",
    more: "زيادة عدد البالغين",
  },
  mobileNav: { open: "افتح القائمة", close: "إغلاق القائمة", menu: "القائمة" },
  payments: { label: "نقبل الدفع عبر" },
  cookie: {
    title: "نحترم خصوصيتك",
    text: "يستخدم موقع سويس بلو ملفات تعريف الارتباط (الكوكيز) والتقنيات المشابهة لتشغيل الموقع بشكل سليم، وتذكّر تفضيلاتك مثل اللغة والعملة والوجهة، وتحليل أداء الصفحات، وتحسين تجربتك أثناء البحث عن إقامتك وإتمام الحجز. يمكنك قبول جميع ملفات الارتباط أو الاكتفاء بالملفات الضرورية فقط، ولك تغيير اختيارك في أي وقت. لمعرفة المزيد حول كيفية تعاملنا مع بياناتك، يرجى الاطلاع على",
    accept: "قبول الكل",
    decline: "الضرورية فقط",
    policy: "سياسة الخصوصية",
    aria: "إشعار ملفات تعريف الارتباط",
  },
};

const uiTextEn = {
  bookNow: "Book now",
  bookingBar: {
    property: "Destination",
    checkin: "Check-in",
    checkout: "Check-out",
    guests: "Guests",
    adult: "adult",
    adults: "adults",
    search: "Check availability",
    less: "Fewer adults",
    more: "More adults",
  },
  mobileNav: { open: "Open menu", close: "Close menu", menu: "Menu" },
  payments: { label: "We accept" },
  cookie: {
    title: "We value your privacy",
    text: "The Swiss Blue website uses cookies and similar technologies to run the site properly, remember your preferences such as language, currency, and destination, analyse page performance, and improve your experience while you search for a stay and complete your booking. You can accept all cookies or keep only the essential ones, and you can change your choice at any time. To learn more about how we handle your data, please read our",
    accept: "Accept all",
    decline: "Essential only",
    policy: "Privacy policy",
    aria: "Cookie notice",
  },
};

const closingCtas = {
  eyebrow: "احجز مباشرة",
  defaultText: "قارن بين الغرف والأجنحة والشقق الفندقية ضمن تجربة حجز واضحة تليق بضيوف الضيافة الحديثة.",
  hotelDetail: { titleTemplate: "احجز إقامتك في {hotel}.", cta: "تحقق من التوفر" },
  pages: {
    offers: { title: "ابدأ من العرض المناسب لرحلتك.", cta: "عرض التوفر" },
    corporateDeals: { title: "اطلب عرضا للشركات أو المجموعات.", cta: "تواصل مع المختص" },
    groupBookings: { title: "اطلب تنسيق إقامة لمجموعتك.", cta: "تواصل مع المختص" },
    contact: { title: "اختر المسار الأنسب، وسنساعدك في الخطوة التالية.", cta: "احجز الآن" },
    hotels: { title: "اختر فندقك واحجز بثقة.", cta: "تحقق من التوفر" },
    amenities: { title: "احجز إقامة مدعومة بكل أساسيات الراحة.", cta: "احجز الآن" },
    about: { title: "استكشف فنادقنا وشققنا الفندقية.", cta: "عرض الفنادق" },
    destinations: { title: "اختر المدينة الأقرب لرحلتك.", cta: "احجز الآن" },
    loyalty: { title: "ابدأ من الحجز المباشر للحصول على مزايا أوضح.", cta: "تحقق من التوفر" },
    faq: { title: "ما زلت تحتاج إلى مساعدة؟", cta: "تواصل معنا" },
    careers: { title: "ابحث عن دورك القادم في سويس بلو.", cta: "أرسل سيرتك الذاتية" },
    centralReservation: { title: "حجز مباشر، أفضل الأسعار، مرونة أعلى.", cta: "تحقق من التوفر" },
    feedback: { title: "نسمعك. شاركنا ملاحظتك أو اقتراحك الآن.", cta: "راسلنا" },
    meetingsEvents: { title: "خطّط لمناسبتك القادمة مع سويس بلو.", cta: "تواصل مع فريق الفعاليات" },
    roomsSuites: { title: "اختر فئتك واحجز وحدتك المفضلة مباشرة.", cta: "احجز وحدتك" },
    dining: { title: "اختر إقامة تجعل يومك أسهل.", cta: "احجز إقامتك" },
    servicedApartments: { title: "استكشف الشقق الفندقية واحجز مباشرة.", cta: "استعرض التوفر" },
    socialResponsibility: { title: "ضيافة مسؤولة، إقامة بفارق ملموس.", cta: "استكشف منشآتنا" },
    policy: {
      title: "هل لديكم سؤال حول الإقامة؟",
      text: "فريقنا متاح على مدار الساعة لمساعدتكم في الحجوزات، التعديلات، وكل ما يتعلق بسياسات الإقامة في فنادق وشقق سويس بلو.",
      cta: "تواصل معنا",
    },
  },
};

const closingCtasEn = {
  eyebrow: "Book direct",
  defaultText: "Compare rooms, suites, and serviced apartments with a clear booking journey built for modern hospitality guests.",
  hotelDetail: { titleTemplate: "Book your stay at {hotel}.", cta: "Check availability" },
  pages: {
    offers: { title: "Start with the offer that fits your trip.", cta: "View availability" },
    corporateDeals: { title: "Request a corporate or group proposal.", cta: "Contact specialist" },
    groupBookings: { title: "Request accommodation coordination for your group.", cta: "Contact specialist" },
    contact: { title: "Choose the right path, and we will help with the next step.", cta: "Book now" },
    hotels: { title: "Choose your hotel and book with confidence.", cta: "Check availability" },
    amenities: { title: "Book a stay with the essentials covered.", cta: "Book now" },
    about: { title: "Explore our hotels and serviced apartments.", cta: "View hotels" },
    destinations: { title: "Pick the city closest to your trip.", cta: "Book now" },
    loyalty: { title: "Start with direct booking for clearer benefits.", cta: "Check availability" },
    faq: { title: "Still need help?", cta: "Contact us" },
    careers: { title: "Find your next role at Swiss Blue.", cta: "Send your CV" },
    centralReservation: { title: "Direct booking, best rates, more flexibility.", cta: "Check availability" },
    feedback: { title: "We listen. Share a complaint or suggestion now.", cta: "Write to us" },
    meetingsEvents: { title: "Plan your next event with Swiss Blue.", cta: "Talk to the events team" },
    roomsSuites: { title: "Compare categories and book the right unit.", cta: "Book your unit" },
    dining: { title: "Pick a stay that makes the day easier.", cta: "Book your stay" },
    servicedApartments: { title: "Explore serviced apartments and book direct.", cta: "Check availability" },
    socialResponsibility: { title: "Responsible hospitality that makes a difference.", cta: "Explore our properties" },
    policy: {
      title: "Have a question about your stay?",
      text: "Our team is on hand around the clock to help with reservations, modifications, and anything related to the stay policies across Swiss Blue hotels and serviced apartments.",
      cta: "Contact us",
    },
  },
};

export const defaultSiteContent = {
  ar: {
    seo: {
      siteTitle: "سويس بلو للفنادق | غرف وأجنحة وشقق فندقية",
      metaDescription:
        "موقع سويس بلو للفنادق: فنادق وأجنحة وشقق فندقية وحجز مباشر ووجهات وخدمات الضيوف.",
      keywords: "سويس بلو, فنادق جدة, شقق فندقية, حجز مباشر, أجنحة",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      favicon: "",
      twitterCard: "summary_large_image",
      twitterHandle: "",
      themeColor: "#2b6fe8",
      siteUrl: "https://swissblue23may.vercel.app",
    },
    navGroups,
    footerSections,
    footerContact,
    footerMeta,
    ui: uiText,
    closingCtas,
    media: {
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
      partners: partnersSection,
      testimonials: testimonialsSection,
      cta: {
        eyebrow: "جاهزون لاستقبالكم",
        title: "اعثر على إقامتك القادمة مع سويس بلو.",
        text: "قارن بين الفنادق والشقق الفندقية والشقق المخدومة، ثم انتقل إلى الحجز المباشر بخطوة واحدة.",
        button: "احجز الآن",
      },
    },
    subpages: {
      about: {
        hero: {
          eyebrow: "من نحن",
          title: "محفظة ضيافة سعودية بخيارات واضحة.",
          text: "سويس بلو للفنادق هي محفظة ضيافة تقدم فنادق وشققا فندقية في وجهات حضرية رئيسية، للضيوف الذين يقدرون وضوح الاختيار والراحة العملية والخدمة الودية.",
          image: heroImage,
        },
        philosophy: {
          eyebrow: "فلسفة العلامة",
          title: "إقامة مفهومة من أول لحظة.",
          text: "تركز سويس بلو على تحويل خيارات الغرف والشقق إلى فئات سهلة الفهم والحجز، مع خدمات عملية تناسب رحلات العمل والعائلات والإقامات الطويلة.",
        },
        pillars: [
          "فئات إقامة واضحة",
          "مواقع قريبة من المدينة",
          "راحة لرجال الأعمال والعائلات",
          "مرونة الشقق الفندقية",
          "ثقة في الحجز المباشر",
        ],
        stats: [
          { value: "6", label: "منشآت ضيافة" },
          { value: "3", label: "مدن سعودية" },
          { value: "+280", label: "غرفة وجناح وشقة" },
          { value: "24/7", label: "دعم ضيوف مباشر" },
        ],
        story: {
          eyebrow: "قصتنا",
          title: "بدأنا من فكرة واحدة: إقامة واضحة بلا تعقيد.",
          paragraphs: [
            "انطلقت سويس بلو من قناعة بأن الإقامة الفندقية يجب أن تكون صادقة وسهلة، تركّز على ما يهم الضيف فعلاً: غرفة مريحة، موقع عملي، خدمة ودودة، وسعر مفهوم دون وعود مبالغ فيها.",
            "اليوم تجمع المحفظة بين الفنادق والشقق الفندقية والشقق المخدومة في جدة والرياض وجازان، لتخدم ضيف الأعمال والعائلة والمقيم لفترة طويلة ضمن تجربة واحدة متّسقة، تُدار كل منشأة فيها وفق المعايير ذاتها في النظافة والسلامة والضيافة.",
            "ونؤمن بأن الضيافة المسؤولة جزء من هويتنا، فنستثمر في الكوادر السعودية وندعم مجتمعاتنا المحلية، ونعمل بما يتوافق مع مستهدفات رؤية المملكة 2030 في السياحة وتنمية الإنسان.",
          ],
        },
        valuesIntro: {
          eyebrow: "قيمنا",
          title: "ما الذي يجعل سويس بلو خياراً موثوقاً؟",
          text: "تنعكس قيمنا في كل تفصيل من تجربة الضيف، من لحظة البحث عن الإقامة وحتى المغادرة.",
        },
        values: [
          {
            title: "وضوح الاختيار",
            text: "نحوّل فئات الغرف والشقق إلى خيارات سهلة الفهم، فيعرف الضيف ما يحجزه تماماً قبل وصوله.",
          },
          {
            title: "ضيافة سعودية أصيلة",
            text: "حفاوة استقبال نابعة من ثقافة المملكة، يقدّمها فريق يتحدث لغة ضيوفه ويفهم احتياجاتهم.",
          },
          {
            title: "موقع يخدم رحلتك",
            text: "منشآت في قلب المدن قريبة من مناطق الأعمال والتسوق والمطارات والمعالم الرئيسية.",
          },
          {
            title: "مرونة الإقامة",
            text: "من الليلة الواحدة إلى الإقامة الشهرية، بخيارات فندقية وشقق مخدومة تناسب كل رحلة.",
          },
          {
            title: "ثقة الحجز المباشر",
            text: "أفضل سعر وأوضح الشروط حين تحجز من قنوات سويس بلو مباشرة دون وسطاء.",
          },
          {
            title: "التزام الجودة",
            text: "معايير تشغيل وسلامة موحّدة عبر كل منشأة في المحفظة، يراجعها فريق مختص باستمرار.",
          },
        ],
      },
      dining: {
        hero: {
          eyebrow: "المطاعم وخدمات الطعام",
          title: "خيارات طعام عملية طوال الإقامة.",
          text: "من الإفطار إلى المقهى والمطعم وخدمة الغرف، تقدم سويس بلو تجربة طعام مريحة تخدم ضيف الأعمال والعائلة والضيف المقيم لفترة أطول.",
          image: jeddahImage,
        },
        intro: {
          eyebrow: "تجربة الطعام",
          title: "كل خدمة طعام لها دور واضح في رحلة الضيف.",
          text: "تختلف بعض الخدمات حسب الوجهة، لكن المحتوى يوضح ما يمكن توقعه ويجعل تجربة الإقامة أكثر اكتمالا واحترافية.",
        },
        options: diningOptions,
      },
      roomsSuites: {
        hero: {
          eyebrow: "الغرف والأجنحة",
          title: "تصنيف الوحدات حسب كل منشأة.",
          text: "تعرض هذه الصفحة التصنيف التسويقي المعتمد للغرف والأجنحة والشقق في كل منشأة، مع عدد الوحدات وأرقام الغرف والفروقات الأساسية بين الفئات.",
          image: heroImage,
        },
        intro: {
          eyebrow: "منهجية التصنيف",
          title: "تصنيف تسويقي لتحسين البيع والظهور.",
          text: "يعتمد التصنيف على إظهار الفروق بين الفئات، مثل الإطلالة، عدد غرف النوم، تكوين الأسرّة، وغرف المعيشة، بما يساعد الضيف على اختيار الوحدة الأنسب ويساعد المنشآت على إدارة الأسعار بشكل أوضح.",
        },
        principles: [
          "تصنيف تسويقي يعزز وضوح الفئات على منصات الحجز",
          "فصل أكبر بين الفئات لإبراز الإطلالة والتجهيزات والقيمة",
          "تعدد سعري يدعم ترقية الضيف إلى فئات أعلى",
          "مراجعة التصنيف بعد 6 أشهر بناء على الأداء والطلب",
        ],
        detailsIntro: {
          eyebrow: "تفاصيل الوحدات",
          title: "الفئات المعتمدة لكل منشأة.",
          text: "كل جدول يوضح اسم الفئة، عدد غرف النوم، تكوين الأسرّة، الإطلالة، دورات المياه، غرف المعيشة، إجمالي الوحدات، وأرقام الغرف.",
        },
        classifications: roomClassifications,
      },
      servicedApartments: {
        hero: {
          eyebrow: "الشقق الفندقية",
          title: "شقق فندقية لإقامات أطول وأسهل.",
          text: "تعد شقق سويس بلو خيارا مثاليا للعائلات وانتقالات العمل والزيارات الطويلة والضيوف الذين يفضلون مساحة أكبر مع خدمات فندقية.",
          image: jeddahImage,
        },
        benefits: [
          "شقق فندقية واسعة مع مطبخ وغسالة ملابس ومساحة معيشة",
          "مساحة معيشة ممتازة للعائلات وللإقامات الطويلة",
          "راحة عملية مع خدمات فندقية متكاملة",
          "حضور في مواقع حيوية في جدة والرياض وجازان",
          "مناسبة لتعاقدات الشركات والانتقال المؤقت والإقامة الشهرية",
          "خصوصية أعلى مع دعم حجز مباشر مخصص",
        ],
        intro: {
          eyebrow: "لماذا الشقق الفندقية",
          title: "مساحة بيت كامل مع راحة الفندق.",
          text: "تجمع الشقق الفندقية بين استقلالية السكن الخاص وخدمات الضيافة اليومية، فهي الخيار الأمثل للإقامات الأطول التي تحتاج إلى مطبخ ومساحة معيشة وخصوصية إضافية دون التخلي عن الاستقبال والتدبير والدعم الفندقي.",
        },
        includedIntro: {
          eyebrow: "ماذا تتضمن كل شقة",
          title: "تجهيزات تجعل الإقامة الطويلة سهلة.",
          text: "تختلف بعض التفاصيل حسب المنشأة والفئة، لكن أساسيات الراحة حاضرة في كل وحدة.",
        },
        included: [
          "مطبخ مجهّز بأدوات الطهي والثلاجة",
          "غسالة ملابس داخل الوحدة أو خدمة غسيل",
          "مساحة معيشة منفصلة للعمل أو الاستقبال",
          "خدمة تدبير دورية للوحدة",
          "إنترنت عالي السرعة في كل الغرف",
          "استقبال ودعم ضيوف على مدار اليوم",
        ],
        propertiesIntro: {
          eyebrow: "وجهات الشقق الفندقية",
          title: "خمس منشآت في ثلاث مدن.",
          text: "اختر الموقع الأنسب لرحلتك بين جدة والرياض وجازان.",
        },
        properties: [
          { name: "شقق الزهراء الفندقية", city: "جدة", units: "46 شقة", slug: "al-zahraa-serviced-apartments" },
          { name: "شقق السامر الفندقية", city: "جدة", units: "33 شقة", slug: "al-samer-serviced-apartments" },
          { name: "سويس بلو للشقق الفندقية جازان", city: "جازان", units: "55 شقة", slug: "swiss-blue-jazan" },
          { name: "شقق فيناس الرياض الفندقية", city: "الرياض", units: "35 شقة", slug: "vinas-riyadh-serviced-apartments" },
          { name: "شقق توليب الروضة الفندقية", city: "الرياض", units: "37 شقة", slug: "tulip-alrawdah-serviced-apartments" },
        ],
        idealForIntro: {
          eyebrow: "لمن تناسب",
          title: "صُممت لمن يحتاج مساحة ومرونة.",
          text: "تخدم الشقق الفندقية أنماط إقامة مختلفة، تجمعها الحاجة إلى راحة تشبه البيت.",
        },
        idealFor: [
          {
            title: "العائلات",
            text: "غرف نوم متعددة ومساحة معيشة تمنح كل فرد خصوصيته وراحته.",
          },
          {
            title: "انتقالات العمل",
            text: "قاعدة مريحة للموظفين المنتدبين وفرق المشاريع المؤقتة.",
          },
          {
            title: "الإقامة الطويلة",
            text: "أسعار شهرية وخدمات تجعل الإقامة الممتدة عملية واقتصادية.",
          },
          {
            title: "ضيوف الأعمال",
            text: "مكان للعمل والراحة معاً مع إنترنت سريع وموقع حيوي قريب من الأعمال.",
          },
        ],
        longStay: {
          eyebrow: "الإقامة الشهرية",
          title: "أسعار خاصة للإقامات الممتدة.",
          text: "نوفّر باقات شهرية بأسعار تفضيلية للضيوف الأفراد والشركات، تشمل خدمات تدبير منتظمة ودعماً مخصصاً من فريق الحجوزات. تواصل معنا لتجهيز عرض إقامة طويلة يناسب مدتك ووجهتك.",
        },
      },
      amenitiesServices: {
        hero: {
          eyebrow: "الخدمات والمرافق",
          title: "خدمات مصممة حول راحتك.",
          text: "تدعم كل إقامة في سويس بلو مجموعة من الخدمات الأساسية التي تجعل السفر أسهل وأكثر راحة وموثوقية.",
          image: jazanImage,
        },
        standardsIntro: {
          eyebrow: "معايير الخدمة",
          title: "وعد خدمة موحّد في كل منشأة.",
          text: "مهما اخترت من وجهاتنا، تجد المعايير ذاتها في النظافة والسلامة وحفاوة الاستقبال. نرتّب خدماتنا في عائلات واضحة تساعدك على معرفة ما تتوقعه قبل وصولك.",
        },
        commitments: [
          {
            title: "اتصال دائم",
            text: "إنترنت مجاني عالي السرعة في كل الغرف والمساحات العامة لتبقى متصلاً للعمل والترفيه.",
          },
          {
            title: "ضيافة الطعام",
            text: "بوفيه إفطار يومي، مقهى، ومطعم، مع خدمة غرف في وجهات مختارة.",
          },
          {
            title: "جاهزية الأعمال",
            text: "قاعات اجتماعات ومساحات عمل ودعم متخصص للحجوزات المؤسسية والمجموعات.",
          },
          {
            title: "العافية والراحة",
            text: "نادٍ رياضي مجهّز ومسبح داخلي في وجهات مختارة للحفاظ على روتينك أثناء السفر.",
          },
          {
            title: "سهولة التنقل",
            text: "خدمة سيارات أجرة، مواقف، ودعم للوصول من وإلى المطار حسب الموقع.",
          },
          {
            title: "دعم الضيف",
            text: "استقبال ومساندة على مدار اليوم، خزائن آمنة، وخدمة قهوة وشاي وميني بار.",
          },
        ],
      },
      loyaltyPage: {
        hero: {
          eyebrow: "برنامج الولاء",
          title: "مزايا مباشرة لضيوف سويس بلو الدائمين.",
          text: "برنامج ولاء يربط الضيوف المتكررين بعروض الحجز المباشر، أولوية الترقية عند توفرها، ودعم أسرع من فريق الحجوزات.",
          image: heroImage,
        },
        tiersIntro: {
          eyebrow: "فئات العضوية",
          title: "كلما أقمت أكثر، حصلت على مزايا أكبر.",
          text: "أربع فئات ترتقي معك تلقائياً مع كل إقامة مباشرة، وتفتح لك مزايا إضافية في الترقيات والأسعار والخدمة.",
        },
        tiers: [
          {
            name: "أزرق",
            threshold: "من أول إقامة",
            perks: [
              "سعر العضو الخاص على الحجز المباشر",
              "إنترنت مجاني عالي السرعة",
              "تسجيل وصول مبكر عند التوفر",
            ],
          },
          {
            name: "فضي",
            threshold: "بعد 5 ليالٍ أو 3 إقامات سنوياً",
            perks: [
              "خصم إضافي على الحجز المباشر",
              "ترقية فئة الغرفة عند التوفر",
              "مغادرة متأخرة حتى الساعة 2 ظهراً",
              "نقاط مضاعفة ×1.25",
            ],
          },
          {
            name: "ذهبي",
            threshold: "بعد 15 ليلة أو 8 إقامات سنوياً",
            perks: [
              "أولوية ترقية للأجنحة عند التوفر",
              "إفطار مجاني لشخصين",
              "مغادرة متأخرة حتى الساعة 4 عصراً",
              "نقاط مضاعفة ×1.5",
              "خط حجز مخصص",
            ],
          },
          {
            name: "بلاتيني",
            threshold: "بعد 30 ليلة أو 15 إقامة سنوياً",
            perks: [
              "ترقية مضمونة لأفضل فئة متاحة",
              "وصول وانصراف مرنان",
              "هدية ترحيب وخدمة كونسيرج شخصية",
              "نقاط مضاعفة ×2",
              "مزايا حصرية لدى شركائنا",
            ],
          },
        ],
        earn: {
          eyebrow: "اكسب نقاطك",
          title: "كل إقامة مباشرة تقرّبك من مكافأتك القادمة.",
          items: [
            "نقاط على كل ريال تنفقه في الإقامة المباشرة",
            "نقاط إضافية على خدمات الطعام والإقامات الممتدة",
            "نقاط ترحيبية عند أول تسجيل في البرنامج",
            "عروض موسمية لمضاعفة النقاط",
          ],
        },
        redeem: {
          eyebrow: "استبدل نقاطك",
          title: "حوّل نقاطك إلى قيمة حقيقية.",
          items: [
            "ليالٍ مجانية في أي من منشآت سويس بلو",
            "ترقيات الغرف والأجنحة",
            "خصم مباشر على قيمة الفاتورة",
            "مزايا طعام وخدمات إضافية",
          ],
        },
        howItWorksIntro: {
          eyebrow: "كيف يعمل البرنامج",
          title: "أربع خطوات تفصلك عن مزاياك.",
          text: "التسجيل مجاني، والمزايا تبدأ من إقامتك الأولى.",
        },
        howItWorks: [
          {
            title: "سجّل مجاناً",
            text: "انضم إلى برنامج ولاء سويس بلو خلال دقيقة عبر موقعنا أو مكتب الاستقبال.",
          },
          {
            title: "احجز مباشرة",
            text: "احجز من قنواتنا المباشرة لتكسب النقاط مع كل ليلة إقامة.",
          },
          {
            title: "ارتقِ بين الفئات",
            text: "تصعد فئتك تلقائياً كلما زادت لياليك وإقاماتك خلال العام.",
          },
          {
            title: "استبدل مزاياك",
            text: "حوّل نقاطك إلى ليالٍ وترقيات ومزايا حصرية وقتما تشاء.",
          },
        ],
      },
      meetingsEvents: {
        hero: {
          eyebrow: "صفقات الشركات",
          title: "حلول إقامة وتعاقد للشركات والمجموعات.",
          text: "مسار مهني لحجوزات الفرق والوفود والاجتماعات والإقامات الشهرية، مع تواصل واضح ومتطلبات توثيق تساعد على إنجاز التعاقد بثقة.",
          image: heroImage,
        },
        intro: {
          eyebrow: "للشركات والجهات الرسمية",
          title: "من طلب العرض إلى تأكيد الحجز.",
          text: "يساعد فريق صفقات الشركات في تنظيم الاحتياج، مقارنة الوجهات، تحديد فئات الوحدات، وتجهيز عرض مهني قابل للمراجعة والاعتماد الداخلي.",
        },
        deals: corporateDeals,
        documentsIntro: {
          eyebrow: "المستندات المطلوبة",
          title: "متطلبات واضحة قبل التعاقد الرسمي.",
          text: "وجود المستندات من البداية يسرع التسعير، الاعتماد، وإصدار التأكيدات للفريق أو الوفد.",
        },
        documents: [
          "السجل التجاري أو بيانات المنشأة الرسمية",
          "شهادة ضريبة القيمة المضافة عند الحاجة",
          "خطاب تفويض للممثل المعتمد",
          "بيانات الفوترة وشروط الدفع",
          "قائمة الضيوف وتواريخ الوصول والمغادرة",
          "متطلبات الاجتماعات والضيافة إن وجدت",
        ],
      },
      corporateDealsPage: {
        hero: {
          eyebrow: "تعاقدات الشركات",
          title: "حلول إقامة وتعاقد للشركات والمجموعات.",
          text: "مسار مهني لحجوزات الفرق والوفود والاجتماعات والإقامات الشهرية، مع تواصل واضح ومتطلبات توثيق تساعد على إنجاز التعاقد بثقة.",
          image: heroImage,
        },
        requestForm: b2bRequestForm,
      },
      groupBookings: {
        hero: {
          eyebrow: "حجوزات المجموعات",
          title: "تنسيق احترافي لإقامة الفرق والوفود.",
          text: "مسار مخصص لتنظيم حجوزات المجموعات في منشآت سويس بلو، من اختيار المدينة والفئات المناسبة إلى تأكيد التواريخ واحتياجات الضيوف.",
          image: heroImage,
        },
        intro: {
          eyebrow: "للشركات والوفود",
          title: "حجز مجموعة واحدة يحتاج إلى تفاصيل واضحة.",
          text: "يساعد فريق سويس بلو في تنظيم احتياج المجموعة، مقارنة المنشآت، وتأكيد فئات الإقامة بطريقة مهنية وسهلة المتابعة.",
        },
        items: [
          "تنسيق قوائم الضيوف وتواريخ الوصول والمغادرة",
          "توزيع أنواع الغرف والشقق حسب احتياج المجموعة",
          "دعم حجوزات الوفود والفرق والزيارات الرسمية",
          "إمكانية ربط الإقامة بالاجتماعات أو الضيافة عند الحاجة",
        ],
        eligibility: {
          eyebrow: "من 10 وحدات فأكثر",
          title: "متى تكون مجموعتك مؤهلة؟",
          text: "نعتبر الحجز مجموعة عند عشر غرف أو وحدات فأكثر في التواريخ نفسها. عندها نوفّر تسعيراً خاصاً للمجموعات ومنسّق حجز مخصصاً يتابع كل التفاصيل من العرض الأول حتى المغادرة.",
        },
        processIntro: {
          eyebrow: "كيف نعمل",
          title: "من الطلب إلى الوصول في أربع خطوات.",
          text: "مسار واضح وسريع يجعل تنظيم حجز المجموعة سهلاً ومنظّماً.",
        },
        process: [
          {
            title: "أرسل طلبك",
            text: "زوّدنا بالمدينة، عدد الوحدات، التواريخ، وطبيعة المجموعة.",
          },
          {
            title: "استلم عرضك",
            text: "نجهّز عرضاً خاصاً بفئات الوحدات والأسعار خلال يوم عمل.",
          },
          {
            title: "أكّد التفاصيل",
            text: "نثبّت قائمة الضيوف وتوزيع الغرف وطلبات الضيافة.",
          },
          {
            title: "صل واستمتع",
            text: "تسجيل وصول جماعي منظّم ومنسّق مخصص طوال الإقامة.",
          },
        ],
        inclusionsIntro: {
          eyebrow: "ماذا يشمل",
          title: "كل ما تحتاجه مجموعتك في مكان واحد.",
          text: "نوفّر التفاصيل اللوجستية حتى تركّز على هدف رحلتك.",
        },
        inclusions: [
          "تسعير خاص للمجموعات",
          "منسّق حجز مخصص",
          "تسجيل وصول ومغادرة جماعي ميسّر",
          "مرونة في توزيع أنواع الغرف",
          "ربط الإقامة بقاعات الاجتماعات عند الحاجة",
          "خيارات فوترة موحّدة للجهة المنظّمة",
        ],
        idealForIntro: {
          eyebrow: "لمن تناسب",
          title: "نستقبل كل أنواع المجموعات.",
          text: "خبرتنا تشمل تنسيق الإقامات لمجموعات متنوعة الأهداف والأحجام.",
        },
        idealFor: [
          "وفود الشركات والمؤتمرات",
          "المجموعات السياحية والعائلية",
          "حفلات الزفاف وإقامة الضيوف",
          "الفرق الرياضية وبرامج التدريب",
          "الرحلات الدينية والزيارات الرسمية",
        ],
      },
      contact: {
        hero: {
          eyebrow: "تواصل معنا",
          title: "قنوات واضحة للحجز، الشركات، وخدمة الضيوف.",
          text: "يمكنك بدء الحجز مباشرة، أو التواصل مع نظام الحجز المركزي، أو طلب دعم مختص صفقات الشركات، أو التواصل مع فريق خدمة الضيوف.",
          image: jeddahImage,
        },
        channels: contactChannels,
        bookingIntro: {
          eyebrow: "الحجز المباشر",
          title: "ابدأ بطلب التوفر.",
          text: "رابط الحجز المباشر هو أسرع مسار للضيوف الأفراد، بينما تدعم قنوات التواصل طلبات الشركات والمجموعات والأسئلة التفصيلية.",
        },
      },
      offersPage: {
        hero: {
          eyebrow: "العروض والخصومات الخاصة",
          title: "عروض مصممة حول سبب الإقامة.",
          text: "صفحة العروض تجمع الإقامة العائلية، الإقامة الشهرية، ومزايا الحجز المباشر بطريقة تسهل على الضيف اختيار العرض المناسب والتواصل بثقة.",
          image: heroImage,
        },
        intro: {
          eyebrow: "العروض الرئيسية",
          title: "ثلاثة مسارات واضحة للضيف.",
          text: "بدلا من عروض عامة، توضح الصفحة الاحتياج الفعلي: عائلة تحتاج مساحة، ضيف يحتاج إقامة شهرية، أو عميل يريد مزايا الحجز المباشر.",
        },
        offers: [
          {
            title: "إقامة عائلية",
            text: "خيارات شقق متعددة الغرف، مساحة معيشة أفضل، وراحة فندقية تجعل زيارة العائلة أكثر سهولة وخصوصية.",
          },
          {
            title: "إقامة شهرية",
            text: "حلول إقامة طويلة في جدة وجازان والرياض، مناسبة للموظفين والانتقالات وضيوف الشركات.",
          },
          {
            title: "مزايا الحجز المباشر",
            text: "أسعار أوضح، دعم مباشر من فريق الحجوزات، وأولوية في اختيار الفئة المناسبة عند توفرها.",
          },
        ],
        benefitsIntro: {
          eyebrow: "مزايا الحجز المباشر",
          title: "قيمة أوضح عندما تبدأ من قنوات سويس بلو.",
          text: "هذه المزايا تساعد الموقع على تحويل الزائر من التصفح إلى الحجز أو التواصل دون إرباك أو عروض غير واضحة.",
        },
        benefits: [
          "وضوح أكبر في الفئة والسعر قبل تأكيد الحجز",
          "دعم مباشر من فريق الحجوزات",
          "أولوية في تلبية طلبات الضيف حسب التوفر",
          "مسار مناسب للعائلات والإقامات الشهرية",
        ],
      },
      faqPage: {
        hero: {
          eyebrow: "الأسئلة الشائعة",
          title: "معلومات واضحة قبل الحجز والإقامة.",
          text: "تغطي الأسئلة الشائعة تفاصيل الحجز، سياسات الدخول والخروج، الخدمات المتوفرة، والخيارات المناسبة للشركات والعائلات.",
          image: heroImage,
        },
      },
      hotelsPage: {
        hero: {
          eyebrow: "فنادقنا وشققنا الفندقية",
          title: "محفظة ضيافة واضحة في جدة وجازان والرياض.",
          text: "استكشف وجهات سويس بلو في المملكة العربية السعودية، من الفنادق المناسبة لرحلات العمل إلى الشقق الفندقية للعائلات والإقامات الممتدة.",
          image: heroImage,
        },
        intro: {
          eyebrow: "اختر وجهتك",
          title: "كل وجهة مصممة حول احتياج واضح للضيف.",
          text: "تساعد فئات الفنادق والشقق الضيوف على مقارنة المدينة ونوع الإقامة والمساحة المناسبة قبل الانتقال إلى الحجز.",
        },
      },
      destinationsPage: {
        hero: {
          eyebrow: "الوجهات",
          title: "جدة، الرياض، وجازان ضمن تجربة واحدة.",
          text: "تعرف على طبيعة كل مدينة، أفضل طرق الاستمتاع بها، ونوع الإقامة الأنسب لرحلتك سواء كانت للأعمال أو العائلة أو الإقامة الطويلة.",
          image: heroImage,
        },
      },
      hotelPolicy: hotelPolicyAr,
      careersPage: {
        hero: {
          eyebrow: "انضم إلى سويس بلو",
          title: "ابني مسيرتك المهنية في الضيافة السعودية.",
          text: "ننمي فرقنا من الداخل. كن جزءاً من ثقافة خدمة متميزة في جدة والرياض وجازان.",
          image: heroImage,
        },
        intro: {
          eyebrow: "لماذا سويس بلو",
          title: "نموٌّ حقيقي ومسؤولية حقيقية منذ اليوم الأول.",
          text: "كل منشأة بيئة تدريب. الخط الأمامي والخلفي والمكاتب الإدارية، نستثمر في الأشخاص الذين يقدّمون معاييرنا كل يوم.",
        },
        whyJoin: [
          {
            title: "مسار مهني واضح",
            text: "تدرج وظيفي من الوظائف التشغيلية إلى القيادة عبر الفنادق والإدارة العامة.",
          },
          {
            title: "تعلم مستمر",
            text: "تدريب منظم عند الانضمام، تطوير أثناء العمل، وشهادات في الخدمة والسلامة وعمليات الضيافة.",
          },
          {
            title: "فريق متعدد الثقافات",
            text: "سعوديون وزملاء من المنطقة ودول مختلفة جنباً إلى جنب، باللغتين العربية والإنجليزية.",
          },
          {
            title: "تقدير وتحفيز",
            text: "حوافز أداء، تكريم موظف الشهر، وأولوية للترقيات الداخلية قبل التوظيف الخارجي.",
          },
        ],
        departmentsIntro: {
          eyebrow: "الأقسام التي نوظف فيها",
          title: "فرص في كل تخصص فندقي.",
          text: "نبحث باستمرار عن مرشحين في الأدوار التشغيلية والإدارية والتجارية في مختلف منشآتنا.",
        },
        departments: [
          {
            title: "مكتب الاستقبال",
            text: "موظف استقبال، مشرف نوبة، مدير مكتب أمامي، خدمة ضيوف.",
          },
          {
            title: "تدبير الفنادق",
            text: "عامل تنظيف غرف، مشرف طوابق، مدير تدبير، فحص الجودة.",
          },
          {
            title: "الأطعمة والمشروبات",
            text: "خدمة المطعم، باريستا، شيف، إشراف وجبات، تنظيم الإفطار.",
          },
          {
            title: "الهندسة والصيانة",
            text: "فني صيانة عام، فني تكييف، كهربائي، مسؤول سلامة.",
          },
          {
            title: "المبيعات والتسويق",
            text: "مدير حسابات شركات، حجوزات مجموعات، تسويق رقمي.",
          },
          {
            title: "المالية والإدارة",
            text: "محاسب، موظف مشتريات، شؤون موظفين، تدقيق ليلي.",
          },
        ],
        applyIntro: {
          eyebrow: "كيفية التقديم",
          title: "أرسل سيرتك الذاتية إلى فريقنا.",
          text: "أرفق سيرتك الذاتية، الدور الذي يهمك، والمدينة المفضلة. سنتواصل خلال خمسة أيام عمل في حال توافق ملفك مع الفرص المتاحة.",
          email: "careers@swissblue.sa",
          cta: "أرسل سيرتك الذاتية",
        },
        recruitment: careersRecruitment,
      },
      csrPage: {
        hero: {
          eyebrow: "المسؤولية الاجتماعية",
          title: "ضيافةٌ تردّ للمجتمع.",
          text: "متجذرون في رؤية المملكة 2030، نستثمر فنادقنا في المجتمع والبيئة والإنسان، وراء كل إقامة جميلة.",
          image: heroImage,
        },
        intro: {
          eyebrow: "نهجنا",
          title: "الضيافة المسؤولة ضيافة يومية.",
          text: "نرى المسؤولية الاجتماعية جزءاً من طريقة عملنا، لا برنامجاً منفصلاً. القرارات اليومية في كل منشأة تُغذّي التزاماتنا.",
        },
        pillars: [
          {
            title: "المجتمع",
            text: "توريد محلي، دعم برامج التعليم والشباب، وموائد إفطار رمضان في كل منشأة.",
          },
          {
            title: "البيئة",
            text: "ترشيد المياه والطاقة، تقليل البلاستيك أحادي الاستخدام، وفصل النفايات في فنادقنا.",
          },
          {
            title: "كوادر العمل",
            text: "السعودة، توظيف عادل، تدريب منظم، وبيئة عمل آمنة لكل فرد من الفريق.",
          },
          {
            title: "رؤية 2030",
            text: "متوائمون مع أهداف المملكة في السياحة والبيئة وتنمية القدرات البشرية.",
          },
        ],
        initiativesIntro: {
          eyebrow: "مبادرات قائمة",
          title: "ممارسات عملية في كل منشأة.",
          text: "نقيس ما نقدمه، ونحدّث برامجنا سنوياً ضمن خطتنا للحوكمة والاستدامة.",
        },
        initiatives: [
          {
            title: "خارطة السعودة",
            text: "زيادة نسبة الكوادر السعودية في الأدوار التشغيلية والقيادية كل عام.",
          },
          {
            title: "شراكات تعليمية",
            text: "اتفاقيات تدريب مع كليات السياحة والضيافة لاستقبال طلاب الإمتياز.",
          },
          {
            title: "تدريب الشباب",
            text: "برامج صيفية ومسار مبتدئين لخريجي المدارس الثانوية والكليات.",
          },
          {
            title: "موائد رمضان",
            text: "موائد إفطار يومية للعاملين والضيوف وأبناء الحي خلال شهر رمضان المبارك.",
          },
          {
            title: "تقليل البلاستيك",
            text: "زجاجات قابلة لإعادة التعبئة، تعبئة المرافق بكميات كبيرة، والاستغناء عن المصاصات.",
          },
          {
            title: "التوريد المحلي",
            text: "أولوية لمزودي الأطعمة والمنتجات والصناعات الصغيرة من داخل المملكة.",
          },
        ],
        reportingIntro: {
          eyebrow: "الشفافية والإفصاح",
          title: "نُصدر تحديثاً سنوياً عن أدائنا.",
          text: "نشارك تقدمنا في برامج الاستدامة والسعودة وممارسات الضيافة المسؤولة في تقرير سنوي يصدر مع الإدارة العامة.",
        },
      },
      reservationOfficePage: {
        hero: {
          eyebrow: "دعم الحجز المباشر",
          title: "مكتب الحجوزات المركزي.",
          text: "فريق واحد، رقم واحد. خطّط واحجز وعدّل إقامتك في جميع فنادق وشقق سويس بلو في جدة وجازان والرياض — مكالمة أو رسالة واتساب واحدة تكفي.",
          image: heroImage,
        },
        intro: {
          eyebrow: "فريقك للحجز المباشر",
          title: "تحدّث إلى مختص حجوزات حقيقي، بالعربية أو الإنجليزية.",
          text: "مكتب الحجوزات المركزي نقطة اتصال واحدة لكل منشآت سويس بلو. نتولّى الحجوزات الجديدة، وطلبات المجموعات، وحسابات الشركات، والتعديلات أثناء الإقامة — مباشرة، دون وسطاء ودون رسوم إضافية.",
        },
        channels: [
          {
            title: "اتصل بنا",
            value: "+966 59 597 9064",
            href: "tel:+966595979064",
            text: "تحدّث مباشرة مع فريق الحجوزات على مدار الساعة لتأكيد التوفر والأسعار وإتمام حجزك في دقائق.",
          },
          {
            title: "واتساب",
            value: "+966 59 597 9064",
            href: "https://wa.me/966595979064",
            text: "أرسل تواريخك وعدد الضيوف، وسنعيد لك خيارات الغرف والأسعار كتابةً.",
          },
          {
            title: "البريد الإلكتروني",
            value: "reservations@swissblue.sa",
            href: "mailto:reservations@swissblue.sa",
            text: "للطلبات التي تحتاج توثيقاً كتابياً: عروض المجموعات، وعقود الشركات، والفواتير.",
          },
          {
            title: "في الفندق",
            value: "مكتب الاستقبال",
            href: "",
            text: "زر أي منشأة لإتمام حجزك وجهاً لوجه مع موظف الاستقبال على مدار اليوم.",
          },
        ],
        servicesIntro: {
          eyebrow: "ماذا نتولّى",
          title: "كل ما تحتاجه لحجزٍ سلس، من غرفة واحدة إلى رحلة متعددة المدن.",
          text: "سواء كانت ليلة عمل واحدة، أو إقامة شهرية لعائلة، أو حجزاً جماعياً لشركة، يتولّى الفريق طلبك من أوله إلى آخره ويوصلك بفريق المنشأة عند الحاجة.",
        },
        services: [
          "حجوزات جديدة للأفراد والعائلات",
          "حجوزات المجموعات (10 غرف أو أكثر) وأسعار خاصة",
          "حسابات وعقود الشركات والفوترة الآجلة",
          "إقامات شهرية وطويلة الأمد في الشقق المخدومة",
          "ترتيبات المناسبات وشهر العسل والطلبات الخاصة",
          "تعديل وتمديد وإلغاء الحجوزات",
          "دعم أثناء الإقامة والتنسيق مع المنشأة",
          "خطط رحلات متعددة المنشآت بين جدة وجازان والرياض",
        ],
        benefitsIntro: {
          eyebrow: "لماذا الحجز المباشر معنا",
          title: "ميزات لا تحصل عليها عبر مواقع الحجز الخارجية.",
          text: "الحجز المباشر عبر مكتبنا يضمن لك أفضل سعر، ومرونة أعلى، وتواصلاً بشرياً يعرف تفاصيل إقامتك قبل وصولك.",
        },
        benefits: [
          {
            title: "ضمان أفضل سعر",
            text: "نطابق أو نتفوّق على سعر أي قناة خارجية لنفس الغرفة والتاريخ — أخبرنا إن وجدت سعراً أقل وسنعالجه.",
          },
          {
            title: "بدون رسوم حجز",
            text: "تتعامل معنا مباشرة، فلا عمولات وسطاء ولا رسوم خدمة مخفية تُضاف إلى فاتورتك.",
          },
          {
            title: "سياسات أكثر مرونة",
            text: "إلغاء وتعديل وتأجيل بشروط أوضح وأسرع من قنوات الحجز الخارجية.",
          },
          {
            title: "تنسيق شخصي",
            text: "أولوية للترقية عند توفّرها، وطلبات خاصة قبل الوصول، وملف ضيف يتذكّر تفضيلاتك.",
          },
        ],
        statsIntro: {
          eyebrow: "لمحة سريعة",
          title: "لماذا يثق بنا الضيوف.",
        },
        stats: [
          { value: "24/7", label: "دعم حجوزات على مدار الساعة" },
          { value: "0", label: "رسوم حجز أو عمولات وسطاء" },
          { value: "3", label: "مدن: جدة وجازان والرياض" },
          { value: "لغتان", label: "خدمة بالعربية والإنجليزية" },
        ],
        prepareIntro: {
          eyebrow: "قبل أن تتصل",
          title: "جهّز هذه التفاصيل ليكون حجزك أسرع.",
          text: "وجود هذه المعلومات في متناولك يختصر المكالمة ويضمن أن نعطيك السعر الصحيح من أول مرة.",
        },
        prepare: [
          "تواريخ الوصول والمغادرة",
          "المدينة أو المنشأة المفضّلة",
          "عدد الضيوف (بالغون وأطفال)",
          "نوع الغرفة أو الجناح المطلوب",
          "أي طلبات خاصة (طابق، إطلالة، سرير إضافي)",
          "رقم حساب الشركة أو عضوية الولاء إن وُجد",
        ],
        faqsIntro: {
          eyebrow: "أسئلة شائعة",
          title: "أسئلة الحجز الأكثر تكراراً.",
        },
        faqs: [
          {
            question: "هل أحتاج إلى دفع مقدّم لتأكيد الحجز؟",
            answer: "تختلف سياسة المقدّم حسب نوع التعرفة والموسم. يوضّح لك مختص الحجوزات المبلغ المطلوب وطرق الدفع المتاحة قبل تأكيد أي حجز.",
          },
          {
            question: "ما هي مهلة الإلغاء المجاني؟",
            answer: "معظم التعرفات المرنة تتيح إلغاءً مجانياً حتى وقت محدّد قبل الوصول. أما التعرفات غير القابلة للاسترداد فتكون أقل سعراً ويُشار إليها صراحةً عند الحجز.",
          },
          {
            question: "كيف أعدّل أو أمدّد حجزاً قائماً؟",
            answer: "اتصل أو راسلنا على واتساب برقم الحجز، وسنعدّل التواريخ أو الغرفة حسب التوفر — غالباً دون أي رسوم على التعرفات المرنة.",
          },
          {
            question: "هل توجد أسعار خاصة للمجموعات؟",
            answer: "نعم. للحجوزات من 10 غرف فأكثر لدينا مكتب مجموعات مخصّص يقدّم أسعاراً وشروطاً خاصة. راسلنا على البريد بتفاصيل مجموعتك.",
          },
          {
            question: "هل يمكن إصدار فاتورة باسم شركة مع دفع آجل؟",
            answer: "نعم، لحسابات الشركات المعتمدة. تواصل معنا لإعداد الحساب والاتفاق على شروط الفوترة والدفع الآجل.",
          },
          {
            question: "وجدت سعراً أقل على موقع آخر، ماذا أفعل؟",
            answer: "أرسل لنا رابط العرض لنفس الغرفة والتاريخ، وسنطابقه أو نمنحك سعراً أفضل ضمن ضمان أفضل سعر للحجز المباشر.",
          },
        ],
      },
      feedbackPage: {
        hero: {
          eyebrow: "صوتك يهمّنا",
          title: "الاقتراحات والشكاوى.",
          text: "ملاحظتك المباشرة تجعل كل إقامة أفضل. كل رسالة تصل إلى مدير مختص، ويردّ عليك شخص حقيقي — لا رسائل آلية.",
          image: heroImage,
        },
        intro: {
          eyebrow: "وعدنا في الخدمة",
          title: "نؤكّد استلام ملاحظتك خلال 4 ساعات، ونعمل على حلّها خلال 48 ساعة.",
          text: "بمجرد وصول رسالتك يتولّاها مدير خدمة واحد من البداية إلى الإغلاق، ويبقيك على اطّلاع في كل خطوة.",
        },
        channels: [
          {
            title: "اتصل بنا",
            text: "اتصل على +966 59 597 9064 في أي وقت أثناء إقامتك للأمور العاجلة، واطلب مدير الخدمة المناوب.",
          },
          {
            title: "واتساب",
            text: "راسلنا على واتساب +966 59 597 9064 مع رقم الحجز وصور إن لزم، وسنفتح لك تذكرة متابعة فوراً.",
          },
          {
            title: "البريد الإلكتروني",
            text: "اكتب إلى reservations@swissblue.sa بالتفاصيل ورقم الحجز ودرجة الأولوية؛ مناسب للملاحظات التي تحتاج توثيقاً.",
          },
          {
            title: "في الفندق",
            text: "تحدّث مع مدير المنشأة عبر الاستقبال — أغلب الأمور تُحلّ في حينها.",
          },
        ],
        commitmentsIntro: {
          eyebrow: "التزاماتنا",
          title: "ما الذي نتعهّد به تجاه كل ملاحظة.",
        },
        commitments: [
          { value: "4 ساعات", label: "لتأكيد استلام ملاحظتك" },
          { value: "48 ساعة", label: "لتقديم حلٍّ أو خطة واضحة" },
          { value: "72 ساعة", label: "لمراجعة أي تصعيد" },
          { value: "100%", label: "ردّ بشري، لا رسائل آلية" },
        ],
        process: [
          {
            title: "الاستلام والإقرار",
            text: "تأكيد فوري بوصول ملاحظتك مع رقم تذكرة للمتابعة خلال 4 ساعات كحدّ أقصى.",
          },
          {
            title: "البحث والتقصّي",
            text: "نراجع تفاصيل حجزك، ونتحدّث مع فريق المنشأة، ونحدّد السبب الجذري بدقّة.",
          },
          {
            title: "الحل والتعويض",
            text: "نقترح حلاً واضحاً، ونقدّم — عند الحاجة — تعويضاً يناسب الحالة وتاريخك معنا.",
          },
          {
            title: "المتابعة والإغلاق",
            text: "نعود إليك للتأكد من رضاك التام قبل إغلاق التذكرة، ونوثّق الدرس لتحسين الخدمة.",
          },
        ],
        categoriesIntro: {
          eyebrow: "ما الذي نستقبله",
          title: "كل ما يخصّ تجربتك يهمّنا.",
          text: "نرحّب بالشكاوى والاقتراحات وحتى الإشادات — جميعها تساعدنا على رفع المعيار في كل منشأة.",
        },
        categories: [
          "شكوى على خدمة أو موقف محدّد",
          "اقتراح لتحسين عملية أو مرفق",
          "إشادة بأحد أفراد الفريق",
          "طلب إصلاح أو صيانة",
          "ملاحظة تخصّ الخصوصية أو السلامة",
          "استفسار أو اعتراض على فاتورة",
        ],
        includeIntro: {
          eyebrow: "كي نساعدك أسرع",
          title: "ما الذي نحتاجه في رسالتك.",
          text: "كلما كانت التفاصيل أوضح، أسرعنا في الوصول إلى حلٍّ مناسب من أول تواصل.",
        },
        include: [
          "رقم الحجز أو تواريخ الإقامة",
          "اسم المنشأة ورقم الغرفة",
          "وصف ما حدث ومتى",
          "صور أو مستندات إن وُجدت",
          "الحل أو النتيجة التي تتمنّاها",
          "أفضل وسيلة وأوقات للتواصل معك",
        ],
        faqsIntro: {
          eyebrow: "أسئلة شائعة",
          title: "أسئلة متكرّرة حول الملاحظات.",
        },
        faqs: [
          {
            question: "كيف أتابع حالة شكواي؟",
            answer: "ستصلك رسالة تأكيد تحمل رقم تذكرة. احتفظ به وارجع إلينا عبر أي قناة بالرقم نفسه لمعرفة آخر المستجدات.",
          },
          {
            question: "هل يمكنني تقديم ملاحظة دون ذكر اسمي؟",
            answer: "نعم، نتقبّل الملاحظات المجهولة، لكن ترك وسيلة تواصل يساعدنا على متابعتك وإبلاغك بالحل.",
          },
          {
            question: "هل أحصل على تعويض أو استرداد؟",
            answer: "عندما تستدعي الحالة ذلك، نقدّم حلاً مناسباً قد يشمل تعويضاً أو استرداداً، يُحدَّد حسب طبيعة الموضوع وتاريخك معنا.",
          },
          {
            question: "كم يستغرق الردّ عادةً؟",
            answer: "نؤكّد الاستلام خلال 4 ساعات، ونهدف إلى حلٍّ أو خطة واضحة خلال 48 ساعة. الحالات الأعقد قد تحتاج وقتاً أطول، ونبقيك على اطّلاع.",
          },
          {
            question: "بأي لغة يمكنني التواصل؟",
            answer: "بالعربية أو الإنجليزية — فريق تجربة الضيف يخدمك باللغتين.",
          },
          {
            question: "ماذا لو لم يكن الحل مُرضياً؟",
            answer: "يمكنك طلب التصعيد إلى الإدارة العامة، ويراجع فريق تجربة الضيف الحالة خلال 72 ساعة (انظر مسار التصعيد أدناه).",
          },
        ],
        escalationIntro: {
          eyebrow: "مسار التصعيد",
          title: "إن لم تكن النتيجة مُرضية.",
          text: "اطلب تصعيد حالتك إلى الإدارة العامة عبر مدير المنشأة، أو راسلنا على reservations@swissblue.sa وضع كلمة «تصعيد» في عنوان الرسالة. يراجع فريق تجربة الضيف كل تصعيد خلال 72 ساعة.",
        },
      },
    },
  },
  en: {
    seo: {
      siteTitle: "Swiss Blue Hotels | Rooms, Suites, and Serviced Apartments",
      metaDescription:
        "Swiss Blue Hotels website for hotels, suites, serviced apartments, direct booking, destinations, and guest services.",
      keywords: "Swiss Blue, Jeddah hotels, serviced apartments, direct booking, suites",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      favicon: "",
      twitterCard: "summary_large_image",
      twitterHandle: "",
      themeColor: "#2b6fe8",
      siteUrl: "https://swissblue23may.vercel.app",
    },
    navGroups: navGroupsEn,
    footerSections: footerSectionsEn,
    footerContact: footerContactEn,
    footerMeta: footerMetaEn,
    ui: uiTextEn,
    closingCtas: closingCtasEn,
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
      partners: partnersSectionEn,
      testimonials: testimonialsSectionEn,
      cta: {
        eyebrow: "Book direct",
        title: "Find your next Swiss Blue stay.",
        text: "Compare hotels, apart-hotels, and serviced apartments, then move to direct booking in one step.",
        button: "Book now",
      },
    },
    subpages: {
      about: {
        hero: {
          eyebrow: "About Us",
          title: "A Saudi hospitality portfolio with clear choices.",
          text: "Swiss Blue Hotels is a hospitality portfolio offering hotels and serviced apartments in major urban destinations, built for guests who value clarity, practical comfort, and friendly service.",
          image: heroImage,
        },
        philosophy: {
          eyebrow: "Brand Philosophy",
          title: "An understandable stay from the first moment.",
          text: "Swiss Blue focuses on translating room and apartment choices into easy-to-understand and book categories, with practical services that suit business trips, families, and long stays.",
        },
        pillars: [
          "Clear accommodation categories",
          "Locations close to the city hubs",
          "Comfort for business and families",
          "Flexibility of serviced apartments",
          "Confidence in booking direct",
        ],
        stats: [
          { value: "6", label: "Hospitality properties" },
          { value: "3", label: "Saudi cities" },
          { value: "280+", label: "Rooms, suites & apartments" },
          { value: "24/7", label: "Direct guest support" },
        ],
        story: {
          eyebrow: "Our Story",
          title: "We started from one idea: a clear stay, without complexity.",
          paragraphs: [
            "Swiss Blue began from the conviction that a hotel stay should be honest and easy, focused on what truly matters to the guest: a comfortable room, a practical location, friendly service, and a price you understand, with no exaggerated promises.",
            "Today the portfolio brings together hotels, serviced apartments, and serviced residences across Jeddah, Riyadh, and Jazan, serving the business guest, the family, and the long-stay resident within one consistent experience, where every property is run to the same standards of cleanliness, safety, and hospitality.",
            "We believe responsible hospitality is part of our identity, so we invest in Saudi talent, support our local communities, and operate in alignment with Saudi Vision 2030 goals for tourism and human development.",
          ],
        },
        valuesIntro: {
          eyebrow: "Our Values",
          title: "What makes Swiss Blue a trusted choice?",
          text: "Our values show up in every detail of the guest experience, from the moment of searching for a stay all the way to departure.",
        },
        values: [
          {
            title: "Clarity of choice",
            text: "We turn room and apartment categories into easy-to-understand options, so the guest knows exactly what they are booking before arrival.",
          },
          {
            title: "Authentic Saudi hospitality",
            text: "A warm welcome rooted in the Kingdom's culture, delivered by a team that speaks its guests' language and understands their needs.",
          },
          {
            title: "A location that serves your trip",
            text: "Properties in the heart of the city, close to business districts, shopping, airports, and key landmarks.",
          },
          {
            title: "Stay flexibility",
            text: "From a single night to a monthly stay, with hotel and serviced-apartment options to suit every journey.",
          },
          {
            title: "Direct-booking confidence",
            text: "The best rate and the clearest terms when you book through Swiss Blue channels, with no intermediaries.",
          },
          {
            title: "Quality commitment",
            text: "Unified operating and safety standards across every property in the portfolio, reviewed continuously by a dedicated team.",
          },
        ],
      },
      dining: {
        hero: {
          eyebrow: "Dining & Food Services",
          title: "Practical dining choices throughout your stay.",
          text: "From breakfast to the café, restaurant, and room service, Swiss Blue offers a convenient dining experience that serves business guests, families, and long-stay residents.",
          image: jeddahImage,
        },
        intro: {
          eyebrow: "Dining Experience",
          title: "Every food service has a clear role in the guest journey.",
          text: "Some services vary by destination, but the content explains what to expect, making the stay experience complete and professional.",
        },
        options: diningOptionsEn,
      },
      roomsSuites: {
        hero: {
          eyebrow: "Rooms & Suites",
          title: "Unit classifications for each property.",
          text: "This page displays the approved marketing classification for rooms, suites, and apartments at each property, with unit counts, room numbers, and key differences.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Classification Methodology",
          title: "A marketing classification to improve sales and visibility.",
          text: "The classification relies on highlighting category differences, such as view, number of bedrooms, bed configuration, and living rooms, helping guests choose the best unit and helping properties manage rates clearly.",
        },
        principles: [
          "Marketing classification that improves category clarity on booking platforms",
          "Stronger separation between categories by view, layout, bedding, and value",
          "Price hierarchy that supports guest upgrades to higher tiers",
          "Reviewing classifications after 6 months based on demand and performance",
        ],
        detailsIntro: {
          eyebrow: "Unit Details",
          title: "Approved categories for each property.",
          text: "Each table displays category name, bedrooms, bed setup, view, bathrooms, living rooms, total units, and room numbers.",
        },
        classifications: roomClassificationsEn,
      },
      servicedApartments: {
        hero: {
          eyebrow: "Serviced Apartments",
          title: "Apartment space with hotel comfort.",
          text: "Swiss Blue serviced apartments are the ideal choice for families, corporate relocations, long stays, and guests who prefer extra living space with daily hotel services.",
          image: jeddahImage,
        },
        benefits: [
          "Studio, one-bedroom, two-bedroom, and selected three-bedroom layouts",
          "Living space for families and longer stays",
          "Practical comfort with hotel services",
          "Locations in Jeddah, Jazan, and Riyadh",
          "Suitable for business relocation and monthly stays",
          "More privacy with direct booking support",
        ],
        intro: {
          eyebrow: "Why Serviced Apartments",
          title: "The space of a full home with the comfort of a hotel.",
          text: "Serviced apartments combine the independence of private living with daily hospitality services, making them the ideal choice for longer stays that need a kitchen, living space, and extra privacy without giving up reception, housekeeping, and hotel support.",
        },
        includedIntro: {
          eyebrow: "What every apartment includes",
          title: "Furnishings that make a long stay easy.",
          text: "Some details vary by property and category, but the essentials of comfort are present in every unit.",
        },
        included: [
          "Kitchen equipped with cookware and a refrigerator",
          "In-unit washing machine or laundry service",
          "Separate living space for work or hosting",
          "Regular housekeeping for the unit",
          "High-speed internet in every room",
          "Reception and guest support around the clock",
        ],
        propertiesIntro: {
          eyebrow: "Serviced apartment destinations",
          title: "Five properties across three cities.",
          text: "Choose the location best suited to your trip across Jeddah, Riyadh, and Jazan.",
        },
        properties: [
          { name: "Al Zahraa Serviced Apartments", city: "Jeddah", units: "46 apartments", slug: "al-zahraa-serviced-apartments" },
          { name: "Al Samer Serviced Apartments", city: "Jeddah", units: "33 apartments", slug: "al-samer-serviced-apartments" },
          { name: "Swiss Blue Serviced Apartments Jazan", city: "Jazan", units: "55 apartments", slug: "swiss-blue-jazan" },
          { name: "Vinas Riyadh Serviced Apartments", city: "Riyadh", units: "35 apartments", slug: "vinas-riyadh-serviced-apartments" },
          { name: "Tulip Al Rawdah Serviced Apartments", city: "Riyadh", units: "37 apartments", slug: "tulip-alrawdah-serviced-apartments" },
        ],
        idealForIntro: {
          eyebrow: "Who they suit",
          title: "Designed for those who need space and flexibility.",
          text: "Serviced apartments serve different stay patterns, united by the need for a home-like comfort.",
        },
        idealFor: [
          {
            title: "Families",
            text: "Multiple bedrooms and a living space that gives every member their own privacy and comfort.",
          },
          {
            title: "Work relocations",
            text: "A comfortable base for seconded employees and temporary project teams.",
          },
          {
            title: "Long stays",
            text: "Monthly rates and services that make an extended stay practical and economical.",
          },
          {
            title: "Business guests",
            text: "A place to work and rest together, with fast internet and a lively location close to business.",
          },
        ],
        longStay: {
          eyebrow: "Monthly Stays",
          title: "Special rates for extended stays.",
          text: "We offer monthly packages at preferential rates for individual guests and companies, including regular housekeeping and dedicated support from the reservations team. Contact us to arrange a long-stay offer tailored to your duration and destination.",
        },
      },
      amenitiesServices: {
        hero: {
          eyebrow: "Amenities & Services",
          title: "Services designed around your comfort.",
          text: "Every stay at Swiss Blue is supported by a selection of core services that make travel easier, comfortable, and reliable.",
          image: jazanImage,
        },
        standardsIntro: {
          eyebrow: "Service Standards",
          title: "One service promise across every property.",
          text: "Whichever destination you choose, you will find the same standards of cleanliness, safety, and warm welcome. We organize our services into clear families so you know what to expect before you arrive.",
        },
        commitments: [
          {
            title: "Always Connected",
            text: "Free high-speed internet in every room and public space to keep you connected for work and leisure.",
          },
          {
            title: "Dining Hospitality",
            text: "Daily breakfast buffet, a café, and a restaurant, with room service at selected destinations.",
          },
          {
            title: "Business Ready",
            text: "Meeting rooms, workspaces, and dedicated support for corporate and group bookings.",
          },
          {
            title: "Wellness & Comfort",
            text: "An equipped gym and an indoor pool at selected destinations to keep your routine while traveling.",
          },
          {
            title: "Easy Mobility",
            text: "Taxi service, parking, and airport transfer support depending on the location.",
          },
          {
            title: "Guest Support",
            text: "Reception and assistance around the clock, secure safes, and coffee, tea, and minibar service.",
          },
        ],
      },
      loyaltyPage: {
        hero: {
          eyebrow: "Loyalty Program",
          title: "Direct benefits for Swiss Blue regular guests.",
          text: "A loyalty program linking repeat guests to direct booking offers, priority upgrade when available, and faster reservations support.",
          image: heroImage,
        },
        tiersIntro: {
          eyebrow: "Membership Tiers",
          title: "The more you stay, the greater your benefits.",
          text: "Four tiers that rise with you automatically with every direct stay, unlocking added benefits in upgrades, rates, and service.",
        },
        tiers: [
          {
            name: "Blue",
            threshold: "From your first stay",
            perks: [
              "Special member rate on direct booking",
              "Free high-speed internet",
              "Early check-in when available",
            ],
          },
          {
            name: "Silver",
            threshold: "After 5 nights or 3 stays per year",
            perks: [
              "Extra discount on direct booking",
              "Room category upgrade when available",
              "Late checkout until 2 PM",
              "Bonus points ×1.25",
            ],
          },
          {
            name: "Gold",
            threshold: "After 15 nights or 8 stays per year",
            perks: [
              "Priority suite upgrade when available",
              "Complimentary breakfast for two",
              "Late checkout until 4 PM",
              "Bonus points ×1.5",
              "Dedicated booking line",
            ],
          },
          {
            name: "Platinum",
            threshold: "After 30 nights or 15 stays per year",
            perks: [
              "Guaranteed upgrade to the best available category",
              "Flexible arrival and departure",
              "Welcome gift and personal concierge service",
              "Bonus points ×2",
              "Exclusive benefits with our partners",
            ],
          },
        ],
        earn: {
          eyebrow: "Earn Points",
          title: "Every direct stay brings your next reward closer.",
          items: [
            "Points on every riyal spent on a direct stay",
            "Bonus points on dining services and extended stays",
            "Welcome points when you first join the program",
            "Seasonal point-multiplier offers",
          ],
        },
        redeem: {
          eyebrow: "Redeem Points",
          title: "Turn your points into real value.",
          items: [
            "Free nights at any Swiss Blue property",
            "Room and suite upgrades",
            "Direct discount on your bill",
            "Dining perks and extra services",
          ],
        },
        howItWorksIntro: {
          eyebrow: "How the program works",
          title: "Four steps stand between you and your benefits.",
          text: "Registration is free, and the benefits begin from your very first stay.",
        },
        howItWorks: [
          {
            title: "Register free",
            text: "Join the Swiss Blue loyalty program in a minute, online or at the reception desk.",
          },
          {
            title: "Book direct",
            text: "Book through our direct channels to earn points with every night of your stay.",
          },
          {
            title: "Rise through tiers",
            text: "Your tier rises automatically as your nights and stays add up over the year.",
          },
          {
            title: "Redeem your benefits",
            text: "Turn your points into nights, upgrades, and exclusive benefits whenever you like.",
          },
        ],
      },
      meetingsEvents: {
        hero: {
          eyebrow: "Corporate Deals",
          title: "Stay and contracting solutions for companies and groups.",
          text: "A professional path for team stays, delegations, meetings, and monthly accommodation, with clear communication and documentation requirements.",
          image: heroImage,
        },
        intro: {
          eyebrow: "For companies and official entities",
          title: "From proposal request to booking confirmation.",
          text: "The corporate deals team helps define requirements, compare properties, select unit categories, and prepare a professional proposal for internal review and approval.",
        },
        deals: corporateDealsEn,
        documentsIntro: {
          eyebrow: "Required Documents",
          title: "Clear requirements before official contracting.",
          text: "Having documents ready early speeds up pricing, approvals, and confirmation issuance for your team or delegation.",
        },
        documents: [
          "Commercial registration or official company details",
          "VAT certificate when required",
          "Authorization letter for the approved representative",
          "Billing details and payment terms",
          "Guest list with arrival and departure dates",
          "Meeting and hospitality requirements if applicable",
        ],
      },
      corporateDealsPage: {
        hero: {
          eyebrow: "Corporate deals",
          title: "Stay and contracting solutions for companies and groups.",
          text: "A professional path for team stays, delegations, meetings, and monthly accommodation, with clear communication and documentation requirements.",
          image: heroImage,
        },
        requestForm: b2bRequestFormEn,
      },
      groupBookings: {
        hero: {
          eyebrow: "Group Bookings",
          title: "Professional coordination for teams and delegations.",
          text: "A dedicated path for organizing group bookings across Swiss Blue properties, from city and category selection to dates and guest requirements.",
          image: heroImage,
        },
        intro: {
          eyebrow: "For companies and delegations",
          title: "Group stays need clear coordination.",
          text: "The Swiss Blue team helps organize group needs, compare properties, and confirm room categories in a professional and easy-to-track manner.",
        },
        items: [
          "Guest list coordination with arrival and departure dates",
          "Room and apartment type allocation by group need",
          "Support for delegations, teams, and official visits",
          "Ability to connect accommodation with meetings or hospitality when needed",
        ],
        eligibility: {
          eyebrow: "From 10 units and up",
          title: "When does your group qualify?",
          text: "We treat a booking as a group from ten rooms or units and up on the same dates. At that point we provide special group pricing and a dedicated booking coordinator who follows every detail from the first proposal to departure.",
        },
        processIntro: {
          eyebrow: "How we work",
          title: "From request to arrival in four steps.",
          text: "A clear, fast path that makes organizing a group booking simple and well-structured.",
        },
        process: [
          {
            title: "Send your request",
            text: "Tell us the city, number of units, dates, and the nature of the group.",
          },
          {
            title: "Receive your offer",
            text: "We prepare a tailored proposal with unit categories and rates within one business day.",
          },
          {
            title: "Confirm the details",
            text: "We lock in the guest list, room allocation, and hospitality requests.",
          },
          {
            title: "Arrive and enjoy",
            text: "An organized group check-in and a dedicated coordinator throughout the stay.",
          },
        ],
        inclusionsIntro: {
          eyebrow: "What's included",
          title: "Everything your group needs in one place.",
          text: "We handle the logistical details so you can focus on the purpose of your trip.",
        },
        inclusions: [
          "Special group pricing",
          "A dedicated booking coordinator",
          "Smooth group check-in and check-out",
          "Flexibility in room-type allocation",
          "Connecting the stay with meeting rooms when needed",
          "Consolidated billing options for the organizing entity",
        ],
        idealForIntro: {
          eyebrow: "Who they suit",
          title: "We welcome every kind of group.",
          text: "Our experience covers coordinating stays for groups of varied purposes and sizes.",
        },
        idealFor: [
          "Corporate delegations and conferences",
          "Tourism and family groups",
          "Weddings and guest accommodation",
          "Sports teams and training programs",
          "Religious journeys and official visits",
        ],
      },
      contact: {
        hero: {
          eyebrow: "Contact Us",
          title: "Clear channels for booking, corporate, and guest support.",
          text: "You can book directly online, call our central reservations desk, request a corporate sales expert, or reach out to property guest service teams.",
          image: jeddahImage,
        },
        channels: contactChannelsEn,
        bookingIntro: {
          eyebrow: "Direct Booking",
          title: "Start by checking availability.",
          text: "Our booking link is the fastest route for individual guests, while direct communication channels support corporate inquiries, group stays, and detailed questions.",
        },
      },
      offersPage: {
        hero: {
          eyebrow: "Offers and special discounts",
          title: "Offers built around the reason for stay.",
          text: "The offers page brings together family stays, monthly stays, and direct-booking benefits in a way that helps guests choose and communicate with confidence.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Main offers",
          title: "Clear paths for different guest needs.",
          text: "Instead of generic offers, the page clarifies the actual need: a family that needs space, a long-stay guest, or an individual guest who wants direct-booking benefits.",
        },
        offers: [
          {
            title: "Family Stay",
            text: "Multi-bedroom apartment options, better living space, and hotel comfort that make family visits easier and more private.",
          },
          {
            title: "Monthly Stays",
            text: "Long-stay solutions in Jeddah, Jazan, and Riyadh, suitable for corporate relocations and monthly assignments.",
          },
          {
            title: "Direct Booking Benefits",
            text: "Clearer rates, direct reservation support, and priority category assignment when available.",
          },
        ],
        benefitsIntro: {
          eyebrow: "Direct Booking Benefits",
          title: "Better value when you start from Swiss Blue channels.",
          text: "These benefits help our site convert visitors into bookings or direct inquiries without confusion or complex terms.",
        },
        benefits: [
          "Clearer category and rate before confirming the booking",
          "Direct support from the reservations team",
          "Priority handling of guest requests when available",
          "A useful path for families and monthly stays",
        ],
      },
      faqPage: {
        hero: {
          eyebrow: "Frequently Asked Questions",
          title: "Clear information before you book and stay.",
          text: "Our FAQ covers reservation details, check-in/out policies, amenities, and corporate or family stay options.",
          image: heroImage,
        },
      },
      hotelsPage: {
        hero: {
          eyebrow: "Our Hotels & Apart-hotels",
          title: "A clear hospitality portfolio in Jeddah, Jazan, and Riyadh.",
          text: "Explore Swiss Blue destinations in Saudi Arabia, from hotels designed for business trips to apart-hotels for families and extended stays.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Choose Your Destination",
          title: "Every destination is built around a clear guest need.",
          text: "Category pages help guests compare the city, stay type, and unit count before moving into the detailed property page.",
        },
      },
      destinationsPage: {
        hero: {
          eyebrow: "Destinations",
          title: "Jeddah, Riyadh, and Jazan under one brand.",
          text: "Learn about the character of each city, how to enjoy it best, and the right accommodation type for your business, family, or long-stay trip.",
          image: heroImage,
        },
      },
      hotelPolicy: hotelPolicyEn,
      careersPage: {
        hero: {
          eyebrow: "Join Swiss Blue",
          title: "Build a career in Saudi hospitality.",
          text: "We grow our teams from within. Be part of a service-driven culture across Jeddah, Riyadh, and Jazan.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Why Swiss Blue",
          title: "Real growth, real responsibility — from day one.",
          text: "Every property is a training ground. Front-of-house, back-of-house, corporate office — we invest in the people who deliver our standards every day.",
        },
        whyJoin: [
          {
            title: "Clear career path",
            text: "Defined progression from line roles into leadership across hotels and the corporate office.",
          },
          {
            title: "Continuous learning",
            text: "Structured onboarding, on-the-job training, and certifications in service, safety, and hospitality operations.",
          },
          {
            title: "Multicultural team",
            text: "Saudi nationals and regional and international colleagues working side by side, with Arabic and English as working languages.",
          },
          {
            title: "Recognition that counts",
            text: "Performance incentives, employee-of-the-month recognition, and internal promotion priority over external hiring.",
          },
        ],
        departmentsIntro: {
          eyebrow: "Where we hire",
          title: "Opportunities across every hotel discipline.",
          text: "We are continuously reviewing candidates for operational, administrative, and commercial roles across our properties.",
        },
        departments: [
          {
            title: "Front Office",
            text: "Receptionist, shift supervisor, front-office manager, guest service agent.",
          },
          {
            title: "Housekeeping",
            text: "Room attendant, floor supervisor, housekeeping manager, quality inspector.",
          },
          {
            title: "Food & Beverage",
            text: "Restaurant service, barista, chef de partie, banquet operations, breakfast captain.",
          },
          {
            title: "Engineering & Maintenance",
            text: "General maintenance technician, HVAC, electrician, safety officer.",
          },
          {
            title: "Sales & Marketing",
            text: "Corporate account manager, group reservations, digital marketing executive.",
          },
          {
            title: "Finance & Administration",
            text: "Accountant, procurement, HR coordinator, night auditor.",
          },
        ],
        applyIntro: {
          eyebrow: "How to apply",
          title: "Send your CV to our team.",
          text: "Attach your CV, the role you are interested in, and your preferred city. We respond within five working days when your profile aligns with an open opportunity.",
          email: "careers@swissblue.sa",
          cta: "Send your CV",
        },
        recruitment: careersRecruitmentEn,
      },
      csrPage: {
        hero: {
          eyebrow: "CSR commitments",
          title: "Hospitality that gives back.",
          text: "Anchored in Saudi Vision 2030, our hotels invest in community, environment, and people — beyond a great stay.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Our approach",
          title: "Responsible hospitality is everyday hospitality.",
          text: "We treat social responsibility as part of how we operate, not as a separate program. The daily decisions in every property feed into our commitments.",
        },
        pillars: [
          {
            title: "Community",
            text: "Local sourcing, support for education and youth programs, and Ramadan iftar programs at every property.",
          },
          {
            title: "Environment",
            text: "Water and energy management, single-use plastic reduction, and waste-segregation programs in our hotels.",
          },
          {
            title: "Workforce",
            text: "Saudization, fair employment, structured training, and a safe workplace for every team member.",
          },
          {
            title: "Vision 2030",
            text: "Aligned with the Kingdom's tourism, environmental, and human capability development goals.",
          },
        ],
        initiativesIntro: {
          eyebrow: "Active initiatives",
          title: "Practical programs in every property.",
          text: "We measure what we deliver and refresh our programs annually within our governance and sustainability plan.",
        },
        initiatives: [
          {
            title: "Saudization roadmap",
            text: "Increasing the share of Saudi nationals in operational and leadership roles every year.",
          },
          {
            title: "Education partnerships",
            text: "Training agreements with tourism and hospitality colleges to host excellence-program students.",
          },
          {
            title: "Youth training",
            text: "Summer programs and entry-level tracks for school and college graduates.",
          },
          {
            title: "Ramadan iftar",
            text: "Daily iftar meals for staff, guests, and neighborhood community during the Holy Month.",
          },
          {
            title: "Plastic reduction",
            text: "Refillable bottles, bulk-fill amenities, and an end to single-use straws across our restaurants.",
          },
          {
            title: "Local sourcing",
            text: "Preference for in-Kingdom suppliers across food, beverages, and small-scale crafts.",
          },
        ],
        reportingIntro: {
          eyebrow: "Transparency & disclosure",
          title: "We publish an annual progress update.",
          text: "We share our progress on sustainability programs, Saudization, and responsible hospitality practices in an annual report from the corporate office.",
        },
      },
      reservationOfficePage: {
        hero: {
          eyebrow: "Direct booking support",
          title: "Central Reservation Office.",
          text: "One team, one number. Plan, book, and modify your stay across every Swiss Blue hotel and apartment in Jeddah, Jazan, and Riyadh — one call or WhatsApp away.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Your direct booking team",
          title: "Talk to a real reservations specialist, in Arabic or English.",
          text: "The Central Reservation Office is a single point of contact for every Swiss Blue property. We handle new bookings, group requests, corporate accounts, and on-stay changes — directly, with no intermediaries and no added fees.",
        },
        channels: [
          {
            title: "Call us",
            value: "+966 59 597 9064",
            href: "tel:+966595979064",
            text: "Speak directly with the reservations team, around the clock, to confirm availability and rates and book in minutes.",
          },
          {
            title: "WhatsApp",
            value: "+966 59 597 9064",
            href: "https://wa.me/966595979064",
            text: "Send your dates and guest count and we'll reply with room options and prices in writing.",
          },
          {
            title: "Email",
            value: "reservations@swissblue.sa",
            href: "mailto:reservations@swissblue.sa",
            text: "For requests that need a written trail: group quotes, corporate contracts, and invoices.",
          },
          {
            title: "In person",
            value: "Front desk",
            href: "",
            text: "Visit any property to book face-to-face with the receptionist throughout the day.",
          },
        ],
        servicesIntro: {
          eyebrow: "What we handle",
          title: "Everything for a smooth booking — from one room to a multi-city itinerary.",
          text: "Whether it's a single work night, a family's monthly stay, or a corporate group, the team owns your request end-to-end and loops in the property when needed.",
        },
        services: [
          "New reservations for individuals and families",
          "Group bookings (10 rooms or more) with special rates",
          "Corporate accounts, contracts, and credit billing",
          "Monthly and long-stay serviced-apartment bookings",
          "Events, honeymoons, and special requests",
          "Modifications, extensions, and cancellations",
          "On-stay support and coordination with the property",
          "Multi-property itineraries across Jeddah, Jazan, and Riyadh",
        ],
        benefitsIntro: {
          eyebrow: "Why book direct with us",
          title: "Benefits you won't get through third-party sites.",
          text: "Booking direct through our office secures the best rate, more flexibility, and a human who knows your stay before you arrive.",
        },
        benefits: [
          {
            title: "Best-rate guarantee",
            text: "We match or beat any third-party channel for the same room and dates — tell us if you find lower and we'll handle it.",
          },
          {
            title: "No booking fees",
            text: "You deal with us directly, so there are no agent commissions or hidden service fees added to your bill.",
          },
          {
            title: "More flexible policies",
            text: "Cancellation, modification, and postponement on clearer, faster terms than external booking channels.",
          },
          {
            title: "Personal coordination",
            text: "Priority upgrades when available, pre-arrival special requests, and a guest profile that remembers your preferences.",
          },
        ],
        statsIntro: {
          eyebrow: "At a glance",
          title: "Why guests book with us.",
        },
        stats: [
          { value: "24/7", label: "Reservations support, every day" },
          { value: "0", label: "Booking fees or agent commissions" },
          { value: "3", label: "Cities: Jeddah, Jazan, Riyadh" },
          { value: "AR · EN", label: "Service in both languages" },
        ],
        prepareIntro: {
          eyebrow: "Before you call",
          title: "Have these ready for a faster booking.",
          text: "Keeping this handy shortens the call and means we quote the right price the first time.",
        },
        prepare: [
          "Check-in and check-out dates",
          "Preferred city or property",
          "Number of guests (adults and children)",
          "Room or suite type you want",
          "Any special requests (floor, view, extra bed)",
          "Corporate account or loyalty number, if any",
        ],
        faqsIntro: {
          eyebrow: "FAQ",
          title: "The booking questions we hear most.",
        },
        faqs: [
          {
            question: "Do I need to pay a deposit to confirm?",
            answer: "Deposit policy depends on the rate type and season. Your reservations specialist will explain the amount and the payment methods available before any booking is confirmed.",
          },
          {
            question: "What is the free-cancellation window?",
            answer: "Most flexible rates allow free cancellation up to a set time before arrival. Non-refundable rates are priced lower and clearly flagged at the time of booking.",
          },
          {
            question: "How do I modify or extend a booking?",
            answer: "Call or WhatsApp us with your booking reference and we'll change the dates or room subject to availability — usually with no fee on flexible rates.",
          },
          {
            question: "Are there special rates for groups?",
            answer: "Yes. For 10 rooms or more, our dedicated group desk offers special rates and terms. Email us with your group details.",
          },
          {
            question: "Can you invoice a company and bill on credit?",
            answer: "Yes, for approved corporate accounts. Contact us to set up the account and agree billing and credit terms.",
          },
          {
            question: "I found a lower price elsewhere — what now?",
            answer: "Send us the link for the same room and dates and we'll match it or do better under our direct best-rate guarantee.",
          },
        ],
      },
      feedbackPage: {
        hero: {
          eyebrow: "Your voice matters",
          title: "Suggestions & Complaints.",
          text: "Your direct feedback makes every stay better. Every message reaches a dedicated manager, and a real person replies — never an auto-response.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Our service promise",
          title: "Acknowledged within 4 hours, worked to resolution within 48.",
          text: "The moment your message arrives, one service manager owns it from start to close and keeps you updated at every step.",
        },
        channels: [
          {
            title: "Call us",
            text: "Call +966 59 597 9064 any time during your stay for anything urgent, and ask for the duty service manager.",
          },
          {
            title: "WhatsApp",
            text: "WhatsApp +966 59 597 9064 with your booking reference and photos if relevant — we'll open a tracked ticket right away.",
          },
          {
            title: "Email",
            text: "Email reservations@swissblue.sa with the details, your booking reference, and priority; best for feedback that needs a record.",
          },
          {
            title: "At the hotel",
            text: "Speak to the property manager via reception — most matters are resolved on the spot.",
          },
        ],
        commitmentsIntro: {
          eyebrow: "Our commitments",
          title: "What we promise for every message.",
        },
        commitments: [
          { value: "4 hours", label: "To acknowledge your message" },
          { value: "48 hours", label: "For a resolution or clear plan" },
          { value: "72 hours", label: "To review any escalation" },
          { value: "100%", label: "Human reply, never automated" },
        ],
        process: [
          {
            title: "Acknowledge",
            text: "Immediate confirmation that your message arrived, with a tracking reference within 4 hours.",
          },
          {
            title: "Investigate",
            text: "We review your booking details, speak to the property team, and pinpoint the root cause.",
          },
          {
            title: "Resolve",
            text: "We propose a clear solution and, where warranted, offer compensation suited to the case and your history with us.",
          },
          {
            title: "Follow up",
            text: "We check back to confirm you're fully satisfied before closing the ticket, and log the lesson to improve service.",
          },
        ],
        categoriesIntro: {
          eyebrow: "What we accept",
          title: "Anything that affects your stay matters.",
          text: "We welcome complaints, suggestions, and even compliments — all of them help us raise the bar at every property.",
        },
        categories: [
          "A complaint about a specific service or moment",
          "A suggestion to improve a process or facility",
          "A compliment for a team member",
          "A repair or maintenance request",
          "A privacy or safety concern",
          "A billing question or dispute",
        ],
        includeIntro: {
          eyebrow: "To help you faster",
          title: "What to include in your message.",
          text: "The clearer the details, the faster we reach the right resolution on the first contact.",
        },
        include: [
          "Booking reference or stay dates",
          "Property name and room number",
          "What happened, and when",
          "Photos or documents, if any",
          "The outcome or resolution you'd like",
          "The best way and times to reach you",
        ],
        faqsIntro: {
          eyebrow: "FAQ",
          title: "Common questions about feedback.",
        },
        faqs: [
          {
            question: "How do I track my complaint?",
            answer: "You'll get a confirmation with a ticket reference. Keep it and reply on any channel with the same reference for the latest status.",
          },
          {
            question: "Can I send feedback anonymously?",
            answer: "Yes, we accept anonymous feedback — but leaving a way to reach you lets us follow up and tell you the outcome.",
          },
          {
            question: "Will I get compensation or a refund?",
            answer: "When the case warrants it, we offer a suitable resolution that may include compensation or a refund, decided by the nature of the issue and your history with us.",
          },
          {
            question: "How long does a reply usually take?",
            answer: "We acknowledge within 4 hours and aim for a resolution or clear plan within 48. More complex cases can take longer, and we keep you updated.",
          },
          {
            question: "Which language can I use?",
            answer: "Arabic or English — the guest experience team serves you in both.",
          },
          {
            question: "What if I'm not satisfied with the outcome?",
            answer: "You can request escalation to the corporate office; the guest experience team reviews it within 72 hours (see the escalation path below).",
          },
        ],
        escalationIntro: {
          eyebrow: "Escalation path",
          title: "If you're not satisfied with the outcome.",
          text: "Ask to escalate your case to the corporate office through the property manager, or email reservations@swissblue.sa with 'Escalation' in the subject. The guest experience team reviews every escalation within 72 hours.",
        },
      },
    },
  },
};

export type EditableSiteContent = typeof defaultSiteContent;

const DEPRECATED_MEDIA_KEYS_SHARED = ["lightLogo", "arabicLightLogo"] as const;
const DEPRECATED_MEDIA_KEYS_AR = [...DEPRECATED_MEDIA_KEYS_SHARED, "logo"] as const;

function stripKeys<T extends Record<string, unknown>>(media: T, keys: readonly string[]): T {
  const next = { ...media };
  for (const key of keys) {
    delete next[key];
  }
  return next;
}

function stripDeprecatedArMediaKeys<T extends Record<string, unknown>>(media: T): T {
  return stripKeys(media, DEPRECATED_MEDIA_KEYS_AR);
}

function stripDeprecatedEnMediaKeys<T extends Record<string, unknown>>(media: T): T {
  return stripKeys(media, DEPRECATED_MEDIA_KEYS_SHARED);
}

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

function heroFallbackFromSlides(
  slides: EditableSiteContent["ar"]["media"]["mainHeroSlides"],
  fallback: string,
) {
  const imageSlide = slides.find((slide) => {
    if (!slide.source) {
      return false;
    }

    return slide.kind === "image" || !/\.(mp4|mov|webm)(\?|$)/i.test(slide.source);
  });

  return imageSlide?.source ?? fallback;
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

    const arGallery = property.gallery ?? arDefault.gallery;
    const enGallery = enProperty.gallery ?? enDefault.gallery;
    const [image] = sharedImageValue(property.image, enProperty.image, arDefault.image, enDefault.image);
    const gallery = arGallery.map((galleryImage, index) => {
      const [nextImage] = sharedImageValue(
        galleryImage,
        enGallery[index] ?? galleryImage,
        arDefault.gallery[index] ?? galleryImage,
        enDefault.gallery[index] ?? enGallery[index] ?? galleryImage,
      );

      return nextImage;
    });

    return { ...arDefault, ...property, image, gallery };
  });

  const arBySlug = new Map(arProperties.map((property) => [property.slug, property]));
  const en = enProperties.map((property) => {
    const arProperty = arBySlug.get(property.slug);
    const arDefault = defaultArBySlug.get(property.slug);
    const enDefault = defaultEnBySlug.get(property.slug);

    if (!arProperty || !arDefault || !enDefault) {
      return property;
    }

    const arGallery = arProperty.gallery ?? arDefault.gallery;
    const enGallery = property.gallery ?? enDefault.gallery;
    const [, image] = sharedImageValue(arProperty.image, property.image, arDefault.image, enDefault.image);
    const gallery = enGallery.map((galleryImage, index) => {
      const [, nextImage] = sharedImageValue(
        arGallery[index] ?? galleryImage,
        galleryImage,
        arDefault.gallery[index] ?? arGallery[index] ?? galleryImage,
        enDefault.gallery[index] ?? galleryImage,
      );

      return nextImage;
    });

    return { ...enDefault, ...property, image, gallery };
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

function normalizeHighlights(
  items: EditableSiteContent["ar"]["homepage"]["highlights"],
  defaults: EditableSiteContent["ar"]["homepage"]["highlights"],
) {
  return defaults.map((defaultItem, index) => {
    const item = items[index];

    if (!item || !("text" in item) || !item.text) {
      return defaultItem;
    }

    return item;
  });
}

function syncSharedImages(content: EditableSiteContent): EditableSiteContent {
  const [logoAr, logoEn] = sharedImageValue(
    content.ar.media.arabicLogo,
    content.en.media.logo,
    defaultSiteContent.ar.media.arabicLogo,
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

  // Subpages hero image syncing
  const [aboutHeroAr, aboutHeroEn] = sharedImageValue(
    content.ar.subpages.about.hero.image,
    content.en.subpages.about.hero.image,
    defaultSiteContent.ar.subpages.about.hero.image,
    defaultSiteContent.en.subpages.about.hero.image,
  );
  const [diningHeroAr, diningHeroEn] = sharedImageValue(
    content.ar.subpages.dining.hero.image,
    content.en.subpages.dining.hero.image,
    defaultSiteContent.ar.subpages.dining.hero.image,
    defaultSiteContent.en.subpages.dining.hero.image,
  );
  const [roomsSuitesHeroAr, roomsSuitesHeroEn] = sharedImageValue(
    content.ar.subpages.roomsSuites.hero.image,
    content.en.subpages.roomsSuites.hero.image,
    defaultSiteContent.ar.subpages.roomsSuites.hero.image,
    defaultSiteContent.en.subpages.roomsSuites.hero.image,
  );
  const [servicedApartmentsHeroAr, servicedApartmentsHeroEn] = sharedImageValue(
    content.ar.subpages.servicedApartments.hero.image,
    content.en.subpages.servicedApartments.hero.image,
    defaultSiteContent.ar.subpages.servicedApartments.hero.image,
    defaultSiteContent.en.subpages.servicedApartments.hero.image,
  );
  const [amenitiesServicesHeroAr, amenitiesServicesHeroEn] = sharedImageValue(
    content.ar.subpages.amenitiesServices.hero.image,
    content.en.subpages.amenitiesServices.hero.image,
    defaultSiteContent.ar.subpages.amenitiesServices.hero.image,
    defaultSiteContent.en.subpages.amenitiesServices.hero.image,
  );
  const [loyaltyPageHeroAr, loyaltyPageHeroEn] = sharedImageValue(
    content.ar.subpages.loyaltyPage.hero.image,
    content.en.subpages.loyaltyPage.hero.image,
    defaultSiteContent.ar.subpages.loyaltyPage.hero.image,
    defaultSiteContent.en.subpages.loyaltyPage.hero.image,
  );
  const [meetingsEventsHeroAr, meetingsEventsHeroEn] = sharedImageValue(
    content.ar.subpages.meetingsEvents.hero.image,
    content.en.subpages.meetingsEvents.hero.image,
    defaultSiteContent.ar.subpages.meetingsEvents.hero.image,
    defaultSiteContent.en.subpages.meetingsEvents.hero.image,
  );
  const [corporateDealsPageHeroAr, corporateDealsPageHeroEn] = sharedImageValue(
    content.ar.subpages.corporateDealsPage.hero.image,
    content.en.subpages.corporateDealsPage.hero.image,
    defaultSiteContent.ar.subpages.corporateDealsPage.hero.image,
    defaultSiteContent.en.subpages.corporateDealsPage.hero.image,
  );
  const [groupBookingsHeroAr, groupBookingsHeroEn] = sharedImageValue(
    content.ar.subpages.groupBookings.hero.image,
    content.en.subpages.groupBookings.hero.image,
    defaultSiteContent.ar.subpages.groupBookings.hero.image,
    defaultSiteContent.en.subpages.groupBookings.hero.image,
  );
  const [contactHeroAr, contactHeroEn] = sharedImageValue(
    content.ar.subpages.contact.hero.image,
    content.en.subpages.contact.hero.image,
    defaultSiteContent.ar.subpages.contact.hero.image,
    defaultSiteContent.en.subpages.contact.hero.image,
  );
  const [offersPageHeroAr, offersPageHeroEn] = sharedImageValue(
    content.ar.subpages.offersPage.hero.image,
    content.en.subpages.offersPage.hero.image,
    defaultSiteContent.ar.subpages.offersPage.hero.image,
    defaultSiteContent.en.subpages.offersPage.hero.image,
  );
  const [faqPageHeroAr, faqPageHeroEn] = sharedImageValue(
    content.ar.subpages.faqPage.hero.image,
    content.en.subpages.faqPage.hero.image,
    defaultSiteContent.ar.subpages.faqPage.hero.image,
    defaultSiteContent.en.subpages.faqPage.hero.image,
  );
  const [hotelsPageHeroAr, hotelsPageHeroEn] = sharedImageValue(
    content.ar.subpages.hotelsPage.hero.image,
    content.en.subpages.hotelsPage.hero.image,
    defaultSiteContent.ar.subpages.hotelsPage.hero.image,
    defaultSiteContent.en.subpages.hotelsPage.hero.image,
  );
  const [destinationsPageHeroAr, destinationsPageHeroEn] = sharedImageValue(
    content.ar.subpages.destinationsPage.hero.image,
    content.en.subpages.destinationsPage.hero.image,
    defaultSiteContent.ar.subpages.destinationsPage.hero.image,
    defaultSiteContent.en.subpages.destinationsPage.hero.image,
  );
  const [hotelPolicyHeroAr, hotelPolicyHeroEn] = sharedImageValue(
    content.ar.subpages.hotelPolicy.hero.image,
    content.en.subpages.hotelPolicy.hero.image,
    defaultSiteContent.ar.subpages.hotelPolicy.hero.image,
    defaultSiteContent.en.subpages.hotelPolicy.hero.image,
  );

  const arMediaWithoutDeprecated = stripDeprecatedArMediaKeys(content.ar.media);
  const enMediaWithoutDeprecated = stripDeprecatedEnMediaKeys(content.en.media);

  return {
    ar: {
      ...content.ar,
      media: {
        ...arMediaWithoutDeprecated,
        arabicLogo: logoAr,
        mainHero: heroFallbackFromSlides(syncedHeroSlides.ar, mainHeroAr),
        mainHeroSlides: syncedHeroSlides.ar,
        jeddah: jeddahAr,
        jazan: jazanAr,
        gallery: syncedGallery.ar,
      },
      homepage: {
        ...content.ar.homepage,
        highlights: normalizeHighlights(content.ar.homepage.highlights, defaultSiteContent.ar.homepage.highlights),
        properties: {
          ...content.ar.homepage.properties,
          items: syncedProperties.ar,
        },
        destinations: {
          ...content.ar.homepage.destinations,
          items: syncedDestinations.ar,
        },
      },
      subpages: {
        ...content.ar.subpages,
        about: {
          ...content.ar.subpages.about,
          hero: { ...content.ar.subpages.about.hero, image: aboutHeroAr },
        },
        dining: {
          ...content.ar.subpages.dining,
          hero: { ...content.ar.subpages.dining.hero, image: diningHeroAr },
        },
        roomsSuites: {
          ...content.ar.subpages.roomsSuites,
          hero: { ...content.ar.subpages.roomsSuites.hero, image: roomsSuitesHeroAr },
        },
        servicedApartments: {
          ...content.ar.subpages.servicedApartments,
          hero: { ...content.ar.subpages.servicedApartments.hero, image: servicedApartmentsHeroAr },
        },
        amenitiesServices: {
          ...content.ar.subpages.amenitiesServices,
          hero: { ...content.ar.subpages.amenitiesServices.hero, image: amenitiesServicesHeroAr },
        },
        loyaltyPage: {
          ...content.ar.subpages.loyaltyPage,
          hero: { ...content.ar.subpages.loyaltyPage.hero, image: loyaltyPageHeroAr },
        },
        meetingsEvents: {
          ...content.ar.subpages.meetingsEvents,
          hero: { ...content.ar.subpages.meetingsEvents.hero, image: meetingsEventsHeroAr },
        },
        corporateDealsPage: {
          ...content.ar.subpages.corporateDealsPage,
          hero: { ...content.ar.subpages.corporateDealsPage.hero, image: corporateDealsPageHeroAr },
        },
        groupBookings: {
          ...content.ar.subpages.groupBookings,
          hero: { ...content.ar.subpages.groupBookings.hero, image: groupBookingsHeroAr },
        },
        contact: {
          ...content.ar.subpages.contact,
          hero: { ...content.ar.subpages.contact.hero, image: contactHeroAr },
        },
        offersPage: {
          ...content.ar.subpages.offersPage,
          hero: { ...content.ar.subpages.offersPage.hero, image: offersPageHeroAr },
        },
        faqPage: {
          ...content.ar.subpages.faqPage,
          hero: { ...content.ar.subpages.faqPage.hero, image: faqPageHeroAr },
        },
        hotelsPage: {
          ...content.ar.subpages.hotelsPage,
          hero: { ...content.ar.subpages.hotelsPage.hero, image: hotelsPageHeroAr },
        },
        destinationsPage: {
          ...content.ar.subpages.destinationsPage,
          hero: { ...content.ar.subpages.destinationsPage.hero, image: destinationsPageHeroAr },
        },
        hotelPolicy: {
          ...content.ar.subpages.hotelPolicy,
          hero: { ...content.ar.subpages.hotelPolicy.hero, image: hotelPolicyHeroAr },
        },
      },
    },
    en: {
      ...content.en,
      media: {
        ...enMediaWithoutDeprecated,
        logo: logoEn,
        mainHero: heroFallbackFromSlides(syncedHeroSlides.en, mainHeroEn),
        mainHeroSlides: syncedHeroSlides.en,
        jeddah: jeddahEn,
        jazan: jazanEn,
        gallery: syncedGallery.en,
      },
      homepage: {
        ...content.en.homepage,
        highlights: normalizeHighlights(content.en.homepage.highlights, defaultSiteContent.en.homepage.highlights),
        properties: {
          ...content.en.homepage.properties,
          items: syncedProperties.en,
        },
        destinations: {
          ...content.en.homepage.destinations,
          items: syncedDestinations.en,
        },
      },
      subpages: {
        ...content.en.subpages,
        about: {
          ...content.en.subpages.about,
          hero: { ...content.en.subpages.about.hero, image: aboutHeroEn },
        },
        dining: {
          ...content.en.subpages.dining,
          hero: { ...content.en.subpages.dining.hero, image: diningHeroEn },
        },
        roomsSuites: {
          ...content.en.subpages.roomsSuites,
          hero: { ...content.en.subpages.roomsSuites.hero, image: roomsSuitesHeroEn },
        },
        servicedApartments: {
          ...content.en.subpages.servicedApartments,
          hero: { ...content.en.subpages.servicedApartments.hero, image: servicedApartmentsHeroEn },
        },
        amenitiesServices: {
          ...content.en.subpages.amenitiesServices,
          hero: { ...content.en.subpages.amenitiesServices.hero, image: amenitiesServicesHeroEn },
        },
        loyaltyPage: {
          ...content.en.subpages.loyaltyPage,
          hero: { ...content.en.subpages.loyaltyPage.hero, image: loyaltyPageHeroEn },
        },
        meetingsEvents: {
          ...content.en.subpages.meetingsEvents,
          hero: { ...content.en.subpages.meetingsEvents.hero, image: meetingsEventsHeroEn },
        },
        corporateDealsPage: {
          ...content.en.subpages.corporateDealsPage,
          hero: { ...content.en.subpages.corporateDealsPage.hero, image: corporateDealsPageHeroEn },
        },
        groupBookings: {
          ...content.en.subpages.groupBookings,
          hero: { ...content.en.subpages.groupBookings.hero, image: groupBookingsHeroEn },
        },
        contact: {
          ...content.en.subpages.contact,
          hero: { ...content.en.subpages.contact.hero, image: contactHeroEn },
        },
        offersPage: {
          ...content.en.subpages.offersPage,
          hero: { ...content.en.subpages.offersPage.hero, image: offersPageHeroEn },
        },
        faqPage: {
          ...content.en.subpages.faqPage,
          hero: { ...content.en.subpages.faqPage.hero, image: faqPageHeroEn },
        },
        hotelsPage: {
          ...content.en.subpages.hotelsPage,
          hero: { ...content.en.subpages.hotelsPage.hero, image: hotelsPageHeroEn },
        },
        destinationsPage: {
          ...content.en.subpages.destinationsPage,
          hero: { ...content.en.subpages.destinationsPage.hero, image: destinationsPageHeroEn },
        },
        hotelPolicy: {
          ...content.en.subpages.hotelPolicy,
          hero: { ...content.en.subpages.hotelPolicy.hero, image: hotelPolicyHeroEn },
        },
      },
    },
  };
}

/** Read token, accepting either the Vercel env name (SANITY_READ) or the legacy one. */
function readToken(): string | undefined {
  return process.env.SANITY_READ ?? process.env.SANITY_API_READ_TOKEN;
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
      subpages: {
        about: { ...defaultSiteContent.ar.subpages.about, ...(content?.ar?.subpages?.about ?? {}) },
        dining: { ...defaultSiteContent.ar.subpages.dining, ...(content?.ar?.subpages?.dining ?? {}) },
        roomsSuites: { ...defaultSiteContent.ar.subpages.roomsSuites, ...(content?.ar?.subpages?.roomsSuites ?? {}) },
        servicedApartments: { ...defaultSiteContent.ar.subpages.servicedApartments, ...(content?.ar?.subpages?.servicedApartments ?? {}) },
        amenitiesServices: { ...defaultSiteContent.ar.subpages.amenitiesServices, ...(content?.ar?.subpages?.amenitiesServices ?? {}) },
        loyaltyPage: { ...defaultSiteContent.ar.subpages.loyaltyPage, ...(content?.ar?.subpages?.loyaltyPage ?? {}) },
        meetingsEvents: { ...defaultSiteContent.ar.subpages.meetingsEvents, ...(content?.ar?.subpages?.meetingsEvents ?? {}) },
        corporateDealsPage: { ...defaultSiteContent.ar.subpages.corporateDealsPage, ...(content?.ar?.subpages?.corporateDealsPage ?? {}) },
        groupBookings: { ...defaultSiteContent.ar.subpages.groupBookings, ...(content?.ar?.subpages?.groupBookings ?? {}) },
        contact: { ...defaultSiteContent.ar.subpages.contact, ...(content?.ar?.subpages?.contact ?? {}) },
        offersPage: { ...defaultSiteContent.ar.subpages.offersPage, ...(content?.ar?.subpages?.offersPage ?? {}) },
        faqPage: { ...defaultSiteContent.ar.subpages.faqPage, ...(content?.ar?.subpages?.faqPage ?? {}) },
        hotelsPage: { ...defaultSiteContent.ar.subpages.hotelsPage, ...(content?.ar?.subpages?.hotelsPage ?? {}) },
        destinationsPage: { ...defaultSiteContent.ar.subpages.destinationsPage, ...(content?.ar?.subpages?.destinationsPage ?? {}) },
        hotelPolicy: { ...defaultSiteContent.ar.subpages.hotelPolicy, ...(content?.ar?.subpages?.hotelPolicy ?? {}) },
        careersPage: { ...defaultSiteContent.ar.subpages.careersPage, ...(content?.ar?.subpages?.careersPage ?? {}) },
        csrPage: { ...defaultSiteContent.ar.subpages.csrPage, ...(content?.ar?.subpages?.csrPage ?? {}) },
        reservationOfficePage: { ...defaultSiteContent.ar.subpages.reservationOfficePage, ...(content?.ar?.subpages?.reservationOfficePage ?? {}) },
        feedbackPage: { ...defaultSiteContent.ar.subpages.feedbackPage, ...(content?.ar?.subpages?.feedbackPage ?? {}) },
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
      subpages: {
        about: { ...defaultSiteContent.en.subpages.about, ...(content?.en?.subpages?.about ?? {}) },
        dining: { ...defaultSiteContent.en.subpages.dining, ...(content?.en?.subpages?.dining ?? {}) },
        roomsSuites: { ...defaultSiteContent.en.subpages.roomsSuites, ...(content?.en?.subpages?.roomsSuites ?? {}) },
        servicedApartments: { ...defaultSiteContent.en.subpages.servicedApartments, ...(content?.en?.subpages?.servicedApartments ?? {}) },
        amenitiesServices: { ...defaultSiteContent.en.subpages.amenitiesServices, ...(content?.en?.subpages?.amenitiesServices ?? {}) },
        loyaltyPage: { ...defaultSiteContent.en.subpages.loyaltyPage, ...(content?.en?.subpages?.loyaltyPage ?? {}) },
        meetingsEvents: { ...defaultSiteContent.en.subpages.meetingsEvents, ...(content?.en?.subpages?.meetingsEvents ?? {}) },
        corporateDealsPage: { ...defaultSiteContent.en.subpages.corporateDealsPage, ...(content?.en?.subpages?.corporateDealsPage ?? {}) },
        groupBookings: { ...defaultSiteContent.en.subpages.groupBookings, ...(content?.en?.subpages?.groupBookings ?? {}) },
        contact: { ...defaultSiteContent.en.subpages.contact, ...(content?.en?.subpages?.contact ?? {}) },
        offersPage: { ...defaultSiteContent.en.subpages.offersPage, ...(content?.en?.subpages?.offersPage ?? {}) },
        faqPage: { ...defaultSiteContent.en.subpages.faqPage, ...(content?.en?.subpages?.faqPage ?? {}) },
        hotelsPage: { ...defaultSiteContent.en.subpages.hotelsPage, ...(content?.en?.subpages?.hotelsPage ?? {}) },
        destinationsPage: { ...defaultSiteContent.en.subpages.destinationsPage, ...(content?.en?.subpages?.destinationsPage ?? {}) },
        hotelPolicy: { ...defaultSiteContent.en.subpages.hotelPolicy, ...(content?.en?.subpages?.hotelPolicy ?? {}) },
        careersPage: { ...defaultSiteContent.en.subpages.careersPage, ...(content?.en?.subpages?.careersPage ?? {}) },
        csrPage: { ...defaultSiteContent.en.subpages.csrPage, ...(content?.en?.subpages?.csrPage ?? {}) },
        reservationOfficePage: { ...defaultSiteContent.en.subpages.reservationOfficePage, ...(content?.en?.subpages?.reservationOfficePage ?? {}) },
        feedbackPage: { ...defaultSiteContent.en.subpages.feedbackPage, ...(content?.en?.subpages?.feedbackPage ?? {}) },
      },
    },
  });
}

/**
 * Content persistence is split across several small Sanity documents instead of
 * one giant singleton. The full `{ ar, en }` tree is ~5,250 attributes, far over
 * Sanity's hard limit of 1,000 attributes per document, which made saving the
 * monolithic singleton fail. Each chunk below stays comfortably under 1,000:
 *   shell ~150 · faq ~669 · homepage ~580 · rooms ~466 · subpages(rest) ~720 · forms ~310
 * The `forms` chunk holds careersPage + corporateDealsPage (recruitment / B2B
 * form content, jobs, and dropdowns) so the `subpages` doc keeps its headroom.
 * The in-memory shape is unchanged — only storage is chunked, transparently.
 */
const LANGS = ["ar", "en"] as const;
const CHUNK_KINDS = ["shell", "faq", "homepage", "rooms", "subpages", "forms"] as const;
const METADATA_ID = "site-content--meta";

type AnyRecord = Record<string, unknown>;

function chunkId(lang: string, kind: string) {
  return `site-content--${lang}--${kind}`;
}

function allChunkIds(): string[] {
  return LANGS.flatMap((lang) => CHUNK_KINDS.map((kind) => chunkId(lang, kind)));
}

/** Slice one language's content into the persisted chunks. */
function splitLang(langContent: AnyRecord): Record<(typeof CHUNK_KINDS)[number], AnyRecord> {
  const {
    navGroups,
    footerSections,
    footerContact,
    media,
    faq,
    homepage,
    subpages,
    ...rest
  } = langContent;
  // careersPage + corporateDealsPage carry the editable recruitment/B2B form
  // content (jobs, labels, dropdowns), so they get their own chunk to keep the
  // main `subpages` document well under Sanity's 1,000-attribute-per-doc limit.
  const { roomsSuites, careersPage, corporateDealsPage, ...subpagesRest } =
    (subpages as AnyRecord) ?? {};
  return {
    shell: { navGroups, footerSections, footerContact, media, ...rest },
    faq: { faq },
    homepage: { homepage },
    rooms: { subpages: { roomsSuites } },
    subpages: { subpages: subpagesRest },
    forms: { subpages: { careersPage, corporateDealsPage } },
  };
}

/** Build the list of chunk documents to write for a full content tree. */
function splitContent(content: EditableSiteContent): { id: string; content: AnyRecord }[] {
  const docs: { id: string; content: AnyRecord }[] = [];
  for (const lang of LANGS) {
    const slices = splitLang(content[lang] as unknown as AnyRecord);
    for (const kind of CHUNK_KINDS) {
      docs.push({ id: chunkId(lang, kind), content: slices[kind] });
    }
  }
  return docs;
}

/** Reassemble a partial content tree from fetched chunk documents. */
function assembleChunks(byId: Map<string, AnyRecord>): Partial<EditableSiteContent> | null {
  const out: AnyRecord = {};
  let found = false;
  for (const lang of LANGS) {
    const langOut: AnyRecord = {};
    const subpages: AnyRecord = {};
    let langFound = false;
    for (const kind of CHUNK_KINDS) {
      const slice = byId.get(chunkId(lang, kind));
      if (!slice) continue;
      langFound = true;
      if (kind === "rooms" || kind === "subpages" || kind === "forms") {
        Object.assign(subpages, (slice.subpages as AnyRecord) ?? {});
      } else {
        Object.assign(langOut, slice);
      }
    }
    if (Object.keys(subpages).length) langOut.subpages = subpages;
    if (langFound) {
      out[lang] = langOut;
      found = true;
    }
  }
  return found ? (out as Partial<EditableSiteContent>) : null;
}

export async function getEditableContent(): Promise<
  EditableSiteContent & { hiddenSections: string[] }
> {
  const client = getSanityClient(readToken());

  if (!client) {
    return { ...defaultSiteContent, hiddenSections: [] };
  }

  try {
    const ids = [...allChunkIds(), METADATA_ID, documentId];
    const documents: Array<{
      _id: string;
      content?: AnyRecord;
      hiddenSections?: unknown;
    }> = await client.fetch(
      `*[_id in $ids]{_id, content, hiddenSections}`,
      { ids },
      { cache: "no-store" },
    );

    const byId = new Map(
      documents
        .filter((d) => d.content && allChunkIds().includes(d._id))
        .map((d) => [d._id, d.content as AnyRecord]),
    );
    const meta = documents.find((d) => d._id === METADATA_ID);
    const legacy = documents.find((d) => d._id === documentId);

    // Prefer chunked storage; fall back to the legacy singleton until first save.
    const assembled = assembleChunks(byId);
    const partial = assembled ?? (legacy?.content as Partial<EditableSiteContent> | undefined) ?? null;
    const hidden = assembled ? meta?.hiddenSections : legacy?.hiddenSections;

    return {
      ...mergeContent(partial),
      hiddenSections: Array.isArray(hidden) ? (hidden as string[]) : [],
    };
  } catch {
    return { ...defaultSiteContent, hiddenSections: [] };
  }
}

/** True when the given admin section id is marked hidden from the live site. */
export function isSectionHidden(
  hiddenSections: readonly string[] | undefined | null,
  id: string,
): boolean {
  return Array.isArray(hiddenSections) && hiddenSections.includes(id);
}

export async function getEditableContentVersion() {
  const client = getSanityClient(readToken());

  if (!client) {
    return "default";
  }

  try {
    const document = await client.fetch(
      `*[_id in $ids]{_id, updatedAt, _updatedAt}`,
      { ids: [METADATA_ID, documentId] },
      { cache: "no-store" },
    );
    const meta =
      document?.find((d: { _id: string }) => d._id === METADATA_ID) ??
      document?.find((d: { _id: string }) => d._id === documentId);

    return meta?.updatedAt ?? meta?._updatedAt ?? "default";
  } catch {
    return "default";
  }
}

export async function saveEditableContent(
  content: EditableSiteContent,
  hiddenSections: string[] = [],
) {
  const client = getSanityClient(process.env.SANITY_API_WRITE_TOKEN);

  if (!client) {
    throw new Error("Sanity write client is not configured.");
  }

  const normalizedContent = syncSharedImages(content);
  const normalizedHidden = Array.isArray(hiddenSections)
    ? Array.from(new Set(hiddenSections.filter((id) => typeof id === "string")))
    : [];
  const now = new Date().toISOString();

  // Write each chunk + a small metadata doc in one atomic transaction. Each doc
  // stays under Sanity's 1,000-attribute-per-document limit (see splitContent).
  const tx = client.transaction();
  for (const { id, content: slice } of splitContent(normalizedContent)) {
    tx.createOrReplace({
      _id: id,
      _type: "siteContent",
      title: `Swiss Blue Content — ${id}`,
      content: slice,
      updatedAt: now,
    });
  }
  tx.createOrReplace({
    _id: METADATA_ID,
    _type: "siteContent",
    title: "Swiss Blue Content — metadata",
    hiddenSections: normalizedHidden,
    updatedAt: now,
  });
  await tx.commit({ visibility: "sync" });

  // Best-effort cleanup of the oversized legacy singleton so reads use chunks.
  try {
    await client.delete(documentId);
  } catch {
    // ignore — legacy doc may already be gone
  }

  return { content: normalizedContent, hiddenSections: normalizedHidden };
}

export { BOOKING_URL, heroImage };
