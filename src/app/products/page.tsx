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
          title="Match the equipment to the need."
          description="Use this comparison to start the conversation. Final equipment selection, configuration, and project acceptance remain project-specific."
        />
        <p className="mb-3 text-sm text-muted sm:hidden">
          Swipe the table sideways to compare both systems.
        </p>
        <div
          className="table-scroll border border-border bg-card"
          role="region"
          aria-label="MOAS and EPFA comparison"
          tabIndex={0}
        >
          <table className="min-w-[560px] text-left text-sm">
            <caption className="sr-only">
              Comparison of MOAS odor abatement and EPFA dry filtration
            </caption>
            <thead className="bg-brand text-on-brand">
              <tr>
                {["Consideration", "MOAS", "EPFA"].map((title) => (
                  <th key={title} scope="col" className="px-5 py-5">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary role", "Odor abatement", "Dry filtration"],
                [
                  "Documented application",
                  "Commercial-kitchen exhaust odor",
                  "Light-duty commercial-kitchen smoke particulate and grease vapor",
                ],
                [
                  "Process",
                  "Atomized Odor Neutralizer Solution through remote nozzles",
                  "Three stages of dry filter media",
                ],
                [
                  "Equipment placement",
                  "Wall-mounted cabinet outside the duct; remote nozzles in the exhaust path",
                  "In-line filter assembly in the exhaust path",
                ],
                [
                  "Final filter option",
                  "Not a filter assembly",
                  "MERV 14 media or optional carbon",
                ],
                [
                  "Together",
                  "May operate alongside EPFA",
                  "Broader odor-control needs may call for MOAS",
                ],
              ].map(([label, moas, epfa]) => (
                <tr key={label}>
                  <th scope="row" className="w-[22%] px-5 py-5">
                    {label}
                  </th>
                  <td className="w-[39%] px-5 py-5 text-muted">{moas}</td>
                  <td className="w-[39%] px-5 py-5 text-muted">{epfa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <CtaBand
        title="One system, or a combined approach?"
        description="Share your cooking load and exhaust path. Molitron can review which equipment belongs in the project."
        href="/contact?product=not-sure"
      />
    </>
  );
}
