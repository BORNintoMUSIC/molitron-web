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
              t: "Leverage proven odor tech",
              d: "MOAS atomizes Odor Neutralizer Solution into the exhaust airstream to reduce malodors instead of relying on fragrance masking. Application fit and results remain project-specific.",
            },
            {
              t: "Pair filtration when needed",
              d: "Where particulate or grease-like loads exist (e.g. co-located foodservice), the Enviro-Pak Filter Assembly may be part of the stack.",
            },
            {
              t: "Install history",
              d: "Molitron equipment has been installed in cannabis-related environments (including Greenmount Cannabis LLC, CA on EPFA installs). Ask us for relevant references.",
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
          description="Cannabis is a growth vertical for Molitron. Early conversations help us align equipment to your code path and neighbor-risk profile."
        />
      </Section>

      <CtaBand title="Cannabis exhaust or odor project?" />
    </>
  );
}
