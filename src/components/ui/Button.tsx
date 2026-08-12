import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-cta-500 text-brand-900 hover:bg-cta-600 btn-magnetic shadow-sm",
  secondary:
    "bg-brand-800 text-white hover:bg-brand-700 shadow-sm",
  outline:
    "border border-brand-100 bg-white text-brand-800 hover:border-cta-500 hover:text-brand-800",
  ghost: "text-brand-800 hover:bg-brand-50",
  whatsapp:
    "bg-success-500 text-white hover:brightness-110 shadow-sm",
} as const;

const sizes = {
  sm: "px-3.5 py-2 text-sm rounded-full",
  md: "px-5 py-2.5 text-sm sm:text-base rounded-full",
  lg: "px-6 py-3.5 text-base rounded-full",
  icon: "min-h-11 min-w-11 rounded-full p-0",
} as const;

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  external?: boolean;
  "aria-label"?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  external,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 font-semibold transition",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          rel="noopener noreferrer"
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
