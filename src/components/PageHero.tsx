import Image from "next/image";
import type { ReactNode } from "react";
import type { PageHeroConfig } from "@/lib/heroes";

type PageHeroProps = {
  config: PageHeroConfig;
  children?: ReactNode;
  compact?: boolean;
};

export function PageHero({ config, children, compact = false }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-primary">
      {/* LCP discovery: preload in document for interior heroes */}
      <link rel="preload" as="image" href={config.src} fetchPriority="high" />
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <Image
            src={config.src}
            alt={config.alt}
            fill
            priority
            fetchPriority="high"
            quality={75}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/85 sm:bg-gradient-to-r sm:from-primary/95 sm:via-primary/82 sm:to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/30" />
      </div>

      <div
        className={`relative mx-auto max-w-6xl px-4 sm:px-6 ${
          compact ? "py-12 sm:py-14 md:py-16" : "py-14 sm:py-16 md:py-20 lg:py-24"
        }`}
      >
        <div className="max-w-3xl">
          {config.eyebrow ? (
            <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-200 sm:mb-3 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300" aria-hidden />
              {config.eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white break-words sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-[1.12]">
            {config.title}
          </h1>
          {config.description ? (
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-slate-200 sm:mt-4 sm:text-base md:text-lg">
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
  );
}
