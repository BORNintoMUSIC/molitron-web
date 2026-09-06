import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";

import { JsonLd } from "@/components/JsonLd";
import { ProductHero } from "@/components/ProductHero";
import { ProductExplorer } from "@/components/home/ProductExplorer";
import { SectionNav } from "@/components/SectionNav";
import { ProductResources } from "@/components/ProductResources";
import { ProductGallery } from "@/components/ProductGallery";
import { Section, SectionHeading } from "@/components/Section";

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
      <ProductHero product={product} />
      <SectionNav
        label={product.shortName}
        items={[
          { href: "#overview", label: "Overview" },
          { href: "#system-explorer", label: "Look inside" },
          { href: "#specifications", label: "Specifications" },
          { href: "#documents", label: "Documents" },
          { href: "#product-photos", label: "Photos" },
        ]}
      />
      <Section id="overview" tone="white" className="!py-10 sm:!py-12">
        <div className="product-planning-brief">
          <div>
            <h2>Where {product.shortName} fits</h2>
            <p>
              {product.slug === "moas"
                ? "For kitchens where cooking odor affects neighbors or occupied spaces, including sensitive sidewall and ground-level discharge. Use alone or alongside EPFA."
                : "Dry filtration for light-duty kitchen exhaust. Filtration uses no process water, circulation pumps or chemical dosing."}
            </p>
          </div>
          <div>
            <h3>Plan the installation</h3>
            <p>
              {product.slug === "moas"
                ? "Coordinate nozzle placement, utilities, exhaust-fan interlock and access. An optional 10-gallon solution container adds an audible low-level refill alert."
                : "Coordinate duct, support, service access, drains, fire suppression, monitoring, fan selection and AHJ review."}
            </p>
          </div>
        </div>
      </Section>

      <ProductExplorer product={product.slug} />
      <Section id="specifications">
        <SectionHeading
          title="Specifications"
          description="Final selection depends on airflow, cooking equipment, discharge and project requirements."
        />
        <div
          tabIndex={0}
          role="region"
          aria-label={product.shortName + " technical data"}
          className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card"
        >
          <table className="w-full min-w-0 text-left text-sm sm:min-w-0">
            <tbody>
              {product.specs.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-card" : "bg-background"}
                >
                  <th
                    scope="row"
                    className="w-[36%] align-top break-words px-3 py-3 font-semibold text-primary sm:w-1/3 sm:px-5"
                  >
                    {row.label}
                  </th>
                  <td className="px-3 py-3 text-foreground/80 break-words sm:px-5">
                    {row.value}
                  </td>
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
              eyebrow="Model selection"
              title="EPFA model range"
              description="Model, configuration, fan selection, installation and AHJ acceptance remain project-specific."
            />
            <p className="mb-3 text-sm text-muted lg:hidden">
              Scroll sideways to view all model specifications.
            </p>
            <div
              tabIndex={0}
              role="region"
              aria-label={product.shortName + " technical data"}
              className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card"
            >
              <table className="w-full min-w-[56rem] text-left text-sm">
                <caption className="sr-only">
                  EPFA model capacity, width, approximate unit weight, filter
                  quantities, and optional carbon added weight
                </caption>
                <thead className="bg-brand text-on-brand">
                  <tr>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Model
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      CFM
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Width
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Approx. unit weight
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Pre-filter qty.
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      High-efficiency qty.
                    </th>
                    <th scope="col" className="px-3 py-3 font-semibold">
                      Carbon added weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {epfaModels.map((model, index) => (
                    <tr
                      key={model.model}
                      className={index % 2 === 0 ? "bg-card" : "bg-background"}
                    >
                      <th
                        scope="row"
                        className="px-3 py-3 font-semibold text-primary"
                      >
                        {model.model}
                      </th>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.cfm}
                      </td>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.width}
                      </td>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.unitWeight}
                      </td>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.prefilters}
                      </td>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.highEfficiencyFilters}
                      </td>
                      <td className="px-3 py-3 text-foreground/80">
                        {model.carbonAddedWeight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
              Unit weights are approximate. Carbon added weight is additional
              when the optional carbon stage is selected. Filter quantities are
              total quantities rather than per-stage counts.
            </p>
          </div>
        ) : null}
      </Section>

      <Section id="documents" tone="white">
        <ProductResources slug={product.slug} onProductPage />
      </Section>
      <Section id="product-photos">
        <div className="editorial-grid">
          <div>
            <SectionHeading
              eyebrow={product.shortName + " / Details"}
              title="Equipment & installations."
              description="Open a photograph to inspect the details."
            />
            <p className="text-sm leading-relaxed text-muted">
              Equipment details vary by configuration; use current documents for
              planning and service.
            </p>
          </div>
          <ProductGallery
            images={product.gallery}
            productName={product.shortName}
          />
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Project experience"
          title="Selected installations"
          description="Representative installation history. Names identify project experience and do not imply endorsement."
        />
        <CustomerLogoGrid references={product.installs} />
        <p className="mt-6 text-sm text-muted">
          Compare with{" "}
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
        title={`Plan a project with ${product.shortName}.`}
        description="Share your location, cooking equipment and exhaust layout."
        href={"/contact?product=" + product.slug}
      />
    </>
  );
}
