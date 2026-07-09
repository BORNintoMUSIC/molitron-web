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
        <Button href="/contact" className="!bg-white !text-primary hover:!bg-slate-100">
          Contact support
        </Button>
        <Button
          href={site.phoneHref}
          variant="secondary"
          className="!border-slate-300 !bg-transparent !text-white hover:!border-white hover:!bg-white/10"
        >
          Call {site.phone}
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading title="What we can help with" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "MOAS consumables",
              d: "Neutralizing agent supply and system operation questions for odor abatement units.",
            },
            {
              t: "EPFA filters",
              d: "Guidance on filter media used in Enviro-Pak assemblies for grease and particulate control.",
            },
            {
              t: "Troubleshooting",
              d: "Help identifying utility issues, maintenance intervals, and when a site visit or replacement is warranted.",
            },
          ].map((card) => (
            <div key={card.t} className="surface-card p-5">
              <h2 className="text-lg font-semibold text-primary">{card.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="When you contact us, include"
          description="Faster answers start with serial/context details."
        />
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm text-slate-700">
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
