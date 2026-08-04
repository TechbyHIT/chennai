"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-20 space-y-4">
      <Heading as="h1">Something went wrong</Heading>
      <p className="text-ink-700">Please try again or return to the homepage.</p>
      <div className="flex gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="outline">
          Home
        </Button>
      </div>
    </Container>
  );
}
