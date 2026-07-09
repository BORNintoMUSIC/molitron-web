import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = metadataFor("service");

export default function ServicePartsPage() {
  return (
    <>
      <PageHero config={pageHeroes.service}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Contact support
        </Button>
        <Button
          href={site.phoneHref}
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          Call {site.phone}
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading title="What we can help with" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "MOAS consumables",
              d: "Odor Gone concentrate supply, refill guidance, and operation questions for molecular odor abatement units.",
            },
            {
              t: "EPFA filters",
              d: "MERV 9 / MERV 14 media guidance and service intervals for Enviro-Pak three-stage dry filtration.",
            },
            {
              t: "Troubleshooting",
              d: "Help identifying utility issues, monitor panel alerts, maintenance intervals, and when a site visit or replacement is warranted.",
            },
          ].map((card) => (
            <div key={card.t} className="surface-card p-5">
              <h2 className="text-lg font-semibold text-primary">{card.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{card.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="When you contact us, include"
          description="Faster answers start with serial/context details."
        />
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm text-foreground/80">
          <li>Product (MOAS or EPFA) and approximate install year</li>
          <li>Site city/state and facility name if applicable</li>
          <li>Description of the issue or part needed</li>
          <li>Photos of nameplates or cabinet labels when available</li>
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          Full online parts catalog and quote configurator are planned for a later phase. For now,
          email or call for the fastest path.
        </p>
      </Section>

      <CtaBand
        title="Need parts or service guidance?"
        description="Submit a request with your site details, or call Scott’s team during business hours."
      />
    </>
  );
}
