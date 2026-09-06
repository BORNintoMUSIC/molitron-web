"use client";

import { useEffect } from "react";
import { Button } from "@/components/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-background px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Page error
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.035em] text-primary">
          This page could not be displayed.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Try the page again. If the problem continues, call Molitron or use the
          contact page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Molitron
          </Button>
        </div>
      </div>
    </section>
  );
}
