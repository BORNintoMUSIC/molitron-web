import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { DocDownloads } from "@/components/DocDownloads";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { codeTopics, faqs } from "@/lib/content";
import { pageHeroes } from "@/lib/heroes";
import { products, type ProductDocument } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("codes");

const enviroCleanDocuments: ProductDocument[] = [
  {
    title: "Enviro-Clean Air Scrubber Brochure (2026)",
    description:
      "Product overview, system operation, utilities, performance, and UL 8782 listing information.",
    href: "/docs/enviro-clean-air-scrubber-brochure-2026.pdf",
    kind: "brochure",
  },
];

const technicalDocuments = [
  ...products.flatMap((product) => product.documents),
  ...enviroCleanDocuments,
];

export default function CodesCompliancePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <PageHero config={pageHeroes.codes} />

      <Section>
        <p className="max-w-3xl rounded-md border border-warning/30 bg-accent-soft px-4 py-3 text-sm text-foreground">
          <strong className="text-primary">Disclaimer:</strong> This content is educational. Always verify
          requirements with your design professional and AHJ for the project address.
        </p>
      </Section>

      <Section tone="white" className="!pt-0">
        <div className="space-y-8">
          {codeTopics.map((topic) => (
            <article key={topic.title} className="surface-card p-6">
              <h2 className="text-xl font-semibold text-primary">{topic.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{topic.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Downloads"
          title="Technical documentation"
          description="Current 2026 product brochures, engineering specifications, and operation and maintenance guidance."
        />
        <DocDownloads documents={technicalDocuments} productName="Molitron" />
      </Section>

      <Section>
        <SectionHeading
          title="How Molitron products map to compliance conversations"
          description="Use this as a starting point for owner and FM discussions."
        />
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-0 text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="px-3 py-3 font-semibold sm:px-5">Need</th>
                <th className="px-3 py-3 font-semibold sm:px-5">Often discussed product</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Grease / particulate filtration", "EPFA (UL 8782 listed filter assembly)"],
                ["Odor neutralization in exhaust stream", "MOAS (ETL listed abatement—molecular, not masking)"],
                ["Filtration + odor together", "EPFA + MOAS"],
                ["Sidewall / sensitive discharge", "Project-specific stack; request engineering input"],
              ].map(([need, product], i) => (
                <tr key={need} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <td className="px-3 py-3 text-foreground break-words sm:px-5">{need}</td>
                  <td className="px-3 py-3 text-foreground/80 break-words sm:px-5">{product}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading title="Frequently asked questions" />
        <FaqList />
      </Section>

      <CtaBand title="Need a compliance-minded recommendation?" />
    </>
  );
}
