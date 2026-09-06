import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { SectionNav } from "@/components/SectionNav";
import { Arrow } from "@/components/home/Arrow";
import { pageHeroes } from "@/lib/heroes";
import { productPresentation } from "@/lib/product-presentation";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("service");
export default function ServicePartsPage() {
  return (
    <>
      <PageHero config={pageHeroes.service} compact>
        <Button
          href="/contact?goal=service"
          className="!bg-on-brand !text-brand hover:!bg-white"
        >
          Contact service & parts <Arrow diagonal />
        </Button>
      </PageHero>
      <SectionNav
        label="Equipment support"
        items={[
          { href: "#current-equipment", label: "MOAS & EPFA" },
          { href: "#service-request", label: "What to share" },
          { href: "#legacy-equipment", label: "Legacy equipment" },
        ]}
      />
      <Section id="current-equipment" tone="white">
        <SectionHeading
          eyebrow="Current equipment"
          title="Support for the systems you operate."
        />
        <div className="grid gap-12 md:grid-cols-2">
          {(["moas", "epfa"] as const).map((slug) => (
            <article key={slug}>
              <div className="resource-product-heading">
                <div className="resource-product-photo">
                  <Image
                    src={productPresentation[slug].image}
                    alt=""
                    fill
                    sizes="150px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="eyebrow">{productPresentation[slug].role}</p>
                  <h3 className="mt-2 text-4xl font-medium tracking-tight">
                    {slug.toUpperCase()}
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {slug === "moas"
                  ? "Odor Neutralizer Solution supply, refill guidance, and questions about installed MOAS equipment."
                  : "Filter-media guidance, monitoring, qualified service, and maintenance questions for the EPFA assembly."}
              </p>
              <Link
                href={"/contact?goal=service&product=" + slug}
                className="text-link mt-4"
              >
                Ask about {slug.toUpperCase()} service <Arrow diagonal />
              </Link>
              <div className="mt-4 border-t border-border pt-4">
                <Link
                  href={productPresentation[slug].guide}
                  className="text-link"
                >
                  {slug === "moas"
                    ? "MOAS installation planning guide"
                    : "EPFA operation & maintenance manual"}{" "}
                  <Arrow diagonal />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section id="service-request">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Help us identify the equipment"
            title="A few details make a useful start."
            description="Contact Molitron with the equipment and site context before ordering parts or planning work."
          />
          <div className="editorial-rows">
            {[
              [
                "Equipment",
                "Product, model, serial number, and approximate installation year.",
              ],
              ["Site", "Facility name, city, and state."],
              [
                "The question",
                "Describe the issue, status indication, or part you need.",
              ],
              [
                "Available records",
                "Have nameplate photos, cabinet labels, and equipment records ready to share with Molitron.",
              ],
            ].map(([title, description], index) => (
              <div className="editorial-row" key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section id="legacy-equipment" tone="accent">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Existing installations only"
            title="Enviro-Clean legacy references."
            description="The Enviro-Clean Air Scrubber is discontinued for new projects. These references support owners and service teams working with existing equipment."
          />
          <div>
            <p className="text-base leading-relaxed text-muted">
              Specifications may not represent every installed configuration.
              Verify the actual unit and available records with Molitron before
              ordering parts or planning changes.
            </p>
            <div className="mt-7 border-y border-border py-4">
              <a
                href="/docs/enviro-clean-air-scrubber-brochure-2026.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Download legacy brochure (PDF) ↓
              </a>
              <p className="pb-4 text-sm leading-relaxed text-muted">
                Equipment identification and broad historical context.
              </p>
              <a
                href="/docs/enviro-clean-air-scrubber-legacy-technical-reference-2026.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Download legacy technical reference (PDF) ↓
              </a>
              <p className="pb-2 text-sm leading-relaxed text-muted">
                Historical specifications, documented relationships, and
                installed-unit records.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <CtaBand
        title="Need parts or service guidance?"
        description="Share the unit details and your question with Molitron."
        href="/contact?goal=service"
      />
    </>
  );
}
