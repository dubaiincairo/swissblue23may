import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { Geist_Mono, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { headers } from "next/headers";
import AiChatWidget from "@/components/ai-chat-widget";
import CookieBanner from "@/components/cookie-banner";
import LiveContentRefresh from "@/components/live-content-refresh";
import NavScrollState from "@/components/nav-scroll-state";
import PromotionalPopup from "@/components/promotional-popup";
import ScrollObserver from "@/components/scroll-observer";
import Ga4Analytics from "@/components/ga4-analytics";
import { getEditableContent } from "@/lib/editable-content";
import { defaultPageTitle, pageKeyFromPath } from "@/lib/page-seo";
import "./globals.css";

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

const DEFAULT_SOCIAL_IMAGE = "/opengraph-image";
const DEFAULT_FAVICON = "/icon.png";

// Cached per request so generateMetadata, generateViewport, and the layout body
// all share a single content fetch.
const loadContent = cache(getEditableContent);

function toUrl(value: string): URL | undefined {
  try {
    return value ? new URL(value) : undefined;
  } catch {
    return undefined;
  }
}

type PageSeo = { title?: string; description?: string; ogImage?: string };

/**
 * Resolve SEO for the current request: per-page title/description/OG image
 * (from content[lang].seo.pages, keyed by the request pathname) layered over the
 * global SEO, which itself falls back to the other locale for shared assets
 * (OG image, favicon, theme color, site URL) so they only need setting once.
 */
async function currentSeo() {
  const { ar, en } = await loadContent();
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") === "ar" ? "ar" : "en";
  const pathname = requestHeaders.get("x-pathname") || "";
  const pageKey = pageKeyFromPath(pathname);

  const s = locale === "ar" ? ar.seo : en.seo;
  const o = locale === "ar" ? en.seo : ar.seo;
  const sp: PageSeo = (s.pages as Record<string, PageSeo>)?.[pageKey] ?? {};
  const op: PageSeo = (o.pages as Record<string, PageSeo>)?.[pageKey] ?? {};

  const siteTitle = s.siteTitle || o.siteTitle || "Swiss Blue Hotels";
  const title = sp.title || defaultPageTitle(pageKey, locale, siteTitle);
  const description = sp.description || s.metaDescription || o.metaDescription || "";
  const ogImage = sp.ogImage || op.ogImage || s.ogImage || o.ogImage || DEFAULT_SOCIAL_IMAGE;
  const favicon = s.favicon || o.favicon || DEFAULT_FAVICON;
  const configuredSiteUrl = s.siteUrl || o.siteUrl || "";
  const requestHost = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "";
  const requestProtocol = requestHeaders.get("x-forwarded-proto") || "https";
  const requestSiteUrl = requestHost ? `${requestProtocol}://${requestHost}` : "";
  const siteUrl = configuredSiteUrl.includes("swissblue23may.vercel.app")
    ? requestSiteUrl || configuredSiteUrl
    : configuredSiteUrl || requestSiteUrl;

  return {
    siteTitle: title,
    metaDescription: description,
    keywords: s.keywords || o.keywords || "",
    ogTitle: title,
    ogDescription: description || s.ogDescription || o.ogDescription || "",
    ogImage,
    favicon,
    twitterCard: s.twitterCard || o.twitterCard || "summary_large_image",
    twitterHandle: s.twitterHandle || o.twitterHandle || "",
    themeColor: s.themeColor || o.themeColor || "#2b6fe8",
    siteUrl,
    pathname,
  };
}

export async function generateViewport(): Promise<Viewport> {
  const seo = await currentSeo();
  return { themeColor: seo.themeColor };
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await currentSeo();
  const base = toUrl(seo.siteUrl);
  const card = seo.twitterCard === "summary" ? "summary" : "summary_large_image";
  let canonical: string | undefined;
  if (base) {
    try {
      canonical = new URL(seo.pathname || "/", base).toString();
    } catch {
      canonical = base.toString();
    }
  }
  return {
    title: seo.siteTitle,
    description: seo.metaDescription || undefined,
    keywords: seo.keywords || undefined,
    ...(base ? { metadataBase: base } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription || undefined,
      type: "website",
      siteName: "Swiss Blue Hotels",
      ...(canonical ? { url: canonical } : {}),
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card,
      title: seo.ogTitle,
      description: seo.ogDescription || undefined,
      ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    icons: { icon: seo.favicon, shortcut: seo.favicon, apple: seo.favicon },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ar, en } = await loadContent();
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") === "ar" ? "ar" : "en";
  const pathname = requestHeaders.get("x-pathname") || "";
  const isAdmin =
    pathname.startsWith("/admin") || pathname.startsWith("/studio");
  const dir = locale === "ar" ? "rtl" : "ltr";
  const currentSeo = locale === "ar" ? ar.seo : en.seo;
  const otherSeo = locale === "ar" ? en.seo : ar.seo;
  const analytics = currentSeo.analytics ?? otherSeo.analytics;
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${arabicSans.variable} ${latinSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LiveContentRefresh />
        <NavScrollState />
        <ScrollObserver />
        {!isAdmin ? (
          <Ga4Analytics
            containerId={analytics?.googleTagManagerId}
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
            settings={locale === "ar" ? ar.promotionalPopups : en.promotionalPopups}
          />
        ) : null}
        <AiChatWidget settings={{ ar: ar.chatAssistant, en: en.chatAssistant }} />
        <CookieBanner copy={{ ar: ar.ui.cookie, en: en.ui.cookie }} />
      </body>
    </html>
  );
}
