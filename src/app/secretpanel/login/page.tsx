"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error || "Sign in failed.");
        setSubmitting(false);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const from = params.get("from");
      window.location.href = from && from.startsWith("/secretpanel") ? from : "/secretpanel";
    } catch {
      setError("Sign in failed. Please try again.");
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
            <h1 className="text-lg font-bold">Content Studio Login Page</h1>
          </div>
        </div>

        <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold">Username</span>
            <input
              name="username"
              required
              autoComplete="username"
              autoFocus
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-semibold">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
            />
          </label>

          {error ? <p className="text-sm font-medium text-[#c0392b]">{error}</p> : null}

          <button className="btn btn-primary mt-2 w-full justify-center" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm">
            <a
              href="/secretpanel/forgot"
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              Forgot password?
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
