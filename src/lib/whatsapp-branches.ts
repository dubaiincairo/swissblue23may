// Branches reachable from the Google Ads WhatsApp sitelinks (/wa/<branch>). Every branch now uses the unified
// group WhatsApp line (Chatwoot inbox); the greeting names the branch, so the Chatwoot menu bot hands the chat
// straight to that branch team without showing the branch menu.

import { whatsappNumber } from "@/lib/whatsapp-numbers";

export type WhatsAppBranch = {
  slug: string;
  nameAr: string;
};

export const WHATSAPP_BRANCHES: WhatsAppBranch[] = [
  { slug: "heraa", nameAr: "فندق سويس بلو حراء" },
  { slug: "alzahraa", nameAr: "سويس بلو الزهراء" },
  { slug: "alsamer", nameAr: "سويس بلو السامر" },
  { slug: "vinas", nameAr: "ڤيناس الحمراء" },
  { slug: "tulip", nameAr: "توليب الروضة" },
];

export function findWhatsAppBranch(slug: string): WhatsAppBranch | undefined {
  return WHATSAPP_BRANCHES.find((branch) => branch.slug === slug);
}

/** wa.me link with a greeting that names the branch (the ad source is already tracked by the conversion tag). */
export function branchWhatsAppHref(branch: WhatsAppBranch): string {
  const text = `مرحبا، حابّ أستفسر عن ${branch.nameAr}`;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(text)}`;
}
