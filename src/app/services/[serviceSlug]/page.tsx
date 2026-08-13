import { ServiceCityDirectory } from "@/components/sections/ServiceCityDirectory";
import { ProgrammaticPage } from "@/components/sections/ProgrammaticPage";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { buildServicePath } from "@/config/routes";
import { getLocations, getServiceBySlug } from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { serviceSchema } from "@/lib/schema/service-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ serviceSlug: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const page = getPageByPath(buildServicePath(serviceSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function ServicePage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service || service.publicationStatus !== "published") notFound();

  const path = buildServicePath(serviceSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const cities = getLocations({ publishedOnly: true, servedOnly: true });

  return (
    <>
      <ProgrammaticPage
        page={page}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: service.name, href: path },
        ]}
        extraSchema={[serviceSchema(service, page.canonicalUrl)]}
      />
      <Section className="pt-0">
        <Container>
          <ServiceCityDirectory service={service} cities={cities} />
        </Container>
      </Section>
    </>
  );
}
