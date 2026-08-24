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
  ArrowRight,
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

export const metadata: Metadata = {
  title: "Saudi Hospitality Web Platform | Swiss Blue Hospitality",
  description:
    "Explore the strategic capabilities of the Saudi Hospitality Web platform: 24/7 AI Concierge, direct booking engine, bilingual parity, and real-time headless CMS.",
  alternates: {
    canonical: "https://dubaiincairo.com/en/saudihospitalityweb",
    languages: {
      ar: "https://dubaiincairo.com/saudihospitalityweb",
      en: "https://dubaiincairo.com/en/saudihospitalityweb",
    },
  },
};

export default async function SaudiHospitalityEnglishPage() {
  const { en } = await getEditableContent();
  const logo = usableLogo(en.media.logo);
  const heroBg = en.media.mainHero || heroImage;
  const properties = en.homepage.properties.items;

  return (
    <div className={styles.overviewContainer} dir="ltr" lang="en">
      {/* Presentation Top Header */}
      <header className={styles.topHeader}>
        <div className={styles.topHeaderInner}>
          <div className="flex items-center gap-4">
            <Link href="/en" className={styles.brandLink} title="Back to Swiss Blue Main Site">
              {logo ? (
                <Image
                  src={logo}
                  alt="Swiss Blue Hospitality"
                  width={150}
                  height={50}
                  className="h-9 w-auto object-contain"
                  priority
                />
              ) : (
                <span className="font-extrabold text-xl text-[#1246a8]">Swiss Blue</span>
              )}
            </Link>
            <span className={styles.brandBadge}>
              <Sparkles size={12} />
              <span>Saudi Hospitality Web</span>
            </span>
          </div>

          <div className={styles.headerActions}>
            <Link
              href="/saudihospitalityweb"
              className={styles.langSwitch}
              title="التبديل إلى النسخة العربية"
            >
              العربية
            </Link>

            <Link
              href="/saudihospitalityweb/admin"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-full transition-all"
              title="Admin Dashboard"
            >
              <Settings size={13} />
              <span>Admin Panel</span>
            </Link>

            <PrintDeckButton locale="en" />

            <OpenModalButton
              locale="en"
              label="Request Demo"
              interest="Platform Live Demo"
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
            <span>Next-Generation Saudi Hospitality Ecosystem</span>
          </div>

          <h1 className={styles.heroTitle}>
            The Intelligent Digital Platform for Modern Saudi Hospitality
          </h1>

          <p className={styles.heroSubtitle}>
            A high-converting digital powerhouse reflecting Swiss Blue&apos;s luxury art direction,
            blending 24/7 AI Concierge intelligence, frictionless direct booking, and authentic bilingual resonance across Jeddah, Riyadh, and Jazan.
          </p>

          <div className={styles.heroCtas}>
            <OpenModalButton
              locale="en"
              label="Schedule a Live Demo"
              interest="Platform Demo Request"
              variant="primary"
            />
            <PrintDeckButton locale="en" label="Export Deck (PDF)" variant="hero" />
            <Link
              href="/en"
              className={styles.heroSecondaryBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={17} />
              <span>Preview Live Website</span>
            </Link>
          </div>

          {/* Key Metric Counters */}
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>&lt; 2s</div>
              <div className={styles.statLabel}>AI Concierge Speed</div>
              <div className={styles.statHint}>Instant 24/7 guest answers</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>0%</div>
              <div className={styles.statLabel}>Direct Channel Fees</div>
              <div className={styles.statHint}>Save up to 18% vs OTAs</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>6</div>
              <div className={styles.statLabel}>Integrated Properties</div>
              <div className={styles.statHint}>Jeddah • Riyadh • Jazan</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statNumber}>0.8s</div>
              <div className={styles.statLabel}>Average Page Load Speed</div>
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
            <span>Interactive Feature Demonstrations</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Key Platform Highlights & Capabilities
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore the flagship features driving guest satisfaction, operational agility, and high-margin direct revenue for hotel owners.
          </p>
        </div>

        <OverviewInteractive locale="en" />
      </section>

      {/* Real Portfolio Showcase Grid with Website Visuals */}
      <section style={{ background: "#f0f6ff", borderTop: "1px solid #e0edff", borderBottom: "1px solid #e0edff", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>
              <Building2 size={14} />
              <span>Expanding Portfolio</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Unified Multi-Property Showcase
            </h2>
            <p className={styles.sectionSubtitle}>
              Consistent luxury branding showcasing city hotels and serviced apartments with detailed room breakdowns and amenity categories.
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
              <span>Six Architectural Pillars</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Engineered for Direct Hospitality Growth
            </h2>
            <p className={styles.sectionSubtitle}>
              A synchronized digital infrastructure uniting marketing, booking operations, customer support, and enterprise sales.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Bot size={26} />
              </div>
              <h3 className={styles.pillarTitle}>24/7 AI Concierge (Sarah)</h3>
              <p className={styles.pillarDesc}>
                Native conversational AI assistant answering property queries, recommending suites, and automatically qualifying guest and B2B leads.
              </p>
              <div className={styles.pillarBadge}>Instant AR & EN Support</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <TrendingUp size={26} />
              </div>
              <h3 className={styles.pillarTitle}>High-Conversion Direct Booking</h3>
              <p className={styles.pillarDesc}>
                Streamlined 2-step reservation flow with dynamic calendar, promo code engine, and deep integration with hotel PMS systems.
              </p>
              <div className={styles.pillarBadge}>Cut OTA Commissions</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Languages size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Bilingual RTL/LTR Parity</h3>
              <p className={styles.pillarDesc}>
                Bespoke typography (Noto Kufi / Cairo & Geist) and flawless mirrored layouts ensuring cultural resonance for GCC and international guests.
              </p>
              <div className={styles.pillarBadge}>100% Visual Symmetry</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Sliders size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Real-Time Headless CMS (Sanity)</h3>
              <p className={styles.pillarDesc}>
                Agile singleton studio allowing marketing teams to update seasonal rates, badges (e.g. &apos;Soon&apos;), and banners instantly without code deployments.
              </p>
              <div className={styles.pillarBadge}>Zero-Downtime Agility</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <Briefcase size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Corporate B2B & Group Funnels</h3>
              <p className={styles.pillarDesc}>
                Dedicated RFQ ingestion pipelines for corporate accounts, government delegations, long-term contractor stays, and event bookings.
              </p>
              <div className={styles.pillarBadge}>Automated Inquiries</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarIconWrap}>
                <BarChart3 size={26} />
              </div>
              <h3 className={styles.pillarTitle}>Google Schema SEO & GA4</h3>
              <p className={styles.pillarDesc}>
                Structured JSON-LD schema (Hotel, LodgingBusiness, FAQPage) for Google Rich Snippets, coupled with GA4 conversion telemetry.
              </p>
              <div className={styles.pillarBadge}>Search Dominance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholder Advantage Matrix */}
      <section className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <Award size={14} />
            <span>Value Creation Matrix</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Strategic Advantages Across Key Stakeholders
          </h2>
          <p className={styles.sectionSubtitle}>
            How the Swiss Blue digital ecosystem solves core friction points for hotel owners, enterprise partners, and guests.
          </p>
        </div>

        <div className={styles.matrixWrapper}>
          <table className={styles.matrixTable}>
            <thead>
              <tr>
                <th style={{ width: "22%" }}>Stakeholder</th>
                <th style={{ width: "38%" }}>Traditional Friction Points</th>
                <th style={{ width: "40%" }}>Swiss Blue Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Building2 size={16} />
                    <span>Hotel Owners & Investors</span>
                  </div>
                </td>
                <td>
                  High OTA commission bleed (15-20%), lack of direct guest relationships, and slow manual website updates.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  Captures 35%+ direct revenue, offers instant Sanity CMS promotional agility, and builds persistent brand loyalty.
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Briefcase size={16} />
                    <span>Corporate & Government Accounts</span>
                  </div>
                </td>
                <td>
                  Clunky booking processes for long-term project teams, delayed RFP quotes, and disjointed group invoicing.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  Dedicated B2B contract portal with preferential tier discounts, rapid response workflows, and dedicated accounts.
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.matrixRoleBadge}>
                    <Users size={16} />
                    <span>Guests & Extended Travelers</span>
                  </div>
                </td>
                <td>
                  Slow mobile websites, awkward machine translations, and unanswered inquiries during off-hours.
                </td>
                <td style={{ color: "#0f172a", fontWeight: 600 }}>
                  Sub-second loading, authentic cultural tone of voice, clear serviced apartment unit previews, and 24/7 AI guidance.
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
              <span>Enterprise Technical Standards</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", fontWeight: 800, marginBottom: "0.875rem" }}>
              Engineered with Modern Web & Cloud Best Practices
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.82)", fontSize: "1.0625rem" }}>
              High-performance, secure, and ready for seamless integration with hotel hospitality software.
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
                Cutting-edge React server components and Turbopack compiler delivering frictionless transitions.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Vercel Global Edge Network
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                Ultra-low latency edge CDN serving regional GCC and worldwide travelers within milliseconds.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                Sanity Studio v3 (Headless)
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                Structured headless content management with live previews, media asset pipelines, and AI copy assistance.
              </p>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "1.25rem", padding: "1.75rem" }}>
              <div style={{ color: "#60a5fa", fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                ERP & PMS Connector Suite
              </div>
              <p style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.6 }}>
                Engineered for synchronization with eZee Absolute PMS and Odoo 19 Enterprise financial suites.
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
            <span>Accelerate Your Digital Presence</span>
          </span>

          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
            Ready to Experience the Platform in Action?
          </h2>

          <p style={{ fontSize: "1.1rem", color: "rgba(255, 255, 255, 0.9)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Connect with our team to arrange a live platform walkthrough and explore how Swiss Blue&apos;s digital architecture drives superior direct booking conversion.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <OpenModalButton
              locale="en"
              label="Request Live Demo"
              interest="Platform Demo Request"
              variant="primary"
            />
            <PrintDeckButton locale="en" label="Export Presentation Deck" variant="hero" />
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
                  alt="Swiss Blue Hospitality"
                  width={140}
                  height={45}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="font-bold text-lg text-[#1246a8]">Swiss Blue</span>
              )}
              <span style={{ fontSize: "0.8125rem", color: "#64748b" }}>
                | Saudi Hospitality Web Platform
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontSize: "0.875rem", fontWeight: 600 }}>
              <Link href="/en" className="text-[#1246a8] hover:underline flex items-center gap-1">
                <span>Visit Main Website</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/saudihospitalityweb/admin" className="text-[#4b5563] hover:text-[#1246a8] flex items-center gap-1">
                <Settings size={14} />
                <span>Admin Panel</span>
              </Link>
              <Link href="/en/contact" className="text-[#4b5563] hover:text-[#1246a8]">
                Contact Us
              </Link>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", fontSize: "0.75rem", color: "#94a3b8" }}>
            <p>© {new Date().getFullYear()} Saudi Hospitality Web • Swiss Blue Hospitality. All rights reserved.</p>
            <p>Kingdom of Saudi Arabia • Riyadh • Jeddah • Jazan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
