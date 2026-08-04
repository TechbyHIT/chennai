import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and conditions for using the ${BUSINESS_CONFIG.name} website and enquiry services.`,
  alternates: { canonical: generateCanonical("/terms-and-conditions/") },
};

export default function TermsPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="max-w-3xl space-y-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Terms and Conditions", href: "/terms-and-conditions/" },
          ]}
        />
        <Heading as="h1">Terms and conditions</Heading>
        <div className="space-y-6 text-sm leading-7 text-ink-700">
          <p>
            By using {BUSINESS_CONFIG.websiteUrl}, you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Website content</h2>
            <p>
              Content describes invisible grill services and Tamil Nadu coverage in good faith.
              Service availability, pricing and timelines are confirmed only after site assessment and
              written quotation.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Enquiries</h2>
            <p>
              Submitting a form does not create a binding contract. Quotations and installation
              schedules are subject to measurement, material availability and agreed terms at the
              time of booking.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Limitation</h2>
            <p>
              We aim for accurate information but do not guarantee that all site content is complete
              or current at every moment. Local pages reflect served coverage, not universal
              statewide availability.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Contact</h2>
            <p>
              Questions:{" "}
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-brand-700 underline">
                {BUSINESS_CONFIG.email}
              </a>
            </p>
          </section>
          <p className="text-ink-500">Last updated: August 2026</p>
        </div>
      </Container>
    </Section>
  );
}
