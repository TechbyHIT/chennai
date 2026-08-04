import { CORE_FAQS, MODULE_ORDER_BY_PAGE_TYPE, PRICING_STATEMENT } from "@/data/content-modules";
import {
  composeAuthoritySections,
  composeUniqueFaqs,
} from "@/lib/content/compose-authority-sections";
import { composeEncyclopediaArticle } from "@/lib/content/compose-encyclopedia";
import { composeLongformSeo } from "@/lib/content/compose-longform-seo";
import {
  composeLocalSection,
  composeUniqueIntro,
} from "@/lib/content/compose-unique-intro";
import {
  getAreaById,
  getGuides,
  getLocationById,
  getServiceById,
  getServices,
  getAreas,
} from "@/lib/data/repositories";
import {
  buildServiceInCityPath,
  buildServiceStateCityAreaPath,
} from "@/lib/routing/service-location-urls";
import { buildGuidePath, buildServicePath } from "@/config/routes";
import type { ContentModule, FAQItem } from "@/types/content";
import type { PageRecord } from "@/types/page";

export function buildPageContent(page: PageRecord): {
  modules: ContentModule[];
  faqs: FAQItem[];
} {
  const service = page.serviceId ? getServiceById(page.serviceId) : undefined;
  const location = page.locationId ? getLocationById(page.locationId) : undefined;
  const area = page.areaId ? getAreaById(page.areaId) : undefined;
  const order = MODULE_ORDER_BY_PAGE_TYPE[page.pageType] ?? [];

  const modules: ContentModule[] = [];

  for (const key of order) {
    switch (key) {
      case "service-introduction":
      case "service-explanation":
        if (service) {
          modules.push({
            key,
            title:
              key === "service-introduction"
                ? `About ${service.name}`
                : `How ${service.name} Works`,
            body:
              key === "service-introduction"
                ? location || area
                  ? composeUniqueIntro({ service, location, area })
                  : service.introduction
                : service.detailedDescription,
          });
        } else if (page.pageType === "guide" || page.pageType === "blog") {
          modules.push({
            key,
            title: page.h1,
            body: page.introduction,
          });
        }
        break;
      case "local-introduction": {
        const local = service
          ? composeLocalSection({ service, location, area })
          : null;
        modules.push({
          key,
          title:
            local?.title ??
            (area
              ? `Service coverage in ${area.name}`
              : location
                ? `Service coverage in ${location.name}`
                : "Local service coverage"),
          body:
            local?.body ??
            area?.localDescription ??
            location?.localDescription ??
            page.introduction,
          bullets: local?.bullets,
        });
        break;
      }
      case "topical-authority": {
        const encyclopediaService =
          service ?? getServices({ publishedOnly: true })[0];
        if (encyclopediaService && location) {
          const encyclopedia = composeEncyclopediaArticle({
            service: encyclopediaService,
            city: location,
            area,
          });
          modules.push({
            key: "topical-authority",
            title: `${encyclopediaService.name} encyclopedia for ${area?.name ?? location.name}`,
            body: encyclopedia.lead,
            bullets: encyclopedia.infobox.map((row) => `${row.label}: ${row.value}`),
          });
          for (const section of encyclopedia.sections) {
            modules.push({
              key: "topical-authority",
              title: section.title,
              body: section.paragraphs.join(" "),
              bullets: section.bullets,
            });
            for (const sub of section.subsections ?? []) {
              modules.push({
                key: "topical-authority",
                title: sub.title,
                body: sub.paragraphs.join(" "),
                bullets: sub.bullets,
              });
            }
          }
          modules.push({
            key: "topical-authority",
            title: "See also",
            body: `Related topics readers often open next when researching ${encyclopediaService.shortName.toLowerCase()} in ${area?.name ?? location.name}.`,
            bullets: encyclopedia.seeAlso,
          });
          for (const section of composeAuthoritySections({
            service: encyclopediaService,
            city: location,
            area,
          })) {
            modules.push({
              key: "topical-authority",
              title: section.title,
              body: section.body,
              bullets: section.bullets,
            });
          }

          const nearbyNames = getAreas({
            publishedOnly: true,
            parentId: location.id,
          })
            .filter((item) => item.id !== area?.id)
            .slice(0, 8)
            .map((item) => item.name);
          const longform = composeLongformSeo({
            service: encyclopediaService,
            city: location,
            area,
            nearbyNames,
          });
          modules.push({
            key: "topical-authority",
            title: longform.title,
            body: `${longform.lead} (Approx. ${longform.wordCount.toLocaleString()} original words for this page.)`,
          });
          for (const section of longform.sections) {
            modules.push({
              key: "topical-authority",
              title: section.title,
              body: section.paragraphs.join(" "),
              bullets: section.bullets,
            });
          }
        }
        break;
      }
      case "customer-problem":
        if (service) {
          modules.push({
            key,
            title: "Problems we help solve",
            body: "These are common reasons customers request a site assessment.",
            bullets: service.customerProblems,
          });
        }
        break;
      case "suitable-applications":
        if (service) {
          modules.push({
            key,
            title: "Suitable applications",
            body: "Typical residential uses for this service.",
            bullets: service.applications,
          });
        }
        break;
      case "benefits":
        if (service) {
          modules.push({
            key,
            title: "Benefits",
            body: "Key practical benefits customers look for.",
            bullets: service.benefits,
          });
        }
        break;
      case "features":
        if (service) {
          modules.push({
            key,
            title: "Features",
            body: "Important system and installation features.",
            bullets: service.features,
          });
        }
        break;
      case "materials":
        if (service) {
          modules.push({
            key,
            title: "Materials",
            body: "Material choices are discussed during quotation based on opening type and exposure.",
            bullets: service.materials,
          });
        }
        break;
      case "technical-specifications":
        if (service) {
          modules.push({
            key,
            title: "Technical considerations",
            body: "Specifications are finalised after measurement.",
            bullets: service.specifications,
          });
        }
        break;
      case "installation-process":
        if (service) {
          modules.push({
            key,
            title: "Installation process",
            body: "A clear process helps avoid surprises on installation day.",
            bullets: service.installationSteps,
          });
        }
        break;
      case "safety-checks":
        if (service) {
          modules.push({
            key,
            title: "Safety information",
            body: "Safety depends on correct spacing, secure fixing and responsible use.",
            bullets: service.safetyInformation,
          });
        }
        break;
      case "quality-checks":
        modules.push({
          key,
          title: "Quality checks",
          body: "Before handover, we review alignment, tensioning, fixing points and finishing details for the installed openings.",
          bullets: [
            "Opening measurements verified",
            "Fixings checked",
            "Cable tension / mesh fixing reviewed",
            "Visible finishing inspected",
          ],
        });
        break;
      case "maintenance-guidance":
        if (service) {
          modules.push({
            key,
            title: "Maintenance guidance",
            body: "Simple care helps the system stay cleaner over time.",
            bullets: service.maintenanceTips,
          });
        }
        break;
      case "common-mistakes":
        modules.push({
          key,
          title: "Common mistakes to avoid",
          body: "These mistakes usually create rework, weak finishing or the wrong product for the opening.",
          bullets: [
            "Accepting a quote without opening-by-opening measurement",
            "Treating mosquito mesh as fall protection",
            "Choosing only by lowest price without material clarity",
            "Ignoring railing strength or loose parapet conditions",
            "Assuming every locality has a permanent branch office",
            "Skipping society or association permission checks for apartments",
          ],
        });
        break;
      case "weather-considerations":
        modules.push({
          key,
          title: "Weather and exposure notes",
          body:
            location?.localCharacteristics.find((item) =>
              item.toLowerCase().includes("coastal"),
            ) ??
            "In Tamil Nadu, coastal and humid locations may need more attention to material selection and periodic cleaning. We only state verified local characteristics when available.",
        });
        break;
      case "pricing-factors":
        modules.push({
          key,
          title: "Pricing factors",
          body: PRICING_STATEMENT,
          bullets: service?.pricingFactors,
        });
        break;
      case "property-recommendations":
        modules.push({
          key,
          title: "Suitable property types",
          body: "Recommendations depend on opening design and how the space is used.",
          bullets:
            area?.propertyTypes ??
            location?.propertyTypes ??
            service?.suitablePropertyTypes,
        });
        break;
      case "nearby-areas": {
        const nearby = location
          ? getAreas({ publishedOnly: true, parentId: location.id }).slice(0, 24)
          : [];
        if (nearby.length > 0) {
          const primaryService =
            service ?? getServices({ publishedOnly: true })[0];
          modules.push({
            key,
            title: area ? "Nearby served localities" : "Areas served",
            body: `Browse nearby localities in ${location?.name ?? "Tamil Nadu"}. Each link opens a dedicated service page when a primary service is available.`,
            bullets: nearby.map((item) => item.name),
            links: primaryService
              ? nearby.map((item) => ({
                  href: buildServiceStateCityAreaPath(
                    primaryService.slug,
                    location!.slug,
                    item.slug,
                  ),
                  label: `${primaryService.shortName} in ${item.name}`,
                }))
              : nearby.map((item) => ({
                  href: `/locations/${location!.slug}/${item.slug}/`,
                  label: `${item.name}, ${location!.name}`,
                })),
          });
        }
        break;
      }
      case "local-service-coverage":
        modules.push({
          key,
          title: "Honest service-area coverage",
          body: `Glory Invisible Grills serves selected cities and areas across Tamil Nadu. We do not claim a branch office in every locality. ${location?.localDescription ?? ""}`,
          links: location
            ? getServices({ publishedOnly: true }).map((item) => ({
                href: buildServiceInCityPath(item.slug, location.slug),
                label: `${item.name} in ${location.name}`,
              }))
            : getServices({ publishedOnly: true }).map((item) => ({
                href: buildServicePath(item.slug),
                label: item.name,
              })),
        });
        break;
      case "related-services": {
        const related = service
          ? service.relatedServiceIds
              .map((id) => getServiceById(id))
              .filter((item): item is NonNullable<typeof item> => Boolean(item))
          : getServices({ publishedOnly: true }).slice(0, 12);

        if (related.length > 0) {
          modules.push({
            key,
            title: "Related services",
            body: "Customers often compare these related options before booking a measurement visit.",
            bullets: related.map((item) => item.name),
            links: related.map((item) => ({
              href:
                location && area
                  ? buildServiceStateCityAreaPath(item.slug, location.slug, area.slug)
                  : location
                    ? buildServiceInCityPath(item.slug, location.slug)
                    : buildServicePath(item.slug),
              label:
                location && area
                  ? `${item.shortName} in ${area.name}`
                  : location
                    ? `${item.shortName} in ${location.name}`
                    : item.name,
            })),
          });
        }
        break;
      }
      case "related-guides":
        modules.push({
          key,
          title: "Helpful guides",
          body: "Read these guides before requesting a quotation.",
          bullets: getGuides({ publishedOnly: true }).map((guide) => guide.title),
          links: getGuides({ publishedOnly: true }).map((guide) => ({
            href: buildGuidePath(guide.slug),
            label: guide.title,
          })),
        });
        break;
      case "quotation-cta":
        modules.push({
          key,
          title: "Request a measurement-based quotation",
          body: "Share your city or area in Tamil Nadu, property type and the openings you want assessed. We will guide you through the next steps.",
        });
        break;
      default:
        break;
    }
  }

  const place = area?.name ?? location?.name ?? "Tamil Nadu";
  const faqs: FAQItem[] =
    service && location
      ? [...composeUniqueFaqs(service, place, location.name), ...CORE_FAQS]
      : [
          ...(service?.customerQuestions.map((question) => ({
            question,
            answer: `${service.summary} ${PRICING_STATEMENT}`,
          })) ?? []),
          ...CORE_FAQS,
        ];

  return { modules, faqs };
}
