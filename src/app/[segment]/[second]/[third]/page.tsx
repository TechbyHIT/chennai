import {
  getAreaBySlug,
  getAreas,
  getLocationBySlug,
  getServiceBySlug,
  getServices,
} from "@/lib/data/repositories";
import {
  buildServiceStateCityAreaPath,
  STATE_SLUG,
} from "@/lib/routing/service-location-urls";
import { permanentRedirect, notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = {
  params: Promise<{ segment: string; second: string; third: string }>;
};

export async function generateStaticParams() {
  const chennai = getLocationBySlug("chennai");
  if (!chennai) return [];
  const areas = getAreas({ publishedOnly: true, parentId: chennai.id }).slice(0, 2);
  const services = getServices({ publishedOnly: true }).slice(0, 2);
  return areas.flatMap((area) =>
    services.map((service) => ({
      segment: chennai.slug,
      second: area.slug,
      third: service.slug,
    })),
  );
}

/**
 * Legacy URL: /{city}/{area}/{service}/
 * Redirects to preferred /{service}/{state}/{city}/{area}/
 */
export default async function LegacyCityAreaServicePage({ params }: Props) {
  const { segment, second, third } = await params;
  const city = getLocationBySlug(segment);
  const area = getAreaBySlug(segment, second);
  const service = getServiceBySlug(third);

  if (
    city &&
    area &&
    service &&
    city.isServed &&
    area.isServed &&
    city.publicationStatus === "published" &&
    area.publicationStatus === "published" &&
    service.publicationStatus === "published"
  ) {
    permanentRedirect(
      buildServiceStateCityAreaPath(service.slug, city.slug, area.slug, STATE_SLUG),
    );
  }

  notFound();
}
