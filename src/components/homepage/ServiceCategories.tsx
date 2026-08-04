"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SERVICES_MEGA_MENU } from "@/config/mega-menu";
import type { Service } from "@/types/service";

export function ServiceCategories({ services }: { services: Service[] }) {
  const reduceMotion = useReducedMotion();
  const categories = SERVICES_MEGA_MENU.slice(0, 6).map((column) => {
    const match = services.find((service) => column.href.includes(service.slug));
    return {
      ...column,
      image: match?.heroImage || "/images/hero-balcony.jpg",
      summary: match?.summary || "Measured installation for Tamil Nadu homes.",
    };
  });

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.45 }}
        >
          <Link href={category.href} className="premium-card gradient-border group block overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="space-y-3 p-5">
              <h3 className="font-display text-2xl text-brand-900">{category.title}</h3>
              <p className="text-sm leading-7 text-ink-500">{category.summary}</p>
              <span className="inline-flex text-sm font-semibold text-brand-500">
                Explore category →
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
