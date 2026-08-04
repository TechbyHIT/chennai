import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import {
  buildGuidePath,
  buildLocationPath,
  buildServicePath,
  buildSolutionPath,
} from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";
import {
  getBlogPosts,
  getGuides,
  getLocations,
  getProblems,
  getServices,
} from "@/lib/data/repositories";
import { getIndexablePages } from "@/lib/pages/page-registry";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { collectionPageSchema } from "@/lib/schema/website-schema";
import { generateCanonical } from "@/lib/seo/generate-canonical";
import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Sitemap — all pages",
  description:
    "HTML sitemap of Glory Invisible Grills: every service, Tamil Nadu city, solution, guide and property-type page in one crawlable index.",
  alternates: { canonical: generateCanonical("/sitemap-page/") },
};

const CORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Locations", href: "/locations/" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Property types", href: "/property-types/" },
  { label: "Guides", href: "/guides/" },
  { label: "Blog", href: "/blog/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Pricing guide", href: "/pricing-guide/" },
  { label: "Materials guide", href: "/materials-guide/" },
  { label: "Installation process", href: "/installation-process/" },
  { label: "Safety guide", href: "/safety-guide/" },
  { label: "Testimonials", href: "/testimonials/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

function LinkGroup({
  title,
  links,
  columns = 3,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
  columns?: 2 | 3 | 4;
}) {
  const gridClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-brand-900">{title}</h2>
      <ul className={`grid gap-x-6 gap-y-2 text-sm ${gridClass}`}>
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link href={link.href} className="text-ink-700 transition hover:text-brand-500">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function HtmlSitemapPage() {
  const services = getServices({ publishedOnly: true });
  const locations = getLocations({ publishedOnly: true });
  const servedCities = getLocations({ publishedOnly: true, servedOnly: true });
  const solutions = getProblems({ publishedOnly: true });
  const guides = getGuides({ publishedOnly: true });
  const posts = getBlogPosts({ publishedOnly: true });

  const serviceLinks = services.map((service) => ({
    label: service.name,
    href: buildServicePath(service.slug),
  }));

  const cityLinks = locations.map((location) => ({
    label: location.name,
    href: buildLocationPath(location.slug),
  }));

  // Service × city hub links: the crawl bridge into the deep programmatic set.
  const serviceCityLinks = services.flatMap((service) =>
    servedCities.map((city) => ({
      label: `${service.shortName} in ${city.name}`,
      href: buildServiceInCityPath(service.slug, city.slug),
    })),
  );

  // Only property-type × service URLs exist as real pages.
  const propertyTypeLinks = getIndexablePages()
    .filter((page) => page.pageType === "property-type-service")
    .map((page) => ({ label: page.h1, href: page.path }));

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema({
            name: "Glory Invisible Grills sitemap",
            description:
              "Complete index of services, Tamil Nadu locations, solutions and guides.",
            url: `${SITE_CONFIG.url}/sitemap-page/`,
            items: [...serviceLinks, ...cityLinks].map((item) => ({
              name: item.label,
              url: `${SITE_CONFIG.url}${item.href}`,
            })),
          }),
        ]}
      />
      <Section className="pt-8 sm:pt-10">
        <Container className="space-y-12">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Sitemap", href: "/sitemap-page/" },
            ]}
          />
          <div className="max-w-3xl space-y-4">
            <Heading as="h1">Sitemap</Heading>
            <p className="leading-8 text-ink-700">
              Every published section of the site in one place — {services.length} services,{" "}
              {locations.length} Tamil Nadu cities and their locality pages, plus solutions,
              guides and property-type coverage. The machine-readable version is at{" "}
              <a href="/sitemap.xml" className="font-semibold text-brand-500">
                /sitemap.xml
              </a>
              .
            </p>
          </div>

          <LinkGroup title="Main pages" links={CORE_LINKS} columns={4} />
          <LinkGroup title="Services" links={serviceLinks} columns={3} />
          <LinkGroup title="Cities & towns" links={cityLinks} columns={4} />
          <LinkGroup
            title="Services by city"
            links={serviceCityLinks}
            columns={3}
          />
          <LinkGroup
            title="Solutions"
            links={solutions.map((item) => ({
              label: item.name,
              href: buildSolutionPath(item.slug),
            }))}
            columns={3}
          />
          <LinkGroup
            title="Property types"
            links={propertyTypeLinks}
            columns={3}
          />
          <LinkGroup
            title="Guides"
            links={guides.map((item) => ({
              label: item.title,
              href: buildGuidePath(item.slug),
            }))}
            columns={2}
          />
          {posts.length > 0 ? (
            <LinkGroup
              title="Blog"
              links={posts.map((item) => ({
                label: item.title,
                href: `/blog/${item.slug}/`,
              }))}
              columns={2}
            />
          ) : null}
        </Container>
      </Section>
    </>
  );
}
