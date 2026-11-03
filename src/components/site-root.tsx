import { Geist_Mono, Inter, Noto_Kufi_Arabic } from "next/font/google";
import AiChatWidget from "@/components/ai-chat-widget";
import ClickIdForwarder from "@/components/click-id-forwarder";
import CookieBanner from "@/components/cookie-banner";
import NavScrollState from "@/components/nav-scroll-state";
import PromotionalPopup from "@/components/promotional-popup";
import ScrollObserver from "@/components/scroll-observer";
import Ga4Analytics from "@/components/ga4-analytics";
import WhatsAppButton from "@/components/whatsapp-button";
import type { PageLocale } from "@/lib/page-seo";
import { loadSiteContent } from "@/lib/site-metadata";
import "@/app/globals.css";

const arabicSans = Noto_Kufi_Arabic({
  variable: "--font-arabic-sans",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
});

// Latin-optimized font used on the English (/en) tree; Arabic keeps Noto Kufi Arabic.
const latinSans = Inter({
  variable: "--font-latin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const FONT_CLASS_NAMES = `${arabicSans.variable} ${latinSans.variable} ${geistMono.variable} h-full antialiased`;

/**
 * The `<html>`/`<body>` shell shared by the three root layouts (Arabic site,
 * English site, admin). The locale is fixed by the route group that renders it,
 * so no request header is read and public pages can be served from the cache.
 */
export default async function SiteRoot({
  locale,
  variant = "site",
  children,
}: Readonly<{
  locale: PageLocale;
  variant?: "site" | "admin";
  children: React.ReactNode;
}>) {
  const { ar, en } = await loadSiteContent();
  const isAdmin = variant === "admin";
  const dir = locale === "ar" ? "rtl" : "ltr";
  const currentSeo = locale === "ar" ? ar.seo : en.seo;
  const otherSeo = locale === "ar" ? en.seo : ar.seo;
  const analytics = currentSeo.analytics ?? otherSeo.analytics;
  const gtmId =
    analytics?.googleTagManagerId?.trim() ||
    process.env.NEXT_PUBLIC_GTM_CONTAINER_ID?.trim() ||
    "GTM-TXF4KBPZ";
  return (
    <html lang={locale} dir={dir} className={FONT_CLASS_NAMES}>
      <head>
        {!isAdmin && gtmId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        {!isAdmin && gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <NavScrollState />
        <ScrollObserver />
        {!isAdmin ? <ClickIdForwarder /> : null}
        {!isAdmin ? (
          <Ga4Analytics
            containerId={gtmId}
            measurementId={
              analytics?.ga4MeasurementId ||
              process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
            }
            requireConsent={analytics?.requireCookieConsent !== false}
          />
        ) : null}
        {children}
        {!isAdmin ? (
          <PromotionalPopup
            settings={{ ar: ar.promotionalPopups, en: en.promotionalPopups }}
          />
        ) : null}
        {!isAdmin ? <WhatsAppButton locale={locale} /> : null}
        <AiChatWidget settings={{ ar: ar.chatAssistant, en: en.chatAssistant }} />
        <CookieBanner copy={{ ar: ar.ui.cookie, en: en.ui.cookie }} />
      </body>
    </html>
  );
}
