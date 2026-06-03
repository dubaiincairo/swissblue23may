"use client";

import type { FormEvent } from "react";
import { useState } from "react";

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
    <main
      className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4 py-12 text-[var(--text-primary)]"
      dir="ltr"
    >
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] font-extrabold text-white">
            SB
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">Swiss Blue CMS</p>
            <h1 className="text-lg font-bold">Reset your password</h1>
          </div>
        </div>

        {sent ? (
          <div className="mt-7 grid gap-3">
            <p className="text-sm">
              If the recovery address is configured, a secure password-reset link has been sent to it. The link
              expires in <strong>30 minutes</strong> and can be used once.
            </p>
            <a className="btn btn-primary mt-2 w-full justify-center" href="/secretpanel/login">
              Back to sign in
            </a>
          </div>
        ) : (
          <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
            <p className="text-sm text-[var(--text-secondary)]">
              We&apos;ll email a secure reset link to the admin recovery address on file. Open that email and follow
              the link to set a new password.
            </p>
            <button className="btn btn-primary mt-1 w-full justify-center" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send reset link"}
            </button>
            <p className="text-center text-sm">
              <a href="/secretpanel/login" className="font-semibold text-[var(--primary)] hover:underline">
                Back to sign in
              </a>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
