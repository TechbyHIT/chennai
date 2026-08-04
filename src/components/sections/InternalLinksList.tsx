import { Heading } from "@/components/ui/Heading";
import type { InternalLink } from "@/types/seo";
import Link from "next/link";

export function InternalLinksList({ links }: { links: InternalLink[] }) {
  if (links.length === 0) return null;

  return (
    <section>
      <header className="seo-section__head">
        <Heading as="h2">Explore related pages</Heading>
        <p className="seo-section__sub">
          Useful internal links across services, localities, guides and support pages.
        </p>
      </header>
      <div className="seo-dir seo-dir--links" tabIndex={0}>
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="seo-dir__link"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
