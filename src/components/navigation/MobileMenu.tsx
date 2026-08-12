"use client";

import { BUSINESS_CONFIG } from "@/config/business";
import { AREAS_MEGA_MENU, SERVICES_MEGA_MENU } from "@/config/mega-menu";
import { PRIMARY_NAV } from "@/config/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>("Invisible Grills");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-100 bg-white px-3 font-semibold text-brand-800"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-brand-900/50"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-full w-[min(26rem,94vw)] flex-col gap-4 overflow-y-auto bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pt-[calc(1.25rem+env(safe-area-inset-top,0px))] shadow-soft"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold text-brand-900">
                {BUSINESS_CONFIG.name}
              </p>
              <button
                type="button"
                className="min-h-11 rounded-full px-3 font-semibold"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {PRIMARY_NAV.map((item) => (
                  <li key={`${item.label}-${item.href}`}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-3 font-semibold text-brand-900 hover:bg-brand-50"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/faq/"
                    className="block rounded-xl px-3 py-3 font-semibold text-brand-900 hover:bg-brand-50"
                    onClick={() => setOpen(false)}
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                Services & solutions
              </p>
              {SERVICES_MEGA_MENU.map((column) => {
                const expanded = openGroup === column.title;
                return (
                  <div key={column.title} className="rounded-xl border border-brand-100">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-3 text-left font-semibold text-brand-900"
                      aria-expanded={expanded}
                      onClick={() =>
                        setOpenGroup((current) =>
                          current === column.title ? null : column.title,
                        )
                      }
                    >
                      <span>{column.title}</span>
                      <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                    {expanded ? (
                      <ul className="space-y-1 border-t border-brand-50 px-2 py-2">
                        <li>
                          <Link
                            href={column.href}
                            className="block rounded-lg px-2 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                            onClick={() => setOpen(false)}
                          >
                            View all {column.title}
                          </Link>
                        </li>
                        {column.links.map((link) => (
                          <li key={`${column.title}-${link.label}`}>
                            <Link
                              href={link.href}
                              className="block rounded-lg px-2 py-2 text-sm text-ink-700 hover:bg-brand-50"
                              onClick={() => setOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-500">
                Areas
              </p>
              <ul className="space-y-1">
                {AREAS_MEGA_MENU.flatMap((col) =>
                  col.links.map((link) => ({ ...link, group: col.title })),
                ).map((link) => (
                  <li key={`${link.group}-${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-brand-50"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto grid gap-2">
              <Link
                href="/#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-800 font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Get Free Quote
              </Link>
              <a
                href={`tel:${BUSINESS_CONFIG.phone.raw}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-cta-500 font-semibold text-brand-800"
              >
                Call Now
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
      ) : null}
    </div>
  );
}
