import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Bot,
  CalendarCheck,
  Languages,
  Sliders,
  Building2,
  Zap,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Briefcase,
  Users,
  Award,
  Globe2,
  ExternalLink,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Layers,
} from "lucide-react";
import {
  OverviewInteractive,
  PrintDeckButton,
  OpenModalButton,
} from "@/components/product-overview/overview-interactive";
import styles from "@/components/product-overview/overview.module.css";
import { usableLogo, getEditableContent } from "@/lib/editable-content";
import { heroImage } from "@/lib/content";

export const metadata: Metadata = {
  title: "العرض التسويقي الشامل للمنظومة الرقمية | فنادق سويس بلو للضيافة",
  description:
    "استعراض شامل لمزايا وقدرات المنصة الرقمية لفنادق سويس بلو: المساعد الذكي الفندقي، محرك الحجز المباشر، الهوية الثنائية، وإدارة المحتوى الفورية.",
  alternates: {
    canonical: "https://swissblue.sa/product-overview",
    languages: {
      ar: "https://swissblue.sa/product-overview",
      en: "https://swissblue.sa/en/product-overview",
    },
  },
};

export default async function ProductOverviewArabicPage() {
  const { ar, en } = await getEditableContent();
  const logo = usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo);
  const heroBg = ar.media.mainHero || heroImage;
  const properties = ar.homepage.properties.items;

  return (
    <div className={styles.overviewContainer} dir="rtl" lang="ar">
      {/* Presentation Top Header */}
      <header className={styles.topHeader}>
        <div className={styles.topHeaderInner}>
          <div className="flex items-center gap-4">
            <Link href="/ar" className={styles.brandLink} title="العودة إلى موقع سويس بلو">
              {logo ? (
                <Image
                  src={logo}
                  alt="فنادق سويس بلو للضيافة"
                  width={150}
                  height={50}
                  className="h-9 w-auto object-contain"
                  priority
                />
              ) : (
                <span className="font-extrabold text-xl text-[#1246a8]">سويس بلو</span>
              )}
            </Link>
            <span className={styles.brandBadge}>
              <Sparkles size={12} />
              <span>ملف المنظومة الرقمية للضيافة</span>
            </span>
          </div>

          <div className={styles.headerActions}>
            <Link
              href="/en/product-overview"
              className={styles.langSwitch}
              title="Switch to English Deck"
            >
              English
            </Link>

            <PrintDeckButton locale="ar" />

            <OpenModalButton
              locale="ar"
              label="طلب عرض حي"
              interest="العرض المباشر للمنصة"
              variant="header"
            />
          </div>
        </div>
      </header>

      {/* Executive Hero with Authentic SwissBlue Art Direction & Imagery */}
      <section className={styles.heroSection}>
        {/* Background Image with Slow Ambient Ken Burns & Brand Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            src={heroBg}
            alt="Swiss Blue Hotels Atmosphere"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30 kenburns-active"
          />
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(9,32,78,0.94)_0%,rgba(18,70,168,0.85)_55%,rgba(28,95,209,0.72)_100%)]" />
        </div>

        <div className={styles.heroGlow} />
        <div className={styles.heroGlowSecondary} />

        <div className={styles.heroContent}>
          <div className={styles.heroPill}>
            <Sparkles size={15} />
            <span>المنظومة الرقمية المتطورة للضيافة الفندقية في المملكة العربية السعودية</span>
          </div>

          <h1 className={styles.heroTitle}>
            الجيل الجديد من منصات الضيافة الرقمية الذكية
          </h1>

          <p className={styles.heroSubtitle}>
            منصة فندقية متكاملة تعتمد الهوية البصرية الفاخرة لسويس بلو، تجمع بين الذكاء الاصطناعي على مدار الساعة،
            محرك حجز مباشر لتعظيم الإيرادات وهوامش الأرباح، وتجربة ضيافة سعودية أصيلة تجمع بين الفنادق والشقق المخدومة.
          </p>

          <div className={styles.heroCtas}>
            <OpenModalButton
              locale="ar"
              label="طلب استعراض حي للمنصة"
              interest="عرض المنصة للشركاء"
              variant="primary"
            />
            <PrintDeckButton locale="ar" label="حفظ ملف العرض (PDF)" variant="hero" />
            <Link
              href="/ar"
              className={styles.heroSecondaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={17} />
              <span>معاينة الموقع المباشر</span>
            </Link>
          </div>

          {/* Key Metric Counters */}
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>&lt; 2s</div>
              <div className={styles.statLabel}>سرعة استجابة المساعد الذكي</div>
              <div className={styles.statHint}>رد فوري ومبيعات آلية 24/7</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>0%</div>
              <div className={styles.statLabel}>عمولات وسيط على الحجز المباشر</div>
              <div className={styles.statHint}>توفير 18% مقارنة بمنصات OTA</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>منشآت في محفظة موحدة</div>
              <div className={styles.statHint}>جدة • الرياض • جازان</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>0.8s</div>
              <div className={styles.statLabel}>زمن تحميل الصفحة القياسي</div>
              <div className={styles.statHint}>Next.js 16 + Vercel Edge</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Capabilities Showcase */}
      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Zap size={14} />
            <span>استعراض الميزات والقدرات التفاعلية</span>
          </div>
          <h2 className={styles.sectionTitle}>
            أبرز المزايا والقدرات الرقمية للمنصة
          </h2>
          <p className={styles.sectionSubtitle}>
            استكشف المزايا الحصرية التي تجعل من موقع سويس بلو منصة مبيعات ذكية وأداة تشغيلية قوية لخدمة النزلاء وتنمية إيرادات الفنادق.
          </p>
        </div>

        <OverviewInteractive locale="ar" />
      </section>

      {/* Real Portfolio Showcase Grid with Website Visuals */}
      <section style={{ background: "#f0f6ff", borderTop: "1px solid #e0edff", borderBottom: "1px solid #e0edff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <Building2 size={14} />
              <span>محفظة سويس بلو المتنامية</span>
            </div>
            <h2 className={styles.sectionTitle}>
              محفظة موحدة تجمع الفنادق والشقق الفندقية
            </h2>
            <p className={styles.sectionSubtitle}>
              تصميم وبنية موحدة تعرض كافة المنشآت بدقة وفخامة، مع معارض صور عالية الجودة وتصنيف للوحدات والخدمات.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((hotel) => (
              <div
                key={hotel.slug}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#2b6fe8]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 start-3">
                    <span className="rounded-full bg-[#1246a8]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {hotel.city}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2b6fe8]">
                    <span>{hotel.type}</span>
                    <span>{hotel.units}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-[#111827]">{hotel.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {hotel.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Core Platform Pillars */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <Layers size={14} />
              <span>المنظومة السداسية المتكاملة</span>
            </div>
            <h2 className={styles.sectionTitle}>
              ركائز القوة الست في تجربة سويس بلو الرقمية
            </h2>
            <p className={styles.sectionSubtitle}>
              بنية متناغمة تغطي كافة جوانب التسويق الفندقي، خدمة العملاء، إدارة الحجوزات، والربط المؤسسي.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Bot size={26} />
              </div>
              <h3 className={styles.pillarTitle}>المرشد الذكي الفندقي (سارة)</h3>
              <p className={styles.pillarDesc}>
                مساعد محادثة فندقي مدعوم بالذكاء الاصطناعي، يوجه الضيوف لاختيار الغرفة الأنسب، يوضح وسائل الراحة، ويجمع بيانات الحجز وفرص المبيعات فورياً.
              </p>
              <div className={styles.pillarBadge}>دعم عربي/إنجليزي فوري 24/7</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <TrendingUp size={26} />
              </div>
              <h3 className={styles.pillarTitle}>محرك حجز مباشر عالي التحويل</h3>
              <p className={styles.pillarDesc}>
                تجربة حجز مبسطة في خطوتين مع تقويم تواريخ متقدم، دعم للأكواد الترويجية، وربط مباشر مع محركات الـ PMS لتقليل الاعتماد على عمولات الوسطاء.
              </p>
              <div className={styles.pillarBadge}>توفير حتى 20% في العمولات</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Languages size={26} />
              </div>
              <h3 className={styles.pillarTitle}>هوية ثنائية وتناغم ثقافي</h3>
              <p className={styles.pillarDesc}>
                تصميم متقن يدعم الخطوط العربية الفاخرة وتوجيه الـ RTL الأصيل، يمنح النزيل المحلي والدولي تجربة راقية تعكس الضيافة السعودية الحديثة.
              </p>
              <div className={styles.pillarBadge}>100% تطابق وتناغم بصري</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Sliders size={26} />
              </div>
              <h3 className={styles.pillarTitle}>إدارة محتوى سحابية فورية (Sanity)</h3>
              <p className={styles.pillarDesc}>
                لوحة تحكم مرنة تتيح لفريق التسويق إطلاق العروض الموسمية، تعديل الأسعار، وتحديث شارات الخدمات (مثل "قريباً") في ثوانٍ بدون تدخل تقني.
              </p>
              <div className={styles.pillarBadge}>تحديث فوري بدون توقف</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Briefcase size={26} />
              </div>
              <h3 className={styles.pillarTitle}>بوابة عقود الشركات ومجموعات العمل</h3>
              <p className={styles.pillarDesc}>
                قنوات مخصصة لاستقبال طلبات الشركات والجهات الحكومية وحجوزات الوفود والمناسبات، مع توجيه آلي لفرق المبيعات لإغلاق الصفقات.
              </p>
              <div className={styles.pillarBadge}>مسار مبيعات B2B آلي</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <BarChart3 size={26} />
              </div>
              <h3 className={styles.pillarTitle}>أرشفة Google SEO وتحليلات GA4</h3>
              <p className={styles.pillarDesc}>
                بيانات هيكلية Schema JSON-LD متوافقة مع محركات البحث لصدارة نتائج Google، مع تتبع دقيق لسلوك النزلاء ومعدلات التحويل عبر GA4.
              </p>
              <div className={styles.pillarBadge}>صدارة محركات البحث</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Advantage Matrix */}
      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Award size={14} />
            <span>مصفوفة القيمة المضافة</span>
          </div>
          <h2 className={styles.sectionTitle}>
            كيف تصنع المنصة فارقاً استراتيجياً لكل طرف؟
          </h2>
          <p className={styles.sectionSubtitle}>
            عائد استثماري واضح وتجربة رقمية استثنائية لملاك الفنادق، الشركات، والنزلاء على حد سواء.
          </p>
        </div>

        <div className={styles.matrixWrapper}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th style={{ width: "22%" }}>الفئة المستفيدة</th>
                <th style={{ width: "38%" }}>أهم التحديات التقليدية</th>
                <th style={{ width: "40%" }}>الحل الاستراتيجي في منصة سويس بلو</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Building2 size={16} />
                    <span>ملاك الفنادق والمستثمرون</span>
                  </div>
                </td>
                <td>
                  نزيف العمولات المرتفعة لمنصات الـ OTA (15-20%)، صعوبة تحديث الأسعار والعروض، وفقدان بيانات العملاء المباشرة.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  تحويل 35%+ من الحجوزات إلى القناة المباشرة، إدارة محتوى فورية من Sanity، وامتلاك قاعدة بيانات ولاء متكاملة.
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Briefcase size={16} />
                    <span>الشركات والجهات الحكومية</span>
                  </div>
                </td>
                <td>
                  بطء معالجة طلبات الإقامات الطويلة، غياب الشفافية في الأسعار المؤسسية، وصعوبة تنسيق حجوزات الوفود.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  بوابة B2B مخصصة لاستقبال العقود وتوفير أسعار تفضيلية فورية، مع متابعة مركزية عبر فريق المبيعات والمساعد الذكي.
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Users size={16} />
                    <span>النزلاء والمسافرون</span>
                  </div>
                </td>
                <td>
                  مواقع بطيئة، ترجمات آلية ركيكة، صعوبة المقارنة بين الشقق الفندقية والغرف، وعدم توفر ردود فورية خارج أوقات العمل.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  تصفح فائق السرعة في أقل من ثانية، مساعد ذكي يجيب على مدار الساعة، ومقارنة واضحة لجميع وحدات الإقامة.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Architecture Specs */}
      <section style={{ background: "#09204e", color: "#ffffff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div className={styles.sectionHeader} style={{ color: "#ffffff" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#93c5fd",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "0.25rem 0.875rem",
                borderRadius: "9999px",
                marginBottom: "0.875rem",
              }}
            >
              <ShieldCheck size={14} />
              <span>المواصفات والمعايير التقنية</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: "0.875rem" }}>
              بنية سحابية مبنية بأحدث معايير الويب العالمية
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.0625rem" }}>
              تقنيات متقدمة تضمن أعلى درجات الأمان، التوفر السحابي، والتكامل السلس مع أنظمة الضيافة.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Next.js 16 App Router
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                محرك عرض فائق الحداثة مع Turbopack يضمن تحميلاً فورياً وتجاوباً مثالياً على كافة المتصفحات.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Vercel Global Edge Network
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                توزيع جغرافي ذكي يضمن استجابة فائقة السرعة للزوار في المملكة ودول الخليج وحول العالم.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Sanity Studio v3 (Headless)
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                إدارة محتوى مرنة بدون خادم تضمن أمان البيانات وتحديث العروض فورياً دون إعادة نشر الكود.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                ERP & PMS Integration Ready
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                جاهزية كاملة للربط مع أنظمة إدارة الفنادق eZee Absolute وبرامج التخطيط المالي Odoo ERP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section style={{ background: "linear-gradient(135deg, #1246a8 0%, #1e5fd1 100%)", color: "#ffffff", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.8125rem",
              fontWeight: 700,
              background: "rgba(255, 255, 255, 0.15)",
              padding: "0.35rem 0.875rem",
              borderRadius: "9999px",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={14} />
            <span>خطوتك القادمة نحو الريادة الرقمية</span>
          </span>

          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
            جاهز لترقية حضور منشأتك وتحقيق أعلى معدلات حجز مباشر؟
          </h2>

          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            تواصل معنا اليوم لاستعراض حي للمنصة والاطلاع على كيفية تطبيق هذه الحلول المتقدمة لخدمة أهدافك الفندقية والاستثمارية.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <OpenModalButton
              locale="ar"
              label="طلب استشارة وعرض تجريبي"
              interest="استشارة فندقية رقمية"
              variant="primary"
            />
            <PrintDeckButton locale="ar" label="طباعة أو تصدير ملف العرض" variant="hero" />
          </div>
        </div>
      </section>

      {/* Presentation Footer */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div className="flex items-center gap-3">
              {logo ? (
                <Image
                  src={logo}
                  alt="فنادق سويس بلو للضيافة"
                  width={140}
                  height={45}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="font-bold text-lg text-[#1246a8]">سويس بلو</span>
              )}
              <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                | العرض التسويقي لمنظومة الضيافة الرقمية
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
              <Link href="/ar" className="text-[#1246a8] hover:underline flex items-center gap-1">
                <span>زيارة الموقع الرسمي</span>
                <ArrowLeft size={14} />
              </Link>
              <Link href="/ar/contact" className="text-[#4b5563] hover:text-[#1246a8]">
                اتصل بنا
              </Link>
              <Link href="/ar/corporate-deals" className="text-[#4b5563] hover:text-[#1246a8]">
                تعاقدات الشركات
              </Link>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "#94a3b8" }}>
            <p>© {new Date().getFullYear()} فنادق وشقق سويس بلو للضيافة. جميع الحقوق محفوظة.</p>
            <p>المملكة العربية السعودية • جدة • الرياض • جازان</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
