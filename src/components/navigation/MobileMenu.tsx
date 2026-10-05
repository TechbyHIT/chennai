"use client";

import { BUSINESS_CONFIG } from "@/config/business";
import { AREAS_MEGA_MENU, SERVICES_MEGA_MENU } from "@/config/mega-menu";
import { PRIMARY_NAV } from "@/config/navigation";
import type { MegaMenuColumn } from "@/config/mega-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

function uniqueLinks(column: MegaMenuColumn) {
  const seen = new Set<string>();
  return column.links.filter((link) => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<"services" | "areas" | null>("services");
  const [group, setGroup] = useState<string | null>(SERVICES_MEGA_MENU[0]?.title ?? null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  const renderGroups = (columns: MegaMenuColumn[]) =>
    columns.map((column) => {
      const expanded = group === column.title;
      const links = uniqueLinks(column);
      return (
        <div key={column.title} className="border-b border-white/10">
          <button
            type="button"
            className="flex w-full items-center justify-between px-1 py-3 text-left text-sm font-semibold text-white"
            aria-expanded={expanded}
            onClick={() => setGroup((current) => (current === column.title ? null : column.title))}
          >
            <span>{column.title}</span>
            <span aria-hidden="true" className="text-cta-500">
              {expanded ? "−" : "+"}
            </span>
          </button>
          {expanded ? (
            <ul className="grid gap-0.5 pb-3">
              <li>
                <Link
                  href={column.href}
                  className="block rounded-lg px-2 py-2 text-sm font-semibold text-cta-500"
                  onClick={close}
                >
                  View all
                </Link>
              </li>
              {links.map((link) => (
                <li key={`${column.title}-${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/10"
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      );
    });

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-800"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-brand-900/60"
            aria-label="Close menu backdrop"
            onClick={close}
          />
          <div
            id="mobile-menu"
            className="absolute inset-y-0 right-0 flex w-[min(24rem,92vw)] flex-col bg-brand-900 text-white shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top,0px))]">
              <p className="font-display text-base font-bold tracking-wide">
                {BUSINESS_CONFIG.name}
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
                aria-label="Close menu"
                onClick={close}
              >
                <MenuIcon open />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {PRIMARY_NAV.filter((item) => !item.mega).map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-3 py-3 text-base font-semibold text-white hover:bg-white/10"
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                    section === "services"
                      ? "bg-cta-500 text-brand-900"
                      : "bg-white/10 text-white"
                  }`}
                  onClick={() => {
                    setSection("services");
                    setGroup(SERVICES_MEGA_MENU[0]?.title ?? null);
                  }}
                >
                  Services
                </button>
                <button
                  type="button"
                  className={`rounded-xl px-3 py-3 text-sm font-semibold ${
                    section === "areas" ? "bg-cta-500 text-brand-900" : "bg-white/10 text-white"
                  }`}
                  onClick={() => {
                    setSection("areas");
                    setGroup(AREAS_MEGA_MENU[0]?.title ?? null);
                  }}
                >
                  Areas
                </button>
              </div>

              <div className="mt-3">
                {section === "services" ? renderGroups(SERVICES_MEGA_MENU) : null}
                {section === "areas" ? renderGroups(AREAS_MEGA_MENU) : null}
              </div>
            </div>

            <div className="grid gap-2 border-t border-white/10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
              <Link
                href="/contact/"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-cta-500 font-semibold text-brand-900"
                onClick={close}
              >
                Get Free Quote
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BUSINESS_CONFIG.phone.raw}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 font-semibold"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsapp.raw}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-success-500 font-semibold text-white"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
