import {
  buildAreaPath,
  buildGuidePath,
  buildLocationPath,
  buildServiceLocationPath,
  buildServicePath,
  buildSolutionPath,
} from "@/config/routes";
import {
  getAreaById,
  getAreas,
  getGuides,
  getLocationById,
  getLocations,
  getProblems,
  getServiceById,
  getServices,
} from "@/lib/data/repositories";
import { buildServiceStateCityAreaPath } from "@/lib/routing/service-location-urls";
import type { PageRecord } from "@/types/page";
import type { InternalLink } from "@/types/seo";

export function buildInternalLinks(page: PageRecord): InternalLink[] {
  const links: InternalLink[] = [];
  const service = page.serviceId ? getServiceById(page.serviceId) : undefined;
  const location = page.locationId ? getLocationById(page.locationId) : undefined;
  const area = page.areaId ? getAreaById(page.areaId) : undefined;

  links.push(
    { href: "/", label: "Home" },
    { href: "/contact/", label: "Contact / free quote" },
    { href: "/services/", label: "All services" },
    { href: "/locations/", label: "All Tamil Nadu locations" },
    { href: "/pricing-guide/", label: "Pricing guide" },
    { href: "/materials-guide/", label: "Materials guide" },
    { href: "/installation-process/", label: "Installation process" },
    { href: "/safety-guide/", label: "Safety guide" },
    { href: "/faq/", label: "FAQ" },
    { href: "/gallery/", label: "Gallery" },
    { href: "/guides/", label: "Guides" },
    { href: "/solutions/", label: "Solutions" },
    { href: "/property-types/", label: "Property types" },
    { href: "/blog/", label: "Blog" },
  );

  if (service) {
    links.push({
      href: buildServicePath(service.slug),
      label: `${service.name} overview`,
    });

    for (const city of getLocations({ publishedOnly: true, servedOnly: true })) {
      links.push({
        href: buildServiceLocationPath(city.slug, service.slug),
        label: `${service.shortName} in ${city.name}`,
      });
    }
  }

  if (location) {
    links.push({
      href: buildLocationPath(location.slug),
      label: `${location.name} coverage hub`,
    });

    for (const svc of getServices({ publishedOnly: true })) {
      links.push({
        href: buildServiceLocationPath(location.slug, svc.slug),
        label: `${svc.shortName} in ${location.name}`,
      });
    }

    const nearby = getAreas({
      publishedOnly: true,
      parentId: location.id,
      scaledLimit: 80,
    });
    for (const nearbyArea of nearby.slice(0, 60)) {
      if (nearbyArea.id === area?.id) continue;
      links.push({
        href: buildAreaPath(location.slug, nearbyArea.slug),
        label: `${nearbyArea.name}, ${location.name}`,
      });
      if (service) {
        links.push({
          href: buildServiceStateCityAreaPath(
            service.slug,
            location.slug,
            nearbyArea.slug,
          ),
          label: `${service.shortName} in ${nearbyArea.name}`,
        });
      }
    }
  }

  if (location && area) {
    links.push({
      href: buildAreaPath(location.slug, area.slug),
      label: `${area.name} locality hub`,
    });
  }

  if (service && location && area) {
    for (const related of getServices({ publishedOnly: true }).filter(
      (item) => item.id !== service.id,
    )) {
      links.push({
        href: buildServiceStateCityAreaPath(
          related.slug,
          location.slug,
          area.slug,
        ),
        label: `${related.shortName} in ${area.name}`,
      });
    }
  }

  for (const relatedId of service?.relatedServiceIds ?? []) {
    const related = getServiceById(relatedId);
    if (!related) continue;
    links.push({
      href: buildServicePath(related.slug),
      label: related.name,
    });
  }

  for (const guide of getGuides({ publishedOnly: true })) {
    links.push({ href: buildGuidePath(guide.slug), label: guide.title });
  }

  for (const problem of getProblems({ publishedOnly: true })) {
    links.push({ href: buildSolutionPath(problem.slug), label: problem.name });
  }

  const unique = new Map<string, InternalLink>();
  for (const link of links) {
    if (link.href === page.path) continue;
    unique.set(`${link.href}|${link.label}`, link);
  }

  return Array.from(unique.values()).slice(0, 90);
}
