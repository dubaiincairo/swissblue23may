import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { getEditableContent } from "@/lib/editable-content";
import { defaultPageTitle, pageKeyFromPath, type PageLocale } from "@/lib/page-seo";

/**
 * Site-wide SEO resolved from the editable content, without reading the request.
 *
 * Pages call `pageMetadata(locale, pathname)` from their own `generateMetadata`
 * so every public route stays statically cacheable (no `headers()` call). The
 * per-page title/description/OG image come from content[lang].seo.pages keyed by
 * the route slug, layered over the global SEO, which itself falls back to the
 * other locale for shared assets (OG image, favicon, theme color, site URL).
 */

const DEFAULT_SOCIAL_IMAGE = "/opengraph-image";
const DEFAULT_FAVICON = "/icon.png";
const PRODUCTION_SITE_URL = "https://swissblue.sa";

/** One content fetch shared by metadata, viewport and the root layout within a render. */
export const loadSiteContent = cache(getEditableContent);

function toUrl(value: string): URL | undefined {
  try {
    return value ? new URL(value) : undefined;
  } catch {
    return undefined;
  }
}

type PageSeo = { title?: string; description?: string; ogImage?: string };

/** Canonical host when the configured site URL still points at a *.vercel.app preview. */
function fallbackSiteUrl(): string {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  return host ? `https://${host}` : PRODUCTION_SITE_URL;
}

async function resolveSeo(locale: PageLocale, pathname: string) {
  const { ar, en } = await loadSiteContent();
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
  const siteUrl = configuredSiteUrl.includes(".vercel.app")
    ? fallbackSiteUrl()
    : configuredSiteUrl || fallbackSiteUrl();

  return {
    title,
    description,
    keywords: s.keywords || o.keywords || "",
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

/** `<meta name="theme-color">` for a locale tree. */
export async function siteViewport(locale: PageLocale): Promise<Viewport> {
  const seo = await resolveSeo(locale, "/");
  return { themeColor: seo.themeColor };
}

/**
 * Full metadata for one public page. `pathname` is the canonical public path
 * ("/about", "/en/hotels/jeddah"); omit it for a locale-level fallback with no canonical.
 */
export async function pageMetadata(locale: PageLocale, pathname?: string): Promise<Metadata> {
  const seo = await resolveSeo(locale, pathname ?? "");
  const base = toUrl(seo.siteUrl);
  const card = seo.twitterCard === "summary" ? "summary" : "summary_large_image";
  let canonical: string | undefined;
  if (base && pathname) {
    try {
      canonical = new URL(pathname, base).toString();
    } catch {
      canonical = base.toString();
    }
  }
  return {
    title: seo.title,
    description: seo.description || undefined,
    keywords: seo.keywords || undefined,
    ...(base ? { metadataBase: base } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: seo.title,
      description: seo.ogDescription || undefined,
      type: "website",
      siteName: "Swiss Blue Hotels",
      ...(canonical ? { url: canonical } : {}),
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card,
      title: seo.title,
      description: seo.ogDescription || undefined,
      ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
    icons: { icon: seo.favicon, shortcut: seo.favicon, apple: seo.favicon },
  };
}
