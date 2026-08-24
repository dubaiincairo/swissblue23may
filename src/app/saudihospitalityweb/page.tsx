import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2,
  Zap,
  Sparkles,
  ShieldCheck,
  Award,
  ExternalLink,
  ArrowLeft,
  Layers,
  Settings,
} from "lucide-react";
import {
  OverviewInteractive,
  PrintDeckButton,
  OpenModalButton,
} from "@/components/product-overview/overview-interactive";
import styles from "@/components/product-overview/overview.module.css";
import { usableLogo, getEditableContent } from "@/lib/editable-content";
import { heroImage } from "@/lib/content";
import { getSaudiHospitalityStore } from "@/lib/saudihospitalityweb-content";

export const metadata: Metadata = {
  title: "منظومة الضيافة الرقمية | Saudi Hospitality Web Platform",
  description:
    "استعراض شامل لمزايا وقدرات المنصة الرقمية للضيافة الفندقية: المساعد الذكي الفندقي، محرك الحجز المباشر، الهوية الثنائية، وإدارة المحتوى الفورية.",
  alternates: {
    canonical: "https://dubaiincairo.com/saudihospitalityweb",
    languages: {
      ar: "https://dubaiincairo.com/saudihospitalityweb",
      en: "https://dubaiincairo.com/en/saudihospitalityweb",
    },
  },
};

export default async function SaudiHospitalityArabicPage() {
  const { ar, en } = await getEditableContent();
  const showcaseStore = await getSaudiHospitalityStore();
  const content = showcaseStore.ar;
  const logo = usableLogo(ar.media.arabicLogo) || usableLogo(en.media.logo);
  const heroBg = content.hero.heroImage || ar.media.mainHero || heroImage;
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
              <span>Saudi Hospitality Web</span>
            </span>
          </div>

          <div className={styles.headerActions}>
            <Link
              href="/en/saudihospitalityweb"
              className={styles.langSwitch}
              title="Switch to English Deck"
            >
              English
            </Link>

            <Link
              href="/saudihospitalityweb/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-full transition-all"
              title="لوحة تحكم المنظومة"
            >
              <Settings size={13} />
              <span>لوحة التحكم</span>
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
            alt="Swiss Blue Hospitality Atmosphere"
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
            <span>{content.hero.badge}</span>
          </div>

          <h1 className={styles.heroTitle}>{content.hero.title}</h1>

          <p className={styles.heroSubtitle}>{content.hero.subtitle}</p>

          <div className={styles.heroCtas}>
            <OpenModalButton
              locale="ar"
              label={content.hero.primaryCta}
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
              <span>{content.hero.livePreviewCta}</span>
            </Link>
          </div>

          {/* Key Metric Counters */}
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>{content.metrics.aiSpeed.val}</div>
              <div className={styles.statLabel}>{content.metrics.aiSpeed.label}</div>
              <div className={styles.statHint}>{content.metrics.aiSpeed.hint}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>{content.metrics.directFee.val}</div>
              <div className={styles.statLabel}>{content.metrics.directFee.label}</div>
              <div className={styles.statHint}>{content.metrics.directFee.hint}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>{content.metrics.propertiesCount.val}</div>
              <div className={styles.statLabel}>{content.metrics.propertiesCount.label}</div>
              <div className={styles.statHint}>{content.metrics.propertiesCount.hint}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>{content.metrics.pageSpeed.val}</div>
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

        <OverviewInteractive locale="ar" content={content} />
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
            <div className={styles.sectionBadge}><Layers size={14} /><span>{content.pillars.badge}</span></div>
            <h2 className={styles.sectionTitle}>{content.pillars.title}</h2>
            <p className={styles.sectionSubtitle}>{content.pillars.subtitle}</p>
          </div>
          <div className={styles.pillarGrid}>
            {content.pillars.items.map((pillar) => (
              <div className={styles.pillarCard} key={pillar.title}>
                <div className={styles.pillarIconWrap}><Layers size={26} /></div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
                <div className={styles.pillarBadge}>{pillar.badge}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholder Advantage Matrix */}
      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}><Award size={14} /><span>{content.advantageMatrix.badge}</span></div>
          <h2 className={styles.sectionTitle}>{content.advantageMatrix.title}</h2>
          <p className={styles.sectionSubtitle}>{content.advantageMatrix.subtitle}</p>
        </div>
        <div className={styles.matrixWrapper}>
          <table className={styles.matrixTable}>
            <thead><tr><th>{content.advantageMatrix.headers.role}</th><th>{content.advantageMatrix.headers.problem}</th><th>{content.advantageMatrix.headers.solution}</th></tr></thead>
            <tbody>
              {content.advantageMatrix.rows.map((row) => (
                <tr key={row.role}>
                  <td><div className={styles.matrixRoleBadge}><Building2 size={16} /><span>{row.role}</span></div></td>
                  <td>{row.problem}</td>
                  <td style={{ color: "#0f172a", fontWeight: 600 }}>{row.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical Architecture Specs */}
      <section style={{ background: "#09204e", color: "#ffffff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div className={styles.sectionHeader} style={{ color: "#ffffff" }}>
            <div className={styles.sectionBadge}><ShieldCheck size={14} /><span>{content.techSpecs.badge}</span></div>
            <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: "0.875rem" }}>{content.techSpecs.title}</h2>
            <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.0625rem" }}>{content.techSpecs.subtitle}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {content.techSpecs.specs.map((spec) => (
              <div key={spec.title} style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
                <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>{spec.title}</div>
                <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section style={{ background: "linear-gradient(135deg, #1246a8 0%, #1e5fd1 100%)", color: "#ffffff", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
          <span className={styles.sectionBadge}><Sparkles size={14} /><span>{content.ctaFooter.badge}</span></span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, margin: "1.25rem 0 1rem" }}>{content.ctaFooter.title}</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: "2.5rem", lineHeight: 1.7 }}>{content.ctaFooter.subtitle}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <OpenModalButton locale="ar" label={content.ctaFooter.primaryCta} interest={content.ctaFooter.title} variant="primary" />
            <PrintDeckButton locale="ar" label={content.ctaFooter.secondaryCta} variant="hero" />
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
                | Saudi Hospitality Web Platform
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
              <Link href="/ar" className="text-[#1246a8] hover:underline flex items-center gap-1">
                <span>زيارة الموقع الرسمي</span>
                <ArrowLeft size={14} />
              </Link>
              <Link href="/saudihospitalityweb/admin" className="text-[#4b5563] hover:text-[#1246a8] flex items-center gap-1">
                <Settings size={14} />
                <span>لوحة التحكم</span>
              </Link>
              <Link href="/ar/contact" className="text-[#4b5563] hover:text-[#1246a8]">
                اتصل بنا
              </Link>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "#94a3b8" }}>
            <p>© {new Date().getFullYear()} Saudi Hospitality Web • سويس بلو للضيافة. جميع الحقوق محفوظة.</p>
            <p>المملكة العربية السعودية • الرياض • جدة • جازان</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
