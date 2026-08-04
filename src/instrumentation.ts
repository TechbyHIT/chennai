/**
 * Next.js instrumentation hook.
 * Default DATA_SOURCE=file needs no bootstrapping.
 * For DATA_SOURCE=db, hydrate via `scripts/seed-database.ts` + process boot helpers
 * without pulling Redis/pg into the instrumentation webpack graph.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;
  if (process.env.DATA_SOURCE === "db" && process.env.DATABASE_URL) {
    console.info(
      "[instrumentation] DATA_SOURCE=db — ensure store hydration runs in the Node server process.",
    );
  }
}
