import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildPropertyTypeServicePath } from "@/config/routes";
import { getPropertyTypes, getServices } from "@/lib/data/repositories";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Property Types",
  description:
    "Invisible grill recommendations by property type — apartments, independent houses, villas and high-rise homes in Tamil Nadu.",
  alternates: { canonical: generateCanonical("/property-types/") },
};

export default function PropertyTypesIndexPage() {
  const propertyTypes = getPropertyTypes({ publishedOnly: true });
  const services = getServices({ publishedOnly: true });

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Property Types", href: "/property-types/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Property types</Heading>
            <p className="leading-8 text-ink-700">
              Different Tamil Nadu homes need different measurement and fixing approaches. Browse by
              property type and service.
            </p>
          </div>
          <div className="space-y-10">
            {propertyTypes.map((propertyType) => (
              <section key={propertyType.id} className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl text-brand-900">{propertyType.name}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-ink-700">
                    {propertyType.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {services.map((service) => (
                    <Link
                      key={`${propertyType.id}-${service.id}`}
                      href={buildPropertyTypeServicePath(propertyType.slug, service.slug)}
                      className="rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                    >
                      {service.shortName}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
