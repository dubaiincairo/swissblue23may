import Link from "next/link";
import { getFormsClient } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

async function getCounts() {
  const client = getFormsClient();
  if (!client) return { careers: 0, b2b: 0, configured: false };
  const [careers, b2b] = await Promise.all([
    client.fetch<number>(`count(*[_type == "careerApplication"])`, {}, { cache: "no-store" }),
    client.fetch<number>(`count(*[_type == "corporateRequest"])`, {}, { cache: "no-store" }),
  ]);
  return { careers: careers ?? 0, b2b: b2b ?? 0, configured: true };
}

export default async function SubmissionsIndexPage() {
  const { careers, b2b, configured } = await getCounts();

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/secretpanel" className="text-sm font-semibold text-[var(--primary)]">
          ← Back to content panel
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Form submissions</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Applications and corporate requests submitted through the website forms.
        </p>

        {!configured ? (
          <p className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 text-sm">
            Submissions storage is not configured (missing Sanity write token).
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/secretpanel/submissions/careers"
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:border-[var(--primary)]"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                Recruitment
              </span>
              <h2 className="mt-2 text-xl font-bold">Career applications</h2>
              <p className="mt-3 text-3xl font-extrabold text-[var(--primary)]">{careers}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">total received</p>
            </Link>
            <Link
              href="/secretpanel/submissions/b2b"
              className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition hover:border-[var(--primary)]"
            >
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--text-secondary)]">
                Business
              </span>
              <h2 className="mt-2 text-xl font-bold">Corporate (B2B) requests</h2>
              <p className="mt-3 text-3xl font-extrabold text-[var(--primary)]">{b2b}</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">total received</p>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
