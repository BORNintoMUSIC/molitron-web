import type { Metadata } from "next";
import Link from "next/link";
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
              d: "Odor Neutralizer Solution supply, refill guidance, and operation questions for MOAS odor-abatement units.",
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
        <div className="mt-6 max-w-3xl rounded-lg border border-border bg-card p-5">
          <h2 className="text-lg font-semibold text-primary">EPFA operation and maintenance reference</h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            Use the current Rev A manual for status-panel response, the four-week inspection and service interval,
            filter order, qualified cleaning guidance, troubleshooting boundaries, and equipment records.
          </p>
          <Link
            href="/products/epfa/operation-maintenance"
            className="mt-3 inline-block text-sm font-semibold text-accent hover:underline"
          >
            Read the EPFA operation and maintenance guide
          </Link>
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

      <Section tone="accent">
        <SectionHeading
          eyebrow="Legacy equipment"
          title="Enviro-Clean service documentation"
          description="The Enviro-Clean Air Scrubber is discontinued for new projects. The controlled legacy brochure is available for owners and service teams working with existing installations."
        />
        <div className="mb-5 max-w-3xl rounded-lg border border-warning/35 bg-card px-4 py-3 text-sm leading-relaxed text-foreground/80">
          <strong className="text-primary">Existing equipment only.</strong> Specifications may not represent every installed configuration. Contact Molitron with the unit nameplate and site details before ordering service parts or planning changes.
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/80">
          Use the brochure as a legacy reference for the documented equipment and service information.
          Verify the installed unit and available records before planning work.
        </p>
        <a
          href="/docs/enviro-clean-air-scrubber-brochure-2026.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
        >
          Download the Enviro-Clean legacy brochure (PDF)
        </a>
      </Section>

      <CtaBand
        title="Need parts or service guidance?"
        description="Submit a request with your site details, or call Scott’s team during business hours."
      />
    </>
  );
}
