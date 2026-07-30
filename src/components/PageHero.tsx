import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import type { PageHeroConfig } from "@/lib/heroes";
import { site } from "@/lib/site";

type PageHeroProps = {
  config: PageHeroConfig;
  children?: ReactNode;
  compact?: boolean;
};

export function PageHero({ config, children, compact = false }: PageHeroProps) {
  const breadcrumbLd = config.breadcrumbs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: config.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: `${site.url}${item.href === "/" ? "" : item.href}`,
        })),
      }
    : null;

  return (
    <>
      {breadcrumbLd ? <JsonLd data={breadcrumbLd} /> : null}
      <section className="relative isolate overflow-hidden bg-brand">
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src={config.src}
            alt={config.alt}
            fill
            fetchPriority="high"
            loading="eager"
            quality={70}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-brand/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/45 via-transparent to-transparent" />
      </div>

      <div
        className={`safe-inline relative mx-auto max-w-7xl ${
          compact ? "py-10 sm:py-12 md:py-14" : "py-12 sm:py-16 md:py-20 lg:py-24"
        }`}
      >
        <div className="max-w-2xl rounded-lg border border-white/10 bg-brand/35 p-5 backdrop-blur-[2px] sm:p-7 md:bg-transparent md:p-0 md:backdrop-blur-none">
          {config.breadcrumbs?.length ? (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-on-brand-muted">
                {config.breadcrumbs.map((item, index) => {
                  const current = index === config.breadcrumbs!.length - 1;
                  return (
                    <li key={item.href} className="flex items-center gap-2">
                      {index > 0 ? <span aria-hidden>/</span> : null}
                      {current ? (
                        <span aria-current="page" className="text-on-brand">
                          {item.label}
                        </span>
                      ) : (
                        <Link href={item.href} className="hover:text-on-brand hover:underline">
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}
          {config.eyebrow ? (
            <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-brand-muted sm:mb-3 sm:text-xs sm:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              {config.eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-[1.9rem] font-bold leading-[1.08] tracking-[-0.035em] text-on-brand break-words sm:text-4xl lg:text-5xl lg:leading-[1.05]">
            {config.title}
          </h1>
          {config.description ? (
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-on-brand-muted sm:mt-4 sm:text-base md:text-lg">
              {config.description}
            </p>
          ) : null}
          {children ? (
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              {children}
            </div>
          ) : null}
        </div>
      </div>
      </section>
    </>
  );
}
