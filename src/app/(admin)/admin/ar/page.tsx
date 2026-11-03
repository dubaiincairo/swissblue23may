import SecretPanel from "@/components/secret-panel";
import { requireAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function queryValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ArabicSecretPanelPage({ searchParams }: AdminPageProps) {
  const session = await requireAuthority("content.ar");
  const params = await searchParams;

  return (
    <SecretPanel
      language="ar"
      perms={session.perms}
      initialSection={queryValue(params.section)}
      initialProperty={queryValue(params.property)}
    />
  );
}
