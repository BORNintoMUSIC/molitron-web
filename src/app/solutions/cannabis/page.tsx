import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("cannabis");

export default function CannabisPage() {
  return (
    <>
      <PageHero config={pageHeroes.cannabis}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Discuss a cannabis project
        </Button>
        <Button
          href="/products/moas"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          View MOAS
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading title="How we approach cannabis projects today" />
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              t: "Start with the facts",
              d: "We will not over-claim. Share process loads, exhaust rates, and local requirements so we can recommend only what is appropriate.",
            },
            {
              t: "Review the odor path",
              d: "MOAS atomizes Odor Neutralizer Solution into the exhaust airstream. Application fit, configuration, and results remain project-specific.",
            },
            {
              t: "Pair filtration when needed",
              d: "Where particulate or grease-like loads exist (e.g. co-located foodservice), the Enviro-Pak Filter Assembly may be part of the stack.",
            },
            {
              t: "Install history",
              d: "Molitron has cannabis-related installation and application history, including an EPFA reference for Greenmount Cannabis LLC in California. References identify experience and do not imply endorsement.",
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
          title="Ready to talk?"
          description="Early conversations help define the process, exhaust path, odor concern, project requirements, and whether an active Molitron product belongs in the discussion."
        />
      </Section>

      <CtaBand title="Cannabis exhaust or odor project?" />
    </>
  );
}
