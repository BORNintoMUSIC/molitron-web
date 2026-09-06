import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { ProductResources } from "@/components/ProductResources";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/home/Arrow";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("resources");
export default function ResourcesPage() {
  return (
    <>
      <PageHero config={pageHeroes.resources} compact />
      <SectionNav
        label="Document library"
        items={[
          { href: "#moas-documents", label: "MOAS" },
          { href: "#epfa-documents", label: "EPFA" },
          { href: "#additional-resources", label: "Listings & service" },
        ]}
      />
      <Section id="moas-documents" tone="white">
        <ProductResources slug="moas" />
      </Section>
      <Section id="epfa-documents">
        <ProductResources slug="epfa" />
      </Section>
      <Section id="additional-resources" tone="white">
        <SectionHeading
          eyebrow="More guidance"
          title="The right reference for the job."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/codes-compliance" className="online-guide">
            <div>
              <p className="eyebrow">Codes & listings</p>
              <h3>Understand the product listing.</h3>
              <p>
                Read the MOAS and EPFA listing scope and project-review
                considerations.
              </p>
            </div>
            <Arrow diagonal />
          </Link>
          <Link href="/service-parts" className="online-guide">
            <div>
              <p className="eyebrow">Existing equipment</p>
              <h3>Find service & parts guidance.</h3>
              <p>
                Support for installed equipment, including separate references
                for discontinued Enviro-Clean systems.
              </p>
            </div>
            <Arrow diagonal />
          </Link>
        </div>
      </Section>
      <CtaBand
        title="Need help finding a detail?"
        description="Share the product, model, and question. Molitron can point you to the current reference."
      />
    </>
  );
}
