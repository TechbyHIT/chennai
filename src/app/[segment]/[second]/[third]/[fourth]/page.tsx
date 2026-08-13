import { PremiumServiceLanding } from "@/components/sections/PremiumServiceLanding";
import { buildPremiumLanding } from "@/lib/content/build-premium-landing";
import {
  getAreaBySlug,
  getLocationBySlug,
  getServiceBySlug,
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

/** Service×area HTML is ISR-only to keep .next small on shared SSDs. */
export async function generateStaticParams() {
  return [];
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
