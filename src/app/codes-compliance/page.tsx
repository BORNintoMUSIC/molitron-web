import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Arrow } from "@/components/home/Arrow";
import { codeTopics, faqs } from "@/lib/content";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("codes");
export default function CodesCompliancePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <PageHero config={pageHeroes.codes} compact />
      <SectionNav
        items={[
          { href: "#product-listings", label: "Product listings" },
          { href: "#project-review", label: "Project review" },
          { href: "#common-questions", label: "Common questions" },
        ]}
      />
      <Section id="product-listings" tone="white">
        <SectionHeading
          eyebrow="Listing scope"
          title="Two products. Their own listing records."
          description="Read the listing in the context of the covered equipment and the proposed application."
        />
        <div className="grid gap-10 md:grid-cols-2">
          {[
            [
              "MOAS",
              "ETL Listed · U.S. & Canada",
              "Intertek Report 101453585DEN-002",
              "The report identifies UL 197 and CSA C22.2 No. 109 as the applicable standards.",
              "/products/moas",
            ],
            [
              "EPFA",
              "UL Listed",
              "File MH45752",
              "Models EPFA-24 through EPFA-144 were investigated to the UL 8782 Outline of Investigation for Pollution Control Units for Commercial Cooking Operations.",
              "/products/epfa",
            ],
          ].map(([name, listing, file, scope, href]) => (
            <article key={name} className="border-y border-border py-8">
              <p className="eyebrow">{listing}</p>
              <h2 className="mt-3 text-5xl font-medium tracking-tight">
                {name}
              </h2>
              <p className="mt-5 text-base font-semibold">{file}</p>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {scope}
              </p>
              <Link href={href} className="text-link mt-5">
                View {name} documentation <Arrow diagonal />
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
          A product listing does not establish project approval, code
          compliance, accessory coverage, field-installation acceptance, or
          suitability for a specific application. The project team and authority
          having jurisdiction retain their respective roles.
        </p>
      </Section>
      <Section id="project-review">
        <div className="editorial-grid">
          <div>
            <SectionHeading
              eyebrow="Planning context"
              title="Review the complete project."
            />
            <p className="text-sm leading-relaxed text-muted">
              This content is educational. Verify requirements with your design
              professional and authority having jurisdiction (AHJ) for the
              project address.
            </p>
          </div>
          <div className="editorial-rows">
            {codeTopics.map((topic, index) => (
              <article key={topic.title} className="editorial-row">
                <span>0{index + 1}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="white">
        <div className="online-guide resource-cta !mb-0">
          <div>
            <p className="eyebrow">Technical references</p>
            <h3>Bring current documents to the review.</h3>
            <p>
              MOAS and EPFA brochures, planning references, and maintenance
              guidance are collected in one place.
            </p>
          </div>
          <Link href="/resources" className="text-link shrink-0">
            Document library <Arrow diagonal />
          </Link>
        </div>
      </Section>
      <Section id="common-questions">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Common questions"
            title="Clarify the starting point."
          />
          <FaqList />
        </div>
      </Section>
      <CtaBand
        title="Need product information for your review?"
        href="/contact?goal=engineering-conversation"
      />
    </>
  );
}
