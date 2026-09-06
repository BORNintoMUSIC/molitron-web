import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <Section tone="white" noReveal>
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-[-0.035em] text-primary sm:text-5xl">
          Let’s get you to the right place.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Use the product and resource paths below, or contact Molitron if you
          were looking for a technical document or legacy-equipment reference.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/products">Browse products</Button>
          <Button href="/resources" variant="secondary">
            Open resources
          </Button>
          <Button href="/contact" variant="ghost">
            Contact Molitron
          </Button>
        </div>
      </div>
    </Section>
  );
}
