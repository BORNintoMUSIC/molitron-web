import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import type { PageHeroConfig } from "@/lib/heroes";
import { site } from "@/lib/site";

export function PageHero({
  config,
  children,
  compact = false,
}: {
  config: PageHeroConfig;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <>
      {config.breadcrumbs?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: config.breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: site.url + (item.href === "/" ? "" : item.href),
            })),
          }}
        />
      ) : null}
      <section
        className={
          "page-hero brand-band " + (compact ? "page-hero-compact" : "")
        }
      >
        <div className="safe-inline mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="hero-breadcrumb">
            <ol>
              {config.breadcrumbs?.map((item, index) => (
                <li key={item.href}>
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {index === config.breadcrumbs!.length - 1 ? (
                    <span aria-current="page">{item.label}</span>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              {config.eyebrow && <p className="eyebrow">{config.eyebrow}</p>}
              <h1>{config.title}</h1>
              {config.description && (
                <p className="page-hero-description">{config.description}</p>
              )}
              {children && <div className="hero-actions">{children}</div>}
            </div>
            {!compact && (
              <div className="page-hero-image">
                <Image
                  src={config.src}
                  alt={config.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  quality={75}
                  className="object-cover"
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
                <span className="photo-corner" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
