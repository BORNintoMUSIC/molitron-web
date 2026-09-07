import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { JsonLd } from "./JsonLd";
import { Arrow } from "./home/Arrow";
import type { Product } from "@/lib/products";
import { productPresentation } from "@/lib/product-presentation";
import { site } from "@/lib/site";

export function ProductHero({ product }: { product: Product }) {
  const presentation = productPresentation[product.slug];
  return (
    <section className="product-hero">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            ["Home", "/"],
            ["Products", "/products"],
            [product.shortName, "/products/" + product.slug],
          ].map(([name, href], index) => ({
            "@type": "ListItem",
            position: index + 1,
            name,
            item: site.url + (href === "/" ? "" : href),
          })),
        }}
      />
      <div className="safe-inline mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="hero-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <span aria-hidden="true">/</span>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{product.shortName}</span>
            </li>
          </ol>
        </nav>
        <div className="product-hero-grid">
          <div>
            <p className="eyebrow">{presentation.role} / Molitron equipment</p>
            <h1>{product.shortName}</h1>
            <h2>{presentation.headline}</h2>
            <p className="product-hero-intro">{product.summary}</p>
            <div className="hero-actions">
              <Button href={"/contact?product=" + product.slug}>
                Discuss {product.shortName}
                <Arrow diagonal />
              </Button>
              <Button href="#system-explorer" variant="secondary">
                Look inside
              </Button>
            </div>
            <p className="product-listing">
              {product.certifications[0]}
              {product.slug === "epfa" &&
                " · " + product.certifications[1]} ·{" "}
              <Link
                className="underline underline-offset-4"
                href="/codes-compliance"
              >
                Listing details
              </Link>
            </p>
          </div>
          <div className={"product-card-image product-photo-" + product.slug}>
            <span className="product-card-index">{presentation.role}</span>
            <span className="product-card-watermark" aria-hidden="true">
              {product.shortName}
            </span>
            <Image
              src={presentation.image}
              alt={product.hero.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={85}
              sizes="(max-width: 767px) 90vw, 650px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
