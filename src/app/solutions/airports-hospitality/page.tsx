import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("airports");

export default function AirportsHospitalityPage() {
  return (
    <>
      <PageHero config={pageHeroes.airports}>
        <Button href="/contact" className="!bg-white !text-primary hover:!bg-slate-100">
          Request a project quote
        </Button>
        <Button
          href="/about"
          variant="secondary"
          className="!border-slate-300 !bg-transparent !text-white hover:!border-white hover:!bg-white/10"
        >
          Our history
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading title="Why these projects choose listed control equipment" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              t: "Shared buildings",
              d: "Odors and visible smoke travel. Filtration and abatement protect adjacent tenants and public spaces.",
            },
            {
              t: "Operational continuity",
              d: "Facility teams need equipment that supports ongoing foodservice without recurring complaint cycles.",
            },
            {
              t: "Specification clarity",
              d: "UL / ETL listed systems and straightforward product roles (EPFA + MOAS) simplify submittals.",
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
          title="Denver International Airport heritage"
          description="When DIA opened in 1994, air pollution control requirements for restaurant exhaust were non-negotiable. Molitron equipment has been used in multiple restaurants and continues to support airport foodservice needs."
        />
        <p className="max-w-3xl text-sm leading-relaxed text-slate-700">
          That long relationship—and broader word-of-mouth in the Denver market—is a core part of
          how Molitron wins work: practical engineering, competitive cost, and real install history.
        </p>
      </Section>

      <CtaBand title="Planning an airport or hotel kitchen?" />
    </>
  );
}
