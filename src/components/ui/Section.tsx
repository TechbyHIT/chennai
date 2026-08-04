import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section-space", className)}>
      {children}
    </section>
  );
}
