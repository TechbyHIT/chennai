import { NextRequest, NextResponse } from "next/server";
import {
  buildAreaPath,
  buildLocationPath,
  buildServicePath,
} from "@/config/routes";
import { cacheGetJson, cacheSetJson } from "@/lib/cache/redis";
import { getAreas, getLocations, getServices } from "@/lib/data/repositories";
import {
  buildServiceInCityPath,
  buildServiceStateCityAreaPath,
} from "@/lib/routing/service-location-urls";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchHit = {
  type: "service" | "location" | "area";
  label: string;
  href: string;
  meta?: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function buildIndex(): SearchHit[] {
  const services = getServices({ publishedOnly: true }).map((service) => ({
    type: "service" as const,
    label: service.name,
    href: buildServicePath(service.slug),
    meta: service.summary,
  }));

  const locations = getLocations({ publishedOnly: true }).map((location) => ({
    type: "location" as const,
    label: location.name,
    href: buildLocationPath(location.slug),
    meta: `${location.district ?? "Tamil Nadu"} · city coverage`,
  }));

  const areas = getAreas({ publishedOnly: true })
    .slice(0, 800)
    .flatMap((area) => {
      const parent = getLocations().find((loc) => loc.id === area.parentId);
      if (!parent) return [];
      return [
        {
          type: "area" as const,
          label: `${area.name}, ${parent.name}`,
          href: buildAreaPath(parent.slug, area.slug),
          meta: "Locality",
        },
      ];
    });

  const serviceCity = getServices({ publishedOnly: true })
    .slice(0, 8)
    .flatMap((service) =>
      getLocations({ publishedOnly: true, servedOnly: true })
        .slice(0, 6)
        .map((location) => ({
          type: "service" as const,
          label: `${service.shortName} in ${location.name}`,
          href: buildServiceInCityPath(service.slug, location.slug),
          meta: "Service × city",
        })),
    );

  return [...services, ...locations, ...areas, ...serviceCity];
}

async function getIndex() {
  const cached = await cacheGetJson<SearchHit[]>("glory:search-index:v1");
  if (cached?.length) return cached;
  const index = buildIndex();
  await cacheSetJson("glory:search-index:v1", index, 300);
  return index;
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get("mode");
  const q = normalize(request.nextUrl.searchParams.get("q") ?? "");
  const index = await getIndex();

  if (mode === "popular") {
    const popular: SearchHit[] = [
      ...getServices({ publishedOnly: true })
        .slice(0, 4)
        .map((service) => ({
          type: "service" as const,
          label: service.name,
          href: buildServicePath(service.slug),
          meta: "Popular service",
        })),
      ...getLocations({ publishedOnly: true, servedOnly: true })
        .slice(0, 4)
        .map((location) => ({
          type: "location" as const,
          label: location.name,
          href: buildLocationPath(location.slug),
          meta: "Popular city",
        })),
    ];
    return NextResponse.json({ results: popular });
  }

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const cacheKey = `glory:search:q:${q}`;
  const cachedHits = await cacheGetJson<SearchHit[]>(cacheKey);
  if (cachedHits) {
    return NextResponse.json({ results: cachedHits });
  }

  const results = index
    .filter((item) => {
      const hay = normalize(`${item.label} ${item.meta ?? ""}`);
      return hay.includes(q) || q.split(" ").every((part) => hay.includes(part));
    })
    .slice(0, 12);

  if (results.length < 8) {
    const services = getServices({ publishedOnly: true });
    const locations = getLocations({ publishedOnly: true });
    for (const service of services) {
      for (const location of locations) {
        const areas = getAreas({ publishedOnly: true, parentId: location.id }).slice(0, 40);
        for (const area of areas) {
          const label = `${service.shortName} in ${area.name}`;
          if (
            normalize(label).includes(q) ||
            normalize(`${area.name} ${service.slug}`).includes(q)
          ) {
            results.push({
              type: "area",
              label,
              href: buildServiceStateCityAreaPath(
                service.slug,
                location.slug,
                area.slug,
              ),
              meta: `${location.name} area page`,
            });
            if (results.length >= 12) break;
          }
        }
        if (results.length >= 12) break;
      }
      if (results.length >= 12) break;
    }
  }

  const unique = Array.from(
    new Map(results.map((item) => [item.href, item])).values(),
  ).slice(0, 12);

  await cacheSetJson(cacheKey, unique, 120);
  return NextResponse.json({ results: unique });
}
