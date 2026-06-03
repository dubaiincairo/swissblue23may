"use client";

import type { FormEvent } from "react";
import { useState } from "react";

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
            <h1 className="text-lg font-bold">Set a new password</h1>
          </div>
        </div>

        {done ? (
          <div className="mt-7 grid gap-3">
            <p className="text-sm">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <a className="btn btn-primary mt-2 w-full justify-center" href="/secretpanel/login">
              Go to sign in
            </a>
          </div>
        ) : (
          <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold">New password</span>
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                autoFocus
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-semibold">Confirm new password</span>
              <input
                name="confirm"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
              />
            </label>

            {error ? <p className="text-sm font-medium text-[#c0392b]">{error}</p> : null}

            <button className="btn btn-primary mt-2 w-full justify-center" type="submit" disabled={submitting}>
              {submitting ? "Updating…" : "Update password"}
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
