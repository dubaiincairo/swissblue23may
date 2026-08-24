"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Download,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Trash2,
  Save,
  Globe2,
  Calendar,
  Layers,
  Bot,
  TrendingUp,
  Languages,
  Sliders,
  Building2,
  Zap,
  Award,
  ShieldCheck,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
} from "lucide-react";
import {
  BilingualSaudiHospitalityStore,
  InboundLead,
  SaudiHospitalityContent,
  initialSaudiHospitalityContent,
  sampleInitialLeads,
} from "@/lib/saudihospitalityweb-store";

type AdminLang = "ar" | "en";

interface NavSection {
  id: string;
  group: string;
  labelAr: string;
  labelEn: string;
  descAr: string;
  descEn: string;
}

const SECTIONS: NavSection[] = [
  {
    id: "hero",
    group: "Homepage & Pitch",
    labelAr: "البانر الرئيسي والقيمة الاستراتيجية",
    labelEn: "Hero & Strategic Value",
    descAr: "عناوين الهيدر، الوصف الترحيبي، أزرار الدعوة للإجراء، وصورة الخلفية.",
    descEn: "Main hero headline, subtitle description, CTA action buttons, and hero image.",
  },
  {
    id: "metrics",
    group: "Homepage & Pitch",
    labelAr: "بطاقات المؤشرات القياسية الأربع",
    labelEn: "Key Metric Counters",
    descAr: "أرقام وتفاصيل الإحصاءات الأربع في واجهة العرض.",
    descEn: "Highlight numbers, labels, and hint badges in the top showcase.",
  },
  {
    id: "pillars",
    group: "Homepage & Pitch",
    labelAr: "الركائز الست للمنظومة",
    labelEn: "Six Strategic Pillars",
    descAr: "الركائز الهيكلية الست التي تميز تجربة سويس بلو الرقمية.",
    descEn: "Six architectural pillars powering the digital hospitality ecosystem.",
  },
  {
    id: "advantageMatrix",
    group: "Homepage & Pitch",
    labelAr: "مصفوفة القيمة والمزايا للشركاء",
    labelEn: "Stakeholder Advantage Matrix",
    descAr: "مقارنة التحديات التقليدية والحلول لملاك الفنادق، الشركات، والنزلاء.",
    descEn: "Value matrix comparing traditional friction points with platform solutions.",
  },
  {
    id: "aiConcierge",
    group: "Interactive Capabilities",
    labelAr: "المرشد الذكي الفندقي (سارة)",
    labelEn: "24/7 AI Concierge (Sarah)",
    descAr: "نصوص المساعد، الرصاصات التعريفية، وأسئلة وردود المحاكي التفاعلي.",
    descEn: "AI assistant copy, capability bullets, and interactive prompt chips & replies.",
  },
  {
    id: "roiCalculator",
    group: "Interactive Capabilities",
    labelAr: "حاسبة العائد المالي والتوفير",
    labelEn: "Direct Booking ROI Calculator",
    descAr: "إعدادات شرائح الغرف، ADR، نسبة عمولة الـ OTA، ونسبة الحجز المباشر.",
    descEn: "Configure default room counts, ADR, OTA commission rates, and direct capture share.",
  },
  {
    id: "bilingualParity",
    group: "Interactive Capabilities",
    labelAr: "الهوية والتناغم الثقافي (عربي/إنجليزي)",
    labelEn: "Bilingual RTL/LTR Parity",
    descAr: "نصوص ميزة التناغم اللغوي والبطاقات التوضيحية المزدوجة.",
    descEn: "Bilingual parity headlines, bullets, and side-by-side card previews.",
  },
  {
    id: "headlessCms",
    group: "Interactive Capabilities",
    labelAr: "إدارة المحتوى الفورية (Sanity)",
    labelEn: "Real-Time Headless CMS",
    descAr: "نصوص وقدرات لوحة التحكم، ونموذج شارة الخدمات الترويجية.",
    descEn: "Headless CMS agility copy, promo alert samples, and amenity badge preview.",
  },
  {
    id: "performanceSeo",
    group: "Interactive Capabilities",
    labelAr: "السرعة السحابية وتصدر Google",
    labelEn: "Cloud Speed & Google SEO",
    descAr: "مؤشرات سرعة LCP وCLS ونصوص الأرشفة والتحليلات GA4.",
    descEn: "Core Web Vitals telemetry, schema SEO copy, and GA4 tracking overview.",
  },
  {
    id: "propertiesSection",
    group: "Portfolio & Tech",
    labelAr: "محفظة الفنادق والشقق المعروضة",
    labelEn: "Property Portfolio Grid",
    descAr: "تفاصيل وبيانات المنشآت الست وصورها والمدن وعدد الوحدات.",
    descEn: "Portfolio details for all 6 hotels and serviced apartments with unit counts.",
  },
  {
    id: "techSpecs",
    group: "Portfolio & Tech",
    labelAr: "البنية السحابية والمواصفات",
    labelEn: "Enterprise Cloud Architecture",
    descAr: "المعايير التقنية (Next.js 16, Vercel Edge, Sanity, ERP/PMS).",
    descEn: "Enterprise technical specs covering Next.js 16, Edge CDN, and ERP connectors.",
  },
  {
    id: "ctaFooter",
    group: "Portfolio & Tech",
    labelAr: "الدعوة الختامية والفوتر",
    labelEn: "Closing CTA & Footer",
    descAr: "نصوص بانر الاتصال النهائي وحقوق النشر والتذييل.",
    descEn: "Final CTA pitch banner, action labels, and copyright footer tags.",
  },
  {
    id: "leads",
    group: "CRM & Leads",
    labelAr: "إدارة طلبات الشركاء والعملاء (CRM)",
    labelEn: "Inbound Leads & Partner CRM",
    descAr: "متابعة الطلبات، تحديث الحالات، المراسلة الفورية عبر واتساب، وتصدير CSV.",
    descEn: "Manage prospective leads, update status, message via WhatsApp, and export CSV.",
  },
];

