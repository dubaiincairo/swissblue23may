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

export const defaultSiteContent = {
  ar: {
    navGroups,
    footerSections,
    footerContact,
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
      },
      amenitiesServices: {
        hero: {
          eyebrow: "الخدمات والمرافق",
          title: "خدمات مصممة حول راحتك.",
          text: "تدعم كل إقامة في سويس بلو مجموعة من الخدمات الأساسية التي تجعل السفر أسهل وأكثر راحة وموثوقية.",
          image: jazanImage,
        },
      },
      loyaltyPage: {
        hero: {
          eyebrow: "برنامج الولاء",
          title: "مزايا مباشرة لضيوف سويس بلو الدائمين.",
          text: "برنامج ولاء يربط الضيوف المتكررين بعروض الحجز المباشر، أولوية الترقية عند توفرها، ودعم أسرع من فريق الحجوزات.",
          image: heroImage,
        },
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
          text: "فريق واحد. رقم واحد. خطّط وعدّل وأكّد حجوزاتك في كل منشآت سويس بلو.",
          image: heroImage,
        },
        intro: {
          eyebrow: "متاح 24/7",
          title: "تواصل مع المختصين في أي وقت، باللغتين العربية والإنجليزية.",
          text: "فريق الحجوزات يتولى الحجوزات الجديدة، طلبات المجموعات، حسابات الشركات، وتعديلات أثناء الإقامة، بشكل مباشر دون وسطاء.",
        },
        channels: [
          {
            title: "الهاتف",
            value: "+966 12 000 0000",
            href: "tel:+966120000000",
            text: "اتصال مباشر بفريق الحجوزات على مدار الساعة.",
          },
          {
            title: "واتساب",
            value: "+966 50 000 0000",
            href: "https://wa.me/966500000000",
            text: "محادثة سريعة لتوفر الغرف، تأكيدات، أو تعديلات.",
          },
          {
            title: "البريد الإلكتروني",
            value: "reservations@swissblue.sa",
            href: "mailto:reservations@swissblue.sa",
            text: "للحجوزات والطلبات التي تتطلب توثيقاً كتابياً.",
          },
          {
            title: "في الفندق",
            value: "مكتب الاستقبال",
            href: "",
            text: "زرنا في أي منشأة لإجراء حجوزاتك مباشرة مع موظف الاستقبال.",
          },
        ],
        servicesIntro: {
          eyebrow: "ماذا نقدم",
          title: "كل ما يلزم لتجربة حجز سلسة.",
          text: "نتعامل مع كافة طلبات الحجز من البسيطة إلى المعقدة، ونصلك بفريق المنشأة عند الحاجة.",
        },
        services: [
          "حجوزات جديدة لأفراد وعوائل",
          "حجوزات المجموعات (10 غرف أو أكثر)",
          "حسابات وعقود الشركات",
          "ترتيبات خاصة (احتفالات، شهر العسل، إقامات طويلة)",
          "تعديل وإلغاء الحجوزات",
          "دعم أثناء الإقامة",
          "خطط رحلات متعددة المنشآت",
        ],
        benefitsIntro: {
          eyebrow: "لماذا الحجز المباشر",
          title: "ميزات حصرية لا تجدها مع الوسطاء.",
          text: "حجزك عبر مكتبنا يحفظ لك أفضل سعر، أعلى مرونة، وتنسيقاً شخصياً.",
        },
        benefits: [
          {
            title: "ضمان أفضل سعر",
            text: "سعرنا المباشر مكافئ أو أقل من أي قناة خارجية للوحدة نفسها وفي التاريخ نفسه.",
          },
          {
            title: "سياسات أكثر مرونة",
            text: "إلغاء، تعديل، أو تأجيل بشروط أوضح وأسرع من قنوات الحجز الخارجية.",
          },
          {
            title: "تنسيق شخصي",
            text: "أولوية للترقية عند توفرها، طلبات خاصة، وتنسيق مع فريق المنشأة قبل وصولك.",
          },
        ],
      },
      feedbackPage: {
        hero: {
          eyebrow: "صوتك يهمنا",
          title: "الشكاوى والاقتراحات.",
          text: "ملاحظاتك المباشرة تساعدنا على تحسين كل إقامة. كل رسالة تصل إلى مدير مختص ويتم الرد عليها.",
          image: heroImage,
        },
        intro: {
          eyebrow: "وعدنا في الخدمة",
          title: "تأكيد خلال 4 ساعات. حل خلال 48 ساعة.",
          text: "حال استلامنا ملاحظتك، يتولى مدير الخدمة متابعتها من البداية للنهاية. سيردّ عليك شخص حقيقي، وليس رسالة آلية.",
        },
        channels: [
          {
            title: "في الفندق",
            text: "تحدث مع مدير المنشأة عبر مكتب الاستقبال — ستجد جواباً مباشراً غالباً.",
          },
          {
            title: "مكتب الحجوزات",
            text: "اتصل بفريقنا المركزي لتسجيل الملاحظة وتوجيهها للقسم المختص.",
          },
          {
            title: "البريد الإلكتروني",
            text: "أرسل لنا على feedback@swissblue.sa مع رقم الحجز ومدى الإلحاحية.",
          },
          {
            title: "النموذج الإلكتروني",
            text: "استخدم نموذج التواصل في الموقع — يصل مباشرة إلى فريق تجربة الضيف.",
          },
        ],
        process: [
          {
            title: "الاستلام والإقرار",
            text: "تأكيد فوري بأن ملاحظتك وصلت، مع رقم متابعة خلال 4 ساعات كحدّ أقصى.",
          },
          {
            title: "البحث والتقصي",
            text: "نراجع تفاصيل الحجز، نتحدث مع فريق المنشأة، ونتحقق من جذور الموضوع.",
          },
          {
            title: "الحل والتعويض",
            text: "نقترح حلاً واضحاً، وعند الحاجة نقدم تعويضاً مناسباً للحالة وملف الضيف.",
          },
          {
            title: "المتابعة والإغلاق",
            text: "نتواصل معك مرة أخيرة للتأكد من رضاك قبل إغلاق التذكرة.",
          },
        ],
        categoriesIntro: {
          eyebrow: "ما الذي نستقبله",
          title: "كل ما يخصّ تجربتك يهمنا.",
          text: "نرحب بالشكاوى والمقترحات وحتى الإشادات. كلها تساعدنا على رفع المعيار.",
        },
        categories: [
          "شكوى على خدمة محددة",
          "اقتراح لتحسين عملية تشغيلية",
          "إشادة بأحد أفراد الفريق",
          "طلب إصلاح أو صيانة",
          "ملاحظة تخص الخصوصية أو السلامة",
          "استفسار عن الفاتورة",
        ],
        escalationIntro: {
          eyebrow: "مسار التصعيد",
          title: "إن لم تكن النتيجة مرضية.",
          text: "يمكنك تصعيد الموضوع إلى الإدارة العامة عبر escalations@swissblue.sa. تذكرة التصعيد تُراجَع من فريق تجربة الضيف خلال 72 ساعة.",
        },
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
      partners: partnersSectionEn,
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
      },
      amenitiesServices: {
        hero: {
          eyebrow: "Amenities & Services",
          title: "Services designed around your comfort.",
          text: "Every stay at Swiss Blue is supported by a selection of core services that make travel easier, comfortable, and reliable.",
          image: jazanImage,
        },
      },
      loyaltyPage: {
        hero: {
          eyebrow: "Loyalty Program",
          title: "Direct benefits for Swiss Blue regular guests.",
          text: "A loyalty program linking repeat guests to direct booking offers, priority upgrade when available, and faster reservations support.",
          image: heroImage,
        },
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
          text: "One team. One number. Plan, modify, and confirm reservations across every Swiss Blue property.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Available 24/7",
          title: "Reach our specialists any time, in Arabic or English.",
          text: "Our reservations team handles new bookings, group requests, corporate accounts, and on-stay changes — directly, without intermediaries.",
        },
        channels: [
          {
            title: "Phone",
            value: "+966 12 000 0000",
            href: "tel:+966120000000",
            text: "Direct line to the reservations team, around the clock.",
          },
          {
            title: "WhatsApp",
            value: "+966 50 000 0000",
            href: "https://wa.me/966500000000",
            text: "Quick chat for availability, confirmations, or changes.",
          },
          {
            title: "Email",
            value: "reservations@swissblue.sa",
            href: "mailto:reservations@swissblue.sa",
            text: "For reservations and requests that need written documentation.",
          },
          {
            title: "In-person",
            value: "Front desk",
            href: "",
            text: "Visit any property to make your reservation directly with the receptionist.",
          },
        ],
        servicesIntro: {
          eyebrow: "What we handle",
          title: "Everything you need for a smooth booking experience.",
          text: "We cover the full range of reservation requests, from a single room to multi-property itineraries, and loop in property teams when needed.",
        },
        services: [
          "New reservations for individuals and families",
          "Group bookings (10 rooms or more)",
          "Corporate accounts and contracts",
          "Special arrangements (celebrations, honeymoon, long stays)",
          "Modifications and cancellations",
          "On-stay guest support",
          "Multi-property itineraries",
        ],
        benefitsIntro: {
          eyebrow: "Why book direct",
          title: "Exclusive benefits you won't get through intermediaries.",
          text: "Booking through our office secures the best rate, the most flexibility, and personal coordination.",
        },
        benefits: [
          {
            title: "Best rate guarantee",
            text: "Our direct rate matches or beats any third-party channel for the same room and dates.",
          },
          {
            title: "More flexible policies",
            text: "Cancellation, modification, or postponement on clearer and faster terms than external booking channels.",
          },
          {
            title: "Personal coordination",
            text: "Priority upgrades when available, special requests, and pre-arrival coordination with the property team.",
          },
        ],
      },
      feedbackPage: {
        hero: {
          eyebrow: "Your voice matters",
          title: "Complaints & Suggestions.",
          text: "Direct feedback helps us improve every stay. Every message reaches a manager and gets a response.",
          image: heroImage,
        },
        intro: {
          eyebrow: "Our service promise",
          title: "Acknowledged in 4 hours. Resolved in 48.",
          text: "Once we receive your feedback, a service manager owns it end-to-end. You will hear back from a real person, not an auto-reply.",
        },
        channels: [
          {
            title: "At the hotel",
            text: "Speak to the property manager via the front desk — most matters get an answer on the spot.",
          },
          {
            title: "Central reservation office",
            text: "Call our central team to log the issue and route it to the responsible department.",
          },
          {
            title: "Email",
            text: "Write to feedback@swissblue.sa with your booking reference and how urgent it is.",
          },
          {
            title: "Online form",
            text: "Use the contact form on the website — it lands directly with the guest experience team.",
          },
        ],
        process: [
          {
            title: "Acknowledge",
            text: "Immediate confirmation that your message was received, with a tracking reference within 4 hours.",
          },
          {
            title: "Investigate",
            text: "We review the booking details, speak to the property team, and verify the root cause.",
          },
          {
            title: "Resolve",
            text: "We propose a clear solution and, where appropriate, offer compensation suited to the case and the guest profile.",
          },
          {
            title: "Follow up",
            text: "One final check-in to ensure you are satisfied before we close the ticket.",
          },
        ],
        categoriesIntro: {
          eyebrow: "What we accept",
          title: "Anything that affects your stay matters to us.",
          text: "We welcome complaints, suggestions, and even compliments. All of them help us raise the bar.",
        },
        categories: [
          "Service complaint",
          "Process improvement suggestion",
          "Compliment for a team member",
          "Repair or maintenance request",
          "Privacy or safety concern",
          "Billing question",
        ],
        escalationIntro: {
          eyebrow: "Escalation path",
          title: "If you are not satisfied with the outcome.",
          text: "You can escalate the case to the corporate office at escalations@swissblue.sa. Escalations are reviewed by the guest experience team within 72 hours.",
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

  const normalizedContent = syncSharedImages(content);

  await client.createOrReplace({
    _id: documentId,
    _type: "siteContent",
    title: "Swiss Blue Website Content",
    content: normalizedContent,
    updatedAt: new Date().toISOString(),
  });

  return normalizedContent;
}

export { BOOKING_URL, heroImage };
