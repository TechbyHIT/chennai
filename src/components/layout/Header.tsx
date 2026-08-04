"use client";

import { MobileMenu } from "@/components/navigation/MobileMenu";
import { MegaMenuPanel } from "@/components/navigation/MegaMenuPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BUSINESS_CONFIG } from "@/config/business";
import { AREAS_MEGA_MENU, SERVICES_MEGA_MENU } from "@/config/mega-menu";
import { PRIMARY_NAV } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<"services" | "areas" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMega(null);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50" style={{ paddingTop: "var(--fg-safe-top)" }}>
      <div className="bg-brand-900 text-white">
        <Container className="flex min-h-10 items-center justify-between gap-3 py-2 text-xs sm:text-sm">
          <p className="hidden truncate text-white/85 sm:block">
            Premium invisible grills & safety nets across Tamil Nadu
          </p>
          <div className="flex w-full items-center justify-between gap-x-4 sm:w-auto sm:justify-end">
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center hover:text-cta-500"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${BUSINESS_CONFIG.phone.raw}`}
              className="inline-flex min-h-9 items-center font-semibold text-cta-500 hover:text-cta-600"
            >
              {BUSINESS_CONFIG.phone.display}
            </a>
          </div>
        </Container>
        <div className="h-0.5 bg-gradient-to-r from-cta-500 via-cta-500/40 to-transparent" aria-hidden="true" />
      </div>

      <header
        className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "border-brand-100 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            : "border-transparent bg-white/75 backdrop-blur-md"
        }`}
        onMouseLeave={() => setOpenMega(null)}
      >
        <Container className="relative flex min-h-[3.75rem] items-center justify-between gap-3 py-2 sm:min-h-[4.5rem] sm:gap-4 sm:py-3">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 font-display text-base font-bold text-cta-500 sm:h-11 sm:w-11 sm:text-lg">
              G
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-[0.95rem] font-bold leading-tight tracking-tight text-brand-900 sm:text-lg">
                <span className="sm:hidden">Glory Grills</span>
                <span className="hidden sm:inline">{BUSINESS_CONFIG.name}</span>
              </span>
              <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-500 sm:block">
                Safety · Clarity · Craft
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href.replace(/\/$/, ""));
              const isMega = item.mega === "services" || item.mega === "areas";

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.mega) setOpenMega(item.mega);
                    else setOpenMega(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className="nav-link inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm"
                    data-active={active || openMega === item.mega ? "true" : "false"}
                    aria-expanded={isMega ? openMega === item.mega : undefined}
                  >
                    {item.label}
                    {isMega ? <span aria-hidden="true" className="text-[0.65rem]">▾</span> : null}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/#site-search"
              className="fg-header-desktop-only min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-800 hover:border-brand-500"
              aria-label="Search"
            >
              ⌕
            </Link>
            <span className="fg-header-desktop-only">
              <Button
                href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                variant="whatsapp"
                size="icon"
                external
                aria-label="WhatsApp"
              >
                WA
              </Button>
            </span>
            <span className="fg-header-desktop-only">
              <Button href={`tel:${BUSINESS_CONFIG.phone.raw}`} size="sm" external>
                Call Now
              </Button>
            </span>
            <span className="fg-header-desktop-only fg-header-desktop-only--xl">
              <Button href="/contact/" variant="secondary" size="sm">
                Get Quote
              </Button>
            </span>
            <MobileMenu />
          </div>

          {openMega === "services" ? (
            <MegaMenuPanel
              columns={SERVICES_MEGA_MENU}
              footerHref="/services/"
              footerLabel="View all services →"
            />
          ) : null}
          {openMega === "areas" ? (
            <MegaMenuPanel
              columns={AREAS_MEGA_MENU}
              footerHref="/locations/"
              footerLabel="Browse all Tamil Nadu locations →"
            />
          ) : null}
        </Container>
      </header>
    </div>
  );
}
