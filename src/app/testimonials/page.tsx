import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/data/testimonials";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Customer testimonials for invisible grill installation in Tamil Nadu. Only verified quotes are published.",
  alternates: { canonical: generateCanonical("/testimonials/") },
};

export default function TestimonialsPage() {
  return (
    <>
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Testimonials", href: "/testimonials/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Testimonials</Heading>
            <p className="leading-8 text-ink-700">
              We publish customer feedback only when it is verified and the customer agrees to share
              it. We do not invent reviews or use placeholder quotes.
            </p>
          </div>

          {TESTIMONIALS.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-brand-200 bg-brand-50/50 p-10 text-center">
              <p className="font-medium text-brand-900">No testimonials published yet</p>
              <p className="mt-2 text-sm leading-7 text-ink-600">
                After your installation, you may choose to share feedback for this page.
              </p>
              <div className="mt-6">
                <Button href="/contact/">Get in touch</Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.id}
                  className="rounded-[1.5rem] border border-brand-100 bg-white/80 p-6 shadow-soft"
                >
                  <p className="leading-7 text-ink-700">&ldquo;{item.quote}&rdquo;</p>
                  <footer className="mt-4 text-sm text-ink-600">
                    <cite className="not-italic font-semibold text-brand-900">{item.name}</cite>
                    <span> · {item.location}</span>
                    {item.verified ? (
                      <span className="ml-2 text-brand-700">Verified</span>
                    ) : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
