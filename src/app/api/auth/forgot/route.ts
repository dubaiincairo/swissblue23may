import { NextResponse } from "next/server";
import { createResetToken, getAdminUsername } from "@/lib/auth";
import { getOwnerResetVersion, isOwnerResetConfigured } from "@/lib/admin-owner";
import { sendEmail } from "@/lib/notify";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resetEmailHtml(link: string, username: string): string {
  const safe = escapeHtml(link);
  return `
  <div style="background:#f4f6fb;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,.06)">
      <tr><td style="background:#2b6fe8;padding:20px 24px;color:#ffffff">
        <div style="font-size:13px;letter-spacing:.04em;text-transform:uppercase;opacity:.85">Swiss Blue CMS</div>
        <div style="font-size:20px;font-weight:800;margin-top:2px">Password reset</div>
      </td></tr>
      <tr><td style="padding:22px 24px;color:#0f172a;font-size:14px;line-height:1.6">
        <p>A password reset was requested for the admin account <strong>${escapeHtml(username)}</strong>.</p>
        <p>Click the button below to set a new password. This link expires in 30 minutes and can be used once.</p>
        <p style="margin:22px 0"><a href="${safe}" style="background:#2b6fe8;color:#ffffff;text-decoration:none;font-weight:800;padding:12px 20px;border-radius:10px;display:inline-block">Set a new password</a></p>
        <p style="color:#64748b;font-size:12px">If you didn't request this, you can safely ignore this email — your password stays unchanged.</p>
        <p style="color:#94a3b8;font-size:12px;word-break:break-all">${safe}</p>
      </td></tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  // Tight per-IP limit — this endpoint sends email.
  const ip = getClientIp(request);
  if (!(await rateLimit("forgot-ip", ip, 3, 900)).success) {
    // Generic — never reveal throttling/config (avoids probing/enumeration).
    return NextResponse.json({ ok: true });
  }

  const recovery = (process.env.ADMIN_RECOVERY_EMAIL || "").trim();
  if (isOwnerResetConfigured() && recovery) {
    try {
      const token = await createResetToken(await getOwnerResetVersion());
      const origin = new URL(request.url).origin;
      const link = `${origin}/secretpanel/reset?token=${encodeURIComponent(token)}`;
      await sendEmail({
        to: recovery,
        subject: "Swiss Blue admin — password reset link",
        html: resetEmailHtml(link, getAdminUsername()),
      });
    } catch (error) {
      console.error("[auth] forgot-password send failed", error);
    }
  }

  // Always generic, regardless of config/outcome.
  return NextResponse.json({ ok: true });
}
