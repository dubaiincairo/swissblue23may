import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WhatsAppRedirect from "@/components/whatsapp-redirect";
import {
  WHATSAPP_BRANCHES,
  branchWhatsAppHref,
  findWhatsAppBranch,
} from "@/lib/whatsapp-branches";
import { pageMetadata } from "@/lib/site-metadata";

// Landing point for the Google Ads WhatsApp sitelinks: records the conversion through
// Tag Manager (dataLayer event "wa_ad_redirect"), then opens the branch's WhatsApp chat.
// A direct wa.me sitelink cannot be measured because no page of ours loads.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  const base = await pageMetadata("ar", `/wa/${branch}`);
  return {
    ...base,
    title: "WhatsApp",
    robots: { index: false, follow: false },
    // No English twin exists for this route, so advertise no language alternates.
    alternates: base.alternates?.canonical ? { canonical: base.alternates.canonical } : undefined,
  };
}

// Unknown slugs are a static 404 (no render), so URL scans cost nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return WHATSAPP_BRANCHES.map((branch) => ({ branch: branch.slug }));
}

export default async function WhatsAppBranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch: slug } = await params;
  const branch = findWhatsAppBranch(slug);
  if (!branch) {
    notFound();
  }

  return (
    <WhatsAppRedirect
      branch={branch.slug}
      href={branchWhatsAppHref(branch)}
      nameAr={branch.nameAr}
    />
  );
}
