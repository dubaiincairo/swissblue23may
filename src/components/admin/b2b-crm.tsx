"use client";

import { useMemo, useState } from "react";
import { Download, Mail, MessageSquare, Save } from "lucide-react";

export const LEAD_STATUSES = ["new", "contacted", "demo_scheduled", "partnered", "archived"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface CorporateRequest {
  _id: string;
  company?: string;
  sector?: string;
  contact?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  city?: string;
  propertyType?: string;
  requestType?: string;
  guests?: string;
  units?: string;
  budget?: string;
  arrival?: string;
  departure?: string;
  documents?: string;
  preferredContact?: string;
  message?: string;
  locale?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

function csvCell(value: unknown) {
  let text = String(value ?? "");
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

function exportCsv(rows: CorporateRequest[]) {
  const keys: Array<keyof CorporateRequest> = [
    "_id", "company", "contact", "email", "phone", "city", "requestType",
    "status", "notes", "message", "locale", "createdAt", "updatedAt",
  ];
  const csv = [keys.join(","), ...rows.map((row) => keys.map((key) => csvCell(row[key])).join(","))].join("\\r\\n");
  const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `saudi-hospitality-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function whatsappNumber(phone = "") {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("05")) digits = `966${digits.slice(1)}`;
  else if (digits.startsWith("5") && digits.length === 9) digits = `966${digits}`;
  return digits;
}

export default function B2bCrm({ initialRequests }: { initialRequests: CorporateRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesText = !needle || [
        request.company, request.contact, request.email, request.phone, request.requestType,
      ].some((value) => value?.toLowerCase().includes(needle));
      const matchesStatus = filter === "all" || (request.status || "new") === filter;
      return matchesText && matchesStatus;
    });
  }, [filter, query, requests]);

  const updateLocal = (id: string, patch: Partial<CorporateRequest>) => {
    setRequests((current) => current.map((request) => request._id === id ? { ...request, ...patch } : request));
  };

  const save = async (request: CorporateRequest) => {
    setSavingId(request._id);
    setError("");
    try {
      const response = await fetch("/api/admin/submissions/b2b", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: request._id,
          status: request.status || "new",
          notes: request.notes || "",
        }),
      });
      if (!response.ok) throw new Error("The lead could not be saved.");
      const payload = (await response.json()) as { updatedAt: string };
      updateLocal(request._id, { updatedAt: payload.updatedAt });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "The lead could not be saved.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="mt-8 space-y-5">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
        <input
          className="admin-input min-w-56 flex-1"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, company, email, or phone"
          aria-label="Search leads"
        />
        <select className="admin-input" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}
        </select>
        <button type="button" className="btn btn-secondary" onClick={() => exportCsv(filtered)}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {error ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-[var(--border)] bg-white p-6 text-sm">No matching requests.</p>
      ) : (
        <div className="grid gap-4">
          {filtered.map((request) => {
            const phone = whatsappNumber(request.phone);
            return (
              <article key={request._id} className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold">{request.company || "Unnamed company"}</h2>
                    <p className="text-sm text-[var(--text-secondary)]">{request.contact || "Unknown contact"} · {request.requestType || "General inquiry"}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">{request.createdAt ? new Date(request.createdAt).toLocaleString() : "Unknown date"} · {(request.locale || "en").toUpperCase()}</p>
                  </div>
                  <select
                    className="admin-input"
                    value={request.status || "new"}
                    onChange={(event) => updateLocal(request._id, { status: event.target.value })}
                    aria-label={`Status for ${request.company || request.contact || "lead"}`}
                  >
                    {LEAD_STATUSES.map((status) => <option value={status} key={status}>{status.replaceAll("_", " ")}</option>)}
                  </select>
                </div>

                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  <div><dt className="font-bold">Email</dt><dd className="break-all">{request.email || "—"}</dd></div>
                  <div><dt className="font-bold">Phone</dt><dd>{request.phone || "—"}</dd></div>
                  <div><dt className="font-bold">City</dt><dd>{request.city || "—"}</dd></div>
                </dl>
                {request.message ? <p className="mt-4 whitespace-pre-line rounded-xl bg-slate-50 p-3 text-sm">{request.message}</p> : null}

                <label className="mt-4 block text-sm font-bold" htmlFor={`notes-${request._id}`}>Internal notes</label>
                <textarea
                  id={`notes-${request._id}`}
                  className="admin-textarea mt-1 min-h-24 w-full"
                  value={request.notes || ""}
                  onChange={(event) => updateLocal(request._id, { notes: event.target.value })}
                />

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-primary" onClick={() => save(request)} disabled={savingId === request._id}>
                    <Save size={16} /> {savingId === request._id ? "Saving..." : "Save"}
                  </button>
                  {request.email ? <a className="btn btn-secondary" href={`mailto:${request.email}`}><Mail size={16} /> Email</a> : null}
                  {phone ? (
                    <a
                      className="btn btn-secondary"
                      href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${request.contact || ""}, this is Swiss Blue Hospitality following up on your inquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare size={16} /> WhatsApp
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
