import Link from "next/link";

import B2bCrm, { type CorporateRequest } from "@/components/admin/b2b-crm";
import { requireAuthority } from "@/lib/admin-session";
import { getFormsClient } from "@/sanity/lib/forms";

export const dynamic = "force-dynamic";

async function getRequests(): Promise<CorporateRequest[]> {
  const client = getFormsClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "corporateRequest"]|order(createdAt desc){
      _id, company, sector, contact, jobTitle, email, phone, city, propertyType, requestType,
      guests, units, budget, arrival, departure, documents, preferredContact, message,
      locale, status, notes, createdAt, updatedAt
    }`,
    {},
    { cache: "no-store" },
  );
}

export default async function B2bSubmissionsPage() {
  await requireAuthority("submissions");
  const requests = await getRequests();

  return (
    <main className="admin-secondary-page min-h-screen bg-[var(--background)] px-4 py-10 text-[var(--text-primary)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin/submissions" className="admin-secondary-back text-sm font-semibold text-[var(--primary)]">
          ← All submissions
        </Link>
        <h1 className="mt-4 text-3xl font-bold">Corporate Requests CRM</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {requests.length} persistent request{requests.length === 1 ? "" : "s"} received.
        </p>
        <B2bCrm initialRequests={requests} />
      </div>
    </main>
  );
}
