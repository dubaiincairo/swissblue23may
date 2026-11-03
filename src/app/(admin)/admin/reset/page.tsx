import AdminAuthShell from "@/components/admin-auth-shell";
import AdminResetPasswordForm from "@/components/admin-reset-password-form";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage() {
  const { en } = await getEditableContent();
  return (
    <AdminAuthShell backdrop={en.media.adminAuthBackdrop} title="Set a new password" description="Choose a strong password to restore access to Content Studio.">
      <AdminResetPasswordForm />
    </AdminAuthShell>
  );
}
