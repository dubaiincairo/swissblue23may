"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Bot,
  Languages,
  Sliders,
  Building2,
  Zap,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Printer,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
} from "lucide-react";
import styles from "./overview.module.css";

export type Locale = "ar" | "en";

interface OverviewInteractiveProps {
  locale: Locale;
}

export function OverviewInteractive({ locale }: OverviewInteractiveProps) {
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState<string>("ai-concierge");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInterest, setModalInterest] = useState<string>("");

  // AI Concierge Chat Simulator State
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "bot" | "user"; text: string }>
  >(
    isAr
      ? [
          {
            sender: "bot",
            text: "مرحباً بك! أنا سارة، المساعد الذكي لفنادق سويس بلو. كيف يمكنني مساعدتك في استكشاف منشآتنا أو ترتيب حجزك اليوم؟",
          },
        ]
      : [
          {
            sender: "bot",
            text: "Welcome! I'm Sarah, your Swiss Blue AI Concierge. How can I assist you with exploring our properties or securing your reservation today?",
          },
        ],
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // ROI Calculator State
  const [roomsCount, setRoomsCount] = useState<number>(45);
  const [adr, setAdr] = useState<number>(380);
  const [occupancy, setOccupancy] = useState<number>(75);

  // Calculate annual savings assuming 30% direct bookings shifting from 18% OTA commission
  const monthlyRevenue = roomsCount * (occupancy / 100) * 30 * adr;
  const directBookingShare = 0.35; // 35% captured via direct web platform
  const otaCommissionRate = 0.18; // 18% typical OTA fee
  const annualSavings = Math.round(
    monthlyRevenue * directBookingShare * otaCommissionRate * 12,
  );

  // Form State
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSimPrompt = (userText: string, botResponse: string) => {
    if (isTyping) return;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/forms/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.company || "Marketing Overview Lead",
          contactPerson: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyType: modalInterest || "Product Overview Pitch",
          requestType: "Platform Demo & Partnership",
          notes: formData.message || "Lead submitted from /product-overview page",
        }),
      });
    } catch {
      // Graceful fallback
    }
    setFormSubmitted(true);
  };

  const openDemoModal = (interest: string = "Platform Demo") => {
    setModalInterest(interest);
    setFormSubmitted(false);
    setIsModalOpen(true);
  };

  const samplePromptsAr = [
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
  ];

  const samplePromptsEn = [
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
  ];

  const prompts = isAr ? samplePromptsAr : samplePromptsEn;

  return (
    <>
      {/* Interactive Tabs Navigation */}
      <div className={styles.tabNav} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "ai-concierge"}
          onClick={() => setActiveTab("ai-concierge")}
          className={`${styles.tabBtn} ${activeTab === "ai-concierge" ? styles.tabBtnActive : ""}`}
        >
          <Bot size={18} />
          <span>{isAr ? "المرشد الذكي الفندقي" : "24/7 AI Concierge"}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "direct-booking"}
          onClick={() => setActiveTab("direct-booking")}
          className={`${styles.tabBtn} ${activeTab === "direct-booking" ? styles.tabBtnActive : ""}`}
        >
          <TrendingUp size={18} />
          <span>{isAr ? "محرك الحجز وعائد الأرباح" : "Direct Booking & ROI"}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "bilingual-parity"}
          onClick={() => setActiveTab("bilingual-parity")}
          className={`${styles.tabBtn} ${activeTab === "bilingual-parity" ? styles.tabBtnActive : ""}`}
        >
          <Languages size={18} />
          <span>{isAr ? "الهوية الثنائية (عربي/إنجليزي)" : "Bilingual RTL/LTR Parity"}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "headless-cms"}
          onClick={() => setActiveTab("headless-cms")}
          className={`${styles.tabBtn} ${activeTab === "headless-cms" ? styles.tabBtnActive : ""}`}
        >
          <Sliders size={18} />
          <span>{isAr ? "إدارة المحتوى الفورية (CMS)" : "Real-Time Headless CMS"}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "multi-property"}
          onClick={() => setActiveTab("multi-property")}
          className={`${styles.tabBtn} ${activeTab === "multi-property" ? styles.tabBtnActive : ""}`}
        >
          <Building2 size={18} />
          <span>{isAr ? "إدارة محفظة الفنادق" : "Multi-Property Ecosystem"}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "performance-seo"}
          onClick={() => setActiveTab("performance-seo")}
          className={`${styles.tabBtn} ${activeTab === "performance-seo" ? styles.tabBtnActive : ""}`}
        >
          <Zap size={18} />
          <span>{isAr ? "الأداء الفائق وSEO" : "Sub-Second Speed & SEO"}</span>
        </button>
      </div>

      {/* Feature Spotlight Tab Panels */}
      {activeTab === "ai-concierge" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <Sparkles size={14} />
              <span>{isAr ? "الميزة الحصرية" : "Flagship AI Capability"}</span>
            </div>
            <h3>
              {isAr
                ? "مساعد فندقي ذكي يعمل على مدار الساعة لزيادة المبيعات"
                : "24/7 Intelligent Concierge Driving Direct Conversion"}
            </h3>
            <p>
              {isAr
                ? "مدمج بالكامل في رحلة الضيف، يجيب باللغتين العربية والإنجليزية على جميع الاستفسارات الفندقية، يوصي بالغرف المناسبة، ويجمع بيانات الحجوزات وتعاقدات الشركات آلياً إلى لوحة التحكم."
                : "A native conversational AI agent answering property inquiries in Arabic and English, recommending room categories, and capturing qualified booking & B2B leads instantly."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "استجابة فورية فائقة السرعة في أقل من ثانيتين."
                    : "Ultra-fast response time in under 2 seconds."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "التقاط بيانات العميل المهتم (الاسم، الجوال، التواريخ) وتحويلها كفرصة بيعية."
                    : "Automated guest lead capture directly to the CRM."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "معرفة تامة بتفاصيل جميع الفنادق والخدمات والمطاعم وعروض الشركات."
                    : "Trained on all 6 properties, policies, amenities, and B2B packages."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("AI Concierge Demo")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "طلب تجربة المساعد الذكي لعلامتك" : "Request AI Demo for Your Brand"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div className={styles.chatSimContainer}>
              <div className={styles.chatSimHeader}>
                <Image
                  src="/images/sarah-al-otaibi-concierge.jpg"
                  alt="Sarah Al-Otaibi AI Concierge"
                  width={44}
                  height={44}
                  className={styles.chatAvatar}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0f172a" }}>
                    {isAr ? "سارة العتيبي - المرشد الذكي" : "Sarah Al-Otaibi - AI Concierge"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>
                    {isAr ? "متصلة الآن • الرد فوري" : "Online • Instant Answers"}
                  </div>
                </div>
              </div>

              <div className={styles.chatSimBody}>
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={msg.sender === "bot" ? styles.chatBubbleBot : styles.chatBubbleUser}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className={styles.chatBubbleBot} style={{ color: "#64748b" }}>
                    {isAr ? "سارة تكتب الآن..." : "Sarah is typing..."}
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.375rem" }}>
                  {isAr ? "جرّب النقر على أحد الأسئلة الشائعة:" : "Click a sample question to test live:"}
                </div>
                <div className={styles.chatPromptChips}>
                  {prompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={styles.chatPromptChip}
                      onClick={() => handleSimPrompt(p.q, p.a)}
                    >
                      {p.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "direct-booking" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <TrendingUp size={14} />
              <span>{isAr ? "تحقيق أعلى هوامش ربحية" : "Direct Revenue Optimization"}</span>
            </div>
            <h3>
              {isAr
                ? "محرك حجز مباشر يوفر عمولات منصات السفر بنسبة 100%"
                : "High-Converting Direct Booking Slashing OTA Commissions"}
            </h3>
            <p>
              {isAr
                ? "تم تصميم تدفق الحجز السريع لتقليل خطوات إتمام الطلب إلى النصف، مع التكامل المباشر مع أنظمة إدارة الفنادق (PMS)، مما يحافظ على ولاء العميل وهوامش الربح الكاملة."
                : "Streamlined 2-step booking funnel deeply linked with PMS engines, driving guests away from commission-heavy OTAs like Booking.com and Agoda directly into your direct revenue channel."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "توفير 15% - 20% من عمولات وكالات السفر الإلكترونية (OTAs)."
                    : "Saves 15% - 20% in recurring third-party booking commissions."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تقويم أسعار وتوافر فوري ومتجاوب على جميع الهواتف الذكية."
                    : "Mobile-first real-time date & room inventory picker."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "عروض حصرية ورموز ترويجية لزيادة تكرار الحجوزات."
                    : "Built-in promo codes & loyalty reward incentives."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("Direct Booking Engine")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "حساب العائد المتوقع لمنشأتك" : "Calculate Brand ROI"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div className={styles.calcCard}>
              <div style={{ fontWeight: 800, fontSize: "1.125rem", color: "#0f172a", marginBottom: "1.25rem" }}>
                {isAr ? "حاسبة التوفير المالي من الحجز المباشر" : "Direct Booking Savings Calculator"}
              </div>

              <div className={styles.calcSliderGroup}>
                <div className={styles.calcLabelRow}>
                  <span>{isAr ? "عدد الغرف الإجمالي:" : "Total Room Inventory:"}</span>
                  <span className={styles.calcVal}>{roomsCount} {isAr ? "وحدة" : "units"}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={250}
                  step={5}
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(Number(e.target.value))}
                  className={styles.calcSlider}
                />
              </div>

              <div className={styles.calcSliderGroup}>
                <div className={styles.calcLabelRow}>
                  <span>{isAr ? "متوسط السعر اليومي (ADR):" : "Average Daily Rate (ADR):"}</span>
                  <span className={styles.calcVal}>{adr} {isAr ? "ريال" : "SAR"}</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={1200}
                  step={25}
                  value={adr}
                  onChange={(e) => setAdr(Number(e.target.value))}
                  className={styles.calcSlider}
                />
              </div>

              <div className={styles.calcSliderGroup}>
                <div className={styles.calcLabelRow}>
                  <span>{isAr ? "نسبة الإشغال المقدرة:" : "Average Occupancy Rate:"}</span>
                  <span className={styles.calcVal}>{occupancy}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  step={5}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className={styles.calcSlider}
                />
              </div>

              <div className={styles.calcResultBox}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1e40af" }}>
                  {isAr ? "التوفير السنوي التقديري من عمولات الـ OTA" : "Estimated Annual OTA Commission Savings"}
                </div>
                <div className={styles.calcSavingsNum}>
                  {annualSavings.toLocaleString()} {isAr ? "ريال سعودي" : "SAR"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#475569" }}>
                  {isAr
                    ? "* بحساب تحويل 35% من الحجوزات إلى المنصة المباشرة بعمولة 18%."
                    : "* Assuming 35% direct conversion capture vs 18% OTA fee."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "bilingual-parity" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <Languages size={14} />
              <span>{isAr ? "تناغم ثقافي وتصميمي" : "Cultural & Design Excellence"}</span>
            </div>
            <h3>
              {isAr
                ? "هوية ثنائية اللغة مبنية من الصفر وليست مجرد ترجمة آلية"
                : "100% Native Bilingual Parity (True Arabic RTL + English LTR)"}
            </h3>
            <p>
              {isAr
                ? "تصميم متناسق تماماً يدعم خطوط Noto Kufi وCairo الفاخرة للواجهة العربية مع Geist للإنجليزية، مما يمنح الضيوف السعوديين والدوليين تجربة تصفح أصيلة تعكس كرم الضيافة السعودية."
                : "Engineered from the ground up with mirrored layout architecture, typography balancing (Noto Kufi / Cairo paired with Geist), and authentic Saudi cultural tone of voice."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "توجيه بصري متكامل RTL / LTR بدون أخطاء محاذاة."
                    : "Zero CSS layout distortion across both writing directions."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "محتوى محلي مصمم خصيصاً للوجهات (الرياض، جدة، جازان)."
                    : "Localized destination copy tailored to Saudi & international travelers."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تبديل لغة فوري مع الاحتفاظ بنفس مسار الصفحة."
                    : "Instant locale switching with persistent deep-page routing."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("Bilingual Experience")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "استكشاف تفاصيل التجربة" : "Explore Bilingual Architecture"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "1rem",
                  padding: "1.25rem",
                  direction: "rtl",
                  textAlign: "right",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2b6fe8", marginBottom: "0.25rem" }}>
                  الواجهة العربية (RTL) • Noto Kufi Arabic
                </div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>
                  إقامة راقية في قلب وجهات المملكة
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>
                  فنادق وأجنحة وشقق فندقية لاختيارات أوضح وإقامات أريح في جدة والرياض وجازان.
                </div>
              </div>

              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "1rem",
                  padding: "1.25rem",
                  direction: "ltr",
                  textAlign: "left",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2b6fe8", marginBottom: "0.25rem" }}>
                  English Interface (LTR) • Inter / Geist Sans
                </div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>
                  Stay Beautifully Across Saudi Arabia
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "0.25rem" }}>
                  Hotels, suites, and serviced apartments designed for seamless city visits in Jeddah, Riyadh, and Jazan.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "headless-cms" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <Sliders size={14} />
              <span>{isAr ? "مرونة تسويقية فورية" : "Agile Content Management"}</span>
            </div>
            <h3>
              {isAr
                ? "لوحة تحكم Sanity v3 لتحديث الأسعار والعروض في ثوانٍ"
                : "Real-Time Headless CMS: Instant Promotional Power"}
            </h3>
            <p>
              {isAr
                ? "تمكن إدارة الفنادق وفريق التسويق من إطلاق باقات المواسم، تعديل الصور والخدمات، وتحديث شارات الحجوزات فورياً دون الحاجة لكتابة أي كود برمجي أو انتظار فرق التطوير."
                : "Empowers your marketing and revenue operations to launch seasonal campaigns, adjust room descriptions, toggle amenity badges (e.g. 'Breakfast Buffet - Soon'), and publish gallery updates in seconds."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تعديل فوري للبانرات الترويجية وعروض نهاية الأسبوع."
                    : "Zero-downtime seasonal promo banners and flash sales."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "إدارة متزامنة للمحتوى العربي والإنجليزي من شاشة واحدة."
                    : "Unified bilingual editing environment in Sanity Studio v3."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "نظام إعادة صياغة النصوص بالذكاء الاصطناعي بنقرة زر."
                    : "AI-assisted marketing copy rephrasing built right in."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("Sanity CMS Overview")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "طلب استعراض لوحة التحكم" : "Request CMS Walkthrough"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #dbe9ff",
                borderRadius: "1.25rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1e293b" }}>
                  {isAr ? "محاكي تحديثات المحتوى الفوري" : "Live CMS Synchronization"}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#16a34a", background: "#dcfce7", padding: "0.2rem 0.5rem", borderRadius: "9999px", fontWeight: 700 }}>
                  Active Singleton
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "الحقل: إشعار العرض الترويجي" : "Field: Promo Alert"}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a" }}>
                    {isAr ? "احجز 3 ليالٍ واحصل على خصم 20% في عطلة نهاية الأسبوع" : "Book 3 Nights & Save 20% on Weekend Escapes"}
                  </div>
                </div>

                <div style={{ padding: "0.75rem", background: "#f8fafc", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "الحقل: شارة الخدمات (توليب الروضة)" : "Field: Amenity Badge"}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0f172a" }}>
                      {isAr ? "بوفيه إفطار فاخر" : "Breakfast Buffet"}
                    </span>
                    <span style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.7rem", padding: "0.15rem 0.4rem", borderRadius: "9999px", fontWeight: 700 }}>
                      {isAr ? "قريباً" : "Soon"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "multi-property" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <Building2 size={14} />
              <span>{isAr ? "محفظة فندقية موحدة" : "Unified Property Portfolio"}</span>
            </div>
            <h3>
              {isAr
                ? "إدارة متكاملة لـ 6 منشآت فندقية وشقق مخدومة في 3 مدن"
                : "Seamless Portfolio Management Across 6 Saudi Properties"}
            </h3>
            <p>
              {isAr
                ? "منصة واحدة تجمع الفنادق والأجنحة والشقق الفندقية في جدة والرياض وجازان، تتيح للزوار والشركات استكشاف كافة الخيارات والمقارنة بين الوحدات وحجز الإقامة المناسبة بسهولة تامة."
                : "Unifies hotels and serviced apartments across Jeddah, Riyadh, and Jazan into a single digital powerhouse with dedicated unit inventories, custom floor plans, and city hubs."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "صفحات مستقلة لكل فندق بمعرض صور وموقع تفاعلي وخريطة معالم."
                    : "Individual property showcase pages with interactive maps."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تصنيف دقيق لوحدات الأعمال، العائلات، والإقامات الطويلة."
                    : "Granular categorization for corporate, family, and extended stays."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تكامل مع نظام تخطيط الموارد والفواتير (ERP/PMS Connector)."
                    : "Full readiness for Odoo ERP and eZee Absolute PMS synchronization."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("Multi-Property Management")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "ضم منشأتك إلى المنظومة" : "Onboard Your Hotel Property"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div style={{ background: "#ffffff", padding: "0.875rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.75rem", color: "#2b6fe8", fontWeight: 700 }}>{isAr ? "فندق" : "Hotel"} • {isAr ? "جدة" : "Jeddah"}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0f172a" }}>Swiss Blue Jeddah</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "حي حراء • غرف وأجنحة" : "Heraa District • 44 Units"}</div>
              </div>
              <div style={{ background: "#ffffff", padding: "0.875rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.75rem", color: "#2b6fe8", fontWeight: 700 }}>{isAr ? "فندق" : "Hotel"} • {isAr ? "جازان" : "Jazan"}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0f172a" }}>Swiss Blue Jazan</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "طريق الكورنيش • إطلالة بحرية" : "Corniche Road • Ocean View"}</div>
              </div>
              <div style={{ background: "#ffffff", padding: "0.875rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>{isAr ? "شقق فندقية" : "Aparthotel"} • {isAr ? "الرياض" : "Riyadh"}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0f172a" }}>Vinas Riyadh</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "طريق المطار • إقامات طويلة" : "Airport Road • Long Stays"}</div>
              </div>
              <div style={{ background: "#ffffff", padding: "0.875rem", borderRadius: "0.75rem", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>{isAr ? "شقق فندقية" : "Aparthotel"} • {isAr ? "جدة" : "Jeddah"}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0f172a" }}>Tulip Alrawdah</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{isAr ? "حي الروضة • 36 وحدة" : "Alrawdah • 36 Apartments"}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "performance-seo" && (
        <div className={styles.featureSpotlight}>
          <div className={styles.featureCopy}>
            <div className={styles.sectionBadge}>
              <Zap size={14} />
              <span>{isAr ? "سرعة وأرشفة استثنائية" : "Cloud Speed & SEO Architecture"}</span>
            </div>
            <h3>
              {isAr
                ? "بنية سحابية فائقة السرعة على Next.js 16 وVercel Edge"
                : "Sub-Second Edge Rendering & Google Schema Mastery"}
            </h3>
            <p>
              {isAr
                ? "سرعة تحميل قياسية تقل عن ثانية واحدة (0.8s) مع توافق كامل مع معايير Google Core Web Vitals وبيانات منظمة Schema JSON-LD لكل فندق وغرفة لضمان صدارة محركات البحث."
                : "Built with Next.js 16 Turbopack and deployed on Vercel Global Edge network, delivering sub-second LCP and Google Rich Snippet dominance for Saudi hospitality keywords."}
            </p>
            <div className={styles.featureList}>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "سرعة LCP قياسية 0.8 ثانية وتحميل فوري على شبكات 5G والجوال."
                    : "0.8s LCP load time with zero layout shift (CLS: 0.0)."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "بيانات منظمة متكاملة (LodgingBusiness, Hotel, FAQPage)."
                    : "Complete JSON-LD structured data for Google Search rich cards."}
                </span>
              </div>
              <div className={styles.featureListItem}>
                <CheckCircle2 className={styles.featureListIcon} />
                <span>
                  {isAr
                    ? "تتبع دقيق لمعدلات التحويل والأحداث عبر Google Analytics 4."
                    : "Real-time conversion tracking & event telemetry via GA4."}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDemoModal("Technical Architecture")}
              className={styles.ctaBtn}
            >
              <span>{isAr ? "طلب التقرير التقني الكامل" : "Request Full Technical Audit"}</span>
              {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>

          <div className={styles.featureInteractivePreview}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", textAlign: "center" }}>
              <div style={{ background: "#ffffff", padding: "1.25rem 0.5rem", borderRadius: "1rem", border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a" }}>0.8s</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b" }}>LCP Speed</div>
                <div style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600 }}>Good (Top 1%)</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1.25rem 0.5rem", borderRadius: "1rem", border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a" }}>0.0</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b" }}>CLS Drift</div>
                <div style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600 }}>Zero Shift</div>
              </div>
              <div style={{ background: "#ffffff", padding: "1.25rem 0.5rem", borderRadius: "1rem", border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#16a34a" }}>100</div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e293b" }}>SEO Score</div>
                <div style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600 }}>Google Verified</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsModalOpen(false)}
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            {!formSubmitted ? (
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", color: "#1246a8", fontWeight: 700, fontSize: "0.8125rem", background: "#eaf2ff", padding: "0.25rem 0.75rem", borderRadius: "9999px", marginBottom: "0.75rem" }}>
                  <Sparkles size={14} />
                  <span>{modalInterest || (isAr ? "طلب عرض المنصة" : "Platform Inquiry")}</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                  {isAr ? "احصل على عرض مخصص لمنشأتك" : "Schedule a Personalized Demo"}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#475569", marginBottom: "1.5rem" }}>
                  {isAr
                    ? "سيتواصل معك فريقنا المتخصص لتقديم استعراض حي للمنصة ومناقشة فرص التعاون والنمو."
                    : "Our team will arrange a tailored live walkthrough and discuss direct partnership opportunities."}
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                      {isAr ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "مثال: عبد الله الغامدي" : "e.g. Abdullah Al-Ghamdi"}
                      className={styles.formInput}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                        {isAr ? "البريد الإلكتروني *" : "Work Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                        {isAr ? "رقم الجوال / واتساب *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5x xxx xxxx"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                      {isAr ? "اسم الشركة / الفندق" : "Company / Hotel Property"}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isAr ? "اسم المنشأة أو المجموعة" : "Property or Group Name"}
                      className={styles.formInput}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.heroPrimaryBtn}
                    style={{
                      background: "#2b6fe8",
                      color: "#ffffff",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                      boxShadow: "0 4px 14px rgba(43, 111, 232, 0.35)",
                    }}
                  >
                    <Send size={16} />
                    <span>{isAr ? "إرسال طلب العرض التجريبي" : "Submit Demo Request"}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "9999px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                  {isAr ? "تم استلام طلبك بنجاح!" : "Request Received Successfully!"}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "#475569", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                  {isAr
                    ? "شكراً لاهتمامك بالمنظومة الرقمية لسويس بلو. سيتواصل معك أحد مستشارينا خلال 24 ساعة لترتيب العرض التقديمي وتزويدك بكافة الملفات."
                    : "Thank you for your interest in Swiss Blue's digital platform. Our team will contact you within 24 hours to schedule your demo."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.ctaBtn}
                  style={{ margin: "0 auto" }}
                >
                  <span>{isAr ? "إغلاق النافذة" : "Close"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function PrintDeckButton({
  locale,
  label,
  variant = "header",
}: {
  locale: Locale;
  label?: string;
  variant?: "header" | "hero";
}) {
  const isAr = locale === "ar";
  const defaultLabel = isAr ? "طباعة / حفظ PDF" : "Print / PDF Deck";

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={handlePrint}
        className={styles.heroSecondaryBtn}
      >
        <Printer size={18} />
        <span>{label || defaultLabel}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePrint}
      className={styles.printBtn}
      title={isAr ? "حفظ كملف PDF أو طباعة العرض" : "Export or Print Presentation Deck"}
    >
      <Printer size={15} />
      <span>{label || defaultLabel}</span>
    </button>
  );
}

