import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Section } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("products");

export default function ProductsPage() {
  return (
    <>
      <PageHero config={pageHeroes.products} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
