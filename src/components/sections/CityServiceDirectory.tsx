import Link from "next/link";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import type { Location } from "@/types/location";
import type { Service } from "@/types/service";

export function CityServiceDirectory({
  city,
  services,
}: {
  city: Location;
  services: Service[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">
        All services in {city.name}
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-ink-500">
        Every published service has a dedicated {city.name} landing page with measurement guidance,
        FAQs and locality clusters.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={buildServiceInCityPath(service.slug, city.slug)}
            className="premium-card block p-4 hover:border-cta-500"
          >
            <p className="font-display text-lg font-semibold text-brand-900">{service.name}</p>
            <p className="mt-2 text-sm leading-6 text-ink-500">{service.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
