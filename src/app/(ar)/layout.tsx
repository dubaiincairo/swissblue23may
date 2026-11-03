import type { Metadata, Viewport } from "next";
import SiteRoot from "@/components/site-root";
import { pageMetadata, siteViewport } from "@/lib/site-metadata";

// Public pages are cached and re-rendered at most every 5 minutes; a CMS save
// expires them immediately (see /api/site-content). No request APIs are read here.
export const revalidate = 300;

export function generateViewport(): Promise<Viewport> {
  return siteViewport("ar");
}

// Locale-level fallback; every page supplies its own full metadata via pageMetadata().
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("ar");
}

export default function ArabicRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteRoot locale="ar">{children}</SiteRoot>;
}
