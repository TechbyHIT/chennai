import { AreaDirectory } from "@/components/sections/AreaDirectory";
import { CityServiceDirectory } from "@/components/sections/CityServiceDirectory";
import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildLocationPath } from "@/config/routes";
import { STATIC_GENERATION, isSeedCity } from "@/config/static-generation";
import {
  getAreas,
  getLocationBySlug,
  getLocations,
  getServices,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ locationSlug: string }> };

export async function generateStaticParams() {
  if (STATIC_GENERATION.seedCitySlugs.length === 0) return [];
  return getLocations({ publishedOnly: true, servedOnly: true })
    .filter((location) => isSeedCity(location.slug))
    .map((location) => ({
      locationSlug: location.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug } = await params;
  const page = getPageByPath(buildLocationPath(locationSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function LocationPage({ params }: Props) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (
    !location ||
    location.publicationStatus !== "published" ||
    !location.isServed
  ) {
    notFound();
  }

  const path = buildLocationPath(locationSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const areas = getAreas({
    publishedOnly: true,
    parentId: location.id,
    scaledLimit: 120,
  });
  const services = getServices({ publishedOnly: true });

  return (
    <>
      <ProgrammaticPage
        page={page}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations/" },
          { name: location.name, href: path },
        ]}
      />
      <Section className="pt-0">
        <Container className="space-y-12">
          <CityServiceDirectory city={location} services={services} />
          {areas.length > 0 ? (
            <AreaDirectory
              locationSlug={location.slug}
              locationName={location.name}
              areas={areas}
            />
          ) : null}
        </Container>
      </Section>
    </>
  );
}
