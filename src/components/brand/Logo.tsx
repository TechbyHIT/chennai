import Link from "next/link";
import { BUSINESS_CONFIG } from "@/config/business";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  compact?: boolean;
  light?: boolean;
  className?: string;
  /** Eager load when true (header); lazy when false (footer). */
  priority?: boolean;
};

/**
 * Shared logo — no "use client", no hooks.
 * Safe in RootLayout Footer (RSC) and Header (client).
 */
export function Logo({
  compact = false,
  light = false,
  className,
  priority = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center overflow-visible", className)}
      aria-label={`${BUSINESS_CONFIG.name} home`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BUSINESS_CONFIG.logo}
        alt={`${BUSINESS_CONFIG.name} — Safety | Strength | Style`}
        width={1024}
        height={300}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "block h-auto w-auto max-w-full object-contain object-left",
          compact
            ? "max-h-11 max-w-[160px] sm:max-h-12 sm:max-w-[200px] lg:max-h-14 lg:max-w-[260px]"
            : "max-h-[52px] max-w-[200px] sm:max-h-[65px] sm:max-w-[280px] lg:max-h-[85px] lg:max-w-[420px]",
          light && "rounded-md bg-white px-2 py-1",
        )}
      />
    </Link>
  );
}
