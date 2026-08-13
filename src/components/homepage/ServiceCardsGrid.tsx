"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SafeImage } from "@/components/media/SafeImage";
import { buildServicePath } from "@/config/routes";
import type { Service } from "@/types/service";

/** Preferred display order; any remaining published services append after. */
const PRIORITY_SLUGS = [
  "invisible-grills",
  "balcony-safety-grills",
  "window-invisible-grills",
  "children-safety-grills",
  "pet-safety-grills",
  "safety-nets",
  "balcony-safety-nets",
  "children-safety-nets",
  "kids-safety-nets",
  "pet-safety-nets",
  "bird-nets",
  "bird-spikes",
  "pigeon-nets",
  "mosquito-nets",
  "monkey-nets",
  "cloth-hangers",
  "sports-nets",
  "building-safety-nets",
];

export function ServiceCardsGrid({
  services,
  images = [],
  limit,
}: {
  services: Service[];
  images?: string[];
  limit?: number;
}) {
  const reduceMotion = useReducedMotion();

  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const ordered: Service[] = [];
  for (const slug of PRIORITY_SLUGS) {
    const match = bySlug.get(slug);
    if (match) {
      ordered.push(match);
      bySlug.delete(slug);
    }
  }
  for (const service of services) {
    if (bySlug.has(service.slug)) {
      ordered.push(service);
      bySlug.delete(service.slug);
    }
  }

  const visible = typeof limit === "number" ? ordered.slice(0, limit) : ordered;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {visible.map((service, index) => {
        const photo =
          images[index % Math.max(images.length, 1)] ||
          service.heroImage ||
          "/images/homepage/glory-home-01.png";

        return (
        <motion.article
          key={service.id}
          className="premium-card gradient-border group flex h-full flex-col overflow-hidden"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.4 }}
        >
          <Link href={buildServicePath(service.slug)} className="flex h-full flex-col">
            <span className="relative block aspect-[16/10] bg-brand-100">
              <SafeImage
                src={photo}
                alt={`${service.name} installation in Tamil Nadu`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </span>
            <span className="flex flex-1 flex-col space-y-3 p-5">
              <h3 className="font-display text-xl text-brand-900 sm:text-2xl">
                {service.name}
              </h3>
              <p className="text-sm leading-7 text-ink-500">{service.summary}</p>
              {service.benefits?.length ? (
                <ul className="space-y-1.5 text-sm text-ink-600">
                  {service.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="text-cta-500" aria-hidden="true">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-auto pt-2 text-sm font-semibold text-brand-600">
                View details →
              </span>
            </span>
          </Link>
        </motion.article>
        );
      })}
    </div>
  );
}
