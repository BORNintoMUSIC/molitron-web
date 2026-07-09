import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductGallery } from "@/components/ProductGallery";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { getProduct, products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "moas") return metadataFor("moas");
  if (slug === "epfa") return metadataFor("epfa");
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.shortName,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const heroConfig = slug === "moas" ? pageHeroes.moas : pageHeroes.epfa;

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.gallery.map((img) => `${site.url}${img.src}`),
    brand: {
      "@type": "Brand",
      name: site.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: site.legalName,
    },
    category: "Commercial kitchen exhaust pollution control",
  };

  return (
    <>
      <JsonLd data={productLd} />
      <PageHero config={heroConfig}>
        <Button href="/contact" className="!bg-white !text-primary hover:!bg-slate-100">
          Request a quote
        </Button>
        <Button
          href="/codes-compliance"
          variant="secondary"
          className="!border-slate-300 !bg-transparent !text-white hover:!border-white hover:!bg-white/10"
        >
          Codes &amp; compliance
        </Button>
      </PageHero>

      <Section noReveal>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0 w-full">
            <ProductGallery images={product.gallery} productName={product.shortName} />
          </div>
          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{product.summary}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {product.certifications.join(" · ")}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Key capabilities" />
            <ul className="space-y-3">
              {product.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="When teams specify this unit" />
            <ul className="space-y-3">
              {product.useWhen.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Specifications"
          description="Share these with your design team. Final selection depends on CFM, equipment, discharge, and AHJ requirements."
        />
        <div className="table-scroll overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-0 text-left text-sm sm:min-w-0">
            <tbody>
              {product.specs.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <th className="w-[32%] align-top px-3 py-3 font-semibold text-primary sm:w-1/3 sm:px-5">
                    {row.label}
                  </th>
                  <td className="px-3 py-3 text-slate-700 break-words sm:px-5">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          title="Selected installations"
          description="Representative projects. Full history available on request."
        />
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {product.installs.map((name) => (
            <li
              key={name}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-slate-700"
            >
              {name}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Looking for the other product?{" "}
          <Link
            href={`/products/${product.slug === "moas" ? "epfa" : "moas"}`}
            className="font-semibold text-accent hover:underline"
          >
            View {product.slug === "moas" ? "EPFA" : "MOAS"}
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title={`Get pricing guidance for ${product.shortName}`}
        description="Include CFM, cooking equipment, city/state, and install type for a faster response."
      />
    </>
  );
}
