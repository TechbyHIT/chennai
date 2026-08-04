import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { PRICING_STATEMENT } from "@/data/content-modules";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Pricing Guide",
  description:
    "Understand what affects invisible grill pricing in Tamil Nadu — measurements, materials, spacing, height and site access. No fake fixed prices.",
  alternates: { canonical: generateCanonical("/pricing-guide/") },
};

export default function PricingGuidePage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Pricing Guide", href: "/pricing-guide/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Pricing guide</Heading>
            <p className="leading-8 text-ink-700">{PRICING_STATEMENT}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Opening size and quantity",
                body: "Total running length, number of balconies or windows, and corner details affect material and labour.",
              },
              {
                title: "Material grade and coating",
                body: "Stainless steel cable grade, coating quality and frame components influence durability — especially in coastal Tamil Nadu.",
              },
              {
                title: "Spacing and safety requirements",
                body: "Tighter spacing for children or pets may require more cable runs and careful planning.",
              },
              {
                title: "Building height and access",
                body: "High-rise installations and difficult access can affect scaffolding, time on site and finishing complexity.",
              },
              {
                title: "Fixing surface",
                body: "Concrete, masonry, metal railings and custom frames each need different fixing approaches.",
              },
              {
                title: "Finishing expectations",
                body: "Neat alignment, colour coordination and post-install cleanup are part of a quality job — not a separate afterthought.",
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

          <div className="rounded-[1.5rem] border border-brand-200 bg-brand-50/60 p-6">
            <p className="font-semibold text-brand-900">Ready for a measured quotation?</p>
            <p className="mt-2 text-sm leading-7 text-ink-700">
              Share your city, area and opening details. We serve Chennai and selected Tamil Nadu
              locations.
            </p>
            <div className="mt-4">
              <Button href="/contact/">Request a quotation</Button>
            </div>
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
