"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchHit = {
  type: "service" | "location" | "area";
  label: string;
  href: string;
  meta?: string;
};

const TYPE_LABEL: Record<SearchHit["type"], string> = {
  service: "Service",
  location: "City",
  area: "Locality",
};

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const term = initial.trim();
    if (term.length < 2) {
      setHits([]);
      setSearched(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: { results?: SearchHit[] }) => {
        setHits(data.results ?? []);
        setSearched(true);
      })
      .catch(() => undefined)
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [initial]);

  return (
    <div className="space-y-8">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          router.push(`/search/?q=${encodeURIComponent(query.trim())}`);
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="search-page-input" className="sr-only">
          Search services and Tamil Nadu locations
        </label>
        <input
          id="search-page-input"
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “invisible grills Chennai” or “bird nets Coimbatore”"
          className="min-h-12 w-full rounded-2xl border border-brand-100 bg-white px-4 text-ink-900 shadow-soft placeholder:text-ink-500"
          autoComplete="off"
        />
        <button
          type="submit"
          className="min-h-12 rounded-2xl bg-cta-500 px-6 font-semibold text-brand-900 transition hover:bg-cta-600"
        >
          Search
        </button>
      </form>

      {loading ? <p className="text-sm text-ink-500">Searching…</p> : null}

      {!loading && searched && hits.length === 0 ? (
        <div className="premium-card p-6">
          <p className="font-display text-xl text-brand-900">
            No matches for “{initial}”
          </p>
          <p className="mt-2 text-sm leading-7 text-ink-500">
            Try a service name (invisible grills, safety nets, bird nets) or a Tamil
            Nadu city or locality. You can also browse{" "}
            <Link href="/services/" className="font-semibold text-brand-500">
              all services
            </Link>{" "}
            or{" "}
            <Link href="/locations/" className="font-semibold text-brand-500">
              all locations
            </Link>
            .
          </p>
        </div>
      ) : null}

      {hits.length > 0 ? (
        <>
          <p className="text-sm text-ink-500">
            {hits.length} result{hits.length === 1 ? "" : "s"} for “{initial}”
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {hits.map((hit) => (
              <li key={`${hit.type}-${hit.href}`}>
                <Link href={hit.href} className="premium-card group block p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-cta-600">
                    {TYPE_LABEL[hit.type]}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold text-brand-900 group-hover:text-brand-500">
                    {hit.label}
                  </span>
                  {hit.meta ? (
                    <span className="mt-1 block text-sm text-ink-500">{hit.meta}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
