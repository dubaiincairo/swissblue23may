import type { Metadata, Viewport } from "next";
import SiteRoot from "@/components/site-root";
import { pageMetadata, siteViewport } from "@/lib/site-metadata";

// Public pages are cached and re-rendered at most once a day; a CMS save
// expires them immediately (see /api/site-content). No request APIs are read here.
// Was 300 s: re-rendering every page every 5 minutes used up the Vercel Hobby
// "Fluid Active CPU" allowance and paused the whole team on 20 Nov 2026.
export const revalidate = 86400;

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
