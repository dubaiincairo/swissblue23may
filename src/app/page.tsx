import Link from "next/link";

import { getClient, hasSanityConfig } from "@/sanity/lib/client";

type PagePreview = {
  _id: string;
  title?: string;
  description?: string;
};

const PAGES_QUERY = `*[_type == "page"] | order(_createdAt desc)[0...6]{
  _id,
  title,
  description
}`;

async function getPages() {
  const client = getClient();

  if (!client) {
    return [];
  }

  return client.fetch<PagePreview[]>(PAGES_QUERY);
}

export default async function Home() {
  const pages = await getPages();

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#171717]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5">
          <span className="text-lg font-semibold">WD Group</span>
          <Link
            className="text-sm font-medium text-[#7a5b2f] transition hover:text-[#171717]"
            href="/studio"
          >
            Studio
          </Link>
        </nav>

        <div className="grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5b2f]">
              Vercel + Sanity
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              WD Group website foundation is live.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
              This starter is connected for Sanity content management and ready
              for the brand, pages, and production content to come next.
            </p>
          </div>

          <div className="border-l border-black/10 pl-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              CMS status
            </p>
            <p className="mt-4 text-2xl font-semibold">
              {hasSanityConfig ? "Sanity environment detected" : "Awaiting Sanity project link"}
            </p>
            <p className="mt-4 text-sm leading-6 text-black/60">
              {hasSanityConfig
                ? "Create content in the embedded Studio and it will appear here."
                : "Install the Sanity resource in Vercel to provision the project ID, dataset, and API tokens."}
            </p>
          </div>
        </div>

        <section className="border-t border-black/10 py-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.length > 0 ? (
              pages.map((page) => (
                <article key={page._id} className="border border-black/10 bg-white/55 p-5">
                  <h2 className="text-xl font-semibold">{page.title}</h2>
                  {page.description ? (
                    <p className="mt-3 text-sm leading-6 text-black/60">
                      {page.description}
                    </p>
                  ) : null}
                </article>
              ))
            ) : (
              <p className="max-w-xl text-sm leading-6 text-black/60">
                No Sanity pages are published yet. Once the Sanity project is
                linked, add a Page document in the Studio.
              </p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
