import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { DocDownloads } from "@/components/DocDownloads";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("resources");

const activeDocuments = products.flatMap((product) => product.documents);

export default function ResourcesPage() {
  return (
    <>
      <PageHero config={pageHeroes.resources}>
        <Button href="#active-documents" className="!bg-on-brand !text-brand hover:!bg-white">
          Find active-product documents
        </Button>
        <Button
          href="/contact"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          Ask a technical question
        </Button>
      </PageHero>

      <Section id="active-documents" tone="white" noReveal>
        <SectionHeading
          eyebrow="Current controlled publications"
          title="Active-product brochures and technical documents"
          description="These are the current public MOAS and EPFA documents. Use the online companions for accessible reading and the PDFs for controlled printable references."
        />
        <DocDownloads documents={activeDocuments} productName="Molitron" />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Online technical references"
          title="Answer-oriented guides for planning and operations"
          description="The HTML companions surface the same important planning context without requiring a PDF reader."
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/products/moas/installation-planning" className="group surface-card p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              MOAS · Planning
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-primary group-hover:text-accent">
              Engineering & installation planning guide
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Cabinet, utilities, remote nozzles, tubing, exhaust-fan interlock, access,
              responsibilities, and listing context.
            </p>
            <span className="link-shine mt-5 inline-flex font-semibold text-accent">Read online →</span>
          </Link>
          <Link href="/products/epfa/operation-maintenance" className="group surface-card p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              EPFA · Operations
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-primary group-hover:text-accent">
              Installation, operation & maintenance manual
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Receiving, coordination, monitoring, startup, filter service, cleaning,
              troubleshooting, and equipment records.
            </p>
            <span className="link-shine mt-5 inline-flex font-semibold text-accent">Read online →</span>
          </Link>
        </div>
      </Section>

      <Section tone="accent">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Listing clarity"
              title="Precise text, bounded to the covered equipment"
            />
            <ul className="space-y-4 text-sm leading-relaxed text-foreground/80">
              <li>
                <strong className="text-primary">MOAS:</strong> ETL Listed for the United States
                and Canada under Intertek Report 101453585DEN-002. The report identifies UL 197
                and CSA C22.2 No. 109.
              </li>
              <li>
                <strong className="text-primary">EPFA:</strong> UL Listed under File MH45752.
                Models EPFA-24 through EPFA-144 were investigated to the UL 8782 Outline of
                Investigation for Pollution Control Units for Commercial Cooking Operations.
              </li>
            </ul>
          </div>
          <div className="surface-card surface-card-static p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary">What a listing does not decide</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              A product listing does not establish project approval, code compliance, accessory
              coverage, field-installation acceptance, or suitability for a specific application.
              The project team and authority having jurisdiction retain their respective roles.
            </p>
            <Button href="/codes-compliance" variant="secondary" className="mt-5">
              Read codes & compliance guidance
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Existing equipment only"
          title="Enviro-Clean legacy documentation stays separate"
          description="Enviro-Clean is discontinued for new projects. Its public references are retained only to help owners and service teams identify and evaluate existing installations."
        />
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/service-parts" variant="secondary">
            Open service & legacy resources
          </Button>
          <Button href="/contact">Contact Molitron</Button>
        </div>
      </Section>

      <CtaBand
        title="Need help choosing the right document?"
        description="Share the product, model, project stage, and question. Molitron will point you to the current reference."
      />
    </>
  );
}
