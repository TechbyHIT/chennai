import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function Heading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("font-display font-bold text-balance text-brand-900", className)}>
      {children}
    </Tag>
  );
}
