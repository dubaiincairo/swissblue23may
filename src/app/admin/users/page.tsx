import UserManager from "@/components/user-manager";
import { requireAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  // Redirects unless the session holds the `users` authority (env owner always does).
  await requireAuthority("users");
  return <UserManager />;
}
