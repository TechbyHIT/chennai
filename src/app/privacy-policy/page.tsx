import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${BUSINESS_CONFIG.name} — how we handle enquiry and contact information.`,
  alternates: { canonical: generateCanonical("/privacy-policy/") },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="max-w-3xl space-y-8">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Privacy Policy", href: "/privacy-policy/" },
          ]}
        />
        <Heading as="h1">Privacy policy</Heading>
        <div className="space-y-6 text-sm leading-7 text-ink-700">
          <p>
            {BUSINESS_CONFIG.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates{" "}
            {BUSINESS_CONFIG.websiteUrl}. This policy explains how we handle information submitted
            through our website enquiry forms.
          </p>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Information we collect</h2>
            <p>
              When you submit a contact or quotation form, we may collect your name, phone number,
              WhatsApp number, city, area, property type, service interest and message content.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">How we use information</h2>
            <p>
              We use enquiry details to respond to your request, schedule site visits where
              applicable, and provide quotations for invisible grill work in Tamil Nadu. We do not
              sell personal information to third parties.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Retention and security</h2>
            <p>
              Enquiry records are kept only as long as needed for customer communication and business
              records. Reasonable measures are used to protect submitted information.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="font-display text-lg text-brand-900">Contact</h2>
            <p>
              Questions about this policy:{" "}
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
