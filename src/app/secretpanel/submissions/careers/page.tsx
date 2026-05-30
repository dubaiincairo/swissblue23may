import Link from "next/link";
import { getFormsClient } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

type CareerApplication = {
  _id: string;
  position?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  nationality?: string;
  location?: string;
  yearsExperience?: string;
  currentTitle?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  linkedin?: string;
  message?: string;
  locale?: string;
  status?: string;
  createdAt?: string;
  cvUrl?: string;
  cvName?: string;
};

async function getApplications(): Promise<CareerApplication[]> {
  const client = getFormsClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "careerApplication"]|order(createdAt desc){
      _id, position, fullName, email, phone, nationality, location, yearsExperience,
      currentTitle, expectedSalary, noticePeriod, linkedin, message, locale, status, createdAt,
      "cvUrl": cv.asset->url, "cvName": cv.asset->originalFilename
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

export default async function CareersSubmissionsPage() {
  const applications = await getApplications();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/secretpanel/submissions" className="text-sm font-semibold text-[var(--primary)]">
          ← All submissions
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Career applications</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {applications.length} application{applications.length === 1 ? "" : "s"} received.
        </p>

        {applications.length === 0 ? (
          <p className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 text-sm">
            No applications yet.
          </p>
        ) : (
          <div className="mt-8 grid gap-4">
            {applications.map((app) => (
              <article
                key={app._id}
                className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{app.fullName || "—"}</h2>
                    <p className="text-sm text-[var(--text-secondary)]">{app.position || "—"}</p>
                  </div>
                  <div className="text-right text-xs text-[var(--text-secondary)]">
                    <p>{formatDate(app.createdAt)}</p>
                    {app.locale ? <p className="uppercase">{app.locale}</p> : null}
                  </div>
                </div>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Email" value={app.email} />
                  <Field label="Phone" value={app.phone} />
                  <Field label="Nationality" value={app.nationality} />
                  <Field label="Location" value={app.location} />
                  <Field label="Years of experience" value={app.yearsExperience} />
                  <Field label="Current title" value={app.currentTitle} />
                  <Field label="Expected salary" value={app.expectedSalary} />
                  <Field label="Notice period" value={app.noticePeriod} />
                  <Field label="LinkedIn" value={app.linkedin} />
                </dl>

                {app.message ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                      Message
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm">{app.message}</p>
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-3">
                  {app.cvUrl ? (
                    <a
                      className="btn btn-primary"
                      href={app.cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={app.cvName || undefined}
                    >
                      Download CV
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--text-secondary)]">No CV attached</span>
                  )}
                  {app.email ? (
                    <a className="btn btn-secondary" href={`mailto:${app.email}`}>
                      Reply by email
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
