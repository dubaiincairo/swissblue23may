import type { Metadata, Viewport } from "next";
import SiteRoot from "@/components/site-root";
import { getEditableContent } from "@/lib/editable-content";
import { pageMetadata, siteViewport } from "@/lib/site-metadata";

// Admin + Studio: always rendered per request (session-gated), LTR, no marketing tags.
export const dynamic = "force-dynamic";

export function generateViewport(): Promise<Viewport> {
  return siteViewport("en");
}

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("en");
}

export default async function AdminRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getEditableContent({ fresh: true });
  return (
    <SiteRoot locale="en" variant="admin" content={content}>
      {children}
    </SiteRoot>
  );
}
