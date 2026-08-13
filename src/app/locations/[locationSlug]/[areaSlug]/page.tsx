import { AreaServiceDirectory } from "@/components/sections/AreaServiceDirectory";
import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildAreaPath, buildLocationPath } from "@/config/routes";
import {
  getAreaBySlug,
  getLocationBySlug,
  getServices,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ locationSlug: string; areaSlug: string }> };

/** Area hubs are ISR-only — scaled localities must not be written at build. */
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug, areaSlug } = await params;
  const page = getPageByPath(buildAreaPath(locationSlug, areaSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function AreaPage({ params }: Props) {
  const { locationSlug, areaSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (
    !location ||
    location.publicationStatus !== "published" ||
    !location.isServed
  ) {
    notFound();
  }

  const area = getAreaBySlug(locationSlug, areaSlug);
  if (!area || area.publicationStatus !== "published") notFound();

  const path = buildAreaPath(locationSlug, areaSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const services = getServices({ publishedOnly: true });

  return (
    <>
      <ProgrammaticPage
        page={page}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations/" },
          { name: location.name, href: buildLocationPath(locationSlug) },
          { name: area.name, href: path },
        ]}
      />
      <Section className="pt-0">
        <Container>
          <AreaServiceDirectory city={location} area={area} services={services} />
        </Container>
      </Section>
    </>
  );
}
