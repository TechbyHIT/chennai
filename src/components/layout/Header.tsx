"use client";

import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { MegaMenuPanel } from "@/components/navigation/MegaMenuPanel";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CONFIG } from "@/config/business";
import { AREAS_MEGA_MENU, SERVICES_MEGA_MENU } from "@/config/mega-menu";
import { PRIMARY_NAV } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<"services" | "areas" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openMenu = (menu: "services" | "areas") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(menu);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMega(null), 180);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-brand-100 bg-white shadow-[0_10px_30px_rgba(10,29,55,0.08)]"
          : "border-brand-100/60 bg-white"
      }`}
      style={{ paddingTop: "var(--fg-safe-top)" }}
    >
      {/* Top utility bar */}
      <div className="hidden bg-brand-800 text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
          <p className="truncate text-white/85">
            Premium Invisible Grills &amp; Safety Nets across Tamil Nadu
          </p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${BUSINESS_CONFIG.email}`} className="hover:text-cta-500">
              {BUSINESS_CONFIG.email}
            </a>
            <a
              href={`tel:${BUSINESS_CONFIG.phone.raw}`}
              className="flex items-center gap-1.5 font-semibold hover:text-cta-500"
            >
              {BUSINESS_CONFIG.phone.display}
            </a>
          </div>
        </div>
        <div
          className="h-0.5 bg-gradient-to-r from-cta-500 via-cta-500/50 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex min-h-[64px] max-w-7xl items-center justify-between gap-2 px-4 sm:min-h-[76px] sm:px-6 lg:min-h-[88px] lg:px-8">
        <div className="flex min-w-0 shrink items-center">
          <Logo compact className="max-w-[min(100%,220px)] sm:max-w-[260px] lg:max-w-[320px]" />
        </div>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 xl:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.replace(/\/$/, ""));
            const isMega = item.mega === "services" || item.mega === "areas";

            if (isMega) {
              return (
                <div
                  key={`${item.label}-${item.href}`}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    openMenu(item.mega!);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className="nav-link inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-brand-800/85 hover:text-cta-600"
                    data-active={active || openMega === item.mega ? "true" : "false"}
                    aria-expanded={openMega === item.mega}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMega(openMega === item.mega ? null : item.mega!)
                    }
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-[0.65rem] transition-transform ${
                        openMega === item.mega ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Panel stays inside hover zone so it does not flash-close */}
                  {openMega === item.mega ? (
                    <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
                      <MegaMenuPanel
                        columns={
                          item.mega === "services" ? SERVICES_MEGA_MENU : AREAS_MEGA_MENU
                        }
                        footerHref={item.href}
                        footerLabel={
                          item.mega === "services"
                            ? "View all services →"
                            : "Browse all Tamil Nadu locations →"
                        }
                      />
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="nav-link inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold"
                data-active={active ? "true" : "false"}
                onMouseEnter={() => setOpenMega(null)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2">
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}?text=${encodeURIComponent(
              `Hello ${BUSINESS_CONFIG.name}, I would like a free quote.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-success-500 text-white sm:inline-flex"
            aria-label="WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
          <Button
            href={`tel:${BUSINESS_CONFIG.phone.raw}`}
            size="sm"
            className="hidden h-10 px-5 sm:inline-flex"
            external
          >
            Call Now
          </Button>
          <Button
            href="/#contact"
            variant="secondary"
            size="sm"
            className="hidden h-10 px-4 lg:inline-flex"
          >
            Get Quote
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