const GROUP_ORDER = [
  "Homepage & Pitch",
  "Interactive Capabilities",
  "Portfolio & Tech",
  "CRM & Leads",
];

const GROUP_LABELS: Record<string, { ar: string; en: string }> = {
  "Homepage & Pitch": { ar: "الصفحة الرئيسية والعرض", en: "Homepage & Pitch" },
  "Interactive Capabilities": { ar: "القدرات والمحاكيات التفاعلية", en: "Interactive Capabilities" },
  "Portfolio & Tech": { ar: "المحفظة والمواصفات التقنية", en: "Portfolio & Technical Specs" },
  "CRM & Leads": { ar: "العملاء والشركاء", en: "CRM & Inbound Leads" },
};

const LANGUAGE_FADE_OUT_MS = 120;
const LANGUAGE_FADE_IN_MS = 260;

export default function SaudiHospitalityAdminDashboard() {
  const [lang, setLang] = useState<AdminLang>("ar");
  const [selectedSectionId, setSelectedSectionId] = useState<string>("hero");
  const [query, setQuery] = useState<string>("");
  const [store, setStore] = useState<BilingualSaudiHospitalityStore>(initialSaudiHospitalityContent);
  const [leads, setLeads] = useState<InboundLead[]>(sampleInitialLeads);
  const [statusTone, setStatusTone] = useState<"ready" | "dirty" | "saving" | "saved">("ready");
  const [searchLeadQuery, setSearchLeadQuery] = useState<string>("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>("all");
  const [isManualLeadOpen, setIsManualLeadOpen] = useState<boolean>(false);
  const [manualLead, setManualLead] = useState({ name: "", company: "", email: "", phone: "", interest: "عرض المنصة للشركاء", notes: "" });

  // Animation states
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(GROUP_ORDER));
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState<boolean>(false);
  const [languageMotion, setLanguageMotion] = useState<"idle" | "out" | "in">("idle");
  const [pendingLanguage, setPendingLanguage] = useState<AdminLang | null>(null);
  const languageSwitchTimers = useRef<number[]>([]);

  const isAr = lang === "ar";
  const activeContent = store[lang];
  const isLanguageSwitching = languageMotion !== "idle";

  // Load store and leads from localStorage on mount
  useEffect(() => {
    try {
      const savedStore = localStorage.getItem("shw_full_store");
      if (savedStore) {
        setStore(JSON.parse(savedStore));
      }
      const savedLeads = localStorage.getItem("shw_leads");
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    } catch {}
  }, []);

  // Language switch timers cleanup
  useEffect(() => {
    return () => {
      languageSwitchTimers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Save shortcut (Ctrl+S / Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveChanges();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  // Animated language switch matching Swiss Blue main admin panel
  const switchLanguage = (nextLang: AdminLang) => {
    if (nextLang === lang || isLanguageSwitching) return;

    languageSwitchTimers.current.forEach((t) => window.clearTimeout(t));
    languageSwitchTimers.current = [];
    setPendingLanguage(nextLang);

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLang(nextLang);
      setPendingLanguage(null);
      return;
    }

    setLanguageMotion("out");
    languageSwitchTimers.current.push(
      window.setTimeout(() => {
        setLang(nextLang);
        setLanguageMotion("in");
        languageSwitchTimers.current.push(
          window.setTimeout(() => {
            setLanguageMotion("idle");
            setPendingLanguage(null);
          }, LANGUAGE_FADE_IN_MS),
        );
      }, LANGUAGE_FADE_OUT_MS),
    );
  };

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const saveChanges = () => {
    setStatusTone("saving");
    try {
      localStorage.setItem("shw_full_store", JSON.stringify(store));
      localStorage.setItem("shw_leads", JSON.stringify(leads));
      setTimeout(() => {
        setStatusTone("saved");
        setTimeout(() => setStatusTone("ready"), 2500);
      }, 400);
    } catch {
      setStatusTone("dirty");
    }
  };

  const updateSectionField = <K extends keyof SaudiHospitalityContent>(
    section: K,
    field: keyof SaudiHospitalityContent[K],
    value: any,
  ) => {
    setStore((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [section]: {
          ...prev[lang][section],
          [field]: value,
        },
      },
    }));
    setStatusTone("dirty");
  };

  const updateLeadStatus = (id: string, newStatus: InboundLead["status"]) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    try {
      localStorage.setItem("shw_leads", JSON.stringify(updated));
    } catch {}
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InboundLead = {
      id: `lead-${Date.now()}`,
      name: manualLead.name,
      company: manualLead.company,
      email: manualLead.email,
      phone: manualLead.phone,
      interest: manualLead.interest,
      source: "/saudihospitalityweb/admin",
      status: "new",
      notes: manualLead.notes,
      createdAt: new Date().toISOString(),
    };
    const updated = [created, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem("shw_leads", JSON.stringify(updated));
    } catch {}
    setIsManualLeadOpen(false);
    setManualLead({ name: "", company: "", email: "", phone: "", interest: "عرض المنصة للشركاء", notes: "" });
  };

  const exportLeadsCSV = () => {
    const headers = ["ID", "Name", "Company", "Email", "Phone", "Interest", "Status", "Date", "Notes"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.company}"`,
      l.email,
      l.phone,
      `"${l.interest}"`,
      l.status,
      l.createdAt,
      `"${l.notes || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `saudi-hospitality-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(
      (s) =>
        s.labelAr.toLowerCase().includes(q) ||
        s.labelEn.toLowerCase().includes(q) ||
        s.descAr.toLowerCase().includes(q) ||
        s.descEn.toLowerCase().includes(q),
    );
  }, [query]);

  const groupedSections = useMemo(() => {
    return filteredSections.reduce<Record<string, NavSection[]>>((acc, sec) => {
      acc[sec.group] = [...(acc[sec.group] ?? []), sec];
      return acc;
    }, {});
  }, [filteredSections]);

  const selectedSection = SECTIONS.find((s) => s.id === selectedSectionId) ?? SECTIONS[0];

  const filteredLeads = leads.filter((l) => {
    const matchQ =
      l.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      l.phone.includes(searchLeadQuery) ||
      l.email.toLowerCase().includes(searchLeadQuery.toLowerCase());
    const matchS = leadStatusFilter === "all" || l.status === leadStatusFilter;
    return matchQ && matchS;
  });

  return (
    <main
      className={`admin-shell${isLanguageSwitching ? ` is-language-${languageMotion}` : ""}`}
      dir={isAr ? "rtl" : "ltr"}
      lang={isAr ? "ar" : "en"}
      aria-busy={isLanguageSwitching}
    >
      {/* Mobile Drawer Backdrop */}
      {mobileNavigationOpen && (
        <button
          type="button"
          className="admin-mobile-nav-backdrop"
          aria-label={isAr ? "إغلاق القائمة" : "Close navigation"}
          onClick={() => setMobileNavigationOpen(false)}
        />
      )}

      {/* Sidebar Navigation matching Swiss Blue main admin panel */}
      <aside className={`admin-sidebar${mobileNavigationOpen ? " is-mobile-open" : ""}`}>
        {mobileNavigationOpen && (
          <button
            type="button"
            className="admin-mobile-nav-close"
            aria-label={isAr ? "إغلاق" : "Close"}
            onClick={() => setMobileNavigationOpen(false)}
          >
            <X size={18} />
          </button>
        )}

        <div className="admin-brand">
          <span className="admin-brand-mark">SB</span>
          <div>
            <p>{isAr ? "منظومة الضيافة السعودية" : "Saudi Hospitality"}</p>
            <h1>Content Studio</h1>
          </div>
        </div>

        {/* Mode Card & Language Switcher with Animated Tabs */}
        <div className="admin-mode-card">
          <span>{isAr ? "لغة التحرير والمعاينة" : "Content Language"}</span>
          <div
            className="admin-language"
            role="group"
            aria-label={isAr ? "لغة التحرير" : "Editing language"}
          >
            <button
              type="button"
              className={[
                lang === "ar" ? "active" : "",
                pendingLanguage === "ar" ? "is-pending" : "",
              ].filter(Boolean).join(" ")}
              aria-pressed={lang === "ar"}
              disabled={isLanguageSwitching}
              onClick={() => switchLanguage("ar")}
            >
              <span>AR</span>
              العربية
            </button>
            <button
              type="button"
              className={[
                lang === "en" ? "active" : "",
                pendingLanguage === "en" ? "is-pending" : "",
              ].filter(Boolean).join(" ")}
              aria-pressed={lang === "en"}
              disabled={isLanguageSwitching}
              onClick={() => switchLanguage("en")}
            >
              <span>EN</span>
              English
            </button>
          </div>
        </div>

        {/* Section Search Input */}
        <label className="admin-search">
          <span>{isAr ? "البحث في أقسام المنظومة" : "Search sections"}</span>
          <input
            type="search"
            value={query}
            placeholder={isAr ? "ابحث عن الهيدر، سارة، الحجز..." : "Find hero, AI concierge, ROI..."}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {/* Section Groups & Links with morphing + / - indicator */}
        <nav className="admin-section-list" aria-label="أقسام لوحة الإدارة">
          {GROUP_ORDER.map((groupKey) => {
            const items = groupedSections[groupKey] ?? [];
            if (items.length === 0) return null;
            const groupTitle = isAr ? GROUP_LABELS[groupKey].ar : GROUP_LABELS[groupKey].en;
            const isOpen = query.trim().length > 0 || openGroups.has(groupKey);

            return (
              <div className={`admin-nav-group${isOpen ? " is-open" : ""}`} key={groupKey}>
                <button
                  type="button"
                  className="admin-nav-group-toggle"
                  onClick={() => toggleGroup(groupKey)}
                  aria-expanded={isOpen}
                >
                  <span className="admin-nav-group-indicator" aria-hidden="true" />
                  <span>{groupTitle}</span>
                </button>

                {isOpen &&
                  items.map((sec) => {
                    const isSelected = selectedSectionId === sec.id;
                    const label = isAr ? sec.labelAr : sec.labelEn;
                    const desc = isAr ? sec.descAr : sec.descEn;

                    return (
                      <div
                        key={sec.id}
                        className={`admin-section-nav-row ${isSelected ? "active" : ""}`}
                      >
                        <button
                          type="button"
                          className="admin-section-trigger"
                          onClick={() => {
                            setSelectedSectionId(sec.id);
                            setMobileNavigationOpen(false);
                          }}
                        >
                          <span>{label}</span>
                          <small>{desc}</small>
                        </button>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </nav>

        {/* Live Preview Links */}
        <div className="mt-auto pt-4 border-t border-[var(--admin-border)] flex flex-col gap-2">
          <div className="text-[11px] font-bold text-[var(--admin-muted)] uppercase tracking-wider">
            {isAr ? "معاينة العرض المباشر:" : "Live Preview:"}
          </div>
          <Link
            href="/saudihospitalityweb"
            target="_blank"
            className="btn btn-secondary text-xs font-bold py-2 justify-center gap-1.5"
          >
            <span>{isAr ? "العرض بالعربية" : "Arabic Showcase"}</span>
            <ExternalLink size={13} />
          </Link>
          <Link
            href="/en/saudihospitalityweb"
            target="_blank"
            className="btn btn-secondary text-xs font-bold py-2 justify-center gap-1.5"
          >
            <span>{isAr ? "العرض بالإنجليزية" : "English Showcase"}</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </aside>

      {/* Main Workspace matching Swiss Blue admin layout */}
      <section className="admin-workspace">
        {/* Mobile section bar */}
        <div className="admin-mobile-section-bar">
          <button
            type="button"
            className="admin-mobile-nav-trigger"
            aria-label={isAr ? "فتح الأقسام" : "Open sections"}
            onClick={() => setMobileNavigationOpen(true)}
          >
            <Menu size={18} />
          </button>
          <div>
            <p>{isAr ? GROUP_LABELS[selectedSection.group]?.ar : selectedSection.group}</p>
            <strong>{isAr ? selectedSection.labelAr : selectedSection.labelEn}</strong>
          </div>
        </div>

        {/* Top Action Bar */}
        <header className="admin-topbar">
          <div>
            <p className="admin-breadcrumb">
              {isAr ? GROUP_LABELS[selectedSection.group]?.ar : selectedSection.group} / {isAr ? "العربية" : "English"}
            </p>
            <h2>{isAr ? selectedSection.labelAr : selectedSection.labelEn}</h2>
            <p>{isAr ? selectedSection.descAr : selectedSection.descEn}</p>
          </div>

          <div className="admin-actions">
            <span className={`admin-status ${statusTone}`}>
              {statusTone === "ready" && (isAr ? "جاهز" : "Ready")}
              {statusTone === "dirty" && (isAr ? "تغييرات غير محفوظة" : "Unsaved edits")}
              {statusTone === "saving" && (isAr ? "جارٍ الحفظ..." : "Saving...")}
              {statusTone === "saved" && (isAr ? "تم الحفظ بنجاح ✓" : "Saved ✓")}
            </span>

            <button
              className="admin-save"
              type="button"
              onClick={saveChanges}
            >
              {isAr ? "حفظ التغييرات" : "Save changes"}
            </button>
          </div>
        </header>

        {/* Section Editor Body */}
        <div className="admin-editor p-6 max-w-5xl space-y-6">
          {/* SECTION 1: HERO */}
          {selectedSectionId === "hero" && (
            <div className="space-y-6">
              <div className="admin-card">
                <div className="admin-field-label-row mb-3">
                  <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                    <Sparkles size={16} />
                    <span>{isAr ? "نصوص البانر الرئيسي والترحاب" : "Hero Headlines & Welcoming Copy"}</span>
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="admin-field">
                    <div className="admin-field-label-row">
                      <span>{isAr ? "شارة الهيدر (Eyebrow Badge)" : "Hero Eyebrow Badge"}</span>
                    </div>
                    <input
                      type="text"
                      value={activeContent.hero.badge}
                      onChange={(e) => updateSectionField("hero", "badge", e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-field">
                    <div className="admin-field-label-row">
                      <span>{isAr ? "العنوان الرئيسي (Hero Title)" : "Main Title"}</span>
                    </div>
                    <input
                      type="text"
                      value={activeContent.hero.title}
                      onChange={(e) => updateSectionField("hero", "title", e.target.value)}
                      className="admin-input font-bold text-base"
                    />
                  </div>

                  <div className="admin-field">
                    <div className="admin-field-label-row">
                      <span>{isAr ? "الوصف والفقرة الاستراتيجية (Subtitle)" : "Strategic Narrative Subtitle"}</span>
                    </div>
                    <textarea
                      rows={3}
                      value={activeContent.hero.subtitle}
                      onChange={(e) => updateSectionField("hero", "subtitle", e.target.value)}
                      className="admin-textarea"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="admin-field">
                      <div className="admin-field-label-row">
                        <span>{isAr ? "زر الإجراء الأساسي" : "Primary CTA Label"}</span>
                      </div>
                      <input
                        type="text"
                        value={activeContent.hero.primaryCta}
                        onChange={(e) => updateSectionField("hero", "primaryCta", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-field">
                      <div className="admin-field-label-row">
                        <span>{isAr ? "زر الإجراء الثانوي (PDF)" : "Secondary CTA (PDF)"}</span>
                      </div>
                      <input
                        type="text"
                        value={activeContent.hero.secondaryCta}
                        onChange={(e) => updateSectionField("hero", "secondaryCta", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-field">
                      <div className="admin-field-label-row">
                        <span>{isAr ? "زر معاينة الموقع" : "Live Preview CTA"}</span>
                      </div>
                      <input
                        type="text"
                        value={activeContent.hero.livePreviewCta}
                        onChange={(e) => updateSectionField("hero", "livePreviewCta", e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div className="admin-field pt-2">
                    <div className="admin-field-label-row">
                      <span>{isAr ? "رابط صورة الخلفية السينمائية (Hero Image URL)" : "Hero Backdrop Image URL"}</span>
                    </div>
                    <input
                      type="url"
                      value={activeContent.hero.heroImage}
                      onChange={(e) => updateSectionField("hero", "heroImage", e.target.value)}
                      className="admin-input font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: METRICS */}
          {selectedSectionId === "metrics" && (
            <div className="admin-card space-y-6">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8]">
                  {isAr ? "إحصاءات المنظومة الأربع" : "Four Core Metric Counters"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Metric 1 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="text-xs font-extrabold text-[#2b6fe8]">{isAr ? "مؤشر #1: سرعة الذكاء الاصطناعي" : "Metric #1: AI Response Speed"}</div>
                  <input
                    type="text"
                    value={activeContent.metrics.aiSpeed.val}
                    onChange={(e) =>
                      updateSectionField("metrics", "aiSpeed", { ...activeContent.metrics.aiSpeed, val: e.target.value })
                    }
                    className="admin-input font-extrabold text-lg"
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.aiSpeed.label}
                    onChange={(e) =>
                      updateSectionField("metrics", "aiSpeed", { ...activeContent.metrics.aiSpeed, label: e.target.value })
                    }
                    className="admin-input text-xs"
                    placeholder={isAr ? "العنوان التوضيحي" : "Label"}
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.aiSpeed.hint}
                    onChange={(e) =>
                      updateSectionField("metrics", "aiSpeed", { ...activeContent.metrics.aiSpeed, hint: e.target.value })
                    }
                    className="admin-input text-xs text-slate-500"
                    placeholder={isAr ? "الشارة الفرعية" : "Hint"}
                  />
                </div>

                {/* Metric 2 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="text-xs font-extrabold text-[#2b6fe8]">{isAr ? "مؤشر #2: عمولة الحجز المباشر" : "Metric #2: Direct Booking Fee"}</div>
                  <input
                    type="text"
                    value={activeContent.metrics.directFee.val}
                    onChange={(e) =>
                      updateSectionField("metrics", "directFee", { ...activeContent.metrics.directFee, val: e.target.value })
                    }
                    className="admin-input font-extrabold text-lg"
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.directFee.label}
                    onChange={(e) =>
                      updateSectionField("metrics", "directFee", { ...activeContent.metrics.directFee, label: e.target.value })
                    }
                    className="admin-input text-xs"
                    placeholder={isAr ? "العنوان التوضيحي" : "Label"}
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.directFee.hint}
                    onChange={(e) =>
                      updateSectionField("metrics", "directFee", { ...activeContent.metrics.directFee, hint: e.target.value })
                    }
                    className="admin-input text-xs text-slate-500"
                    placeholder={isAr ? "الشارة الفرعية" : "Hint"}
                  />
                </div>

                {/* Metric 3 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="text-xs font-extrabold text-[#2b6fe8]">{isAr ? "مؤشر #3: عدد المنشآت" : "Metric #3: Properties Count"}</div>
                  <input
                    type="text"
                    value={activeContent.metrics.propertiesCount.val}
                    onChange={(e) =>
                      updateSectionField("metrics", "propertiesCount", { ...activeContent.metrics.propertiesCount, val: e.target.value })
                    }
                    className="admin-input font-extrabold text-lg"
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.propertiesCount.label}
                    onChange={(e) =>
                      updateSectionField("metrics", "propertiesCount", { ...activeContent.metrics.propertiesCount, label: e.target.value })
                    }
                    className="admin-input text-xs"
                    placeholder={isAr ? "العنوان التوضيحي" : "Label"}
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.propertiesCount.hint}
                    onChange={(e) =>
                      updateSectionField("metrics", "propertiesCount", { ...activeContent.metrics.propertiesCount, hint: e.target.value })
                    }
                    className="admin-input text-xs text-slate-500"
                    placeholder={isAr ? "الشارة الفرعية" : "Hint"}
                  />
                </div>

                {/* Metric 4 */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="text-xs font-extrabold text-[#2b6fe8]">{isAr ? "مؤشر #4: سرعة التحميل (LCP)" : "Metric #4: LCP Load Speed"}</div>
                  <input
                    type="text"
                    value={activeContent.metrics.pageSpeed.val}
                    onChange={(e) =>
                      updateSectionField("metrics", "pageSpeed", { ...activeContent.metrics.pageSpeed, val: e.target.value })
                    }
                    className="admin-input font-extrabold text-lg"
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.pageSpeed.label}
                    onChange={(e) =>
                      updateSectionField("metrics", "pageSpeed", { ...activeContent.metrics.pageSpeed, label: e.target.value })
                    }
                    className="admin-input text-xs"
                    placeholder={isAr ? "العنوان التوضيحي" : "Label"}
                  />
                  <input
                    type="text"
                    value={activeContent.metrics.pageSpeed.hint}
                    onChange={(e) =>
                      updateSectionField("metrics", "pageSpeed", { ...activeContent.metrics.pageSpeed, hint: e.target.value })
                    }
                    className="admin-input text-xs text-slate-500"
                    placeholder={isAr ? "الشارة الفرعية" : "Hint"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: AI CONCIERGE */}
          {selectedSectionId === "aiConcierge" && (
            <div className="space-y-6">
              <div className="admin-card space-y-4">
                <div className="admin-field-label-row">
                  <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                    <Bot size={16} />
                    <span>{isAr ? "نصوص ومزايا المساعد الذكي (سارة)" : "AI Concierge Copy & Bullets"}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="admin-field">
                    <div className="admin-field-label-row"><span>{isAr ? "الشارة:" : "Badge:"}</span></div>
                    <input
                      type="text"
                      value={activeContent.aiConcierge.badge}
                      onChange={(e) => updateSectionField("aiConcierge", "badge", e.target.value)}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-field">
                    <div className="admin-field-label-row"><span>{isAr ? "زر الإجراء:" : "CTA Button:"}</span></div>
                    <input
                      type="text"
                      value={activeContent.aiConcierge.ctaText}
                      onChange={(e) => updateSectionField("aiConcierge", "ctaText", e.target.value)}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عنوان الميزة:" : "Feature Headline:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.aiConcierge.title}
                    onChange={(e) => updateSectionField("aiConcierge", "title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>

                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "الوصف التفصيلي:" : "Description:"}</span></div>
                  <textarea
                    rows={3}
                    value={activeContent.aiConcierge.description}
                    onChange={(e) => updateSectionField("aiConcierge", "description", e.target.value)}
                    className="admin-textarea"
                  />
                </div>

                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "رسالة الترحيب الافتراضية للمساعد:" : "Initial Bot Greeting:"}</span></div>
                  <textarea
                    rows={2}
                    value={activeContent.aiConcierge.initialGreeting}
                    onChange={(e) => updateSectionField("aiConcierge", "initialGreeting", e.target.value)}
                    className="admin-textarea"
                  />
                </div>
              </div>

              {/* Sample Prompts */}
              <div className="admin-card space-y-4">
                <div className="admin-field-label-row">
                  <span className="text-sm font-extrabold text-[#1246a8]">
                    {isAr ? "أسئلة وردود المحاكي التفاعلي" : "Interactive Chat Simulator Prompts"}
                  </span>
                </div>

                {activeContent.aiConcierge.prompts.map((p, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">{isAr ? `السؤال #${idx + 1}` : `Prompt #${idx + 1}`}</span>
                    </div>
                    <input
                      type="text"
                      value={p.q}
                      onChange={(e) => {
                        const updated = [...activeContent.aiConcierge.prompts];
                        updated[idx].q = e.target.value;
                        updateSectionField("aiConcierge", "prompts", updated);
                      }}
                      className="admin-input font-semibold text-xs"
                      placeholder={isAr ? "السؤال" : "Question"}
                    />
                    <textarea
                      rows={2}
                      value={p.a}
                      onChange={(e) => {
                        const updated = [...activeContent.aiConcierge.prompts];
                        updated[idx].a = e.target.value;
                        updateSectionField("aiConcierge", "prompts", updated);
                      }}
                      className="admin-textarea text-xs"
                      placeholder={isAr ? "الرد التلقائي" : "Bot response"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: ROI CALCULATOR */}
          {selectedSectionId === "roiCalculator" && (
            <div className="admin-card space-y-5">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                  <TrendingUp size={16} />
                  <span>{isAr ? "معايير وإعدادات حاسبة العائد المالي (ROI)" : "Direct Booking ROI Calculator Settings"}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عنوان الحاسبة:" : "Calculator Title:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.roiCalculator.cardTitle}
                    onChange={(e) => updateSectionField("roiCalculator", "cardTitle", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عنوان القسم:" : "Section Title:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.roiCalculator.title}
                    onChange={(e) => updateSectionField("roiCalculator", "title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عدد الغرف الافتراضي:" : "Default Rooms:"}</span></div>
                  <input
                    type="number"
                    value={activeContent.roiCalculator.defaultRooms}
                    onChange={(e) => updateSectionField("roiCalculator", "defaultRooms", Number(e.target.value))}
                    className="admin-input font-bold"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "متوسط السعر (ADR):" : "Default ADR (SAR):"}</span></div>
                  <input
                    type="number"
                    value={activeContent.roiCalculator.defaultAdr}
                    onChange={(e) => updateSectionField("roiCalculator", "defaultAdr", Number(e.target.value))}
                    className="admin-input font-bold"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عمولة الـ OTA (%):" : "OTA Fee (%):"}</span></div>
                  <input
                    type="number"
                    value={activeContent.roiCalculator.otaCommissionRate}
                    onChange={(e) => updateSectionField("roiCalculator", "otaCommissionRate", Number(e.target.value))}
                    className="admin-input font-bold"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "الحجز المباشر (%):" : "Direct Share (%):"}</span></div>
                  <input
                    type="number"
                    value={activeContent.roiCalculator.directShareRate}
                    onChange={(e) => updateSectionField("roiCalculator", "directShareRate", Number(e.target.value))}
                    className="admin-input font-bold"
                  />
                </div>
              </div>

              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "ملاحظة الحسابات والتنويه:" : "Calculation Footnote:"}</span></div>
                <input
                  type="text"
                  value={activeContent.roiCalculator.footnote}
                  onChange={(e) => updateSectionField("roiCalculator", "footnote", e.target.value)}
                  className="admin-input text-xs"
                />
              </div>
            </div>
          )}

          {/* SECTION 5: PILLARS */}
          {selectedSectionId === "pillars" && (
            <div className="admin-card space-y-5">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                  <Layers size={16} />
                  <span>{isAr ? "الركائز الست للمنظومة" : "Six Core Architectural Pillars"}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "عنوان قسم الركائز:" : "Pillars Title:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.pillars.title}
                    onChange={(e) => updateSectionField("pillars", "title", e.target.value)}
                    className="admin-input font-bold"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "الوصف الفرعي:" : "Subtitle:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.pillars.subtitle}
                    onChange={(e) => updateSectionField("pillars", "subtitle", e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeContent.pillars.items.map((pillar, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="text-xs font-extrabold text-[#2b6fe8]">
                      {isAr ? `الركيزة #${idx + 1}` : `Pillar #${idx + 1}`}
                    </div>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => {
                        const updated = [...activeContent.pillars.items];
                        updated[idx].title = e.target.value;
                        updateSectionField("pillars", "items", updated);
                      }}
                      className="admin-input font-bold text-xs"
                      placeholder={isAr ? "عنوان الركيزة" : "Pillar Title"}
                    />
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => {
                        const updated = [...activeContent.pillars.items];
                        updated[idx].description = e.target.value;
                        updateSectionField("pillars", "items", updated);
                      }}
                      className="admin-textarea text-xs"
                      placeholder={isAr ? "الوصف" : "Description"}
                    />
                    <input
                      type="text"
                      value={pillar.badge}
                      onChange={(e) => {
                        const updated = [...activeContent.pillars.items];
                        updated[idx].badge = e.target.value;
                        updateSectionField("pillars", "items", updated);
                      }}
                      className="admin-input text-xs text-blue-600 font-semibold"
                      placeholder={isAr ? "الشارة" : "Badge"}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: PROPERTIES PORTFOLIO */}
          {selectedSectionId === "propertiesSection" && (
            <div className="admin-card space-y-5">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                  <Building2 size={16} />
                  <span>{isAr ? "محفظة الفنادق والشقق المعروضة في المنظومة" : "Properties Portfolio & Inventory"}</span>
                </span>
              </div>

              <div className="space-y-4">
                {activeContent.propertiesSection.items.map((prop, idx) => (
                  <div key={prop.slug} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{prop.title}</span>
                      <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">{prop.city}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="admin-field">
                        <div className="admin-field-label-row"><span>{isAr ? "اسم المنشأة:" : "Property Title:"}</span></div>
                        <input
                          type="text"
                          value={prop.title}
                          onChange={(e) => {
                            const updated = [...activeContent.propertiesSection.items];
                            updated[idx].title = e.target.value;
                            updateSectionField("propertiesSection", "items", updated);
                          }}
                          className="admin-input text-xs font-bold"
                        />
                      </div>
                      <div className="admin-field">
                        <div className="admin-field-label-row"><span>{isAr ? "المدينة:" : "City:"}</span></div>
                        <input
                          type="text"
                          value={prop.city}
                          onChange={(e) => {
                            const updated = [...activeContent.propertiesSection.items];
                            updated[idx].city = e.target.value;
                            updateSectionField("propertiesSection", "items", updated);
                          }}
                          className="admin-input text-xs"
                        />
                      </div>
                      <div className="admin-field">
                        <div className="admin-field-label-row"><span>{isAr ? "عدد الوحدات:" : "Units Count:"}</span></div>
                        <input
                          type="text"
                          value={prop.units}
                          onChange={(e) => {
                            const updated = [...activeContent.propertiesSection.items];
                            updated[idx].units = e.target.value;
                            updateSectionField("propertiesSection", "items", updated);
                          }}
                          className="admin-input text-xs"
                        />
                      </div>
                    </div>

                    <div className="admin-field">
                      <div className="admin-field-label-row"><span>{isAr ? "الوصف الترويجي:" : "Summary:"}</span></div>
                      <textarea
                        rows={2}
                        value={prop.summary}
                        onChange={(e) => {
                          const updated = [...activeContent.propertiesSection.items];
                          updated[idx].summary = e.target.value;
                          updateSectionField("propertiesSection", "items", updated);
                        }}
                        className="admin-textarea text-xs"
                      />
                    </div>

                    <div className="admin-field">
                      <div className="admin-field-label-row"><span>{isAr ? "رابط الصورة:" : "Image URL:"}</span></div>
                      <input
                        type="url"
                        value={prop.image}
                        onChange={(e) => {
                          const updated = [...activeContent.propertiesSection.items];
                          updated[idx].image = e.target.value;
                          updateSectionField("propertiesSection", "items", updated);
                        }}
                        className="admin-input text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 7: STAKEHOLDER MATRIX */}
          {selectedSectionId === "advantageMatrix" && (
            <div className="admin-card space-y-5">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                  <Award size={16} />
                  <span>{isAr ? "مصفوفة القيمة والمزايا للشركاء" : "Stakeholder Advantage Matrix"}</span>
                </span>
              </div>

              <div className="space-y-4">
                {activeContent.advantageMatrix.rows.map((row, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="font-extrabold text-xs text-[#2b6fe8]">{row.role}</div>
                    <div className="admin-field">
                      <div className="admin-field-label-row"><span>{isAr ? "التحدي التقليدي:" : "Traditional Problem:"}</span></div>
                      <textarea
                        rows={2}
                        value={row.problem}
                        onChange={(e) => {
                          const updated = [...activeContent.advantageMatrix.rows];
                          updated[idx].problem = e.target.value;
                          updateSectionField("advantageMatrix", "rows", updated);
                        }}
                        className="admin-textarea text-xs"
                      />
                    </div>
                    <div className="admin-field">
                      <div className="admin-field-label-row"><span>{isAr ? "الحل في سويس بلو:" : "Swiss Blue Solution:"}</span></div>
                      <textarea
                        rows={2}
                        value={row.solution}
                        onChange={(e) => {
                          const updated = [...activeContent.advantageMatrix.rows];
                          updated[idx].solution = e.target.value;
                          updateSectionField("advantageMatrix", "rows", updated);
                        }}
                        className="admin-textarea text-xs font-semibold text-slate-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 8: TECH SPECS */}
          {selectedSectionId === "techSpecs" && (
            <div className="admin-card space-y-5">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8] flex items-center gap-1.5">
                  <ShieldCheck size={16} />
                  <span>{isAr ? "المواصفات والمعايير التقنية السحابية" : "Enterprise Technical Specs"}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeContent.techSpecs.specs.map((spec, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <input
                      type="text"
                      value={spec.title}
                      onChange={(e) => {
                        const updated = [...activeContent.techSpecs.specs];
                        updated[idx].title = e.target.value;
                        updateSectionField("techSpecs", "specs", updated);
                      }}
                      className="admin-input font-bold text-xs"
                    />
                    <textarea
                      rows={3}
                      value={spec.description}
                      onChange={(e) => {
                        const updated = [...activeContent.techSpecs.specs];
                        updated[idx].description = e.target.value;
                        updateSectionField("techSpecs", "specs", updated);
                      }}
                      className="admin-textarea text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 9: CTA & FOOTER */}
          {selectedSectionId === "ctaFooter" && (
            <div className="admin-card space-y-4">
              <div className="admin-field-label-row">
                <span className="text-sm font-extrabold text-[#1246a8]">
                  {isAr ? "بانر الاتصال الختامي والفوتر" : "Closing CTA Pitch & Footer"}
                </span>
              </div>

              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "العنوان الختامي:" : "Closing Title:"}</span></div>
                <input
                  type="text"
                  value={activeContent.ctaFooter.title}
                  onChange={(e) => updateSectionField("ctaFooter", "title", e.target.value)}
                  className="admin-input font-bold"
                />
              </div>

              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "الوصف الختامي:" : "Subtitle:"}</span></div>
                <textarea
                  rows={2}
                  value={activeContent.ctaFooter.subtitle}
                  onChange={(e) => updateSectionField("ctaFooter", "subtitle", e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "حقوق النشر:" : "Copyright Tag:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.ctaFooter.copyright}
                    onChange={(e) => updateSectionField("ctaFooter", "copyright", e.target.value)}
                    className="admin-input text-xs"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "مدن التشغيل في الفوتر:" : "Location Tagline:"}</span></div>
                  <input
                    type="text"
                    value={activeContent.ctaFooter.locationTag}
                    onChange={(e) => updateSectionField("ctaFooter", "locationTag", e.target.value)}
                    className="admin-input text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 10: INBOUND LEADS CRM */}
          {selectedSectionId === "leads" && (
            <div className="space-y-6">
              {/* Action Toolbar */}
              <div className="admin-card flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap flex-grow">
                  <input
                    type="search"
                    placeholder={isAr ? "بحث بالاسم، المنشأة، الجوال..." : "Search by name, company, phone..."}
                    value={searchLeadQuery}
                    onChange={(e) => setSearchLeadQuery(e.target.value)}
                    className="admin-input max-w-xs"
                  />

                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="admin-input max-w-xs text-xs font-semibold"
                  >
                    <option value="all">{isAr ? "كافة الحالات" : "All Statuses"}</option>
                    <option value="new">{isAr ? "جديد (New)" : "New"}</option>
                    <option value="contacted">{isAr ? "تم التواصل" : "Contacted"}</option>
                    <option value="demo_scheduled">{isAr ? "عرض مجدول" : "Demo Scheduled"}</option>
                    <option value="partnered">{isAr ? "تم الاتفاق" : "Partnered"}</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={exportLeadsCSV}
                    className="btn btn-secondary text-xs font-bold gap-1"
                  >
                    <Download size={14} />
                    <span>{isAr ? "تصدير CSV" : "Export CSV"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsManualLeadOpen(true)}
                    className="btn btn-primary text-xs font-bold gap-1"
                  >
                    <Plus size={15} />
                    <span>{isAr ? "إضافة عميل يدوياً" : "Add Lead"}</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="admin-card overflow-hidden p-0">
                <table className="w-full text-start border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-extrabold uppercase">
                      <th className="p-3.5 ps-5">{isAr ? "بيانات العميل" : "Lead Name & Property"}</th>
                      <th className="p-3.5">{isAr ? "الاتصال" : "Contact"}</th>
                      <th className="p-3.5">{isAr ? "الاهتمام والملاحظات" : "Interest & Notes"}</th>
                      <th className="p-3.5">{isAr ? "التاريخ" : "Date"}</th>
                      <th className="p-3.5">{isAr ? "الحالة والإجراء" : "Status & Action"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 ps-5">
                          <div className="font-extrabold text-slate-900 text-sm">{lead.name}</div>
                          <div className="text-slate-500">{lead.company}</div>
                          <div className="text-[10px] text-blue-600 font-mono mt-0.5">{lead.source}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-800">{lead.phone}</div>
                          <div className="text-slate-500">{lead.email}</div>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <div className="font-bold text-slate-900">{lead.interest}</div>
                          {lead.notes && (
                            <div className="text-[11px] text-slate-600 bg-slate-100/70 p-1.5 rounded mt-1">
                              {lead.notes}
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-500 whitespace-nowrap">
                          <div>{new Date(lead.createdAt).toLocaleDateString(isAr ? "ar-SA" : "en-US")}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(lead.createdAt).toLocaleTimeString(isAr ? "ar-SA" : "en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as InboundLead["status"])}
                              className="admin-input text-xs py-1 px-2 font-medium"
                            >
                              <option value="new">{isAr ? "جديد" : "New"}</option>
                              <option value="contacted">{isAr ? "تم التواصل" : "Contacted"}</option>
                              <option value="demo_scheduled">{isAr ? "عرض مجدول" : "Scheduled"}</option>
                              <option value="partnered">{isAr ? "تم الاتفاق" : "Partnered"}</option>
                              <option value="archived">{isAr ? "أرشيف" : "Archived"}</option>
                            </select>

                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                isAr
                                  ? `مرحباً أستاذ ${lead.name}، معك فريق سويس بلو للضيافة بخصوص استفسارك عن المنظومة الرقمية.`
                                  : `Hello ${lead.name}, this is Swiss Blue Hospitality following up on your digital platform inquiry.`,
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                              title={isAr ? "مراسلة عبر واتساب" : "Message on WhatsApp"}
                            >
                              <MessageSquare size={14} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-slate-400 font-semibold">
                          {isAr ? "لا توجد طلبات مطابقة للبحث." : "No matching leads found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Manual Lead Modal */}
      {isManualLeadOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setIsManualLeadOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-extrabold text-lg text-slate-900">
              {isAr ? "تسجيل شريك أو عميل جديد يدوياً" : "Add New Lead Manually"}
            </h3>

            <form onSubmit={handleAddManualLead} className="space-y-3">
              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "الاسم الكامل:" : "Full Name:"}</span></div>
                <input
                  type="text"
                  required
                  value={manualLead.name}
                  onChange={(e) => setManualLead({ ...manualLead, name: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "البريد الإلكتروني:" : "Email:"}</span></div>
                  <input
                    type="email"
                    required
                    value={manualLead.email}
                    onChange={(e) => setManualLead({ ...manualLead, email: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="admin-field">
                  <div className="admin-field-label-row"><span>{isAr ? "رقم الجوال:" : "Phone:"}</span></div>
                  <input
                    type="tel"
                    required
                    value={manualLead.phone}
                    onChange={(e) => setManualLead({ ...manualLead, phone: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "اسم المنشأة أو الشركة:" : "Property or Company:"}</span></div>
                <input
                  type="text"
                  value={manualLead.company}
                  onChange={(e) => setManualLead({ ...manualLead, company: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="admin-field">
                <div className="admin-field-label-row"><span>{isAr ? "ملاحظات واهتمام العميل:" : "Notes & Interest:"}</span></div>
                <textarea
                  rows={2}
                  value={manualLead.notes}
                  onChange={(e) => setManualLead({ ...manualLead, notes: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsManualLeadOpen(false)}
                  className="btn btn-secondary text-xs"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button type="submit" className="btn btn-primary text-xs">
                  {isAr ? "حفظ العميل" : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
