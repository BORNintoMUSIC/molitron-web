import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { ProductCard } from "@/components/ProductCard";
import { Section, SectionHeading } from "@/components/Section";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = metadataFor("home");

export default function HomePage() {
  return (
    <>
      {/* Preload LCP image early in document order (improves LCP request discovery) */}
      <link rel="preload" as="image" href="/images/heroes/home.jpg" fetchPriority="high" />

      {/* Full-width industrial hero */}
      <section className="relative isolate overflow-hidden bg-brand">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src="/images/heroes/home.jpg"
              alt="Molitron EPFA rooftop kitchen exhaust installation at dawn"
              fill
              priority
              fetchPriority="high"
              quality={75}
              placeholder="empty"
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/82 to-brand/45" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-on-brand-muted sm:mb-3 sm:text-xs">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              Direct manufacturer · Lakewood, CO
            </p>
            <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-on-brand break-words sm:text-4xl sm:leading-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              Commercial kitchen pollution control &amp; odor abatement—built for code compliance
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-brand-muted sm:mt-5 sm:text-lg">
              UL and ETL listed equipment for restaurants, airports, and hospitality. Control grease,
              smoke, and odor in kitchen exhaust—sold direct, with decades of install history
              including Denver International Airport.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
                Request a Quote
              </Button>
              <Button
                href="/products/moas"
                variant="secondary"
                className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
              >
                Explore products
              </Button>
            </div>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-3 min-[400px]:grid-cols-3 sm:mt-12 sm:gap-4">
            {[
              { label: "Founded", value: String(site.founded) },
              { label: "Focus markets", value: "CA · Denver" },
              { label: "Sales model", value: "Direct" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-md border border-white/15 bg-black/25 px-3 py-3 sm:px-4"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-on-brand-muted sm:text-xs">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-base font-semibold text-on-brand sm:text-lg">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Products"
          title="Two systems. Clear roles."
          description="Specify filtration, odor abatement, or both—without wading through a catalog of unrelated equipment."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Who we help"
          title="Built for owners, facility managers, and project teams"
          description="Common triggers: new builds, remodels, airport concessions, hotels, and constrained discharge locations where odor and visible emissions are not optional."
        />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {[
            {
              title: "Restaurants",
              href: "/solutions/restaurants",
              body: "Control grease, smoke, and cooking odors for urban kitchens, chains, and independent operators.",
            },
            {
              title: "Airports & hospitality",
              href: "/solutions/airports-hospitality",
              body: "Proven on high-visibility foodservice—including multiple concepts at Denver International Airport.",
            },
            {
              title: "Cannabis facilities",
              href: "/solutions/cannabis",
              body: "Expanding into odor-sensitive cannabis environments. Talk to us about exhaust and abatement needs.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group surface-card p-5 sm:p-6 sm:last:col-span-2 lg:last:col-span-1"
            >
              <h3 className="text-lg font-semibold text-primary transition-colors group-hover:text-accent">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{card.body}</p>
              <span className="link-shine mt-4 inline-block text-sm font-semibold text-accent">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="accent">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Molitron"
              title="Code-minded equipment from a manufacturer that sells direct"
            />
            <ul className="space-y-3 text-sm leading-relaxed text-foreground/80">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                Cost-effective engineered options compared with large national catalogs
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                Strong word-of-mouth in Denver—especially airport and foodservice projects
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                UL / ETL listed hardware with clear product roles (EPFA + MOAS)
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                Education on compliance topics, not just brochure copy
              </li>
            </ul>
          </div>
          <div className="surface-card group p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Codes &amp; compliance
            </p>
            <h3 className="mt-2 text-xl font-semibold text-primary transition-colors group-hover:text-accent">
              Sidewall discharge, odor control, and listings explained
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              When roof discharge is not an option—or neighbors and AHJs raise the bar—projects need
              documented strategies for grease, smoke, and odor. Start with our compliance hub, then
              request a project-specific recommendation.
            </p>
            <Link
              href="/codes-compliance"
              className="link-shine mt-4 inline-flex text-sm font-semibold text-accent"
            >
              Open codes &amp; compliance hub →
            </Link>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="FAQ"
          title="Common buyer questions"
          description="Clear facts about what Molitron makes, who we serve, and how projects typically move."
        />
        <FaqList />
      </Section>

      <CtaBand />
    </>
  );
}
