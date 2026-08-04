import Link from "next/link";
import { buildServiceInCityPath } from "@/lib/routing/service-location-urls";
import type { Location } from "@/types/location";
import type { Service } from "@/types/service";

export function ServiceCityDirectory({
  service,
  cities,
}: {
  service: Service;
  cities: Location[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">
        {service.name} across Tamil Nadu cities
      </h2>
      <p className="max-w-3xl text-sm leading-7 text-ink-500">
        Open a city hub for local housing notes, FAQs and locality links. Preferred URL pattern:{" "}
        <code className="text-brand-600">/{service.slug}-in-{"{city}"}/</code>
      </p>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Link
            key={city.id}
            href={buildServiceInCityPath(service.slug, city.slug)}
            className="rounded-full border border-brand-100 bg-white px-3 py-1.5 text-sm font-semibold text-brand-800 hover:border-cta-500"
          >
            {city.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
