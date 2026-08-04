import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your enquiry was received. We will contact you soon about invisible grill installation in Tamil Nadu.",
  alternates: { canonical: generateCanonical("/thank-you/") },
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="max-w-2xl space-y-8 text-center">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Thank You", href: "/thank-you/" },
          ]}
        />
        <div className="space-y-4">
          <Heading as="h1">Thank you</Heading>
          <p className="leading-8 text-ink-700">
            Your enquiry was received. We will review your city, area and opening details and
            contact you about availability across Tamil Nadu.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/services/" variant="secondary">
            Browse services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
