"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Language = "ar" | "en";

type Source = "unsplash" | "pexels" | "google";

type StockResult = {
  id: string;
  thumb: string;
  full: string;
  downloadUrl: string;
  alt: string;
  width: number;
  height: number;
  credit: { name: string; url: string };
};

type SearchResponse = {
  results: StockResult[];
  hasMore: boolean;
};

type ImportResponse = {
  url: string;
  width?: number;
  height?: number;
};

const SOURCES: Array<{ id: Source; labelEn: string; labelAr: string }> = [
  { id: "unsplash", labelEn: "Unsplash", labelAr: "أنسبلاش" },
  { id: "pexels", labelEn: "Pexels", labelAr: "بكسلز" },
  { id: "google", labelEn: "Google", labelAr: "جوجل" },
];

const SOURCE_LABELS: Record<Source, string> = {
  unsplash: "Unsplash",
  pexels: "Pexels",
  google: "Google",
};

const t = (language: Language, en: string, ar: string) => (language === "ar" ? ar : en);

export function StockPhotoPicker({
  language,
  initialQuery,
  initialSource = "unsplash",
  onSelect,
  onClose,
}: {
  language: Language;
  initialQuery?: string;
  initialSource?: Source;
  onSelect: (asset: { url: string; width?: number; height?: number }) => void;
  onClose: () => void;
}) {
  const [source, setSource] = useState<Source>(initialSource);
  const [query, setQuery] = useState(initialQuery ?? "");
  const [results, setResults] = useState<StockResult[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [importingId, setImportingId] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const runSearch = useCallback(
    async (nextSource: Source, nextQuery: string, nextPage: number) => {
      const trimmed = nextQuery.trim();
      if (!trimmed) {
        setResults([]);
        setHasMore(false);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const url = new URL("/api/site-content/stock-search", window.location.origin);
        url.searchParams.set("source", nextSource);
        url.searchParams.set("q", trimmed);
        url.searchParams.set("page", String(nextPage));

        const response = await fetch(url);
        const data = (await response.json()) as SearchResponse & { error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Search failed.");
        }

        setResults((prev) => (nextPage === 1 ? data.results : [...prev, ...data.results]));
        setHasMore(data.hasMore);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed.");
        if (nextPage === 1) {
          setResults([]);
          setHasMore(false);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPage(1);
      runSearch(source, query, 1);
    }, query.trim() ? 300 : 0);

    return () => window.clearTimeout(timer);
  }, [source, query, runSearch]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    runSearch(source, query, next);
  };

  const selectResult = async (result: StockResult) => {
    setImportingId(result.id);
    setError("");

    try {
      const response = await fetch("/api/site-content/stock-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          downloadUrl: result.downloadUrl,
          filename: result.alt || result.credit.name,
        }),
      });

      const data = (await response.json()) as ImportResponse & { error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Import failed.");
      }

      onSelect({ url: data.url, width: data.width, height: data.height });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed.");
      setImportingId("");
    }
  };

  return (
    <div
      className="admin-stock-picker"
      role="dialog"
      aria-modal="true"
      aria-label={t(language, "Find a photo", "ابحث عن صورة")}
      dir={language === "ar" ? "rtl" : "ltr"}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="admin-stock-panel">
        <header className="admin-stock-head">
          <div className="admin-stock-tabs" role="tablist">
            {SOURCES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={source === item.id}
                className={source === item.id ? "is-active" : ""}
                onClick={() => {
                  setSource(item.id);
                  setPage(1);
                }}
              >
                {language === "ar" ? item.labelAr : item.labelEn}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="admin-stock-close"
            onClick={onClose}
            aria-label={t(language, "Close", "إغلاق")}
          >
            ×
          </button>
        </header>

        <div className="admin-stock-search">
          <input
            ref={searchInputRef}
            type="search"
            value={query}
            placeholder={t(language, "Search photos…", "ابحث عن صور…")}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="admin-stock-body">
          {error ? <p className="admin-stock-error">{error}</p> : null}

          {!query.trim() && !error ? (
            <p className="admin-stock-empty">
              {t(
                language,
                "Type a keyword above to search free photos.",
                "اكتب كلمة في الأعلى للبحث عن صور مجانية.",
              )}
            </p>
          ) : null}

          {results.length > 0 ? (
            <ul className="admin-stock-grid">
              {results.map((item) => {
                const isImporting = importingId === item.id;
                return (
                  <li key={`${source}-${item.id}`}>
                    <button
                      type="button"
                      className="admin-stock-tile"
                      onClick={() => selectResult(item)}
                      disabled={Boolean(importingId)}
                      aria-busy={isImporting}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.thumb} alt={item.alt} loading="lazy" />
                      {isImporting ? (
                        <span className="admin-stock-tile-overlay">
                          {t(language, "Importing…", "جارٍ الاستيراد…")}
                        </span>
                      ) : null}
                    </button>
                    <p className="admin-stock-credit">
                      <a href={item.credit.url} target="_blank" rel="noopener noreferrer">
                        {item.credit.name}
                      </a>
                      <span> · {SOURCE_LABELS[source]}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {loading ? (
            <p className="admin-stock-status">{t(language, "Loading…", "جارٍ التحميل…")}</p>
          ) : null}

          {!loading && query.trim() && results.length === 0 && !error ? (
            <p className="admin-stock-empty">
              {t(language, "No results found.", "لا توجد نتائج.")}
            </p>
          ) : null}

          {hasMore && !loading ? (
            <button type="button" className="admin-stock-more" onClick={loadMore}>
              {t(language, "Load more", "عرض المزيد")}
            </button>
          ) : null}
        </div>

        <footer className="admin-stock-foot">
          <small>
            {source === "google"
              ? t(
                  language,
                  "Google results may be copyrighted. Verify usage rights before publishing.",
                  "قد تكون نتائج جوجل محمية بحقوق النشر. تأكّد من حقوق الاستخدام قبل النشر.",
                )
              : t(
                  language,
                  "Photos are free to use. Please keep photographer credit where possible.",
                  "الصور مجانية الاستخدام. يُرجى الإبقاء على نسبة الصورة للمصوّر عند الإمكان.",
                )}
          </small>
        </footer>
      </div>
    </div>
  );
}
