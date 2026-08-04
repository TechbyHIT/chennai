import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ImageGallery } from "@/components/media/ImageGallery";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { buildLocationPath } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import { getLocations } from "@/lib/data/repositories";
import { BLUR_DATA_URL } from "@/lib/media/blur-placeholder";
import { getHomepageGallery } from "@/lib/media/catalog";
import { collectionPageSchema } from "@/lib/schema/website-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Tamil Nadu cities and areas served for invisible grill installation. Honest coverage — no fake branch offices.",
  alternates: { canonical: generateCanonical("/locations/") },
  openGraph: {
    title: "Locations | Glory Invisible Grills",
    description:
      "Tamil Nadu cities and areas served for invisible grill installation.",
    url: "/locations/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locations | Glory Invisible Grills",
    description:
      "Tamil Nadu cities and areas served for invisible grill installation.",
  },
};

export default function LocationsIndexPage() {
  const locations = getLocations({ publishedOnly: true, servedOnly: true });
  const photos = getHomepageGallery(6);

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Tamil Nadu service locations",
            description:
              "Cities and towns in Tamil Nadu where Glory Invisible Grills schedules measurement visits.",
            url: `${SITE_CONFIG.url}/locations/`,
            items: locations.map((location) => ({
              name: location.name,
              url: `${SITE_CONFIG.url}${buildLocationPath(location.slug)}`,
            })),
          }),
        ]}
      />
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Locations", href: "/locations/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Locations in Tamil Nadu</Heading>
            <p className="leading-8 text-ink-700">
              Coimbatore is our primary hub — with coverage across Tamil Nadu cities and towns where
              we can genuinely measure and install. Browse a city to open area and service pages.
            </p>
          </div>
          <ImageGallery images={photos} columns="3" title="Work across Tamil Nadu" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Link
                key={location.id}
                href={buildLocationPath(location.slug)}
                className="group overflow-hidden rounded-[1.5rem] border border-brand-100 bg-white/80 shadow-soft transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] bg-brand-50">
                  <Image
                    src={photos[index % photos.length] ?? "/images/hero-balcony.jpg"}
                    alt={`Installations near ${location.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-xl text-brand-900">{location.name}</h2>
                  <p className="mt-2 text-sm text-brand-700">{location.district}</p>
                  <p className="mt-3 text-sm leading-7 text-ink-700">{location.introduction}</p>
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
