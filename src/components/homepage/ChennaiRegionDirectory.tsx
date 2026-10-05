import Link from "next/link";
import {
  CHENNAI_BELT_SLUGS,
  CHENNAI_HUB_SLUG,
} from "@/config/chennai-region";
import { MAIN_SERVICES } from "@/config/main-services";
import { buildAreaPath, buildLocationPath } from "@/config/routes";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { getAreaBySlug, getLocationBySlug } from "@/lib/data/repositories";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";

/** Well-known Chennai localities to surface on the homepage (must be curated areas). */
const FEATURED_CHENNAI_AREAS = [
  "adyar",
  "velachery",
  "anna-nagar",
  "t-nagar",
  "porur",
  "sholinganallur",
  "omr",
  "ecr",
  "thiruvanmiyur",
  "besant-nagar",
  "mylapore",
  "nungambakkam",
  "kilpauk",
  "mogappair",
  "ambattur",
  "perambur",
  "kolathur",
  "madipakkam",
  "medavakkam",
  "pallikaranai",
  "tambaram",
  "chromepet",
  "pallavaram",
  "perungudi",
  "thoraipakkam",
  "navalur",
  "kelambakkam",
  "maduravoyal",
];

/**
 * Homepage block that links every Chennai-region hub, the main Chennai
 * localities and each core service in Chennai. This is the shortest crawl
 * path from the homepage to the pages we most want ranking.
 */
export function ChennaiRegionDirectory() {
  const chennai = getLocationBySlug(CHENNAI_HUB_SLUG);
  if (!chennai) return null;

  const belt = CHENNAI_BELT_SLUGS.map((slug) => getLocationBySlug(slug)).filter(
    (loc): loc is NonNullable<typeof loc> => Boolean(loc && loc.isServed),
  );
  const areas = FEATURED_CHENNAI_AREAS.map((slug) => getAreaBySlug(CHENNAI_HUB_SLUG, slug)).filter(
    (area): area is NonNullable<typeof area> => Boolean(area),
  );

  return (
    <Section id="chennai" className="bg-brand-50/60 scroll-mt-28">
      <Container className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-500">
            <span className="h-px w-8 bg-cta-500" aria-hidden="true" />
            Chennai &amp; 150 km around
          </p>
          <Heading as="h2" className="text-3xl sm:text-4xl">
            Invisible grills and safety nets across Chennai
          </Heading>
          <p className="text-base leading-7 text-ink-500">
            Chennai is our main service region. We measure and install across the city and the
            towns within about 150 km — from Tambaram and Avadi to Chengalpattu, Kanchipuram,
            Sriperumbudur, Tiruvallur, Ranipet, Vellore, Arani and Tindivanam. Apartments and
            gated communities are our core work, from ready-to-move flats to under-construction
            bookings nearing handover.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-xl text-brand-900">Our services in Chennai</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MAIN_SERVICES.map((pillar) => (
                  <li key={pillar.slug}>
                    <Link
                      href={buildServiceInCityPath(pillar.slug, CHENNAI_HUB_SLUG)}
                      className="inline-block rounded-full bg-brand-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      {pillar.label} in Chennai
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl text-brand-900">Popular Chennai localities</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={buildAreaPath(CHENNAI_HUB_SLUG, area.slug)}
                      className="inline-block rounded-full border border-brand-100 bg-white px-3 py-1 text-sm text-brand-800 hover:border-brand-300"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={buildLocationPath(CHENNAI_HUB_SLUG)}
                    className="inline-block rounded-full border border-cta-500 px-3 py-1 text-sm font-semibold text-brand-900 hover:bg-cta-500/10"
                  >
                    All Chennai areas →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="premium-card p-6">
            <h3 className="font-display text-xl text-brand-900">Towns within 150 km of Chennai</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {belt.map((town) => (
                <li key={town.slug}>
                  <Link
                    href={buildLocationPath(town.slug)}
                    className="flex items-center justify-between gap-2 rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm font-semibold text-brand-800 hover:border-brand-300"
                  >
                    {town.name}
                    <span aria-hidden="true" className="text-cta-500">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-6 text-ink-500">
              Visits are scheduled from Chennai; travel is planned into the quote for the outer
              towns.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
