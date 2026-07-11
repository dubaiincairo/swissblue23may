"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function AdminLoginForm() {
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
      window.location.href = from && from.startsWith("/admin") ? from : "/admin";
    } catch {
      setError("Sign in failed. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-auth-form" onSubmit={handleSubmit}>
      <label>
        <span>Username</span>
        <input name="username" required autoComplete="username" autoFocus />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" required autoComplete="current-password" />
      </label>

      {error ? <p className="admin-auth-error">{error}</p> : null}

      <button className="admin-auth-submit" type="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </button>

      <a href="/admin/forgot" className="admin-auth-link">
        Forgot password?
      </a>
    </form>
  );
}
