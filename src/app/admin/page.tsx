import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { estimatePossiblePageCapacity, getPageCounts } from "@/lib/pages/page-registry";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ key?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const { key } = await searchParams;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authorized = Boolean(adminPassword && key === adminPassword);

  if (!authorized) {
    return (
      <Section className="pt-8 sm:pt-10">
        <Container className="max-w-xl space-y-4">
          <Heading as="h1">Admin</Heading>
          <p className="text-sm leading-7 text-ink-700">
            This area is protected. Set <code className="text-brand-800">ADMIN_PASSWORD</code> in
            your environment and open{" "}
            <code className="text-brand-800">/admin/?key=YOUR_PASSWORD</code> to view page counts.
          </p>
          <p className="text-sm text-ink-500">
            No database admin is available — this project uses file-based TypeScript data.
          </p>
        </Container>
      </Section>
    );
  }

  const counts = getPageCounts();
  const capacity = estimatePossiblePageCapacity();

  return (
    <Section className="pt-8 sm:pt-10">
      <Container className="space-y-8">
        <Heading as="h1">Page registry overview</Heading>
        <p className="text-sm text-ink-600">
          File-based programmatic pages for Tamil Nadu coverage. Revalidate via{" "}
          <code className="text-brand-800">POST /api/revalidate/</code> with{" "}
          <code className="text-brand-800">REVALIDATE_SECRET</code>.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total pages", value: counts.total },
            { label: "Published", value: counts.published },
            { label: "Indexable", value: counts.indexable },
            { label: "Draft / review", value: counts.draft + counts.review },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[1.25rem] border border-brand-100 bg-white/80 p-4 shadow-soft"
            >
              <p className="text-sm text-ink-600">{item.label}</p>
              <p className="mt-1 font-display text-3xl text-brand-900">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.25rem] border border-brand-100 bg-white/80 p-5 shadow-soft">
          <Heading as="h2">By page type</Heading>
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            {Object.entries(counts.byType)
              .sort((a, b) => b[1] - a[1])
              .map(([type, count]) => (
                <li key={type} className="flex justify-between gap-4 border-b border-brand-50 py-2">
                  <span>{type}</span>
                  <span className="font-semibold text-brand-900">{count}</span>
                </li>
              ))}
          </ul>
        </div>

        <p className="text-sm text-ink-600">
          Theoretical capacity from current entity counts:{" "}
          <span className="font-semibold text-brand-900">{capacity}</span> possible pages (not all
          published or indexable).
        </p>
      </Container>
    </Section>
  );
}
