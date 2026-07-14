import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";
import { DocDownloads } from "@/components/DocDownloads";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductGallery } from "@/components/ProductGallery";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { epfaModels, getProduct, products } from "@/lib/products";
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
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Request a quote
        </Button>
        <Button
          href="/codes-compliance"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
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
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{product.summary}</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent break-words">
              {product.certifications.join(" · ")}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Why operators choose this system" />
            <ul className="space-y-3">
              {product.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="When teams specify this unit" />
            <ul className="space-y-3">
              {product.useWhen.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-primary" />
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
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-0 text-left text-sm sm:min-w-0">
            <tbody>
              {product.specs.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-card" : "bg-background"}>
                  <th className="w-[36%] align-top break-words px-3 py-3 font-semibold text-primary sm:w-1/3 sm:px-5">
                    {row.label}
                  </th>
                  <td className="px-3 py-3 text-foreground/80 break-words sm:px-5">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          {product.slug === "moas"
            ? "Performance figures are qualified as up to values. Results vary with the cooking process, hood performance, exhaust configuration, installation, dwell time, and system calibration."
            : "EPFA's standard stages address smoke particulate and grease vapor. The final stage may use MERV 14 media or optional carbon; broader odor-control needs may call for MOAS."}
        </p>
        {product.slug === "epfa" ? (
          <div className="mt-12">
            <SectionHeading
              eyebrow="Owner-confirmed planning data"
              title="EPFA model range"
              description="Use these values for early selection conversations. Final model, configuration, fan selection, installation, and AHJ acceptance remain project-specific."
            />
            <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
              <table className="w-full min-w-[56rem] text-left text-sm">
                <caption className="sr-only">
                  EPFA model capacity, width, approximate unit weight, filter quantities, and optional carbon added weight
                </caption>
                <thead className="bg-brand text-on-brand">
                  <tr>
                    <th className="px-3 py-3 font-semibold">Model</th>
                    <th className="px-3 py-3 font-semibold">CFM</th>
                    <th className="px-3 py-3 font-semibold">Width</th>
                    <th className="px-3 py-3 font-semibold">Approx. unit weight</th>
                    <th className="px-3 py-3 font-semibold">Pre-filter qty.</th>
                    <th className="px-3 py-3 font-semibold">High-efficiency qty.</th>
                    <th className="px-3 py-3 font-semibold">Carbon added weight</th>
                  </tr>
                </thead>
                <tbody>
                  {epfaModels.map((model, index) => (
                    <tr key={model.model} className={index % 2 === 0 ? "bg-card" : "bg-background"}>
                      <th className="px-3 py-3 font-semibold text-primary">{model.model}</th>
                      <td className="px-3 py-3 text-foreground/80">{model.cfm}</td>
                      <td className="px-3 py-3 text-foreground/80">{model.width}</td>
                      <td className="px-3 py-3 text-foreground/80">{model.unitWeight}</td>
                      <td className="px-3 py-3 text-foreground/80">{model.prefilters}</td>
                      <td className="px-3 py-3 text-foreground/80">{model.highEfficiencyFilters}</td>
                      <td className="px-3 py-3 text-foreground/80">{model.carbonAddedWeight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
              Unit weights are approximate. Carbon added weight is additional when the optional carbon stage is selected.
              Filter quantities are total quantities rather than per-stage counts.
            </p>
          </div>
        ) : null}
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Downloads"
          title="Technical documentation"
          description={
            product.slug === "moas"
              ? "Approved MOAS product and installation-planning documentation. Project-specific design, installation, approval, and AHJ review remain the responsibility of the project team."
              : "Published EPFA Product & Planning Brochure with owner-confirmed model data and project-coordination guidance. The brochure is not a construction drawing or a substitute for project-specific design, current installation instructions, or AHJ review."
          }
        />
        {product.slug === "moas" ? (
          <div className="mb-5 flex flex-col gap-4 rounded-lg border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-primary">Prefer an online planning reference?</h3>
              <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                Read the cabinet, utility, nozzle, tubing, interlock, access, and responsibility guidance in accessible HTML.
              </p>
            </div>
            <Button href="/products/moas/installation-planning" variant="secondary" className="sm:shrink-0">
              Read the planning guide
            </Button>
          </div>
        ) : null}
        <DocDownloads documents={product.documents} productName={product.shortName} />
      </Section>

      <Section>
        <SectionHeading
          title="Selected installations"
          description="Representative installation history. Names identify project experience and do not imply endorsement."
        />
        <CustomerLogoGrid references={product.installs} />
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
