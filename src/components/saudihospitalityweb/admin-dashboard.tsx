"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Sliders,
  Bot,
  TrendingUp,
  Building2,
  Download,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Sparkles,
  Phone,
  Mail,
  Edit,
  Trash2,
  RefreshCw,
  Save,
  Globe2,
  Calendar,
  Layers,
} from "lucide-react";
import styles from "./admin.module.css";
import {
  InboundLead,
  ShowcaseConfig,
  initialShowcaseConfig,
  sampleInitialLeads,
} from "@/lib/saudihospitalityweb-store";

export default function SaudiHospitalityAdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [leads, setLeads] = useState<InboundLead[]>([]);
  const [config, setConfig] = useState<ShowcaseConfig>(initialShowcaseConfig);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [saveAlert, setSaveAlert] = useState<string | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState<boolean>(false);
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "عرض المنصة للشركاء",
    notes: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLeads = localStorage.getItem("shw_leads");
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      } else {
        setLeads(sampleInitialLeads);
      }

      const savedConfig = localStorage.getItem("shw_config");
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    } catch {
      setLeads(sampleInitialLeads);
      setConfig(initialShowcaseConfig);
    }
  }, []);

  const saveConfig = (newConfig: ShowcaseConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem("shw_config", JSON.stringify(newConfig));
      setSaveAlert("تم حفظ إعدادات المنظومة بنجاح!");
      setTimeout(() => setSaveAlert(null), 3000);
    } catch {}
  };

  const updateLeadStatus = (id: string, newStatus: InboundLead["status"]) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, status: newStatus } : lead,
    );
    setLeads(updated);
    try {
      localStorage.setItem("shw_leads", JSON.stringify(updated));
    } catch {}
  };

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InboundLead = {
      id: `lead-${Date.now()}`,
      name: newLead.name,
      company: newLead.company,
      email: newLead.email,
      phone: newLead.phone,
      interest: newLead.interest,
      source: "/saudihospitalityweb/admin",
      status: "new",
      notes: newLead.notes,
      createdAt: new Date().toISOString(),
    };

    const updated = [created, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem("shw_leads", JSON.stringify(updated));
    } catch {}
    setIsNewLeadModalOpen(false);
    setNewLead({ name: "", company: "", email: "", phone: "", interest: "عرض المنصة للشركاء", notes: "" });
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
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `saudi-hospitality-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const countNew = leads.filter((l) => l.status === "new").length;
  const countScheduled = leads.filter((l) => l.status === "demo_scheduled").length;
  const countPartnered = leads.filter((l) => l.status === "partnered").length;

  return (
    <div className={styles.adminLayout} dir="rtl">
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#93c5fd] font-extrabold text-xl">
              SB
            </span>
            <div>
              <div className={styles.brandName}>سويس بلو للضيافة</div>
              <div className={styles.brandSub}>لوحة تحكم المنظومة الرقمية</div>
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "overview" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>نظرة عامة والمؤشرات</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "leads" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("leads")}
          >
            <Users size={18} />
            <span>طلبات العملاء والشركاء (Leads)</span>
            {countNew > 0 && (
              <span className="ms-auto bg-[#ce8300] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {countNew}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "content" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <Sliders size={18} />
            <span>محتوى الواجهة والإحصاءات</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "ai-prompts" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("ai-prompts")}
          >
            <Bot size={18} />
            <span>مساعد الذكاء الاصطناعي (سارة)</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "roi-config" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("roi-config")}
          >
            <TrendingUp size={18} />
            <span>إعدادات حاسبة العائد (ROI)</span>
          </button>

          <button
            type="button"
            className={`${styles.navItem} ${activeTab === "properties" ? styles.navItemActive : ""}`}
            onClick={() => setActiveTab("properties")}
          >
            <Building2 size={18} />
            <span>محفظة الفنادق والمنشآت</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className="text-xs text-slate-400 font-semibold mb-1">معاينة صفحات المنظومة:</div>
          <Link
            href="/saudihospitalityweb"
            target="_blank"
            className={styles.previewBtn}
          >
            <span>العرض بالعربية</span>
            <ExternalLink size={14} />
          </Link>
          <Link
            href="/en/saudihospitalityweb"
            target="_blank"
            className={styles.previewBtn}
          >
            <span>English Overview</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <div className={styles.pageHeading}>
            <h1>
              {activeTab === "overview" && "لوحة المعلومات ومؤشرات الأداء"}
              {activeTab === "leads" && "إدارة العملاء المتوقعين وعروض الشركاء"}
              {activeTab === "content" && "تخصيص محتوى الواجهة والتسويق"}
              {activeTab === "ai-prompts" && "تخصيص أسئلة وردود المساعد الذكي"}
              {activeTab === "roi-config" && "إعدادات ومعادلات حاسبة التوفير"}
              {activeTab === "properties" && "حالة المنشآت والغرف في المنظومة"}
            </h1>
            <p>
              نظام إدارة العرض التسويقي الفندقي • المسار: <code>dubaiincairo.com/saudihospitalityweb</code>
            </p>
          </div>

          <div className={styles.topBarActions}>
            {saveAlert && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg animate-pulse">
                <CheckCircle2 size={14} />
                <span>{saveAlert}</span>
              </span>
            )}

            <button
              type="button"
              onClick={exportLeadsCSV}
              className={styles.actionBtn}
              title="تصدير جدول العملاء كملف CSV"
            >
              <Download size={15} />
              <span>تصدير CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNewLeadModalOpen(true)}
              className={styles.primaryActionBtn}
            >
              <Plus size={16} />
              <span>إضافة عميل يدوياً</span>
            </button>
          </div>
        </header>

        <div className={styles.contentBody}>
          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === "overview" && (
            <div>
              <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className="text-xs font-bold text-slate-500">إجمالي طلبات الشركاء</span>
                    <div className={styles.kpiIconWrap}>
                      <Users size={18} />
                    </div>
                  </div>
                  <div className={styles.kpiVal}>{leads.length}</div>
                  <div className={styles.kpiLabel}>عميل محتمل مسجل في النظام</div>
                  <div className={styles.kpiSub}>+100% نمو في التفاعل المباشر</div>
                </div>

                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className="text-xs font-bold text-slate-500">طلبات جديدة بحاجة لمتابعة</span>
                    <div className={styles.kpiIconWrap} style={{ background: "#fef3c7", color: "#b45309" }}>
                      <Clock size={18} />
                    </div>
                  </div>
                  <div className={styles.kpiVal} style={{ color: "#b45309" }}>{countNew}</div>
                  <div className={styles.kpiLabel}>فرصة بيعية بانتظار الاتصال الأول</div>
                  <div className={styles.kpiSub} style={{ color: "#b45309" }}>معدل الاستجابة المستهدف &lt; 2 ساعة</div>
                </div>

                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className="text-xs font-bold text-slate-500">عروض مجدولة (Demo)</span>
                    <div className={styles.kpiIconWrap} style={{ background: "#f3e8ff", color: "#7e22ce" }}>
                      <Calendar size={18} />
                    </div>
                  </div>
                  <div className={styles.kpiVal} style={{ color: "#7e22ce" }}>{countScheduled}</div>
                  <div className={styles.kpiLabel}>عروض تقديمية تم تثبيت مواعيدها</div>
                  <div className={styles.kpiSub}>معدل تحويل متوقع 40%+</div>
                </div>

                <div className={styles.kpiCard}>
                  <div className={styles.kpiTop}>
                    <span className="text-xs font-bold text-slate-500">توفير سنوي مقدر لملاك الفنادق</span>
                    <div className={styles.kpiIconWrap} style={{ background: "#dcfce7", color: "#15803d" }}>
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className={styles.kpiVal} style={{ color: "#15803d" }}>290K+</div>
                  <div className={styles.kpiLabel}>ريال سعودي متوسط توفير لكل فندق</div>
                  <div className={styles.kpiSub}>بحساب محرك الحجز المباشر 35%</div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeaderRow}>
                  <div className={styles.tableTitle}>أحدث طلبات العروض والاستشارات</div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("leads")}
                    className="text-xs font-bold text-[#2b6fe8] hover:underline"
                  >
                    عرض جميع الطلبات ({leads.length}) &larr;
                  </button>
                </div>

                <table className={styles.leadTable}>
                  <thead>
                    <tr>
                      <th>الاسم والمنشأة</th>
                      <th>وسيلة التواصل</th>
                      <th>نوع الاهتمام</th>
                      <th>الحالة</th>
                      <th>الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.slice(0, 5).map((lead) => (
                      <tr key={lead.id}>
                        <td>
                          <div className="font-bold text-slate-900">{lead.name}</div>
                          <div className="text-xs text-slate-500">{lead.company}</div>
                        </td>
                        <td>
                          <div className="text-xs font-semibold text-slate-700">{lead.phone}</div>
                          <div className="text-xs text-slate-500">{lead.email}</div>
                        </td>
                        <td>
                          <span className="text-xs font-medium text-slate-800">{lead.interest}</span>
                        </td>
                        <td>
                          {lead.status === "new" && <span className={styles.badgeNew}>جديد</span>}
                          {lead.status === "contacted" && <span className={styles.badgeContacted}>تم التواصل</span>}
                          {lead.status === "demo_scheduled" && <span className={styles.badgeScheduled}>عرض مجدول</span>}
                          {lead.status === "partnered" && <span className={styles.badgePartnered}>تم الاتفاق</span>}
                        </td>
                        <td>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 hover:bg-emerald-100"
                          >
                            <MessageSquare size={12} />
                            <span>واتساب</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS CRM TABLE */}
          {activeTab === "leads" && (
            <div className={styles.tableCard}>
              <div className={styles.tableHeaderRow}>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className={styles.tableTitle}>قائمة العملاء والشركاء المسجلين</div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {filteredLeads.length} سجل
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    type="text"
                    placeholder="بحث بالاسم، الشركة، الجوال..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.tableSearch}
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700 outline-none"
                  >
                    <option value="all">كافة الحالات</option>
                    <option value="new">جديد (New)</option>
                    <option value="contacted">تم التواصل</option>
                    <option value="demo_scheduled">عرض مجدول</option>
                    <option value="partnered">تم الاتفاق</option>
                  </select>
                </div>
              </div>

              <table className={styles.leadTable}>
                <thead>
                  <tr>
                    <th>بيانات العميل</th>
                    <th>معلومات الاتصال</th>
                    <th>الاهتمام والتفاصيل</th>
                    <th>تاريخ التسجيل</th>
                    <th>الحالة الحالية</th>
                    <th>تحديث الحالة والاتصال</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div className="font-bold text-slate-900">{lead.name}</div>
                        <div className="text-xs text-slate-500">{lead.company}</div>
                        <div className="text-[11px] text-blue-600 font-mono mt-0.5">{lead.source}</div>
                      </td>
                      <td>
                        <div className="text-xs font-semibold text-slate-800">{lead.phone}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </td>
                      <td>
                        <div className="text-xs font-bold text-slate-900">{lead.interest}</div>
                        {lead.notes && (
                          <div className="text-xs text-slate-600 bg-slate-50 p-1.5 rounded mt-1 border border-slate-100 max-w-xs">
                            {lead.notes}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="text-xs text-slate-600">
                          {new Date(lead.createdAt).toLocaleDateString("ar-SA")}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(lead.createdAt).toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                      <td>
                        {lead.status === "new" && <span className={styles.badgeNew}>جديد</span>}
                        {lead.status === "contacted" && <span className={styles.badgeContacted}>تم التواصل</span>}
                        {lead.status === "demo_scheduled" && <span className={styles.badgeScheduled}>عرض مجدول</span>}
                        {lead.status === "partnered" && <span className={styles.badgePartnered}>تم الاتفاق</span>}
                      </td>
                      <td>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as InboundLead["status"])}
                            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white font-medium"
                          >
                            <option value="new">جديد</option>
                            <option value="contacted">تم التواصل</option>
                            <option value="demo_scheduled">عرض مجدول</option>
                            <option value="partnered">تم الاتفاق</option>
                            <option value="archived">أرشيف</option>
                          </select>

                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `مرحباً أستاذ ${lead.name}، معك فريق سويس بلو للضيافة بخصوص استفسارك عن المنظومة الرقمية.`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 hover:bg-emerald-100"
                            title="مراسلة عبر واتساب"
                          >
                            <MessageSquare size={13} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500 font-semibold text-sm">
                        لا توجد طلبات مطابقة لمعايير البحث الحالية.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: CONTENT CUSTOMIZER */}
          {activeTab === "content" && (
            <div className={styles.formCard}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={styles.formCardTitle}>تخصيص نصوص الواجهة والهيدر</h2>
                  <p className={styles.formCardSub}>
                    تحكم فوري في عناوين الواجهة العربية والإنجليزية وشارات الإحصاءات الأربع.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveConfig(config)}
                  className={styles.primaryActionBtn}
                >
                  <Save size={15} />
                  <span>حفظ التعديلات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-extrabold text-sm text-[#1246a8] mb-3 flex items-center gap-1.5">
                    <Globe2 size={16} />
                    <span>الواجهة العربية (RTL)</span>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>شارة الهيدر (Eyebrow Badge):</label>
                    <input
                      type="text"
                      value={config.hero.badgeAr}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, badgeAr: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>العنوان الرئيسي (Hero Title):</label>
                    <input
                      type="text"
                      value={config.hero.titleAr}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, titleAr: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>الوصف والفقرة الترحيبية:</label>
                    <textarea
                      value={config.hero.subtitleAr}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, subtitleAr: e.target.value } })
                      }
                      className={styles.fieldTextarea}
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200" dir="ltr">
                  <div className="font-extrabold text-sm text-[#1246a8] mb-3 flex items-center gap-1.5">
                    <Globe2 size={16} />
                    <span>English Interface (LTR)</span>
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Eyebrow Badge:</label>
                    <input
                      type="text"
                      value={config.hero.badgeEn}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, badgeEn: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Main Title:</label>
                    <input
                      type="text"
                      value={config.hero.titleEn}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, titleEn: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Subtitle Description:</label>
                    <textarea
                      value={config.hero.subtitleEn}
                      onChange={(e) =>
                        setConfig({ ...config, hero: { ...config.hero, subtitleEn: e.target.value } })
                      }
                      className={styles.fieldTextarea}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-3">بطاقات الإحصاءات الأربع (KPI Cards):</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>سرعة الذكاء الاصطناعي:</label>
                    <input
                      type="text"
                      value={config.metrics.aiSpeed}
                      onChange={(e) =>
                        setConfig({ ...config, metrics: { ...config.metrics, aiSpeed: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>عمولة الحجز المباشر:</label>
                    <input
                      type="text"
                      value={config.metrics.directFee}
                      onChange={(e) =>
                        setConfig({ ...config, metrics: { ...config.metrics, directFee: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>عدد المنشآت الحالية:</label>
                    <input
                      type="text"
                      value={config.metrics.propertiesCount}
                      onChange={(e) =>
                        setConfig({ ...config, metrics: { ...config.metrics, propertiesCount: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>سرعة التحميل (LCP):</label>
                    <input
                      type="text"
                      value={config.metrics.pageSpeed}
                      onChange={(e) =>
                        setConfig({ ...config, metrics: { ...config.metrics, pageSpeed: e.target.value } })
                      }
                      className={styles.fieldInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI PROMPT MANAGER */}
          {activeTab === "ai-prompts" && (
            <div className={styles.formCard}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={styles.formCardTitle}>إدارة أسئلة وردود محاكي المساعد الذكي (سارة)</h2>
                  <p className={styles.formCardSub}>
                    الأسئلة السريعة التي تظهر للعملاء المحتملين في العرض التفاعلي.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveConfig(config)}
                  className={styles.primaryActionBtn}
                >
                  <Save size={15} />
                  <span>حفظ التعديلات</span>
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-[#1246a8]">الأسئلة العربية (AR Prompts):</h3>
                {config.aiPrompts.ar.map((item, idx) => (
                  <div key={idx} className={styles.promptCard}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">السؤال التفاعلي #{idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => {
                        const updated = [...config.aiPrompts.ar];
                        updated[idx].q = e.target.value;
                        setConfig({ ...config, aiPrompts: { ...config.aiPrompts, ar: updated } });
                      }}
                      className={styles.fieldInput}
                    />
                    <label className="text-xs font-semibold text-slate-600 mt-1">رد المساعد الآلي:</label>
                    <textarea
                      value={item.a}
                      onChange={(e) => {
                        const updated = [...config.aiPrompts.ar];
                        updated[idx].a = e.target.value;
                        setConfig({ ...config, aiPrompts: { ...config.aiPrompts, ar: updated } });
                      }}
                      className={styles.fieldTextarea}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ROI CALCULATOR CONFIG */}
          {activeTab === "roi-config" && (
            <div className={styles.formCard}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={styles.formCardTitle}>إعدادات ومعايير حاسبة عائد الاستثمار (ROI)</h2>
                  <p className={styles.formCardSub}>
                    ضبط القيم الافتراضية ونسب عمولات منصات السفر (OTA) لحساب التوفير المالي لملاك الفنادق.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveConfig(config)}
                  className={styles.primaryActionBtn}
                >
                  <Save size={15} />
                  <span>حفظ الإعدادات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>عدد الغرف الافتراضي (Default Units):</label>
                  <input
                    type="number"
                    value={config.roiDefaults.roomsCount}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        roiDefaults: { ...config.roiDefaults, roomsCount: Number(e.target.value) },
                      })
                    }
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>متوسط السعر اليومي الافتراضي بالريال (ADR):</label>
                  <input
                    type="number"
                    value={config.roiDefaults.adr}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        roiDefaults: { ...config.roiDefaults, adr: Number(e.target.value) },
                      })
                    }
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>نسبة عمولة منصات السفر OTA (%) (المتوسط 18%):</label>
                  <input
                    type="number"
                    value={config.roiDefaults.otaCommissionRate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        roiDefaults: { ...config.roiDefaults, otaCommissionRate: Number(e.target.value) },
                      })
                    }
                    className={styles.fieldInput}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>نسبة التحويل للحجز المباشر (%) (المستهدف 35%):</label>
                  <input
                    type="number"
                    value={config.roiDefaults.directShareRate}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        roiDefaults: { ...config.roiDefaults, directShareRate: Number(e.target.value) },
                      })
                    }
                    className={styles.fieldInput}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROPERTIES OVERVIEW */}
          {activeTab === "properties" && (
            <div className={styles.formCard}>
              <h2 className={styles.formCardTitle}>محفظة الفنادق والشقق المربوطة بالمنظومة</h2>
              <p className={styles.formCardSub}>
                المنشآت الست المعروضة في المنظومة مع تفاصيل الغرف والمدن.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-blue-600">فندق • جدة</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Swiss Blue Jeddah</div>
                  <div className="text-xs text-slate-500">حي حراء • 44 وحدة سكنية</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-blue-600">فندق • جازان</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Swiss Blue Jazan</div>
                  <div className="text-xs text-slate-500">طريق الكورنيش • إطلالة بحرية</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-emerald-600">شقق فندقية • الرياض</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Vinas Riyadh</div>
                  <div className="text-xs text-slate-500">طريق المطار • إقامات طويلة</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-emerald-600">شقق فندقية • جدة</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Tulip Alrawdah</div>
                  <div className="text-xs text-slate-500">حي الروضة • 36 شقة فندقية</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-emerald-600">شقق فندقية • جدة</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Al-Zahraa Apartments</div>
                  <div className="text-xs text-slate-500">حي الزهراء • 32 وحدة</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-xs">
                  <span className="text-xs font-bold text-emerald-600">شقق فندقية • جدة</span>
                  <div className="font-extrabold text-base text-slate-900 mt-1">Al-Samer Apartments</div>
                  <div className="text-xs text-slate-500">حي السامر • 40 وحدة</div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">نشط في المنظومة</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Manual Lead Modal */}
      {isNewLeadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={() => setIsNewLeadModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-extrabold text-lg text-slate-900 mb-1">تسجيل عميل أو شريك جديد</div>
            <p className="text-xs text-slate-500 mb-4">أدخل بيانات المنشأة للتسجيل في قائمة المتابعة.</p>

            <form onSubmit={handleAddManualLead} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700">الاسم الكامل:</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="اسم الشخص المسؤول"
                  className={styles.fieldInput}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="email@domain.com"
                    className={styles.fieldInput}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">رقم الجوال:</label>
                  <input
                    type="tel"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+966 5x xxx xxxx"
                    className={styles.fieldInput}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">اسم الفندق أو الشركة:</label>
                <input
                  type="text"
                  value={newLead.company}
                  onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                  placeholder="اسم المجموعة الفندقية"
                  className={styles.fieldInput}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">ملاحظات واهتمام العميل:</label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="تفاصيل الغرف، التواريخ، أو متطلبات الربط..."
                  className={styles.fieldTextarea}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className={styles.actionBtn}
                >
                  إلغاء
                </button>
                <button type="submit" className={styles.primaryActionBtn}>
                  حفظ العميل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
