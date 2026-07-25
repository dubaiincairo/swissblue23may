import OverviewDashboard from "@/components/admin/overview-dashboard";
import { requireAuthority } from "@/lib/admin-session";
import { hasAuthority } from "@/lib/authorities";
import { getAdminOverview, parseOverviewRange } from "@/lib/admin-overview";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await requireAuthority("analytics");
  const params = await searchParams;
  const rangeValue = Array.isArray(params.range) ? params.range[0] : params.range;
  const localeValue = Array.isArray(params.locale) ? params.locale[0] : params.locale;
  const locale = localeValue === "ar" ? "ar" : "en";
  const data = await getAdminOverview(parseOverviewRange(rangeValue ?? null));
  return <OverviewDashboard initialData={data} locale={locale} canSeeSubmissions={hasAuthority(session.perms, "submissions")} />;
}
