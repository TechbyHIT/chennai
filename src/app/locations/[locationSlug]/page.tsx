import { PlacePage, textPoints } from "@/components/sections/PlacePage";
import { buildAreaPath, buildLocationPath } from "@/config/routes";
import { STATIC_GENERATION, isSeedCity } from "@/config/static-generation";
import {
  getAreas,
  getLocationBySlug,
  getLocations,
  getServices,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { buildPageContent } from "@/lib/content/build-page-content";
import { buildInternalLinks } from "@/lib/internal-links/build-internal-links";
import { getHomepageGallery, getServiceMedia } from "@/lib/media/catalog";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { faqSchema } from "@/lib/schema/faq-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ locationSlug: string }> };

export async function generateStaticParams() {
  if (STATIC_GENERATION.seedCitySlugs.length === 0) return [];
  return getLocations({ publishedOnly: true, servedOnly: true })
    .filter((location) => isSeedCity(location.slug))
    .map((location) => ({
      locationSlug: location.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug } = await params;
  const page = getPageByPath(buildLocationPath(locationSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function LocationPage({ params }: Props) {
  const { locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (
    !location ||
    location.publicationStatus !== "published" ||
    !location.isServed
  ) {
    notFound();
  }

  const path = buildLocationPath(locationSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const areas = getAreas({
    publishedOnly: true,
    parentId: location.id,
    scaledLimit: 120,
  });
  const services = getServices({ publishedOnly: true });
  const { modules, faqs } = buildPageContent(page);
  const links = buildInternalLinks(page);

  const heroMedia = getServiceMedia("invisible-grills");
  const gallery = getHomepageGallery(12);
  const flagship = services.find((s) => s.slug === "invisible-grills") ?? services[0]!;
  const flagshipMedia = getServiceMedia(flagship.slug);

  const scopedServices = services.map((service) => ({
    ...service,
    name: `${service.name} in ${location.name}`,
  }));

  return (
    <PlacePage
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Locations", href: "/locations/" },
        { name: location.name, href: path },
      ]}
      schemas={[webPageSchema(page), faqSchema(faqs)]}
      hero={{
        kicker: `Glory Grills · ${location.name}`,
        title: page.h1,
        lead: page.introduction,
        image: heroMedia.hero,
        imageAlt: `Invisible grill installation in ${location.name}, Tamil Nadu`,
        trust: [
          "Free site inspection",
          "Measured, written quotes",
          `Serving ${location.name} homes`,
        ],
        stats: [
          { label: `Services in ${location.name}`, value: `${services.length} services` },
          { label: "Areas covered", value: `${areas.length} localities` },
          { label: "FAQ answers", value: `${faqs.length} questions` },
        ],
      }}
      about={{
        eyebrow: `About our ${location.name} service`,
        title: `Invisible grills and safety nets in ${location.name}`,
        paragraphs: [location.introduction, location.localDescription],
        image: gallery[0] ?? heroMedia.hero,
        secondaryImage: gallery[1] ?? flagshipMedia.hero,
        imageAlt: `Invisible grill installation in ${location.name}`,
        secondaryAlt: `Balcony safety installation in ${location.name}`,
        points: textPoints(location.name, location.localCharacteristics),
        primaryCta: {
          label: `All ${location.name} areas`,
          href: `${path}#areas`,
        },
      }}
      services={{
        eyebrow: `Services in ${location.name}`,
        title: `Every service, measured in ${location.name}`,
        lead: `Every published service has a dedicated ${location.name} landing page with measurement guidance, FAQs and locality clusters.`,
        items: scopedServices,
        hrefs: Object.fromEntries(
          services.map((service) => [
            service.slug,
            buildServiceInCityPath(service.slug, location.slug),
          ]),
        ),
        images: services.map((service) => getServiceMedia(service.slug).hero),
        placeLabel: location.name,
      }}
      featured={{
        service: { ...flagship, heroImage: flagshipMedia.hero },
        eyebrow: "Most requested",
        title: `Invisible grills in ${location.name} — clear views, reliable protection`,
        lead: `Near-transparent stainless steel cable systems for ${location.name} balconies and windows that keep the outlook open while securing the opening.`,
        points: flagship.benefits.slice(0, 5),
        exploreHref: buildServiceInCityPath(flagship.slug, location.slug),
        imageAlt: `Invisible grill installation in ${location.name}, Tamil Nadu`,
      }}
      directory={{
        eyebrow: `Areas in ${location.name}`,
        title: `${location.name} localities we serve`,
        lead: `Open a locality for street-level service pages covering apartments, gated communities and independent houses across ${location.name}.`,
        groups: [
          {
            heading: `${location.name} localities`,
            pills: areas.map((area) => ({
              name: area.name,
              href: buildAreaPath(location.slug, area.slug),
            })),
          },
        ],
        footer: { label: "Browse all service areas →", href: "/locations/" },
      }}
      gallery={{
        title: `Recent installations in and around ${location.name}`,
        lead: `Real Glory project photography from ${location.name} homes — invisible grills, safety nets, bird control and more.`,
        images: gallery,
        link: { label: "Open full gallery →", href: "/gallery/" },
      }}
      contentModules={modules}
      internalLinks={links}
      faqs={{
        title: `${location.name} FAQs`,
        lead: `Common questions about invisible grills and safety nets in ${location.name}.`,
        items: faqs,
      }}
    />
  );
}
