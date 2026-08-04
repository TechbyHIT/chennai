import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { buildPropertyTypeServicePath } from "@/config/routes";
import {
  getPropertyTypeBySlug,
  getPropertyTypes,
  getServiceBySlug,
  getServices,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { serviceSchema } from "@/lib/schema/service-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ propertyTypeSlug: string; serviceSlug: string }> };

export async function generateStaticParams() {
  const propertyTypes = getPropertyTypes({ publishedOnly: true }).slice(0, 2);
  const services = getServices({ publishedOnly: true }).slice(0, 2);
  return propertyTypes.flatMap((propertyType) =>
    services.map((service) => ({
      propertyTypeSlug: propertyType.slug,
      serviceSlug: service.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { propertyTypeSlug, serviceSlug } = await params;
  const page = getPageByPath(buildPropertyTypeServicePath(propertyTypeSlug, serviceSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function PropertyTypeServicePage({ params }: Props) {
  const { propertyTypeSlug, serviceSlug } = await params;
  const propertyType = getPropertyTypeBySlug(propertyTypeSlug);
  const service = getServiceBySlug(serviceSlug);

  if (
    !propertyType ||
    !service ||
    propertyType.publicationStatus !== "published" ||
    service.publicationStatus !== "published"
  ) {
    notFound();
  }

  const path = buildPropertyTypeServicePath(propertyTypeSlug, serviceSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  return (
    <ProgrammaticPage
      page={page}
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Property Types", href: "/property-types/" },
        { name: propertyType.name, href: "/property-types/" },
        { name: service.name, href: path },
      ]}
      extraSchema={[serviceSchema(service, page.canonicalUrl)]}
    />
  );
}
