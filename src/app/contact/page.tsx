import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { BUSINESS_CONFIG } from "@/config/business";
import { getHomepageGallery } from "@/lib/media/catalog";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${BUSINESS_CONFIG.name} for invisible grill quotations across Tamil Nadu. Call, WhatsApp or submit an enquiry for Chennai and served cities.`,
  alternates: { canonical: generateCanonical("/contact/") },
};

export default function ContactPage() {
  const photos = getHomepageGallery(4);

  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact/" },
            ]}
          />
          <ImageGallery images={photos} columns="4" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
                  Tamil Nadu enquiries
                </p>
                <Heading as="h1">Contact us</Heading>
                <p className="leading-8 text-ink-700">
                  Share your city, area and opening details. We serve selected locations across
                  Tamil Nadu — primarily Chennai — and will confirm availability before scheduling a
                  site visit.
                </p>
              </div>
              <div className="space-y-4 rounded-[1.5rem] border border-brand-100 bg-white/80 p-5 shadow-soft">
                <p className="font-semibold text-brand-900">Direct contact</p>
                <div className="flex flex-wrap gap-3">
                  <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external>
                    Call {BUSINESS_CONFIG.phone.display}
                  </Button>
                  <Button
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                    variant="secondary"
                    external
                  >
                    WhatsApp
                  </Button>
                </div>
                <p className="text-sm text-ink-600">
                  Email:{" "}
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="text-brand-700 underline">
                    {BUSINESS_CONFIG.email}
                  </a>
                </p>
                <p className="text-sm leading-7 text-ink-600">
                  {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <Heading as="h2">Request a quotation</Heading>
              <QuoteForm />
            </div>
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
