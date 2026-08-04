import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SITE_CONFIG } from "@/config/site";
import { howToSchema } from "@/lib/schema/website-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Installation Process",
  description:
    "Step-by-step invisible grill installation process for Tamil Nadu homes — enquiry, measurement, quotation, installation and finishing.",
  alternates: { canonical: generateCanonical("/installation-process/") },
  openGraph: {
    title: "Installation Process | Glory Invisible Grills",
    description:
      "Step-by-step invisible grill installation for Tamil Nadu homes — enquiry to finishing.",
    url: "/installation-process/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Installation Process | Glory Invisible Grills",
    description:
      "Step-by-step invisible grill installation for Tamil Nadu homes — enquiry to finishing.",
  },
};

const STEPS = [
  {
    title: "Enquiry and availability",
    body: "Share your city, area, property type and openings. We confirm whether your location in Tamil Nadu is within our served coverage.",
  },
  {
    title: "Site visit and measurement",
    body: "We measure openings, assess fixing points, discuss spacing for children or pets if relevant, and note access conditions.",
  },
  {
    title: "Quotation",
    body: "Pricing is based on measured dimensions, material choices, spacing, height and complexity — not generic online rates.",
  },
  {
    title: "Scheduling",
    body: "Installation dates are agreed after quotation acceptance. Apartment projects may need society access coordination.",
  },
  {
    title: "Installation",
    body: "Frames are fixed, cables are tensioned and aligned, and finishing is checked for consistency across openings.",
  },
  {
    title: "Final check and guidance",
    body: "We walk through the completed work, share basic maintenance guidance and answer questions about use and cleaning.",
  },
];

export default function InstallationProcessPage() {
  return (
    <>
      <JsonLd
        data={[
          howToSchema({
            name: "How invisible grill installation works",
            description:
              "Measurement-led installation process used by Glory Invisible Grills across Tamil Nadu.",
            url: `${SITE_CONFIG.url}/installation-process/`,
            steps: STEPS.map((step) => ({
              name: step.title,
              text: step.body,
            })),
          }),
        ]}
      />
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Installation Process", href: "/installation-process/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Installation process</Heading>
            <p className="leading-8 text-ink-700" data-speakable>
              A clear process helps families in Chennai and across Tamil Nadu plan balcony and window
              safety work without surprises.
            </p>
          </div>

          <ol className="space-y-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-800 font-display text-lg text-white">
                  {index + 1}
                </span>
                <div>
                  <Heading as="h2">{step.title}</Heading>
                  <p className="mt-2 text-sm leading-7 text-ink-700">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <Button href="/contact/">Start with an enquiry</Button>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
