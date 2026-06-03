import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { Geist_Mono, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { headers } from "next/headers";
import ChatbaseWidget from "@/components/chatbase-widget";
import CookieBanner from "@/components/cookie-banner";
import LiveContentRefresh from "@/components/live-content-refresh";
import NavScrollState from "@/components/nav-scroll-state";
import ScrollObserver from "@/components/scroll-observer";
import { getEditableContent } from "@/lib/editable-content";
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

/**
 * Resolve the active locale's editable SEO settings, falling back to the other
 * locale for shared visual assets (OG image, favicon, theme color, site URL) so
 * the admin only has to set those once.
 */
async function currentSeo() {
  const { ar, en } = await loadContent();
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-locale") === "ar" ? "ar" : "en";
  const s = locale === "ar" ? ar.seo : en.seo;
  const o = locale === "ar" ? en.seo : ar.seo;
  return {
    siteTitle: s.siteTitle || o.siteTitle || "Swiss Blue Hotels",
    metaDescription: s.metaDescription || o.metaDescription || "",
    keywords: s.keywords || o.keywords || "",
    ogTitle: s.ogTitle || s.siteTitle || o.siteTitle || "Swiss Blue Hotels",
    ogDescription: s.ogDescription || s.metaDescription || o.metaDescription || "",
    ogImage: s.ogImage || o.ogImage || "",
    favicon: s.favicon || o.favicon || "",
    twitterCard: s.twitterCard || o.twitterCard || "summary_large_image",
    twitterHandle: s.twitterHandle || o.twitterHandle || "",
    themeColor: s.themeColor || o.themeColor || "#2b6fe8",
    siteUrl: s.siteUrl || o.siteUrl || "",
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
  return {
    title: seo.siteTitle,
    description: seo.metaDescription || undefined,
    keywords: seo.keywords || undefined,
    ...(base ? { metadataBase: base } : {}),
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription || undefined,
      type: "website",
      siteName: "Swiss Blue Hotels",
      ...(base ? { url: base.toString() } : {}),
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card,
      title: seo.ogTitle,
      description: seo.ogDescription || undefined,
      ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    ...(seo.favicon ? { icons: { icon: seo.favicon, shortcut: seo.favicon, apple: seo.favicon } } : {}),
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
  const dir = locale === "ar" ? "rtl" : "ltr";
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
        {children}
        <ChatbaseWidget />
        <CookieBanner copy={{ ar: ar.ui.cookie, en: en.ui.cookie }} />
      </body>
    </html>
  );
}
