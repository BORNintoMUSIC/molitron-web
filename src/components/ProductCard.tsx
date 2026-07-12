import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10] border-b border-border bg-surface-muted">
        <Image
          src={product.hero.src}
          alt={product.hero.alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          quality={70}
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {product.certifications[0]}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-primary sm:text-xl">
          {product.shortName}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted break-words">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{product.summary}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/products/${product.slug}`}
          className="link-shine mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-accent"
        >
          View {product.shortName} details →
        </Link>
      </div>
    </article>
  );
}
