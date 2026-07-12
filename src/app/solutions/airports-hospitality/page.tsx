import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { DocDownloads } from "@/components/DocDownloads";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { getProduct } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("airports");

export default function AirportsHospitalityPage() {
  const epfa = getProduct("epfa");
  const moas = getProduct("moas");

  return (
    <>
      <PageHero config={pageHeroes.airports}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Request a project quote
        </Button>
        <Button
          href="/about"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          Our history
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading title="Why these projects choose listed control equipment" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Shared buildings",
              d: "Odors and visible smoke travel. EPFA filtration and MOAS odor abatement can help project teams address adjacent tenants and public spaces.",
            },
            {
              t: "Operational continuity",
              d: "Facility teams need equipment that supports ongoing foodservice without recurring complaint cycles.",
            },
            {
              t: "Specification clarity",
              d: "UL 8782 EPFA and ETL-listed MOAS—with downloadable specs—simplify submittals for high-visibility kitchens.",
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
          title="Denver International Airport heritage"
          description="When DIA opened in 1994, air pollution control requirements for restaurant exhaust were non-negotiable. Molitron equipment has been used in multiple restaurants and continues to support airport foodservice needs."
        />
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/80">
          That long relationship—and broader word-of-mouth in the Denver market—is a core part of
          how Molitron wins work: practical engineering, competitive cost, and real install history.
        </p>
      </Section>

      {epfa && moas ? (
        <Section tone="white">
          <SectionHeading
            eyebrow="Downloads"
            title="Technical documentation"
            description="Product brochures for filtration and odor abatement—useful for facility and design review."
          />
          <DocDownloads
            documents={[epfa.documents[0], moas.documents[0]]}
            productName="Airport & hospitality projects"
          />
        </Section>
      ) : null}

      <CtaBand title="Planning an airport or hotel kitchen?" />
    </>
  );
}
