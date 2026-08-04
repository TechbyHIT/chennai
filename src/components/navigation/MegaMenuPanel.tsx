import Link from "next/link";
import type { MegaMenuColumn } from "@/config/mega-menu";

export function MegaMenuPanel({
  columns,
  footerHref,
  footerLabel,
}: {
  columns: MegaMenuColumn[];
  footerHref: string;
  footerLabel: string;
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(78rem,calc(100vw-1.5rem))] -translate-x-1/2 pt-3">
      <div className="overflow-hidden rounded-[1.5rem] border border-brand-100 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.14)]">
        <div className="max-h-[min(72vh,40rem)] overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <Link
                  href={column.href}
                  className="font-display text-sm font-bold text-brand-800 hover:text-cta-600"
                >
                  {column.title}
                </Link>
                <ul className="mt-3 space-y-1.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="block text-[0.84rem] leading-snug text-ink-500 hover:text-brand-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-100 bg-brand-50 px-6 py-3.5">
          <p className="text-sm font-medium text-ink-700">
            High-intent services, property types and solutions — all linked to real pages.
          </p>
          <Link
            href={footerHref}
            className="text-sm font-semibold text-brand-600 hover:text-cta-600"
          >
            {footerLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
