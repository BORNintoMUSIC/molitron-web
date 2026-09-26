import Image from "next/image";
import Link from "next/link";
import { DocDownloads } from "./DocDownloads";
import { Arrow } from "./home/Arrow";
import { products, type Product } from "@/lib/products";
import { productPresentation } from "@/lib/product-presentation";

export function ProductResources({
  slug,
  onProductPage = false,
}: {
  slug: Product["slug"];
  onProductPage?: boolean;
}) {
  const product = products.find((product) => product.slug === slug)!;
  const presentation = productPresentation[slug];
  return (
    <div className="resource-product">
      <div className="resource-product-heading">
        {!onProductPage && (
          <div className="resource-product-photo">
            <Image
              src={presentation.image}
              alt=""
              fill
              sizes="150px"
              className="object-contain"
            />
          </div>
        )}
        <div>
          <p className="eyebrow">
            {onProductPage ? product.shortName : presentation.role}
          </p>
          <h2>{onProductPage ? "Documents" : product.shortName}</h2>
          {!onProductPage && (
            <Link href={"/products/" + slug} className="text-link">
              View product <Arrow diagonal />
            </Link>
          )}
        </div>
      </div>
      <div className="min-w-0">
        <Link href={presentation.guide} className="online-guide">
          <div>
            <p className="eyebrow">Read online</p>
            <h3>{presentation.guideTitle}</h3>
            <p>{presentation.guideDescription}</p>
          </div>
          <Arrow diagonal />
        </Link>
        <DocDownloads
          documents={product.documents}
          productName={product.shortName}
        />
      </div>
    </div>
  );
}
