"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import AdminAuthShell from "@/components/admin-auth-shell";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
    } catch {
      // Intentionally ignore — the response is generic either way.
    }
    setSent(true);
    setSubmitting(false);
  }

  return (
    <AdminAuthShell title="Reset your password" description="We will send a secure link to the recovery address on file.">
      {sent ? (
        <div className="admin-auth-message">
          <p>A reset link has been sent if a recovery address is configured. It expires in 30 minutes and can be used once.</p>
          <a className="admin-auth-submit" href="/admin/login">
            Back to sign in
          </a>
        </div>
      ) : (
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <button className="admin-auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </button>
          <a href="/admin/login" className="admin-auth-link">
            Back to sign in
          </a>
        </form>
      )}
    </AdminAuthShell>
  );
}
