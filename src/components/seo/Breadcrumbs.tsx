import { breadcrumbSchema } from "@/lib/schema/breadcrumb-schema";
import { toJsonLd } from "@/lib/schema/json-ld";
import type { BreadcrumbItem } from "@/types/seo";
import Link from "next/link";

export function Breadcrumbs({
  items,
  className = "",
  light = false,
}: {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
}) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={`mb-6 text-sm ${light ? "text-white/75" : "text-ink-500"} ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-2">
                {isLast ? (
                  <span
                    aria-current="page"
                    className={`font-medium ${light ? "text-white" : "text-ink-700"}`}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={light ? "hover:text-white" : "hover:text-brand-700"}
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast ? <span aria-hidden="true">›</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbSchema(items)) }}
      />
    </>
  );
}
