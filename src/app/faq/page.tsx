import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { CORE_FAQS } from "@/data/content-modules";
import { faqSchema } from "@/lib/schema/faq-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about invisible grill installation, pricing, materials and Tamil Nadu service coverage.",
  alternates: { canonical: generateCanonical("/faq/") },
};

const EXTRA_FAQS = [
  {
    question: "How long does installation usually take?",
    answer:
      "Timing depends on the number of openings, access conditions and fixing complexity. A typical home visit and installation schedule is confirmed after measurement.",
  },
  {
    question: "Can invisible grills be installed in apartments?",
    answer:
      "Yes, when society or building access rules allow and fixing points are suitable. We discuss access and finishing expectations during the site visit.",
  },
  {
    question: "Do you serve cities outside Chennai?",
    answer:
      "We serve selected Tamil Nadu cities where we can genuinely complete measurement and installation. Availability varies — submit an enquiry with your city and area.",
  },
];

const ALL_FAQS = [...CORE_FAQS, ...EXTRA_FAQS];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqSchema(ALL_FAQS)]} />
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "FAQ", href: "/faq/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Frequently asked questions</Heading>
            <p className="leading-8 text-ink-700">
              Common questions about invisible grills, safety spacing, quotations and our Tamil Nadu
              coverage. For service-specific details, visit a service or location page.
            </p>
          </div>
          <FaqAccordion items={ALL_FAQS} />
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
