// Branches reachable from the Google Ads WhatsApp sitelinks (/wa/<branch>). Every branch now uses the unified
// group WhatsApp line (Chatwoot inbox); the greeting names the branch so reception routes the chat.

import { whatsappNumber } from "@/lib/whatsapp-numbers";

export type WhatsAppBranch = {
  slug: string;
  nameAr: string;
};

export const WHATSAPP_BRANCHES: WhatsAppBranch[] = [
  { slug: "heraa", nameAr: "سويس بلو حراء" },
  { slug: "alzahraa", nameAr: "سويس بلو الزهراء" },
  { slug: "alsamer", nameAr: "سويس بلو السامر" },
  { slug: "vinas", nameAr: "فيناس" },
  { slug: "tulip", nameAr: "توليب" },
];

export function findWhatsAppBranch(slug: string): WhatsAppBranch | undefined {
  return WHATSAPP_BRANCHES.find((branch) => branch.slug === slug);
}

/** wa.me link with a greeting that tells reception the guest came from a Google ad. */
export function branchWhatsAppHref(branch: WhatsAppBranch): string {
  const text = `مرحباً، وصلت من إعلان جوجل وأرغب بالاستفسار عن الحجز في ${branch.nameAr}.`;
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(text)}`;
}
