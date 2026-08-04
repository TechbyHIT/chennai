import { evaluateIndexIf, type IndexIfPageInput } from "@/lib/seo/index-if-gate";
import type { PageIndexabilityInput } from "@/types/page";

/**
 * INDEX IF gate — index only when every checklist item passes
 * (unique title ≥90%, unique meta/H1/intro/FAQs/links/schema, helpful content,
 * clear intent, EEAT, performance, canonical, no thin content).
 */
export function isPageIndexable(page: PageIndexabilityInput): boolean {
  return evaluateIndexIf(page as IndexIfPageInput).indexable;
}

export function getIndexIfFailures(page: PageIndexabilityInput) {
  return evaluateIndexIf(page as IndexIfPageInput).failed;
}
