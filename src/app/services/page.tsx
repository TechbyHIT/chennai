import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { isMainService, sortMainServicesFirst } from "@/config/main-services";
import { buildServicePath } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { getServices } from "@/lib/data/repositories";
import { collectionPageSchema } from "@/lib/schema/website-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

const SERVICES_TITLE = "Invisible Grills, Safety Nets & Sports Nets";
const SERVICES_DESCRIPTION =
  "Invisible grills, all types of safety nets, cloth hangers, sports nets and bird spikes across Tamil Nadu - measured installation for apartments and homes.";

export const metadata: Metadata = {
  title: SERVICES_TITLE,
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: generateCanonical("/services/") },
  openGraph: {
    title: `${SERVICES_TITLE} | Glory Invisible Grills`,
    description: SERVICES_DESCRIPTION,
    url: "/services/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SERVICES_TITLE} | Glory Invisible Grills`,
    description: SERVICES_DESCRIPTION,
  },
};

export default function ServicesIndexPage() {
  const services = sortMainServicesFirst(getServices({ publishedOnly: true }));

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Glory Invisible Grills services",
            description:
              "Installation services for invisible grills, safety nets, cloth hangers, sports nets, bird spikes and related home protection across Tamil Nadu.",
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
            <Heading as="h1">Invisible Grills, Safety Nets, Cloth Hangers, Sports Nets &amp; Bird Spikes</Heading>
            <p className="leading-8 text-ink-700">
              Our five core services come first below: invisible grills, every type of safety net,
              cloth hangers, sports nets and bird spikes. Explore the full range for balconies,
              windows, terraces and practice areas across Chennai and served Tamil Nadu cities — each
              with real installation photography.
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
                    src={service.heroImage || "/images/homepage/glory-home-01.png"}
                    alt={`${service.name} installation`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  {isMainService(service.slug) ? (
                    <p className="mb-2 inline-block rounded-full bg-cta-500/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-cta-600">
                      Core service
                    </p>
                  ) : null}
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
