import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  FOOTER_COMPANY_LINKS,
  FOOTER_POLICY_LINKS,
  FOOTER_RESOURCE_LINKS,
} from "@/config/navigation";
import { buildLocationPath, buildServicePath } from "@/config/routes";
import { getLocations, getServices } from "@/lib/data/repositories";
import Link from "next/link";

const PRIORITY_SERVICE_SLUGS = [
  "invisible-grills",
  "balcony-safety-grills",
  "window-invisible-grills",
  "safety-nets",
  "balcony-safety-nets",
  "children-safety-nets",
  "bird-nets",
  "pet-safety-nets",
];

export function Footer() {
  const allServices = getServices({ publishedOnly: true });
  const services = PRIORITY_SERVICE_SLUGS.map((slug) =>
    allServices.find((service) => service.slug === slug),
  ).filter((service): service is NonNullable<typeof service> => Boolean(service));
  const fallbackServices = services.length ? services : allServices.slice(0, 8);
  const locations = getLocations({ publishedOnly: true, servedOnly: true }).slice(0, 12);

  return (
    <footer className="relative bg-brand-900 text-white">
      <div className="border-b border-white/10 bg-gradient-to-r from-brand-900 via-brand-600/40 to-brand-900">
        <Container className="flex flex-col items-start justify-between gap-5 py-10 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <p className="font-display text-2xl font-bold sm:text-3xl">
              Ready to protect your space?
            </p>
            <p className="text-sm text-white/75 sm:text-base">
              Get a professional recommendation for your home, apartment or commercial property
              across Tamil Nadu.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/#contact" size="lg">
              Get Free Quote
            </Button>
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external size="lg">
              Call Now
            </Button>
            <Button
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
              external
              variant="whatsapp"
              size="lg"
            >
              WhatsApp
            </Button>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-6">
        <div className="space-y-4 xl:col-span-2 xl:pr-6">
          {/* Inline logo — avoids client-boundary webpack HMR crashes in layout Footer */}
          <Link
            href="/"
            className="inline-flex items-center"
            aria-label={`${BUSINESS_CONFIG.name} home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BUSINESS_CONFIG.logo}
              alt={`${BUSINESS_CONFIG.name} — Safety | Strength | Style`}
              width={1024}
              height={300}
              decoding="async"
              loading="lazy"
              className="block h-auto max-h-12 w-auto max-w-[180px] rounded-md bg-white object-contain object-left px-2 py-1 sm:max-h-14 sm:max-w-[220px]"
            />
          </Link>
          <p className="text-sm leading-7 text-white/75">{BUSINESS_CONFIG.description}</p>
          <div className="space-y-1.5 text-sm text-white/80">
            <p>
              {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state}
            </p>
            <p>
              <a href={`tel:${BUSINESS_CONFIG.phone.raw}`} className="hover:text-cta-500">
                {BUSINESS_CONFIG.phone.display}
              </a>
            </p>
            <p>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                className="hover:text-cta-500"
                rel="noopener noreferrer"
              >
                WhatsApp {BUSINESS_CONFIG.whatsapp.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-cta-500">
                {BUSINESS_CONFIG.email}
              </a>
            </p>
            <p className="text-white/60">Hours: {BUSINESS_CONFIG.businessHours.display}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
            Company
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {FOOTER_COMPANY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-cta-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
            Services
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {fallbackServices.map((service) => (
              <li key={service.id}>
                <Link href={buildServicePath(service.slug)} className="transition hover:text-cta-500">
                  {service.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services/" className="font-semibold text-cta-500 hover:text-cta-600">
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
            Service areas
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/locations/" className="font-semibold text-cta-500 hover:text-cta-600">
                Tamil Nadu directory
              </Link>
            </li>
            {locations.map((location) => (
              <li key={location.id}>
                <Link href={buildLocationPath(location.slug)} className="transition hover:text-cta-500">
                  {location.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
            Resources
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {FOOTER_RESOURCE_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-cta-500">
                  {item.label}
                </Link>
              </li>
            ))}
            {FOOTER_POLICY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-cta-500">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sitemap-page/" className="transition hover:text-cta-500">
                HTML Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p>Serving customers across Tamil Nadu.</p>
            <a href="#main-content" className="font-semibold text-cta-500 hover:text-cta-600">
              Back to top ↑
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
