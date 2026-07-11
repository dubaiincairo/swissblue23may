import AdminAuthShell from "@/components/admin-auth-shell";
import AdminForgotPasswordForm from "@/components/admin-forgot-password-form";
import { getEditableContent } from "@/lib/editable-content";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  const { en } = await getEditableContent();
  return (
    <AdminAuthShell backdrop={en.media.adminAuthBackdrop} title="Reset your password" description="We will send a secure link to the recovery address on file.">
      <AdminForgotPasswordForm />
    </AdminAuthShell>
  );
}
