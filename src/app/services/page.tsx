import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildServicePath } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { getServices } from "@/lib/data/repositories";
import { collectionPageSchema } from "@/lib/schema/website-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Services",
  description:
    "Invisible grill, safety net, mosquito net and home protection services across Tamil Nadu — measured installation for apartments and homes.",
  alternates: { canonical: generateCanonical("/services/") },
  openGraph: {
    title: "Services | Glory Invisible Grills",
    description:
      "Invisible grill, safety net, mosquito net and home protection services across Tamil Nadu.",
    url: "/services/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Glory Invisible Grills",
    description:
      "Invisible grill, safety net, mosquito net and home protection services across Tamil Nadu.",
  },
};

export default function ServicesIndexPage() {
  const services = getServices({ publishedOnly: true });

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Glory Invisible Grills services",
            description:
              "Installation services for invisible grills, safety nets, bird nets and related home protection across Tamil Nadu.",
            url: `${SITE_CONFIG.url}/services/`,
            items: services.map((service) => ({
              name: service.name,
              url: `${SITE_CONFIG.url}${buildServicePath(service.slug)}`,
            })),
          }),
        ]}
      />
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Services</Heading>
            <p className="leading-8 text-ink-700">
              Explore invisible grill and safety solutions for balconies, windows and sit-outs across
              Chennai and served Tamil Nadu cities — each with real installation photography.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.id}
                href={buildServicePath(service.slug)}
                className="group overflow-hidden rounded-[1.5rem] border border-brand-100 bg-white/80 shadow-soft transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] bg-brand-50">
                  <Image
                    src={service.heroImage || "/images/hero-balcony.jpg"}
                    alt={`${service.name} installation`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl text-brand-900">{service.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-ink-700">{service.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}
