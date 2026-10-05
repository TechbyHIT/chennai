import { PlacePage, textPoints } from "@/components/sections/PlacePage";
import { buildServicePath } from "@/config/routes";
import {
  getLocations,
  getServiceBySlug,
} from "@/lib/data/repositories";
import { getPageByPath } from "@/lib/pages/page-registry";
import { buildPageContent } from "@/lib/content/build-page-content";
import { buildInternalLinks } from "@/lib/internal-links/build-internal-links";
import { getServiceMedia } from "@/lib/media/catalog";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { faqSchema } from "@/lib/schema/faq-schema";
import { webPageSchema } from "@/lib/schema/web-page-schema";
import { generatePageMetadata } from "@/lib/seo/generate-page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ serviceSlug: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const page = getPageByPath(buildServicePath(serviceSlug));
  if (!page || page.publicationStatus !== "published") return {};
  return generatePageMetadata(page);
}

export default async function ServiceHubPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service || service.publicationStatus !== "published") notFound();

  const path = buildServicePath(serviceSlug);
  const page = getPageByPath(path);
  if (!page || page.publicationStatus !== "published") notFound();

  const cities = getLocations({ publishedOnly: true, servedOnly: true });
  const { modules, faqs } = buildPageContent(page);
  const links = buildInternalLinks(page);
  const media = getServiceMedia(service.slug);
  const shortName = service.shortName || service.name;

  const cityHrefs: Record<string, string> = {};
  const cityCards = cities.map((city) => {
    const slug = `${service.slug}--${city.slug}`;
    cityHrefs[slug] = buildServiceInCityPath(service.slug, city.slug);
    return {
      ...service,
      id: `${service.id}--${city.slug}`,
      slug,
      name: city.name,
      summary: city.introduction,
      heroImage: media.hero,
    };
  });

  return (
    <PlacePage
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/services/" },
        { name: service.name, href: path },
      ]}
      schemas={[webPageSchema(page), faqSchema(faqs)]}
      hero={{
        kicker: `Glory Grills · ${service.name}`,
        title: page.h1,
        lead: page.introduction,
        image: media.hero,
        imageAlt: `${service.name} installation by Glory`,
        trust: [
          "Free site inspection",
          "Measured, written quotes",
          "Published price ranges",
        ],
        stats: [
          { label: "Cities served", value: `${cities.length} cities` },
          { label: "Use-cases covered", value: `${service.applications.length} applications` },
          { label: "FAQ answers", value: `${faqs.length} questions` },
        ],
      }}
      about={{
        eyebrow: "About this service",
        title: `Why homes choose ${shortName}`,
        paragraphs: [service.summary, service.introduction],
        image: media.gallery[0] ?? media.hero,
        secondaryImage: media.gallery[1] ?? media.hero,
        imageAlt: `${service.name} installation by Glory`,
        secondaryAlt: `${service.name} close-up installation detail`,
        points: textPoints(shortName, service.benefits),
        primaryCta: {
          label: `${shortName} in Chennai`,
          href: buildServiceInCityPath(service.slug, "chennai"),
        },
      }}
      services={{
        eyebrow: `Where we install it`,
        title: `${shortName} — pick your city`,
        lead: `Every served city has a dedicated ${service.name} page with measured pricing, local FAQs and covered localities.`,
        items: cityCards,
        hrefs: {},
        cardHrefs: cityHrefs,
        images: [media.hero],
        placeLabel: "Tamil Nadu",
        moreTitle: `${shortName} across Tamil Nadu`,
      }}
      featured={{
        service: { ...service, heroImage: media.gallery[0] ?? media.hero },
        eyebrow: "Flagship city",
        title: `${shortName} in Chennai — our home ground`,
        lead: `The deepest coverage, the most localities and the fastest measurement slots for ${service.name} anywhere in Tamil Nadu.`,
        points: service.benefits.slice(0, 5),
        exploreHref: buildServiceInCityPath(service.slug, "chennai"),
        imageAlt: `${service.name} installation in Chennai`,
      }}
      directory={{
        eyebrow: "Service areas",
        title: `All cities for ${shortName}`,
        lead: `Choose your city for ${service.name} pricing, FAQs and locality coverage.`,
        groups: [
          {
            heading: "Cities we serve",
            pills: cities.map((city) => ({
              name: city.name,
              href: buildServiceInCityPath(service.slug, city.slug),
            })),
          },
        ],
        footer: { label: "Browse all service areas →", href: "/locations/" },
      }}
      gallery={{
        title: `${shortName} — recent work`,
        lead: `Real Glory project photography: ${service.name} installations across Tamil Nadu.`,
        images: media.gallery.slice(0, 12),
        link: { label: "Open full gallery →", href: "/gallery/" },
      }}
      contentModules={modules}
      internalLinks={links}
      faqs={{
        title: `${shortName} FAQs`,
        lead: `Common questions about ${service.name} across Tamil Nadu.`,
        items: faqs,
      }}
    />
  );
}
