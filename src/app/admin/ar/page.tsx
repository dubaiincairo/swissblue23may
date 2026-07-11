import SecretPanel from "@/components/secret-panel";
import { requireAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function ArabicSecretPanelPage() {
  const session = await requireAuthority("content.ar");
  return <SecretPanel language="ar" perms={session.perms} />;
}
