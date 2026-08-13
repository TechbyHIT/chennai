import { PremiumServiceLanding } from "@/components/sections/PremiumServiceLanding";
import { buildPremiumLanding } from "@/lib/content/build-premium-landing";
import {
  getLocationBySlug,
  getLocations,
  getServiceBySlug,
  getServices,
} from "@/lib/data/repositories";
import { STATIC_GENERATION, isSeedCity } from "@/config/static-generation";
import { parseServiceInCitySlug } from "@/lib/routing/service-location-urls";
import { generateLandingMetadata } from "@/lib/seo/generate-landing-metadata";
import { buildServiceCitySeo } from "@/lib/seo/service-location-seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ segment: string }> };

/** City money-pages for every served city (small set — not scaled localities). */
export async function generateStaticParams() {
  const services = getServices({ publishedOnly: true });
  const cities = getLocations({ publishedOnly: true, servedOnly: true }).filter(
    (city) =>
      STATIC_GENERATION.seedCitySlugs.length === 0 || isSeedCity(city.slug),
  );
  return cities.flatMap((city) =>
    services.map((service) => ({
      segment: `${service.slug}-in-${city.slug}`,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment } = await params;
  const parsed = parseServiceInCitySlug(segment);
  if (!parsed) return {};

  const service = getServiceBySlug(parsed.serviceSlug);
  const city = getLocationBySlug(parsed.citySlug);
  if (!service || !city || service.publicationStatus !== "published" || !city.isServed) {
    return {};
  }

  const seo = buildServiceCitySeo(service, city);
  return generateLandingMetadata({
    ...seo,
    keywords: seo.keywords,
    service,
    city,
  });
}

/** Preferred city page: /{service}-in-{city}/ */
export default async function ServiceInCitySegmentPage({ params }: Props) {
  const { segment } = await params;
  const parsed = parseServiceInCitySlug(segment);
  if (!parsed) notFound();

  const service = getServiceBySlug(parsed.serviceSlug);
  const city = getLocationBySlug(parsed.citySlug);

  if (
    !service ||
    !city ||
    service.publicationStatus !== "published" ||
    city.publicationStatus !== "published" ||
    !city.isServed ||
    `${service.slug}-in-${city.slug}` !== segment
  ) {
    notFound();
  }

  const seo = buildServiceCitySeo(service, city);
  return <PremiumServiceLanding model={buildPremiumLanding(service, city, seo)} />;
}
