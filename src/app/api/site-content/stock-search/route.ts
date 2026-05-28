import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type NormalizedResult = {
  id: string;
  thumb: string;
  full: string;
  downloadUrl: string;
  alt: string;
  width: number;
  height: number;
  credit: {
    name: string;
    url: string;
  };
};

type NormalizedResponse = {
  results: NormalizedResult[];
  hasMore: boolean;
};

const PAGE_SIZE = 30;

function badRequest(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function searchUnsplash(query: string, page: number): Promise<NormalizedResponse> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) {
    throw new Error("Unsplash isn't configured. Add UNSPLASH_ACCESS_KEY to your environment.");
  }

  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(PAGE_SIZE));
  url.searchParams.set("content_filter", "high");

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Unsplash search failed (${response.status}): ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    total_pages: number;
    results: Array<{
      id: string;
      alt_description: string | null;
      description: string | null;
      width: number;
      height: number;
      urls: { thumb: string; small: string; regular: string; full: string; raw: string };
      links: { download_location: string };
      user: { name: string; links: { html: string } };
    }>;
  };

  return {
    results: data.results.map((item) => ({
      id: item.id,
      thumb: item.urls.small,
      full: item.urls.regular,
      downloadUrl: item.links.download_location,
      alt: item.alt_description ?? item.description ?? "",
      width: item.width,
      height: item.height,
      credit: {
        name: item.user.name,
        url: `${item.user.links.html}?utm_source=swissblue&utm_medium=referral`,
      },
    })),
    hasMore: page < data.total_pages,
  };
}

async function searchGoogle(query: string, page: number): Promise<NormalizedResponse> {
  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;
  if (!key || !cx) {
    throw new Error(
      "Google isn't configured. Add GOOGLE_API_KEY and GOOGLE_CSE_ID to your environment.",
    );
  }

  const perPage = 10;
  const clampedPage = Math.min(page, 10);
  const start = (clampedPage - 1) * perPage + 1;

  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", key);
  url.searchParams.set("cx", cx);
  url.searchParams.set("q", query);
  url.searchParams.set("searchType", "image");
  url.searchParams.set("num", String(perPage));
  url.searchParams.set("start", String(start));
  url.searchParams.set("safe", "active");

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google search failed (${response.status}): ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    items?: Array<{
      title?: string;
      link?: string;
      image?: {
        thumbnailLink?: string;
        contextLink?: string;
        width?: number;
        height?: number;
        thumbnailWidth?: number;
        thumbnailHeight?: number;
      };
    }>;
    queries?: {
      nextPage?: Array<{ startIndex: number }>;
    };
  };

  const items = data.items ?? [];

  return {
    results: items
      .filter((item) => typeof item.link === "string" && item.link.startsWith("https://"))
      .map((item) => {
        const link = item.link as string;
        const contextLink = item.image?.contextLink ?? link;
        let creditName = "Source";
        try {
          creditName = new URL(contextLink).hostname.replace(/^www\./, "");
        } catch {
          // fall through
        }
        return {
          id: link,
          thumb: item.image?.thumbnailLink ?? link,
          full: link,
          downloadUrl: link,
          alt: item.title ?? "",
          width: item.image?.width ?? 0,
          height: item.image?.height ?? 0,
          credit: {
            name: creditName,
            url: contextLink,
          },
        };
      }),
    hasMore: Array.isArray(data.queries?.nextPage) && data.queries.nextPage.length > 0,
  };
}

async function searchPexels(query: string, page: number): Promise<NormalizedResponse> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    throw new Error("Pexels isn't configured. Add PEXELS_API_KEY to your environment.");
  }

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(PAGE_SIZE));

  const response = await fetch(url, {
    headers: { Authorization: key },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Pexels search failed (${response.status}): ${text.slice(0, 200)}`);
  }

  const data = (await response.json()) as {
    next_page?: string;
    photos: Array<{
      id: number;
      alt: string;
      width: number;
      height: number;
      url: string;
      src: { medium: string; large: string; large2x: string; original: string };
      photographer: string;
      photographer_url: string;
    }>;
  };

  return {
    results: data.photos.map((item) => ({
      id: String(item.id),
      thumb: item.src.medium,
      full: item.src.large,
      downloadUrl: item.src.large2x,
      alt: item.alt ?? "",
      width: item.width,
      height: item.height,
      credit: {
        name: item.photographer,
        url: item.photographer_url,
      },
    })),
    hasMore: Boolean(data.next_page),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const query = searchParams.get("q")?.trim() ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.min(pageParam, 50) : 1;

  if (source !== "unsplash" && source !== "pexels" && source !== "google") {
    return badRequest("source must be 'unsplash', 'pexels', or 'google'.");
  }

  if (!query) {
    return badRequest("Enter something to search for.");
  }

  try {
    const result =
      source === "unsplash"
        ? await searchUnsplash(query, page)
        : source === "pexels"
          ? await searchPexels(query, page)
          : await searchGoogle(query, page);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "private, max-age=60" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stock search failed.";
    const status = message.includes("isn't configured") ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
