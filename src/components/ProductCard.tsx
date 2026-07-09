import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden">
      <div className="media-zoom relative aspect-[16/10] border-b border-border/80 bg-gradient-to-b from-slate-50 to-slate-100">
        <Image
          src={product.hero.src}
          alt={product.hero.alt}
          fill
          loading="lazy"
          quality={70}
          className="object-contain p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {product.certifications[0]}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-primary transition-colors group-hover:text-accent sm:text-xl">
          {product.shortName}
        </h3>
        <p className="mt-1 text-sm font-medium text-slate-600 break-words">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{product.summary}</p>
        <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/products/${product.slug}`}
          className="link-shine mt-6 inline-flex text-sm font-semibold text-accent"
        >
          View {product.shortName} details →
        </Link>
      </div>
    </article>
  );
}
