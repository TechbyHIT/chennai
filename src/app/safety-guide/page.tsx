import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Safety Guide",
  description:
    "Safety guidance for invisible grills in Tamil Nadu — spacing, supervision, fixing quality and when grills are not enough on their own.",
  alternates: { canonical: generateCanonical("/safety-guide/") },
};

export default function SafetyGuidePage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Safety Guide", href: "/safety-guide/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Safety guide</Heading>
            <p className="leading-8 text-ink-700">
              Invisible grills can reduce fall risk at balconies and windows, but they work best as
              part of sensible household habits — especially in apartments and high-rise homes across
              Tamil Nadu.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Spacing matters",
                body: "Cable spacing should match who uses the space — toddlers, older children and pets may need tighter spacing than a general adult-only balcony.",
              },
              {
                title: "Fixing quality is critical",
                body: "Weak anchors or poorly aligned frames reduce effectiveness. Installation should be assessed for your wall, railing or structural fixing points.",
              },
              {
                title: "Supervision still matters",
                body: "Grills are not a substitute for adult supervision of children or for training pets near open edges.",
              },
              {
                title: "Repair unsafe railings first",
                body: "If an existing railing is loose or damaged, address structural issues before relying on an add-on grill system.",
              },
              {
                title: "Maintenance checks",
                body: "Periodic checks for tension, coating wear and fastener integrity are sensible — especially in humid coastal cities.",
              },
              {
                title: "Building rules",
                body: "Apartment societies may have guidelines on balcony modifications. Confirm access and approval requirements before installation.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft"
              >
                <Heading as="h2">{item.title}</Heading>
                <p className="mt-3 text-sm leading-7 text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>

          <Button href="/contact/">Discuss safety for your openings</Button>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
