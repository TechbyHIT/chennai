import Link from "next/link";
import { buildServiceStateCityAreaPath } from "@/lib/routing/service-location-urls";
import type { Area, Location } from "@/types/location";
import type { Service } from "@/types/service";

export function AreaServiceDirectory({
  city,
  area,
  services,
}: {
  city: Location;
  area: Area;
  services: Service[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">
        All services in {area.name}
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-ink-500">
        Every published service has a dedicated {area.name}, {city.name} page with local notes,
        FAQs and measurement guidance. Preferred URL pattern:{" "}
        <code className="text-brand-600">
          /{"{service}"}/tamil-nadu/{city.slug}/{area.slug}/
        </code>
        .
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href={buildServiceStateCityAreaPath(service.slug, city.slug, area.slug)}
            className="premium-card block p-4 hover:border-cta-500"
          >
            <p className="font-display text-lg font-semibold text-brand-900">
              {service.name} in {area.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-500">{service.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
