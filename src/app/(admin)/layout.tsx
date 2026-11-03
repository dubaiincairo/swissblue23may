import type { Metadata, Viewport } from "next";
import SiteRoot from "@/components/site-root";
import { pageMetadata, siteViewport } from "@/lib/site-metadata";

// Admin + Studio: always rendered per request (session-gated), LTR, no marketing tags.
export const dynamic = "force-dynamic";

export function generateViewport(): Promise<Viewport> {
  return siteViewport("en");
}

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("en");
}

export default function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SiteRoot locale="en" variant="admin">
      {children}
    </SiteRoot>
  );
}
