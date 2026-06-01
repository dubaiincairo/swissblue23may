import Link from "next/link";
import { getFormsClient } from "@/sanity/lib/forms";
import { requireAuthority } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

type CorporateRequest = {
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
  createdAt?: string;
};

async function getRequests(): Promise<CorporateRequest[]> {
  const client = getFormsClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "corporateRequest"]|order(createdAt desc){
      _id, company, sector, contact, jobTitle, email, phone, city, propertyType, requestType,
      guests, units, budget, arrival, departure, documents, preferredContact, message,
      locale, status, createdAt
    }`,
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

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

export default async function B2bSubmissionsPage() {
  await requireAuthority("submissions");
  const requests = await getRequests();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/secretpanel/submissions" className="text-sm font-semibold text-[var(--primary)]">
          ← All submissions
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Corporate (B2B) requests</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {requests.length} request{requests.length === 1 ? "" : "s"} received.
        </p>

        {requests.length === 0 ? (
          <p className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 text-sm">
            No requests yet.
          </p>
        ) : (
          <div className="mt-8 grid gap-4">
            {requests.map((req) => (
              <article
                key={req._id}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{req.company || "—"}</h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {[req.contact, req.jobTitle].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <div className="text-right text-xs text-[var(--text-secondary)]">
                    <p>{formatDate(req.createdAt)}</p>
                    {req.locale ? <p className="uppercase">{req.locale}</p> : null}
                  </div>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Sector" value={req.sector} />
                  <Field label="Email" value={req.email} />
                  <Field label="Phone" value={req.phone} />
                  <Field label="City" value={req.city} />
                  <Field label="Property type" value={req.propertyType} />
                  <Field label="Request type" value={req.requestType} />
                  <Field label="Expected guests" value={req.guests} />
                  <Field label="Rooms / apartments" value={req.units} />
                  <Field label="Target budget" value={req.budget} />
                  <Field label="Arrival" value={req.arrival} />
                  <Field label="Departure" value={req.departure} />
                  <Field label="Documents" value={req.documents} />
                  <Field label="Preferred contact" value={req.preferredContact} />
                </dl>

                {req.message ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                      Additional requirements
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm">{req.message}</p>
                  </div>
                ) : null}

                {req.email ? (
                  <div className="mt-5">
                    <a className="btn btn-secondary" href={`mailto:${req.email}`}>
                      Reply by email
                    </a>
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
