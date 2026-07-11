import Link from "next/link";
import { requireAuthority } from "@/lib/admin-session";
import { getFormsClient } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

type ChatLead = {
  _id: string;
  kind?: string;
  fullName?: string;
  contact?: string;
  email?: string;
  phone?: string;
  request?: string;
  locale?: string;
  createdAt?: string;
};

async function getLeads(): Promise<ChatLead[]> {
  const client = getFormsClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "chatLead"]|order(createdAt desc){_id, kind, fullName, contact, email, phone, request, locale, createdAt}`,
    {},
    { cache: "no-store" },
  );
}

function formatDate(value?: string) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function titleFor(kind?: string) {
  if (kind === "career") return "Career";
  if (kind === "corporate") return "Corporate";
  return "Booking";
}

export default async function ChatLeadsSubmissionsPage() {
  await requireAuthority("submissions");
  const leads = await getLeads();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin/submissions" className="text-sm font-semibold text-[var(--primary)]">
          ← All submissions
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Chat leads</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {leads.length} lead{leads.length === 1 ? "" : "s"} captured through the website assistant.
        </p>

        {leads.length === 0 ? (
          <p className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 text-sm">No chat leads yet.</p>
        ) : (
          <div className="mt-8 grid gap-4">
            {leads.map((lead) => (
              <article key={lead._id} className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">{titleFor(lead.kind)}</p>
                    <h2 className="mt-1 text-lg font-bold">{lead.fullName || "—"}</h2>
                  </div>
                  <div className="text-right text-xs text-[var(--text-secondary)]">
                    <p>{formatDate(lead.createdAt)}</p>
                    {lead.locale ? <p className="uppercase">{lead.locale}</p> : null}
                  </div>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">Contact</dt>
                    <dd className="mt-1 text-sm">{lead.contact || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">Route</dt>
                    <dd className="mt-1 text-sm">{lead.kind === "career" ? "careers@swissblue.sa" : "reservations@swissblue.sa"}</dd>
                  </div>
                </dl>

                {lead.request ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">Request</p>
                    <p className="mt-1 whitespace-pre-line text-sm">{lead.request}</p>
                  </div>
                ) : null}

                {lead.email ? (
                  <div className="mt-5">
                    <a className="btn btn-secondary" href={`mailto:${lead.email}`}>Reply by email</a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
