"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useState, useTransition } from "react";

type SearchHit = {
  type: "service" | "location" | "area";
  label: string;
  href: string;
  meta?: string;
};

export function InstantSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [popular, setPopular] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open || popular.length > 0) return;
    fetch("/api/search?mode=popular")
      .then((res) => res.json())
      .then((data: { results?: SearchHit[] }) => setPopular(data.results ?? []))
      .catch(() => undefined);
  }, [open, popular.length]);

  useEffect(() => {
    if (deferred.trim().length < 2) {
      setHits([]);
      return;
    }
    const controller = new AbortController();
    startTransition(() => {
      fetch(`/api/search?q=${encodeURIComponent(deferred)}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((data: { results?: SearchHit[] }) => setHits(data.results ?? []))
        .catch(() => undefined);
    });
    return () => controller.abort();
  }, [deferred]);

  const list = deferred.trim().length >= 2 ? hits : popular;

  return (
    <div className="relative">
      <label htmlFor="site-search" className="sr-only">
        Search services and Tamil Nadu locations
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 180)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && query.trim().length >= 2) {
            event.preventDefault();
            router.push(`/search/?q=${encodeURIComponent(query.trim())}`);
          }
        }}
        placeholder="Search services or Tamil Nadu cities…"
        className="min-h-12 w-full rounded-2xl border border-white/30 bg-white/95 px-4 text-ink-900 shadow-soft placeholder:text-ink-500"
        autoComplete="off"
      />
      {open && list.length > 0 ? (
        <ul className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-brand-100 bg-white py-2 shadow-soft">
          {deferred.trim().length < 2 ? (
            <li className="px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
              Popular searches
            </li>
          ) : null}
          {list.map((hit) => (
            <li key={`${hit.type}-${hit.href}`}>
              <Link
                href={hit.href}
                className="block px-4 py-2.5 text-sm text-ink-900 hover:bg-brand-50"
              >
                <span className="font-semibold">{hit.label}</span>
                {hit.meta ? (
                  <span className="mt-0.5 block text-xs text-ink-500">{hit.meta}</span>
                ) : null}
              </Link>
            </li>
          ))}
          {pending ? (
            <li className="px-4 py-2 text-xs text-ink-500">Updating…</li>
          ) : null}
          {deferred.trim().length >= 2 ? (
            <li>
              <Link
                href={`/search/?q=${encodeURIComponent(deferred.trim())}`}
                className="block px-4 py-2.5 text-sm font-semibold text-brand-500 hover:bg-brand-50"
              >
                View all results for “{deferred.trim()}” →
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
