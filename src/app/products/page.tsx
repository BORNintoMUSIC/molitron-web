import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("products");
export default function ProductsPage() {
  return (
    <>
      <PageHero config={pageHeroes.products} compact />
      <Section tone="white">
        <div className="grid gap-12 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <Section id="comparison">
        <SectionHeading
          eyebrow="Side by side"
          title="Do you need MOAS, EPFA or both?"
          description="Selection, configuration and project acceptance remain project-specific."
        />
        <dl className="comparison-list">
          {[
            [
              "What it treats",
              "MOAS",
              "Commercial-kitchen exhaust odor",
              "EPFA",
              "Light-duty kitchen smoke particulate and grease vapor",
            ],
            [
              "How it works",
              "MOAS",
              "Atomized Odor Neutralizer Solution through remote nozzles",
              "EPFA",
              "Three dry filter stages; MERV 14 or optional carbon final stage",
            ],
            [
              "Placement",
              "MOAS",
              "Wall-mounted cabinet outside the duct; nozzles in the exhaust path",
              "EPFA",
              "In-line assembly in the exhaust path",
            ],
          ].map(([label, first, moas, second, epfa]) => (
            <div key={label} className="comparison-row">
              <dt>{label}</dt>
              <dd>
                <span>{first}</span>
                <p>{moas}</p>
              </dd>
              <dd>
                <span>{second}</span>
                <p>{epfa}</p>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
      <CtaBand
        title="Need filtration and odor treatment?"
        description="Some projects use MOAS and EPFA together. Share your cooking equipment, airflow and discharge location so Molitron can review the combination."
        href="/contact?product=both"
      />
    </>
  );
}
