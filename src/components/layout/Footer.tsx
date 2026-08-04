import { BUSINESS_CONFIG } from "@/config/business";
import { FOOTER_POLICY_LINKS, FOOTER_QUICK_LINKS } from "@/config/navigation";
import { getLocations, getServices } from "@/lib/data/repositories";
import { buildLocationPath, buildServicePath } from "@/config/routes";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

const POPULAR_PAGES: Array<{ label: string; service: string; city: string }> = [
  { label: "Invisible Grills Coimbatore", service: "invisible-grills", city: "coimbatore" },
  { label: "Safety Nets Coimbatore", service: "safety-nets", city: "coimbatore" },
  { label: "Bird Nets Coimbatore", service: "bird-nets", city: "coimbatore" },
  { label: "Invisible Grills Chennai", service: "invisible-grills", city: "chennai" },
  { label: "Invisible Grills Tiruppur", service: "invisible-grills", city: "tiruppur" },
  { label: "Invisible Grills Erode", service: "invisible-grills", city: "erode" },
  { label: "Invisible Grills Madurai", service: "invisible-grills", city: "madurai" },
  { label: "Invisible Grills Salem", service: "invisible-grills", city: "salem" },
];

export function Footer() {
  const services = getServices({ publishedOnly: true }).slice(0, 10);
  const locations = getLocations({ publishedOnly: true, servedOnly: true }).slice(0, 10);

  return (
    <footer className="relative bg-brand-900 text-white">
      {/* CTA band */}
      <div className="border-b border-white/10 bg-gradient-to-r from-brand-900 via-brand-600/40 to-brand-900">
        <Container className="flex flex-col items-start justify-between gap-5 py-10 md:flex-row md:items-center">
          <div className="space-y-1.5">
            <p className="font-display text-2xl font-bold sm:text-3xl">
              Ready to secure your balcony or windows?
            </p>
            <p className="text-sm text-white/75 sm:text-base">
              Free site measurement across Tamil Nadu · written estimates · honest material grades.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} external size="lg">
              Call {BUSINESS_CONFIG.phone.display}
            </Button>
            <Button
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
              external
              variant="whatsapp"
              size="lg"
            >
              WhatsApp us
            </Button>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-16 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-4 xl:col-span-2 xl:pr-8">
          <p className="flex items-center gap-3 font-display text-2xl font-bold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-display text-lg text-cta-500">
              G
            </span>
            {BUSINESS_CONFIG.name}
          </p>
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
              <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-cta-500">
                {BUSINESS_CONFIG.email}
              </a>
            </p>
            <p>
              <a href={BUSINESS_CONFIG.websiteUrl} className="hover:text-cta-500">
                {BUSINESS_CONFIG.websiteUrl.replace(/^https?:\/\//, "")}
              </a>
            </p>
            <p className="text-white/60">Hours: {BUSINESS_CONFIG.businessHours.display}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
            <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
            Services
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {services.map((service) => (
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
            Popular pages
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {POPULAR_PAGES.map((item) => (
              <li key={item.label}>
                <Link
                  href={buildServiceInCityPath(item.service, item.city)}
                  className="transition hover:text-cta-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
              Cities
            </h2>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-sm text-white/75">
              {locations.map((location) => (
                <li key={location.id}>
                  <Link href={buildLocationPath(location.slug)} className="transition hover:text-cta-500">
                    {location.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/locations/"
              className="mt-3 inline-block text-sm font-semibold text-cta-500 hover:text-cta-600"
            >
              All locations →
            </Link>
          </div>
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="h-px w-5 bg-cta-500" aria-hidden="true" />
              Company
            </h2>
            <ul className="space-y-2.5 text-sm text-white/75">
              {FOOTER_QUICK_LINKS.slice(0, 7).map((item) => (
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
              <li>
                <a href="/sitemap.xml" className="transition hover:text-cta-500">
                  XML Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <p>Serving Tamil Nadu only.</p>
            <a href="#main-content" className="font-semibold text-cta-500 hover:text-cta-600">
              Back to top ↑
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
