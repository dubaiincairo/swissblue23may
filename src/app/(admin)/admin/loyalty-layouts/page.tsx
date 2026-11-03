import LoyaltyLayoutLab from "@/components/admin/loyalty-layout-lab";
import { requireAuthority } from "@/lib/admin-session";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function LoyaltyLayoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ locale?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") {
    await requireAuthority("content-any");
  }
  const initialLocale = (await searchParams).locale === "ar" ? "ar" : "en";
  const { ar, en } = await getEditableContent();

  return (
    <LoyaltyLayoutLab
      initialLocale={initialLocale}
      previews={{
        en: {
          benefits: en.homepage.loyalty.benefits,
          description: en.homepage.loyalty.description,
          note: "Free membership with instant direct-booking perks",
          subtitle: en.homepage.loyalty.subtitle,
          title: en.homepage.loyalty.title,
        },
        ar: {
          benefits: ar.homepage.loyalty.benefits,
          description: ar.homepage.loyalty.description,
          note: "عضوية مجانية ومزايا فورية عند الحجز المباشر",
          subtitle: ar.homepage.loyalty.subtitle,
          title: ar.homepage.loyalty.title,
        },
      }}
    />
  );
}
