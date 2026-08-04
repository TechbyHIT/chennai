import { PremiumServiceLanding } from "@/components/sections/PremiumServiceLanding";
import { buildPremiumLanding } from "@/lib/content/build-premium-landing";
import {
  getAreaBySlug,
  getAreas,
  getLocationBySlug,
  getLocations,
  getServiceBySlug,
  getServices,
} from "@/lib/data/repositories";
import { STATE_SLUG } from "@/lib/routing/service-location-urls";
import { generateLandingMetadata } from "@/lib/seo/generate-landing-metadata";
import { buildServiceAreaSeo } from "@/lib/seo/service-location-seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = {
  params: Promise<{
    segment: string;
    second: string;
    third: string;
    fourth: string;
  }>;
};

/**
 * Prebuild a large seed of service×area URLs.
 * Remaining combinations stay available via dynamicParams + ISR.
 */
export async function generateStaticParams() {
  const services = getServices({ publishedOnly: true });
  // Keep static seed small at 500k scale — ISR + dynamicParams handle the rest.
  const seedCities = getLocations({ publishedOnly: true, servedOnly: true }).filter(
    (city) =>
      city.slug === "coimbatore" ||
      city.slug === "chennai" ||
      city.slug === "madurai" ||
      city.slug === "salem" ||
      city.slug === "tiruppur",
  );

  return seedCities.flatMap((city) => {
    const areaLimit = city.slug === "coimbatore" || city.slug === "chennai" ? 40 : 15;
    const areas = getAreas({ publishedOnly: true, parentId: city.id }).slice(
      0,
      areaLimit,
    );
    return services.flatMap((service) =>
      areas.map((area) => ({
        segment: service.slug,
        second: STATE_SLUG,
        third: city.slug,
        fourth: area.slug,
      })),
    );
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment, second, third, fourth } = await params;
  if (second !== STATE_SLUG) return {};

  const service = getServiceBySlug(segment);
  const city = getLocationBySlug(third);
  const area = city ? getAreaBySlug(third, fourth) : undefined;
  if (!service || !city || !area) return {};

  const seo = buildServiceAreaSeo(service, city, area);
  return generateLandingMetadata({
    ...seo,
    keywords: seo.keywords,
    service,
    city,
    area,
  });
}

/** Preferred area page: /{service}/{state}/{city}/{area}/ */
export default async function ServiceStateCityAreaPage({ params }: Props) {
  const { segment, second, third, fourth } = await params;
  if (second !== STATE_SLUG) notFound();

  const service = getServiceBySlug(segment);
  const city = getLocationBySlug(third);
  const area = city ? getAreaBySlug(third, fourth) : undefined;

  if (
    !service ||
    !city ||
    !area ||
    service.publicationStatus !== "published" ||
    city.publicationStatus !== "published" ||
    !city.isServed ||
    area.publicationStatus !== "published"
  ) {
    notFound();
  }

  const seo = buildServiceAreaSeo(service, city, area);
  return (
    <PremiumServiceLanding model={buildPremiumLanding(service, city, seo, area)} />
  );
}
