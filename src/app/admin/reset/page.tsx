"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import AdminAuthShell from "@/components/admin-auth-shell";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords don't match.");
      return;
    }

    const token = new URLSearchParams(window.location.search).get("token") ?? "";
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Could not reset the password.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Could not reset the password. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <AdminAuthShell title="Set a new password" description="Choose a strong password to restore access to Content Studio.">
      {done ? (
        <div className="admin-auth-message">
          <p>Your password has been updated. You can now sign in with your new password.</p>
          <a className="admin-auth-submit" href="/admin/login">
            Go to sign in
          </a>
        </div>
      ) : (
        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label>
            <span>New password</span>
            <input name="password" type="password" required minLength={8} autoComplete="new-password" autoFocus />
          </label>
          <label>
            <span>Confirm new password</span>
            <input name="confirm" type="password" required minLength={8} autoComplete="new-password" />
          </label>

          {error ? <p className="admin-auth-error">{error}</p> : null}

          <button className="admin-auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Updating…" : "Update password"}
          </button>
          <a href="/admin/login" className="admin-auth-link">
            Back to sign in
          </a>
        </form>
      )}
    </AdminAuthShell>
  );
}
