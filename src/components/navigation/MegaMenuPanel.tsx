"use client";

import Link from "next/link";
import { useState } from "react";
import type { MegaMenuColumn } from "@/config/mega-menu";

function uniqueLinks(column: MegaMenuColumn, limit = 12) {
  const seen = new Set<string>();
  const links: MegaMenuColumn["links"] = [];
  for (const link of column.links) {
    if (seen.has(link.href)) continue;
    seen.add(link.href);
    links.push(link);
    if (links.length >= limit) break;
  }
  return links;
}

export function MegaMenuPanel({
  columns,
  footerHref,
  footerLabel,
  top,
}: {
  columns: MegaMenuColumn[];
  footerHref: string;
  footerLabel: string;
  top: number;
}) {
  const [active, setActive] = useState(0);
  const column = columns[active] ?? columns[0];
  if (!column) return null;
  const links = uniqueLinks(column);

  return (
    <div
      className="fixed left-1/2 z-50 w-[min(52rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
      style={{ top }}
    >
      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-[0_24px_60px_rgba(10,29,55,0.16)]">
        <div className="grid min-h-[22rem] grid-cols-[13.5rem_1fr]">
          <div className="flex flex-col gap-0.5 bg-brand-800 p-2.5">
            {columns.map((item, index) => {
              const selected = index === active;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                    selected
                      ? "bg-white text-brand-900"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-cta-600">
                  {column.title}
                </p>
                <p className="mt-1 font-display text-lg font-bold text-brand-900">
                  Popular pages
                </p>
              </div>
              <Link
                href={column.href}
                className="shrink-0 text-sm font-semibold text-brand-700 hover:text-cta-600"
              >
                View all
              </Link>
            </div>

            <ul className="mt-4 grid flex-1 content-start gap-1 sm:grid-cols-2">
              {links.map((link) => (
                <li key={`${column.title}-${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-2.5 py-2 text-sm text-ink-700 hover:bg-brand-50 hover:text-brand-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-brand-100 bg-brand-50 px-5 py-3">
          <p className="text-sm text-ink-700">Tamil Nadu installation, measured on site.</p>
          <Link
            href={footerHref}
            className="text-sm font-semibold text-brand-800 hover:text-cta-600"
          >
            {footerLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
