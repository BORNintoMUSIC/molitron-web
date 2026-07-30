import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { DocDownloads } from "@/components/DocDownloads";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("airports");
const technicalDocuments = products.flatMap((product) => product.documents);

export default function AirportsHospitalityPage() {
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
              d: "Facility teams need documented access, monitoring, and service requirements that can be coordinated with ongoing foodservice operations.",
            },
            {
              t: "Specification clarity",
              d: "UL Listed EPFA and ETL Listed MOAS product information support submittal discussions for high-visibility kitchens.",
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
          title="Denver International Airport installation history"
          description="Molitron equipment has installation history in multiple restaurant concepts at Denver International Airport."
        />
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/80">
          That history is relevant experience for complex, public-facing foodservice environments.
          Project references identify installation history and do not imply endorsement, sponsorship,
          or a current commercial relationship.
        </p>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Downloads"
          title="Technical documentation"
          description="Published MOAS documentation and current EPFA product, operation, and maintenance documentation support facility and design-team review. Final equipment selection, design, installation, and AHJ acceptance remain project-specific."
        />
        <DocDownloads documents={technicalDocuments} productName="Airport & hospitality projects" />
      </Section>

      <CtaBand title="Planning an airport or hotel kitchen?" />
    </>
  );
}
