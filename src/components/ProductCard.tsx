import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/home/Arrow";
import type { Product } from "@/lib/products";
import { productPresentation } from "@/lib/product-presentation";

export function ProductCard({ product }: { product: Product }) {
  const presentation = productPresentation[product.slug];
  return (
    <article className="product-card">
      <Link
        href={"/products/" + product.slug}
        className={"product-card-image product-photo-" + product.slug}
        aria-label={"Explore " + product.shortName}
      >
        <span className="product-card-watermark" aria-hidden="true">
          {product.shortName}
        </span>
        <Image
          src={presentation.image}
          alt={product.hero.alt}
          fill
          quality={85}
          sizes="(max-width: 767px) 90vw, 570px"
        />
        <span className="product-card-index">
          {product.slug === "moas" ? "01" : "02"} / {presentation.role}
        </span>
        <span className="circle-arrow" aria-hidden="true">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="product-card-copy">
        <div className="flex items-baseline justify-between gap-4">
          <h3>{product.shortName}</h3>
          <p className="eyebrow">{presentation.role}</p>
        </div>
        <p className="product-card-intro">{presentation.intro}</p>
        <ul>
          {presentation.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <Link href={"/products/" + product.slug} className="text-link">
          Explore {product.shortName} <Arrow diagonal />
        </Link>
      </div>
    </article>
  );
}
