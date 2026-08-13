import {
  getAreaBySlug,
  getLocationBySlug,
  getServiceBySlug,
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
  return [];
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
