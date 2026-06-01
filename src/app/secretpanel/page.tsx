import SecretPanel from "@/components/secret-panel";
import { requireAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function SecretPanelPage() {
  const session = await requireAuthority("content.en");
  return <SecretPanel perms={session.perms} />;
}
