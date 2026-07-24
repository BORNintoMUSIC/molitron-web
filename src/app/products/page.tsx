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
      <PageHero config={pageHeroes.products} />
      <Section>
        <SectionHeading
          eyebrow="Choose by need"
          title="Two systems with different jobs"
          description="EPFA filters smoke particulate and grease vapor. MOAS addresses persistent odor. Some projects use both, but the right approach depends on the cooking load, exhaust path, and project requirements."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} priority={index === 0} />
          ))}
        </div>
      </Section>
      <Section tone="accent">
        <SectionHeading
          title="Quick product comparison"
          description="A starting point for owners and facility teams—not a substitute for project-specific design review."
        />
        <div className="table-scroll overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="px-4 py-3 font-bold">Question</th>
                <th className="px-4 py-3 font-bold">MOAS</th>
                <th className="px-4 py-3 font-bold">EPFA</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary job", "Odor abatement", "Dry filtration"],
                ["Typical contaminants", "Persistent cooking odors; some smoke reduction", "Smoke particulate and grease vapor"],
                ["Process", "Atomized Odor Neutralizer Solution", "MERV 9 and MERV 14 filter stages"],
                ["Odor option", "Core purpose", "Optional carbon final stage; MOAS for broader odor control"],
                ["Best next step", "Share odor source, CFM, and duct path", "Share cooking equipment, CFM, and install location"],
              ].map(([label, moas, epfa], index) => (
                <tr key={label} className={index % 2 ? "bg-background" : "bg-card"}>
                  <th className="px-4 py-3 font-bold text-primary">{label}</th>
                  <td className="px-4 py-3 text-foreground/80">{moas}</td>
                  <td className="px-4 py-3 text-foreground/80">{epfa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
