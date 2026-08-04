import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${BUSINESS_CONFIG.name} website content, pricing information and safety guidance.`,
  alternates: { canonical: generateCanonical("/disclaimer/") },
};

export default function DisclaimerPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="max-w-3xl space-y-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Disclaimer", href: "/disclaimer/" },
          ]}
        />
        <Heading as="h1">Disclaimer</Heading>
        <div className="space-y-6 text-sm leading-7 text-ink-700">
          <p>
            Information on this website is provided for general guidance about invisible grill
            installation in Tamil Nadu. It is not professional engineering advice or a guarantee of
            suitability for every property.
          </p>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Pricing and availability</h2>
            <p>
              Online content does not constitute a fixed price list. Final quotations depend on
              measurement, materials, site conditions and project scope. Service availability is
              limited to locations we genuinely serve.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Safety</h2>
            <p>
              Invisible grills are one part of balcony and window safety. Adult supervision,
              building maintenance and compliance with society or local rules remain the
              responsibility of the property owner or occupant.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">External links</h2>
            <p>
              Links to third-party sites, if present, are provided for convenience. We are not
              responsible for their content or policies.
            </p>
          </section>
          <p className="text-ink-500">Last updated: August 2026</p>
        </div>
      </Container>
    </Section>
  );
}
