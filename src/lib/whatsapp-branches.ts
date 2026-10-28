// Branch WhatsApp numbers used by the Google Ads WhatsApp sitelinks (/wa/<branch>).
// Same numbers as the branch contact replies in Chatwoot (docs/CANNED_REPLIES_AR.md in swissbluechatwoot).

export type WhatsAppBranch = {
  slug: string;
  number: string; // international format, digits only
  nameAr: string;
};

export const WHATSAPP_BRANCHES: WhatsAppBranch[] = [
  { slug: "heraa", number: "966550514554", nameAr: "سويس بلو حراء" },
  { slug: "alzahraa", number: "966539013343", nameAr: "سويس بلو الزهراء" },
  { slug: "alsamer", number: "966555725070", nameAr: "سويس بلو السامر" },
  { slug: "vinas", number: "966537338993", nameAr: "فيناس" },
  { slug: "tulip", number: "966539453323", nameAr: "توليب" },
];

export function findWhatsAppBranch(slug: string): WhatsAppBranch | undefined {
  return WHATSAPP_BRANCHES.find((branch) => branch.slug === slug);
}

/** wa.me link with a greeting that tells reception the guest came from a Google ad. */
export function branchWhatsAppHref(branch: WhatsAppBranch): string {
  const text = `مرحباً، وصلت من إعلان جوجل وأرغب بالاستفسار عن الحجز في ${branch.nameAr}.`;
  return `https://wa.me/${branch.number}?text=${encodeURIComponent(text)}`;
}
