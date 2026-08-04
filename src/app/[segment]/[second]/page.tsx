import {
  getLocationBySlug,
  getLocations,
  getServiceBySlug,
  getServices,
} from "@/lib/data/repositories";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { buildServiceCitySeo } from "@/lib/seo/service-location-seo";
import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ segment: string; second: string }> };

export async function generateStaticParams() {
  const locations = getLocations({ publishedOnly: true, servedOnly: true }).slice(0, 2);
  const services = getServices({ publishedOnly: true }).slice(0, 2);
  return locations.flatMap((location) =>
    services.map((service) => ({
      segment: location.slug,
      second: service.slug,
    })),
  );
}

/**
 * Legacy URL: /{city}/{service}/
 * Permanently redirects to preferred /{service}-in-{city}/
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segment, second } = await params;
  const city = getLocationBySlug(segment);
  const service = getServiceBySlug(second);
  if (!city || !service) return {};
  const seo = buildServiceCitySeo(service, city);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical: seo.canonicalUrl },
    robots: { index: true, follow: true },
  };
}

export default async function LegacyCityServicePage({ params }: Props) {
  const { segment, second } = await params;
  const city = getLocationBySlug(segment);
  const service = getServiceBySlug(second);

  if (
    city &&
    service &&
    city.publicationStatus === "published" &&
    city.isServed &&
    service.publicationStatus === "published"
  ) {
    permanentRedirect(buildServiceInCityPath(service.slug, city.slug));
  }

  notFound();
}