export function OpenModalButton({
  locale,
  label,
  interest = "General Inquiry",
  variant = "primary",
}: {
  locale: Locale;
  label: string;
  interest?: string;
  variant?: "primary" | "secondary" | "header";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });
  const isAr = locale === "ar";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/forms/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.company || "Product Overview Lead",
          contactPerson: formData.name,
          email: formData.email,
          phone: formData.phone,
          companyType: interest,
          requestType: "Platform Demo & Partnership",
        }),
      });
    } catch {}
    setIsSubmitted(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsSubmitted(false);
          setIsOpen(true);
        }}
        className={
          variant === "header"
            ? styles.ctaBtn
            : variant === "secondary"
              ? styles.heroSecondaryBtn
              : styles.heroPrimaryBtn
        }
      >
        {variant === "primary" && <Sparkles size={18} />}
        <span>{label}</span>
        {isAr ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {isOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsOpen(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>

            {!isSubmitted ? (
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", color: "#1246a8", fontWeight: 700, fontSize: "0.8125rem", background: "#eaf2ff", padding: "0.25rem 0.75rem", borderRadius: "9999px", marginBottom: "0.75rem" }}>
                  <Sparkles size={14} />
                  <span>{interest}</span>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                  {isAr ? "طلب عرض تجريبي واستشارة فندقية" : "Request Platform Demo & Consultation"}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#475569", marginBottom: "1.5rem" }}>
                  {isAr
                    ? "أدخل بيانات التواصل الخاصة بك وسيقوم مستشارنا الرقمي بالرد عليك خلال دقائق."
                    : "Fill in your contact details and our digital hospitality consultant will reach out shortly."}
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                      {isAr ? "الاسم الكامل *" : "Full Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isAr ? "الاسم الكريم" : "Your Name"}
                      className={styles.formInput}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                        {isAr ? "البريد الإلكتروني *" : "Email *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                        {isAr ? "رقم الهاتف / واتساب *" : "Phone / WhatsApp *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5x xxx xxxx"
                        className={styles.formInput}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151" }}>
                      {isAr ? "اسم المنشأة / الفندق" : "Property / Company Name"}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={isAr ? "اسم المنشأة" : "Company Name"}
                      className={styles.formInput}
                    />
                  </div>

                  <button
                    type="submit"
                    className={styles.heroPrimaryBtn}
                    style={{
                      background: "#2b6fe8",
                      color: "#ffffff",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Send size={16} />
                    <span>{isAr ? "إرسال البيانات الآن" : "Submit Inquiry"}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "9999px",
                    background: "#dcfce7",
                    color: "#16a34a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>
                  {isAr ? "تم إرسال طلبك بنجاح" : "Inquiry Received!"}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "#475569", marginBottom: "1.75rem" }}>
                  {isAr
                    ? "سيتواصل معك فريق سويس بلو الرقمي لتقديم العرض التوضيحي."
                    : "Our team will be in touch shortly to assist with your inquiry."}
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={styles.ctaBtn}
                  style={{ margin: "0 auto" }}
                >
                  <span>{isAr ? "حسناً" : "Done"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
