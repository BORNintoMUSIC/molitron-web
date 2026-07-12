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
          <div className="absolute inset-0 bg-gradient-to-r from-brand/96 via-brand/78 to-brand/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/55 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-on-brand-muted sm:mb-3 sm:text-xs sm:tracking-[0.16em]">
              <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
              Direct manufacturer · Built in Colorado · Nationwide support
            </p>
            <h1 className="font-display text-[2rem] font-bold leading-[1.07] tracking-[-0.035em] text-on-brand break-words sm:text-4xl md:text-5xl lg:text-[3.5rem]">
              Commercial kitchen pollution control &amp; odor abatement—direct from the manufacturer
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-on-brand-muted sm:mt-5 sm:text-lg">
              EPFA dry filtration and MOAS odor abatement for restaurants, airports, hospitality,
              and other odor-sensitive operations. Work directly with the manufacturer to match the
              equipment to your exhaust path, cooking load, and project requirements.
            </p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:max-w-xl sm:flex-row sm:flex-wrap">
              <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
                Request a Quote
              </Button>
              <Button
                href="/products"
                variant="secondary"
                className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
              >
                Explore products
              </Button>
            </div>
          </div>

          <dl className="mt-10 hidden max-w-2xl grid-cols-3 gap-4 sm:grid">
            {[
              { label: "Founded", value: String(site.founded) },
              { label: "Project reach", value: "Nationwide" },
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

      <Section tone="white" className="!py-8 sm:!py-10" noReveal>
        <div className="grid gap-4 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Start with the problem</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
              What needs to leave the exhaust stream?
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/products/moas", title: "Persistent odor", body: "Explore MOAS odor abatement" },
              { href: "/products/epfa", title: "Smoke & grease vapor", body: "Explore EPFA dry filtration" },
              { href: "/contact", title: "Filtration + odor", body: "Ask about a combined approach" },
            ].map((item) => (
              <Link key={item.title} href={item.href} className="group rounded-lg border border-border bg-background px-4 py-4 transition-colors hover:border-accent hover:bg-accent-soft/50">
                <h3 className="font-bold text-primary group-hover:text-accent">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.body} <span aria-hidden>→</span></p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Products"
          title="Two systems. Clear roles."
          description="EPFA provides three-stage dry filtration. MOAS addresses persistent cooking odor. Use one—or discuss a combined approach when the project requires both."
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
              body: "Stop visible smoke and cooking odors before they become neighbor complaints—or code issues—for urban kitchens, chains, and independents.",
            },
            {
              title: "Airports & hospitality",
              href: "/solutions/airports-hospitality",
              body: "Listed filtration and odor abatement for shared buildings and public-facing foodservice—including multiple concepts at Denver International Airport.",
            },
            {
              title: "Cannabis facilities",
              href: "/solutions/cannabis",
              body: "Apply molecular odor neutralization and exhaust filtration to odor-sensitive cannabis environments. Talk to us about your exhaust path.",
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
                Clear product roles: EPFA for dry filtration, MOAS for odor abatement
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                UL 8782 and ETL listings with downloadable specs for submittals
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                Proven on high-visibility foodservice—including Denver International Airport
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 bg-accent" />
                Direct sales and compliance education—not just brochure copy
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

      <Section>
        <SectionHeading
          eyebrow="Installation history"
          title="Specified in high-visibility foodservice environments"
          description="Representative names from Molitron's installation history. References identify project experience and do not imply endorsement."
        />
        <ul className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {["Ritz-Carlton", "Chick-fil-A", "Chipotle", "Burger King", "Hyatt", "Denver International Airport"].map((name) => (
            <li key={name} className="flex min-h-20 items-center justify-center rounded-lg border border-border bg-card px-3 text-center text-sm font-bold text-primary shadow-sm">
              {name}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="FAQ"
          title="Common buyer questions"
          description="Clear facts about what Molitron makes, who we serve, and what information helps start a project conversation."
        />
        <FaqList />
      </Section>

      <CtaBand />
    </>
  );
}
