import AdminAuthShell from "@/components/admin-auth-shell";
import AdminLoginForm from "@/components/admin-login-form";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const { en } = await getEditableContent();
  return (
    <AdminAuthShell backdrop={en.media.adminAuthBackdrop} title="Welcome back" description="Sign in to manage Swiss Blue content and guest requests.">
      <AdminLoginForm />
    </AdminAuthShell>
  );
}
