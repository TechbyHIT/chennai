import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { getHomepageGallery } from "@/lib/media/catalog";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${BUSINESS_CONFIG.name} — measured invisible grill installation for balconies and windows across Tamil Nadu, with honest local coverage from Chennai.`,
  alternates: { canonical: generateCanonical("/about/") },
};

export default function AboutPage() {
  const photos = getHomepageGallery(8);

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about/" },
            ]}
          />
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
              Tamil Nadu service coverage
            </p>
            <Heading as="h1">About {BUSINESS_CONFIG.name}</Heading>
            <p className="text-lg leading-8 text-ink-700">
              We install invisible grill systems for balconies, windows and sit-outs across selected
              cities in Tamil Nadu. Our focus is accurate measurement, practical safety spacing and
              neat finishing — not exaggerated branch claims or fake local addresses.
            </p>
          </div>
          <ImageGallery title="Our installation work" images={photos} columns="4" />
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article className="space-y-4 rounded-[1.5rem] border border-brand-100 bg-white/80 p-6 shadow-soft">
            <Heading as="h2">What we do</Heading>
            <p className="leading-7 text-ink-700">
              {BUSINESS_CONFIG.description} We work with apartment residents, independent home
              owners and families who need fall protection without heavy conventional iron grill
              visuals.
            </p>
          </article>
          <article className="space-y-4 rounded-[1.5rem] border border-brand-100 bg-white/80 p-6 shadow-soft">
            <Heading as="h2">Where we serve</Heading>
            <p className="leading-7 text-ink-700">
              Chennai is our primary base. We also serve other Tamil Nadu cities and areas where we
              can genuinely complete site visits, measurement and installation. Coverage is limited
              to locations we can actually reach — we do not list fake offices across the state.
            </p>
          </article>
          <article className="space-y-4 rounded-[1.5rem] border border-brand-100 bg-white/80 p-6 shadow-soft lg:col-span-2">
            <Heading as="h2">How we work</Heading>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-ink-700">
              <li>Site measurement and opening assessment before quotation</li>
              <li>Clear discussion of spacing, materials and fixing method</li>
              <li>Installation with attention to tension, alignment and finishing</li>
              <li>Honest guidance — no published fixed prices that ignore site conditions</li>
            </ul>
          </article>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
