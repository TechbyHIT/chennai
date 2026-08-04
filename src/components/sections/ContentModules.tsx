import { Heading } from "@/components/ui/Heading";
import type { ContentModule } from "@/types/content";
import Link from "next/link";

export function ContentModules({ modules }: { modules: ContentModule[] }) {
  return (
    <div className="seo-article-stack">
      {modules.map((module, index) => (
        <section
          key={`${module.key}-${module.title}`}
          className={`seo-section${index % 2 === 1 ? " seo-section--muted" : ""}`}
        >
          <header className="seo-section__head">
            <Heading as="h2">{module.title}</Heading>
          </header>
          <div className="seo-prose">
            <p>{module.body}</p>
          </div>
          {module.bullets && module.bullets.length > 0 ? (
            <ul className="seo-check mt-5">
              {module.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {module.links && module.links.length > 0 ? (
            <div className="seo-link-grid mt-5">
              {module.links.map((link) => (
                <Link key={`${link.href}-${link.label}`} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
