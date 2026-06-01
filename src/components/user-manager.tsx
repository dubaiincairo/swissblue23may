"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AUTHORITIES,
  ROLES,
  roleSeed,
  type AdminRole,
  type AuthorityId,
} from "@/lib/authorities";

type UserRow = {
  id: string;
  username: string;
  displayName: string;
  role: AdminRole;
  authorities: AuthorityId[];
  active: boolean;
  tokenVersion: number;
  createdAt: string;
  lastLoginAt?: string;
  updatedAt?: string;
  isEnvOwner: boolean;
  editable?: boolean;
};

type ApiData = {
  configured: boolean;
  currentUid: string;
  ownerUsername: string;
  users: UserRow[];
};

type FormState = {
  id: string | null; // null = creating
  username: string;
  displayName: string;
  password: string;
  role: AdminRole;
  authorities: AuthorityId[];
  active: boolean;
};

const AUTHORITY_LABELS = new Map(AUTHORITIES.map((a) => [a.id, a.label]));

function blankForm(): FormState {
  return {
    id: null,
    username: "",
    displayName: "",
    password: "",
    role: "editor",
    authorities: roleSeed("editor"),
    active: true,
  };
}

function formatDate(value?: string) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function UserManager() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    setLoadError("");
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setData((await res.json()) as ApiData);
    } catch {
      setLoadError("Could not load users.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const configured = data?.configured ?? false;

  const sortedUsers = useMemo(() => {
    if (!data) return [];
    // Owner first, then by username.
    return [...data.users].sort((a, b) => {
      if (a.isEnvOwner !== b.isEnvOwner) return a.isEnvOwner ? -1 : 1;
      return a.username.localeCompare(b.username);
    });
  }, [data]);

  function startCreate() {
    setFormError("");
    setNotice("");
    setForm(blankForm());
  }

  function startEdit(user: UserRow) {
    setFormError("");
    setNotice("");
    setForm({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      password: "",
      role: user.role,
      authorities: [...user.authorities],
      active: user.active,
    });
  }

  function closeForm() {
    setForm(null);
    setFormError("");
  }

  function changeRole(role: AdminRole) {
    setForm((current) =>
      current
        ? { ...current, role, authorities: role === "custom" ? current.authorities : roleSeed(role) }
        : current,
    );
  }

  function toggleAuthority(id: AuthorityId) {
    setForm((current) => {
      if (!current) return current;
      const has = current.authorities.includes(id);
      return {
        ...current,
        authorities: has ? current.authorities.filter((a) => a !== id) : [...current.authorities, id],
      };
    });
  }

  async function submitForm() {
    if (!form) return;
    setSaving(true);
    setFormError("");
    try {
      const isCreate = form.id === null;
      const url = isCreate ? "/api/admin/users" : `/api/admin/users/${encodeURIComponent(form.id as string)}`;
      const payload: Record<string, unknown> = {
        displayName: form.displayName,
        role: form.role,
        authorities: form.authorities,
        active: form.active,
      };
      if (isCreate) payload.username = form.username;
      if (form.password) payload.password = form.password;

      const res = await fetch(url, {
        method: isCreate ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setFormError(result?.error || "Could not save the user.");
        setSaving(false);
        return;
      }
      setNotice(isCreate ? "User created." : "User updated.");
      closeForm();
      await load();
    } catch {
      setFormError("Could not save the user.");
    } finally {
      setSaving(false);
    }
  }

  async function removeUser(user: UserRow) {
    if (!window.confirm(`Delete user "${user.username}"? This cannot be undone.`)) return;
    setNotice("");
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, { method: "DELETE" });
      const result = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setNotice(result?.error || "Could not delete the user.");
        return;
      }
      setNotice(`Deleted "${user.username}".`);
      await load();
    } catch {
      setNotice("Could not delete the user.");
    }
  }

  async function toggleActive(user: UserRow) {
    setNotice("");
    try {
      const res = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !user.active }),
      });
      const result = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setNotice(result?.error || "Could not update the user.");
        return;
      }
      await load();
    } catch {
      setNotice("Could not update the user.");
    }
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-5xl">
        <Link href="/secretpanel" className="text-sm font-semibold text-[var(--primary)]">
          ← Back to content panel
        </Link>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin users</h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Create admin accounts and control exactly what each one can do.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={startCreate}
            disabled={!configured}
            title={configured ? undefined : "User store not configured"}
          >
            + Add user
          </button>
        </div>

        {loadError ? (
          <p className="mt-6 rounded-xl border border-[#f0c0c0] bg-[#fdf0f0] p-4 text-sm text-[#c0392b]">{loadError}</p>
        ) : null}

        {data && !configured ? (
          <p className="mt-6 rounded-xl border border-[var(--border)] bg-white p-4 text-sm text-[var(--text-secondary)]">
            Managed users are stored encrypted in the CMS. To enable creating them, set
            <code className="mx-1 rounded bg-[var(--background-subtle)] px-1.5 py-0.5 text-xs">SANITY_API_WRITE_TOKEN</code>
            and
            <code className="mx-1 rounded bg-[var(--background-subtle)] px-1.5 py-0.5 text-xs">ADMIN_SESSION_SECRET</code>.
            The owner account below always works.
          </p>
        ) : null}

        {notice ? (
          <p className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--primary-light)] p-3 text-sm font-medium text-[var(--bluehost-deep)]">
            {notice}
          </p>
        ) : null}

        {/* Users table */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background-subtle)] text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Authorities</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last login</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!data ? (
                <tr>
                  <td className="px-4 py-6 text-[var(--text-secondary)]" colSpan={6}>
                    Loading…
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => {
                  const isSelf = user.id === data.currentUid;
                  const locked = user.isEnvOwner || user.editable === false;
                  return (
                    <tr key={user.id} className="border-b border-[var(--border)] last:border-0 align-top">
                      <td className="px-4 py-3">
                        <div className="font-semibold">
                          {user.displayName || user.username}
                          {isSelf ? <span className="ml-2 text-xs font-medium text-[var(--text-secondary)]">(you)</span> : null}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">@{user.username}</div>
                      </td>
                      <td className="px-4 py-3 capitalize">{user.role}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {user.isEnvOwner ? (
                            <span className="rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-xs font-semibold text-[var(--bluehost-deep)]">
                              All authorities
                            </span>
                          ) : user.authorities.length === 0 ? (
                            <span className="text-xs text-[var(--text-secondary)]">None</span>
                          ) : (
                            user.authorities.map((a) => (
                              <span
                                key={a}
                                className="rounded-full bg-[var(--background-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--text-primary)]"
                              >
                                {AUTHORITY_LABELS.get(a) ?? a}
                              </span>
                            ))
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            user.active ? "bg-[#e6f4ea] text-[#1e7e34]" : "bg-[#fdeaea] text-[#c0392b]"
                          }`}
                        >
                          {user.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">
                        {user.isEnvOwner ? "—" : formatDate(user.lastLoginAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          {locked ? (
                            <span className="text-xs text-[var(--text-secondary)]">Environment account</span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="text-xs font-semibold text-[var(--primary)] hover:underline"
                                onClick={() => startEdit(user)}
                              >
                                Edit
                              </button>
                              {!isSelf ? (
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-[var(--text-secondary)] hover:underline"
                                  onClick={() => toggleActive(user)}
                                >
                                  {user.active ? "Deactivate" : "Activate"}
                                </button>
                              ) : null}
                              {!isSelf ? (
                                <button
                                  type="button"
                                  className="text-xs font-semibold text-[#c0392b] hover:underline"
                                  onClick={() => removeUser(user)}
                                >
                                  Delete
                                </button>
                              ) : null}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / edit form overlay */}
      {form ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 py-10" dir="ltr">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{form.id ? "Edit user" : "Add user"}</h2>
              <button type="button" className="text-sm text-[var(--text-secondary)] hover:underline" onClick={closeForm}>
                Cancel
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold">Username</span>
                <input
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)] disabled:bg-[var(--background-subtle)] disabled:text-[var(--text-secondary)]"
                  value={form.username}
                  disabled={form.id !== null}
                  autoFocus={form.id === null}
                  placeholder="e.g. sara"
                  onChange={(e) => setForm((c) => (c ? { ...c, username: e.target.value } : c))}
                />
                {form.id !== null ? (
                  <span className="text-xs text-[var(--text-secondary)]">Usernames can't be changed.</span>
                ) : null}
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold">Display name</span>
                <input
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  value={form.displayName}
                  placeholder="Full name"
                  onChange={(e) => setForm((c) => (c ? { ...c, displayName: e.target.value } : c))}
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold">{form.id ? "Reset password" : "Password"}</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  value={form.password}
                  placeholder={form.id ? "Leave blank to keep current" : "At least 10 characters"}
                  onChange={(e) => setForm((c) => (c ? { ...c, password: e.target.value } : c))}
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold">Role</span>
                <select
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]"
                  value={form.role}
                  onChange={(e) => changeRole(e.target.value as AdminRole)}
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label} — {r.description}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-2">
                <span className="text-sm font-semibold">Authorities</span>
                <div className="grid gap-2 rounded-lg border border-[var(--border)] p-3">
                  {AUTHORITIES.map((a) => (
                    <label key={a.id} className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-[var(--primary)]"
                        checked={form.authorities.includes(a.id)}
                        onChange={() => toggleAuthority(a.id)}
                      />
                      <span>
                        <span className="text-sm font-medium">{a.label}</span>
                        <span className="block text-xs text-[var(--text-secondary)]">{a.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[var(--primary)]"
                  checked={form.active}
                  onChange={(e) => setForm((c) => (c ? { ...c, active: e.target.checked } : c))}
                />
                <span className="text-sm font-medium">Active (can sign in)</span>
              </label>

              {formError ? <p className="text-sm font-medium text-[#c0392b]">{formError}</p> : null}

              <div className="mt-2 flex justify-end gap-3">
                <button type="button" className="btn btn-secondary" onClick={closeForm} disabled={saving}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={submitForm} disabled={saving}>
                  {saving ? "Saving…" : form.id ? "Save changes" : "Create user"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
