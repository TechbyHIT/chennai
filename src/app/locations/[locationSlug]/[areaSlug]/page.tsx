import { PlacePage, textPoints } from "@/components/sections/PlacePage";
import { buildAreaPath, buildLocationPath } from "@/config/routes";
import {
  getAreaBySlug,
  getAreas,
  getLocationBySlug,
  getServices,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { buildPageContent } from "@/lib/content/build-page-content";
import { buildInternalLinks } from "@/lib/internal-links/build-internal-links";
import { getHomepageGallery, getServiceMedia } from "@/lib/media/catalog";
import { buildServiceStateCityAreaPath } from "@/lib/routing/service-location-urls";
import { faqSchema } from "@/lib/schema/faq-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ locationSlug: string; areaSlug: string }> };

/** Area hubs are ISR — do not pre-render the locality graph at build. */
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug, areaSlug } = await params;
  const page = getPageByPath(buildAreaPath(locationSlug, areaSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function AreaPage({ params }: Props) {
  const { locationSlug, areaSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  if (
    !location ||
    location.publicationStatus !== "published" ||
    !location.isServed
  ) {
    notFound();
  }

  const area = getAreaBySlug(locationSlug, areaSlug);
  if (!area || area.publicationStatus !== "published") notFound();

  const path = buildAreaPath(locationSlug, areaSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const services = getServices({ publishedOnly: true });
  const siblings = getAreas({ publishedOnly: true, parentId: location.id, scaledLimit: 120 })
    .filter((item) => item.id !== area.id)
    .slice(0, 48);
  const { modules, faqs } = buildPageContent(page);
  const links = buildInternalLinks(page);

  const heroMedia = getServiceMedia("invisible-grills");
  const gallery = getHomepageGallery(12);
  const flagship = services.find((s) => s.slug === "invisible-grills") ?? services[0]!;
  const flagshipMedia = getServiceMedia(flagship.slug);

  const scopedServices = services.map((service) => ({
    ...service,
    name: `${service.name} in ${area.name}`,
  }));

  return (
    <PlacePage
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Locations", href: "/locations/" },
        { name: location.name, href: buildLocationPath(locationSlug) },
        { name: area.name, href: path },
      ]}
      schemas={[webPageSchema(page), faqSchema(faqs)]}
      hero={{
        kicker: `Glory Grills · ${area.name}, ${location.name}`,
        title: page.h1,
        lead: page.introduction,
        image: heroMedia.hero,
        imageAlt: `Invisible grill installation in ${area.name}, ${location.name}`,
        trust: [
          "Free site inspection",
          "Measured, written quotes",
          `Serving ${area.name} homes`,
        ],
        stats: [
          { label: `Services in ${area.name}`, value: `${services.length} services` },
          { label: `More ${location.name} areas`, value: `${siblings.length}+ localities` },
          { label: "FAQ answers", value: `${faqs.length} questions` },
        ],
      }}
      about={{
        eyebrow: `About our ${area.name} service`,
        title: `Safety solutions for ${area.name}, ${location.name}`,
        paragraphs: [area.introduction, area.localDescription],
        image: gallery[0] ?? heroMedia.hero,
        secondaryImage: gallery[1] ?? flagshipMedia.hero,
        imageAlt: `Invisible grill installation in ${area.name}, ${location.name}`,
        secondaryAlt: `Balcony safety installation in ${area.name}, ${location.name}`,
        points: textPoints(area.name, area.localCharacteristics),
        primaryCta: {
          label: `All ${location.name} areas`,
          href: buildLocationPath(location.slug),
        },
      }}
      services={{
        eyebrow: `Services in ${area.name}`,
        title: `Every service, measured in ${area.name}`,
        lead: `Every published service has a dedicated ${area.name}, ${location.name} page with local notes, FAQs and measurement guidance.`,
        items: scopedServices,
        hrefs: Object.fromEntries(
          services.map((service) => [
            service.slug,
            buildServiceStateCityAreaPath(service.slug, location.slug, area.slug),
          ]),
        ),
        images: services.map((service) => getServiceMedia(service.slug).hero),
        placeLabel: area.name,
      }}
      featured={{
        service: { ...flagship, heroImage: flagshipMedia.hero },
        eyebrow: "Most requested",
        title: `Invisible grills in ${area.name} — clear views, reliable protection`,
        lead: `Near-transparent stainless steel cable systems for ${area.name} balconies and windows that keep the outlook open while securing the opening.`,
        points: flagship.benefits.slice(0, 5),
        exploreHref: buildServiceStateCityAreaPath(flagship.slug, location.slug, area.slug),
        imageAlt: `Invisible grill installation in ${area.name}, ${location.name}`,
        reverse: true,
        muted: true,
      }}
      directory={{
        eyebrow: `More in ${location.name}`,
        title: `Nearby ${location.name} localities`,
        lead: `We serve these ${location.name} localities from the same measurement visits that cover ${area.name}.`,
        groups: [
          {
            heading: `${location.name} localities`,
            pills: [
              { name: `All ${location.name} areas`, href: buildLocationPath(location.slug) },
              ...siblings.map((item) => ({
                name: item.name,
                href: buildAreaPath(location.slug, item.slug),
              })),
            ],
          },
        ],
        footer: { label: "Browse all service areas →", href: "/locations/" },
      }}
      gallery={{
        title: `Recent installations near ${area.name}`,
        lead: `Real Glory project photography from ${area.name} and nearby ${location.name} homes.`,
        images: gallery,
        link: { label: "Open full gallery →", href: "/gallery/" },
      }}
      contentModules={modules}
      internalLinks={links}
      faqs={{
        title: `${area.name} FAQs`,
        lead: `Common questions about safety installations in ${area.name}, ${location.name}.`,
        items: faqs,
      }}
    />
  );
}
