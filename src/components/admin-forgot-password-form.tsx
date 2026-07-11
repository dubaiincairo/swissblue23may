"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function AdminForgotPasswordForm() {
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
      // Intentionally ignore: the response remains generic either way.
    }
    setSent(true);
    setSubmitting(false);
  }

  if (sent) {
    return (
      <div className="admin-auth-message">
        <p>A reset link has been sent if a recovery address is configured. It expires in 30 minutes and can be used once.</p>
        <a className="admin-auth-submit" href="/admin/login">
          Back to sign in
        </a>
      </div>
    );
  }

  return (
    <form className="admin-auth-form" onSubmit={handleSubmit}>
      <button className="admin-auth-submit" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send reset link"}
      </button>
      <a href="/admin/login" className="admin-auth-link">
        Back to sign in
      </a>
    </form>
  );
}
