import Link from "next/link";
import { SafeImage } from "@/components/media/SafeImage";
import { MAIN_SERVICES } from "@/config/main-services";
import { buildServicePath } from "@/config/routes";
import { imagesForService } from "@/data/service-images";
import type { Service } from "@/types/service";

/**
 * The five core service lines, always shown on the homepage regardless of how
 * many other services exist. Each card links to the pillar page and to its
 * sub-types, which gives crawlers a short, keyword-rich path to every variant.
 */
export function MainServicesShowcase({
  services,
  fallbackImage,
  hrefs,
  placeLabel = "Tamil Nadu",
}: {
  services: Service[];
  fallbackImage: string;
  /** Serializable slug → href map for scoped destinations (e.g. service-in-city URLs). */
  hrefs?: Record<string, string>;
  /** Place label used in card titles and image alt text. */
  placeLabel?: string;
}) {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const linkFor = (slug: string) => hrefs?.[slug] ?? buildServicePath(slug);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {MAIN_SERVICES.map((pillar, index) => {
        const service = bySlug.get(pillar.slug);
        if (!service) return null;

        const photo = service.heroImage || imagesForService(pillar.slug)[0] || fallbackImage;
        const variants = pillar.related
          .map((slug) => bySlug.get(slug))
          .filter((item): item is Service => Boolean(item));

        return (
          <li
            key={pillar.slug}
            className="premium-card gradient-border flex h-full flex-col overflow-hidden"
          >
            <Link
              href={linkFor(pillar.slug)}
              className="group block"
              aria-label={`${pillar.label} in ${placeLabel}`}
            >
              <span className="relative block aspect-[16/10] bg-brand-100">
                <SafeImage
                  src={photo}
                  alt={`${pillar.label} installation in ${placeLabel}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </span>
            </Link>
            <div className="flex flex-1 flex-col space-y-3 p-5">
              <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
                <Link href={linkFor(pillar.slug)} className="hover:text-brand-600">
                  {pillar.label} in {placeLabel}
                </Link>
              </h3>
              <p className="text-sm leading-7 text-ink-500">{pillar.tagline}</p>
              {variants.length ? (
                <ul className="flex flex-wrap gap-2" aria-label={`${pillar.label} types`}>
                  {variants.map((variant) => (
                    <li key={variant.slug}>
                      <Link
                        href={linkFor(variant.slug)}
                        className="inline-block rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:border-brand-300"
                      >
                        {variant.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Link
                href={linkFor(pillar.slug)}
                className="mt-auto pt-2 text-sm font-semibold text-brand-600"
              >
                Explore {pillar.label.toLowerCase()} →
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
