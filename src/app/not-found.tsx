import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="space-y-6 py-20">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cta-600">404</p>
      <Heading as="h1">Page not found</Heading>
      <p className="max-w-2xl text-ink-700 leading-8">
        This page is unavailable. It may be unpublished, moved, or outside our Tamil Nadu
        service coverage. Use search or browse services and cities below.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/search/" variant="outline">
          Search
        </Button>
        <Button href="/services/" variant="secondary">
          Services
        </Button>
        <Button href="/locations/" variant="outline">
          Locations
        </Button>
      </div>
      <p className="text-sm text-ink-500">
        Looking for everything? Open the{" "}
        <Link href="/sitemap-page/" className="font-semibold text-brand-500 hover:text-brand-600">
          HTML sitemap
        </Link>
        .
      </p>
    </Container>
  );
}
