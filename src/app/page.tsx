import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { Section, SectionHeading } from "@/components/Section";
import { faqs } from "@/lib/content";
import { featuredCustomerReferences } from "@/lib/customer-logos";
import { products } from "@/lib/products";
import { metadataFor } from "@/lib/seo";
import { ProductOpening } from "@/components/home/ProductOpening";
import { MoasWalkthrough } from "@/components/home/MoasWalkthrough";

export const metadata: Metadata = metadataFor("home");

const decisionPaths = [
  {
    marker: "01",
    title: "Persistent cooking odor",
    body: "MOAS atomizes Odor Neutralizer Solution through remote nozzles in the exhaust path.",
    href: "/products/moas",
    label: "Review MOAS",
  },
  {
    marker: "02",
    title: "Smoke particulate & grease vapor",
    body: "EPFA provides three-stage dry filtration for light-duty commercial-kitchen exhaust.",
    href: "/products/epfa",
    label: "Review EPFA",
  },
  {
    marker: "03",
    title: "Filtration plus odor",
    body: "Some projects use both systems. Selection, placement, and expected results remain project-specific.",
    href: "/contact",
    label: "Discuss the application",
  },
] as const;

const solutionPaths = [
  {
    href: "/solutions/restaurants",
    title: "Restaurants",
    body: "New builds, remodels, urban kitchens, and constrained discharge paths.",
    image: "/images/heroes/molitron-restaurants-rooftop-evening-hero-v1.webp",
    alt: "Molitron EPFA installed above an urban restaurant at dusk",
  },
  {
    href: "/solutions/airports-hospitality",
    title: "Airports & hospitality",
    body: "Shared buildings and high-visibility foodservice, including installation history at Denver International Airport.",
    image: "/images/heroes/molitron-airports-denver-rooftop-hero-v1.webp",
    alt: "Molitron pollution-control equipment in an airport rooftop setting",
  },
  {
    href: "/solutions/cannabis",
    title: "Cannabis facilities",
    body: "Project-specific odor and exhaust review for odor-sensitive cannabis environments.",
    image: "/images/heroes/molitron-cannabis-moas-facility-hero-v1.webp",
    alt: "Molitron MOAS in a controlled cannabis-facility setting",
  },
  {
    href: "/solutions/industrial",
    title: "Industrial & specialty",
    body: "Nonstandard exhaust inquiries start with the process and airstream—not a generic product promise.",
    image: "/images/heroes/molitron-solutions-mixed-use-rooftop-hero-v1.webp",
    alt: "Molitron exhaust-control equipment in a mixed-use rooftop setting",
  },
] as const;

export default function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />

      <ProductOpening />
      <MoasWalkthrough />

      <Section tone="white" noReveal>
        <SectionHeading
          eyebrow="Start with the contaminant"
          title="What needs to change before the air is discharged?"
          description="The equipment decision follows the problem. These paths are a starting point, not a substitute for project-specific review."
        />
        <div className="grid border-y border-border md:grid-cols-3">
          {decisionPaths.map((path, index) => (
            <Link
              key={path.marker}
              href={path.href}
              className={`group p-6 transition-colors hover:bg-accent-soft/55 sm:p-8 ${
                index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
              }`}
            >
              <p className="text-xs font-bold tracking-[0.18em] text-accent">{path.marker}</p>
              <h2 className="mt-4 text-xl font-semibold text-primary group-hover:text-accent">
                {path.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{path.body}</p>
              <span className="link-shine mt-5 inline-flex text-sm font-bold text-accent">
                {path.label} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Molitron systems"
          title="Two systems. Distinct roles."
          description="MOAS is the odor-abatement system. EPFA is the dry-filtration assembly. The published documents define their current scope, data, and project interfaces."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/products" variant="secondary">
            Compare products
          </Button>
          <Button href="/resources" variant="ghost">
            Open technical resources
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Application paths"
          title="Built around the buyer’s operating environment"
          description="Explore exhaust-control considerations for your type of facility."
        />
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {solutionPaths.map((solution) => (
            <Link key={solution.href} href={solution.href} className="group grid bg-card sm:grid-cols-[10rem_1fr]">
              <div className="relative min-h-44 overflow-hidden sm:min-h-full">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  quality={70}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  sizes="(max-width: 640px) 100vw, 160px"
                />
                <div className="absolute inset-0 bg-brand/10" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary group-hover:text-accent">
                  {solution.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{solution.body}</p>
                <span className="link-shine mt-5 inline-flex text-sm font-bold text-accent">
                  Explore application →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-brand-muted">
              Documents &amp; experience
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-on-brand sm:text-4xl">
              Technical information. Real project experience.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-on-brand-muted">
              MOAS is ETL Listed for the United States and Canada. EPFA models EPFA-24 through
              EPFA-144 are covered by the stated UL Listing record. Listings do not replace
              project design, code review, or AHJ acceptance.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/codes-compliance" className="!bg-on-brand !text-brand hover:!bg-white">
                Understand listing context
              </Button>
              <Button
                href="/resources"
                variant="secondary"
                className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
              >
                Read current documents
              </Button>
            </div>
          </div>
          <div className="border border-white/15 bg-white/[0.04] p-5 sm:p-7">
            <p className="text-sm font-semibold text-on-brand">
              Representative names from Molitron’s installation history
            </p>
            <p className="mt-2 text-sm leading-relaxed text-on-brand-muted">
              References identify project experience and do not imply endorsement, sponsorship,
              or a current commercial relationship.
            </p>
            <div className="mt-6 rounded-sm bg-card p-4 sm:p-6">
              <CustomerLogoGrid references={featuredCustomerReferences} layout="featured" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Common buyer questions"
          title="Clear answers before the sales conversation"
          description="Find the right starting point for your project."
        />
        <FaqList />
      </Section>

      <CtaBand
        title="Bring Molitron into the project early"
        description="Share the cooking equipment or process, CFM, location, discharge path, and the contaminant you need to address."
      />
    </>
  );
}
