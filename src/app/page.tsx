import type { Metadata } from "next";
import Link from "next/link";
import { ProductOpening } from "@/components/home/ProductOpening";
import { ProductExplorer } from "@/components/home/ProductExplorer";
import { Arrow } from "@/components/home/Arrow";
import { ApplicationCards } from "@/components/ApplicationCards";
import { CtaBand } from "@/components/CtaBand";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Section, SectionHeading } from "@/components/Section";
import { faqs } from "@/lib/content";
import { featuredCustomerReferences } from "@/lib/customer-logos";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("home");

export default function HomePage() {
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
      <ProductOpening />
      <ProductExplorer />
      <Section tone="white">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Two distinct roles"
            title="Start with what’s in the air."
            description="The equipment decision follows the cooking load, exhaust path, and project requirements."
          />
          <div className="editorial-rows">
            {[
              [
                "MOAS",
                "Persistent cooking odor.",
                "A wall-mounted system delivering Odor Neutralizer Solution through remote misting nozzles.",
                "/products/moas",
              ],
              [
                "EPFA",
                "Smoke particulate & grease vapor.",
                "Three-stage dry filtration for light-duty commercial-kitchen exhaust.",
                "/products/epfa",
              ],
              [
                "BOTH",
                "Filtration and odor together.",
                "Some projects use both systems. Molitron reviews the appropriate combination and configuration with your project team.",
                "/contact?product=both",
              ],
            ].map(([label, title, body, href]) => (
              <article
                key={label}
                className="editorial-row !grid-cols-[46px_1fr]"
              >
                <span>{label}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <Link href={href} className="text-link mt-3">
                    {label === "BOTH"
                      ? "Discuss a combined approach"
                      : "Explore " + label}
                    <Arrow diagonal />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <Link href="/products" className="text-link mt-8">
          Compare MOAS & EPFA <Arrow diagonal />
        </Link>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Applications"
          title="A place in the bigger picture."
          description="From a neighborhood restaurant to a shared public building, good exhaust planning starts with its surroundings."
        />
        <ApplicationCards />
      </Section>
      <Section tone="dark">
        <div className="heritage-panel">
          <div>
            <p className="eyebrow mb-8">Colorado built. Since</p>
            <div className="heritage-year">1986</div>
          </div>
          <div>
            <h2>
              A family business.
              <br />A direct connection.
            </h2>
            <p>
              Molitron manufactures commercial-kitchen pollution control and
              odor abatement equipment in Colorado. Work directly with the
              people behind MOAS and EPFA, from the first application
              conversation to support for installed equipment.
            </p>
            <Link href="/about" className="text-link">
              Get to know Molitron <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <SectionHeading
          eyebrow="Project experience"
          title="Equipment with a history in the field."
          description="Representative names from Molitron’s installation history."
        />
        <CustomerLogoGrid
          references={featuredCustomerReferences}
          layout="featured"
        />
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
          References identify installation history and do not imply endorsement,
          sponsorship, or a current commercial relationship.
        </p>
      </Section>
      <Section>
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Technical resources"
            title="The details belong within reach."
            description="Read the guides online or download a PDF to share with your project team."
          />
          <div className="space-y-4">
            <Link
              href="/products/moas/installation-planning"
              className="online-guide"
            >
              <div>
                <p className="eyebrow">MOAS / Planning</p>
                <h3>Engineering & installation</h3>
              </div>
              <Arrow diagonal />
            </Link>
            <Link
              href="/products/epfa/operation-maintenance"
              className="online-guide"
            >
              <div>
                <p className="eyebrow">EPFA / Operations</p>
                <h3>Operation & maintenance</h3>
              </div>
              <Arrow diagonal />
            </Link>
            <Link href="/resources" className="text-link">
              Browse all documents <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Common questions"
            title="A clearer starting point."
          />
          <FaqList />
        </div>
      </Section>
      <CtaBand title="Bring Molitron into the project early." />
    </>
  );
}
