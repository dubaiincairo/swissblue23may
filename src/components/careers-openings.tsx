"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type Locale = "ar" | "en";

type Job = {
  id: string;
  title: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  skills: string[];
};

type LocaleContent = {
  values: {
    eyebrow: string;
    title: string;
    text: string;
    items: { title: string; text: string }[];
  };
  openings: {
    eyebrow: string;
    title: string;
    text: string;
  };
  labels: {
    summary: string;
    responsibilities: string;
    qualifications: string;
    experience: string;
    skills: string;
    apply: string;
    viewDetails: string;
    hideDetails: string;
    formHeading: string;
    formSub: string;
  };
  form: {
    fullName: string;
    email: string;
    phone: string;
    nationality: string;
    location: string;
    yearsExperience: string;
    currentTitle: string;
    expectedSalary: string;
    noticePeriod: string;
    linkedin: string;
    linkedinHint: string;
    cv: string;
    cvHint: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    success: string;
    optional: string;
  };
  jobs: Job[];
};

const CONTENT: Record<Locale, LocaleContent> = {
  ar: {
    values: {
      eyebrow: "ثقافة العمل لدينا",
      title: "مجتمع ضيافة مهني تفخر بالانتماء إليه.",
      text: "في سويس بلو نبني فريقاً يلتزم بأعلى معايير الضيافة في السوق السعودي والخليجي. نؤمن بأن جودة التجربة تبدأ من جودة الأشخاص، لذلك نستثمر في بيئة عمل قائمة على الاحترام والأخلاق والتطوير المستمر.",
      items: [
        {
          title: "الأخلاق والنزاهة",
          text: "نعمل بشفافية ومصداقية في كل تعامل مع الضيف والزميل والشريك، ونلتزم بأعلى معايير المهنية.",
        },
        {
          title: "الاحترافية",
          text: "معايير تشغيل واضحة، انضباط في الأداء، واهتمام بالتفاصيل في كل قسم من أقسام المنشأة.",
        },
        {
          title: "روح الفريق الواحد",
          text: "نتعاون عبر الأقسام والمنشآت، نتشارك المعرفة، وندعم بعضنا لتقديم تجربة ضيافة متكاملة.",
        },
        {
          title: "التميز في الخدمة",
          text: "نتجاوز توقعات الضيف من خلال خدمة سريعة، دقيقة، وصادقة تعكس كرم الضيافة السعودية.",
        },
        {
          title: "الاحترام",
          text: "نقدّر تنوع فريقنا وضيوفنا، ونتعامل مع الجميع بكرامة وإنصاف في بيئة عمل آمنة وشاملة.",
        },
        {
          title: "التطوير المستمر",
          text: "تدريب منظم، مسارات ترقية داخلية، وفرص نمو حقيقية لكل من يلتزم بمعاييرنا كل يوم.",
        },
      ],
    },
    openings: {
      eyebrow: "الوظائف المتاحة",
      title: "فرص حالية في فنادق وشقق سويس بلو.",
      text: "اختر الدور الذي يناسب خبرتك، واطلع على التفاصيل الكاملة، ثم قدّم طلبك مباشرة من خلال النموذج المرفق بكل وظيفة.",
    },
    labels: {
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
    form: {
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
      linkedinHint: "اختياري",
      cv: "إرفاق السيرة الذاتية",
      cvHint: "PDF أو Word",
      message: "رسالة قصيرة أو خطاب تعريفي",
      messagePlaceholder: "أخبرنا لماذا أنت مناسب لهذا الدور…",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال…",
      success: "تم استلام طلبك بنجاح. سيتواصل معك فريق التوظيف خلال خمسة أيام عمل.",
      optional: "اختياري",
    },
    jobs: [
      {
        id: "front-office-manager",
        title: "مدير مكتب الاستقبال",
        summary:
          "قيادة عمليات مكتب الاستقبال على مدار الساعة لضمان تجربة وصول ومغادرة سلسة تعكس معايير سويس بلو.",
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
        skills: [
          "قيادة الفرق",
          "خدمة الضيوف",
          "حل المشكلات",
          "إدارة الإيرادات الأساسية",
        ],
      },
      {
        id: "executive-housekeeper",
        title: "مدير التدبير الفندقي",
        summary:
          "إدارة قسم التدبير الفندقي لضمان أعلى معايير النظافة والجاهزية في الغرف والمساحات العامة.",
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
        skills: [
          "إدارة الجودة",
          "التنظيم",
          "قيادة الفرق",
          "ضبط التكاليف",
        ],
      },
      {
        id: "fb-supervisor",
        title: "مشرف الأطعمة والمشروبات",
        summary:
          "الإشراف على خدمة الإفطار والمطعم وخدمة الغرف لتقديم تجربة طعام متسقة وعالية الجودة.",
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
        skills: [
          "خدمة العملاء",
          "سلامة الغذاء",
          "إدارة الفريق",
          "العمل تحت الضغط",
        ],
      },
      {
        id: "guest-relations",
        title: "موظف علاقات الضيوف",
        summary:
          "كن الوجه المرحّب لسويس بلو، تبني علاقات مع الضيوف وتضمن تجربة إقامة استثنائية.",
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
        skills: [
          "التواصل",
          "التعاطف",
          "حل المشكلات",
          "الانتباه للتفاصيل",
        ],
      },
      {
        id: "reservations-agent",
        title: "موظف حجوزات",
        summary:
          "إدارة الحجوزات المباشرة وعبر القنوات بدقة لتحقيق أفضل إشغال وإيرادات.",
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
        skills: [
          "الدقة",
          "البيع عبر الهاتف",
          "إدارة القنوات",
          "خدمة العملاء",
        ],
      },
      {
        id: "maintenance-technician",
        title: "فني صيانة وهندسة",
        summary:
          "ضمان تشغيل آمن وموثوق لجميع مرافق المنشأة من خلال الصيانة الوقائية والإصلاح السريع.",
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
        skills: [
          "الصيانة الكهربائية",
          "التكييف والتبريد",
          "السباكة",
          "السلامة",
        ],
      },
      {
        id: "sales-account-manager",
        title: "مدير مبيعات وحسابات الشركات",
        summary:
          "تنمية إيرادات الشركات والمجموعات عبر بناء علاقات وعقود طويلة الأمد مع الجهات والشركات.",
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
        skills: [
          "التفاوض",
          "بناء العلاقات",
          "إدارة الحسابات",
          "تحليل السوق",
        ],
      },
    ],
  },
  en: {
    values: {
      eyebrow: "Our workplace culture",
      title: "A professional hospitality community you'll be proud to join.",
      text: "At Swiss Blue we build a team that lives up to the highest hospitality standards in the Saudi and GCC market. We believe a great guest experience starts with great people, so we invest in a workplace built on respect, ethics, and continuous development.",
      items: [
        {
          title: "Ethics & Integrity",
          text: "We act with transparency and honesty in every interaction with guests, colleagues, and partners, holding ourselves to the highest professional standards.",
        },
        {
          title: "Professionalism",
          text: "Clear operating standards, disciplined performance, and attention to detail across every department of the property.",
        },
        {
          title: "Teamwork",
          text: "We collaborate across departments and properties, share knowledge, and support one another to deliver a complete hospitality experience.",
        },
        {
          title: "Service Excellence",
          text: "We exceed guest expectations through fast, accurate, and genuine service that reflects authentic Saudi hospitality.",
        },
        {
          title: "Respect",
          text: "We value the diversity of our team and guests, treating everyone with dignity and fairness in a safe, inclusive environment.",
        },
        {
          title: "Continuous Development",
          text: "Structured training, internal promotion paths, and real growth opportunities for everyone who upholds our standards every day.",
        },
      ],
    },
    openings: {
      eyebrow: "Current openings",
      title: "Open roles across Swiss Blue hotels and apartments.",
      text: "Choose the role that fits your experience, review the full details, then apply directly through the form attached to each position.",
    },
    labels: {
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
    form: {
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
      linkedinHint: "optional",
      cv: "CV upload",
      cvHint: "PDF or Word",
      message: "Short message or cover note",
      messagePlaceholder: "Tell us why you're a great fit for this role…",
      submit: "Submit application",
      submitting: "Submitting…",
      success: "Your application has been received. Our recruitment team will be in touch within five business days.",
      optional: "optional",
    },
    jobs: [
      {
        id: "front-office-manager",
        title: "Front Office Manager",
        summary:
          "Lead round-the-clock front office operations to deliver a seamless arrival and departure experience that reflects Swiss Blue standards.",
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
        id: "executive-housekeeper",
        title: "Executive Housekeeper",
        summary:
          "Run the housekeeping department to maintain the highest standards of cleanliness and readiness across rooms and public areas.",
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
        id: "fb-supervisor",
        title: "Food & Beverage Supervisor",
        summary:
          "Oversee breakfast, restaurant, and in-room dining service to deliver a consistent, high-quality food experience.",
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
        id: "guest-relations",
        title: "Guest Relations Officer",
        summary:
          "Be the welcoming face of Swiss Blue, building relationships with guests and ensuring an exceptional stay experience.",
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
        id: "reservations-agent",
        title: "Reservations Agent",
        summary:
          "Manage direct and channel reservations accurately to maximise occupancy and revenue.",
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
        id: "maintenance-technician",
        title: "Maintenance / Engineering Technician",
        summary:
          "Ensure safe, reliable operation of all property facilities through preventive maintenance and fast repairs.",
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
        id: "sales-account-manager",
        title: "Sales & Corporate Account Manager",
        summary:
          "Grow corporate and group revenue by building long-term relationships and contracts with companies and entities.",
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
  },
};

function JobCard({
  job,
  index,
  isOpen,
  onToggle,
  t,
  isArabic,
}: {
  job: Job;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  t: LocaleContent;
  isArabic: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = event.currentTarget;
    // No application backend exists yet; confirm client-side (matches corporate-deal-form).
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
    }, 600);
  }

  return (
    <article className="careers-job-card">
      <button
        type="button"
        className="careers-job-head"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="careers-job-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="careers-job-headings">
          <span className="careers-job-title">{job.title}</span>
          <span className="careers-job-summary">{job.summary}</span>
        </span>
        <span className="careers-job-meta">
          <span className="careers-job-exp">{job.experience}</span>
          <span className="careers-job-toggle">
            {isOpen ? t.labels.hideDetails : t.labels.viewDetails}
          </span>
        </span>
      </button>

      {isOpen ? (
        <div className="careers-job-body">
          <div className="careers-job-details">
            <DetailBlock title={t.labels.summary}>
              <p>{job.summary}</p>
            </DetailBlock>
            <DetailBlock title={t.labels.responsibilities}>
              <ul>
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title={t.labels.qualifications}>
              <ul>
                {job.qualifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailBlock>
            <DetailBlock title={t.labels.experience}>
              <p>{job.experience}</p>
            </DetailBlock>
            <DetailBlock title={t.labels.skills}>
              <div className="careers-skill-chips">
                {job.skills.map((skill) => (
                  <span className="careers-skill-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </DetailBlock>
          </div>

          <div className="careers-apply">
            <div className="careers-apply-head">
              <span className="eyebrow">{t.labels.formHeading}</span>
              <h4>{job.title}</h4>
              <p>{t.labels.formSub}</p>
            </div>

            {submitted ? (
              <div className="careers-success" role="status">
                {t.form.success}
              </div>
            ) : (
              <form className="b2b-form" onSubmit={handleSubmit} dir={isArabic ? "rtl" : "ltr"}>
                <input type="hidden" name="position" value={job.title} />
                <label>
                  <span>{t.form.fullName}</span>
                  <input name="fullName" required autoComplete="name" />
                </label>
                <label>
                  <span>{t.form.email}</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  <span>{t.form.phone}</span>
                  <input name="phone" type="tel" required autoComplete="tel" />
                </label>
                <label>
                  <span>{t.form.nationality}</span>
                  <input name="nationality" required />
                </label>
                <label>
                  <span>{t.form.location}</span>
                  <input name="location" required />
                </label>
                <label>
                  <span>{t.form.yearsExperience}</span>
                  <input name="yearsExperience" type="number" min="0" required />
                </label>
                <label>
                  <span>{t.form.currentTitle}</span>
                  <input name="currentTitle" required />
                </label>
                <label>
                  <span>{t.form.expectedSalary}</span>
                  <input name="expectedSalary" required />
                </label>
                <label>
                  <span>{t.form.noticePeriod}</span>
                  <input name="noticePeriod" required />
                </label>
                <label>
                  <span>
                    {t.form.linkedin}{" "}
                    <em className="careers-optional">({t.form.optional})</em>
                  </span>
                  <input name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
                </label>
                <label className="span-2">
                  <span>
                    {t.form.cv} <em className="careers-optional">({t.form.cvHint})</em>
                  </span>
                  <input
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="careers-file"
                  />
                </label>
                <label className="span-2">
                  <span>{t.form.message}</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.form.messagePlaceholder}
                  />
                </label>
                <div className="b2b-form-actions span-2">
                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? t.form.submitting : t.form.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="careers-detail-block">
      <h5>{title}</h5>
      {children}
    </div>
  );
}

export default function CareersOpenings({ locale }: { locale: Locale }) {
  const t = CONTENT[locale];
  const isArabic = locale === "ar";
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{t.values.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {t.values.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {t.values.text}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.values.items.map((item, index) => (
            <article
              className="content-card reveal-slide-up"
              key={item.title}
              style={{ "--delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span className="eyebrow">{item.title}</span>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="reveal-slide-up">
          <span className="eyebrow">{t.openings.eyebrow}</span>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[44px]">
            {t.openings.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">
            {t.openings.text}
          </p>
        </div>

        <div className="careers-job-list mt-10">
          {t.jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              index={index}
              isOpen={openId === job.id}
              onToggle={() => setOpenId((prev) => (prev === job.id ? null : job.id))}
              t={t}
              isArabic={isArabic}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
