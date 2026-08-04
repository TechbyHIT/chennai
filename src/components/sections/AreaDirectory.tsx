import { Heading } from "@/components/ui/Heading";
import { buildAreaPath } from "@/config/routes";
import { buildServiceStateCityAreaPath } from "@/lib/routing/service-location-urls";
import type { Area } from "@/types/location";
import Link from "next/link";

const QUICK_SERVICES = [
  { slug: "invisible-grills", label: "Invisible grills" },
  { slug: "safety-nets", label: "Safety nets" },
  { slug: "balcony-safety-nets", label: "Balcony nets" },
  { slug: "children-safety-nets", label: "Child nets" },
  { slug: "mosquito-nets", label: "Mosquito nets" },
  { slug: "bird-nets", label: "Bird nets" },
  { slug: "monkey-nets", label: "Monkey nets" },
  { slug: "ceiling-cloth-hangers", label: "Cloth hangers" },
];

export function AreaDirectory({
  locationSlug,
  locationName,
  areas,
}: {
  locationSlug: string;
  locationName: string;
  areas: Area[];
}) {
  const grouped = areas
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .reduce<Record<string, Area[]>>((acc, area) => {
      const letter = area.name.charAt(0).toUpperCase();
      acc[letter] = acc[letter] ?? [];
      acc[letter].push(area);
      return acc;
    }, {});

  const letters = Object.keys(grouped).sort();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading as="h2">Localities in {locationName}</Heading>
        <p className="max-w-3xl text-ink-700">
          Browse {areas.length} served localities across {locationName}. Each locality hub links to
          service×area pages using{" "}
          <code className="text-brand-600">
            /{"{service}"}/tamil-nadu/{locationSlug}/{"{area}"}/
          </code>
          .
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#areas-${letter}`}
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-brand-200 bg-white text-sm font-semibold text-brand-800 hover:bg-brand-50"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="space-y-8">
        {letters.map((letter) => (
          <div key={letter} id={`areas-${letter}`} className="space-y-3">
            <h3 className="font-display text-xl text-brand-900">{letter}</h3>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(grouped[letter] ?? []).map((area) => (
                <li
                  key={area.id}
                  className="rounded-xl border border-brand-100 bg-white/80 px-3 py-3"
                >
                  <Link
                    href={buildAreaPath(locationSlug, area.slug)}
                    className="font-semibold text-brand-800 hover:text-brand-500"
                  >
                    {area.name}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {QUICK_SERVICES.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={buildServiceStateCityAreaPath(
                          svc.slug,
                          locationSlug,
                          area.slug,
                        )}
                        className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700 hover:bg-cta-500 hover:text-brand-900"
                      >
                        {svc.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
