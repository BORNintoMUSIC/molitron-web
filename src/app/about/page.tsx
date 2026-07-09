import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
import { formatAddress, site } from "@/lib/site";

export const metadata: Metadata = metadataFor("about");

const facts = [
  { label: "Founded", value: String(site.founded) },
  { label: "Headquarters", value: "Lakewood, CO" },
  { label: "Active products", value: "MOAS · EPFA" },
  { label: "Sales", value: "Direct only" },
];

const milestones = [
  {
    y: "1986",
    t: "Company founded",
    d: "Begins as a manufacturer of UL listed water filter kitchen exhaust ventilators, filter hoods, and service walls.",
  },
  {
    y: "1990s",
    t: "Pollution control focus",
    d: "Engineers equipment for grease, smoke, and odor removal to meet strict jurisdictional requirements—including demanding air quality districts.",
  },
  {
    y: "1994+",
    t: "Denver International Airport",
    d: "DIA’s restaurant exhaust requirements drive early installs. Molitron equipment continues to support airport foodservice concepts.",
  },
  {
    y: "2005–14",
    t: "MOAS developed & listed",
    d: "Odor abatement system invented; later ETL listed with testing related to UL 197 and UL 710 Clause 43.",
  },
  {
    y: "Today",
    t: "Two-product line",
    d: "Active products: MOAS and EPFA. Enviro-Clean Air Scrubber discontinued. Competitive cost, code-minded support, direct sales.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero config={pageHeroes.about}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Request a quote
        </Button>
        <Button
          href="/products"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          View products
        </Button>
      </PageHero>

      <Section tone="white">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our story"
              title="A focused manufacturer—not a catalog conglomerate"
            />
            <div className="space-y-4 text-base leading-relaxed text-foreground/80">
              <p>
                Molitron Company Inc has spent decades solving a practical problem: how to keep
                commercial kitchen exhaust within what owners, neighbors, and authorities expect—on
                grease, smoke, and odor.
              </p>
              <p>
                We don’t sell through a multi-tier dealer maze. Restaurant owners and facility
                managers work with the manufacturer. Our active line is intentionally simple:{" "}
                <Link href="/products/epfa" className="font-semibold text-accent hover:underline">
                  EPFA
                </Link>{" "}
                for filtration, and{" "}
                <Link href="/products/moas" className="font-semibold text-accent hover:underline">
                  MOAS
                </Link>{" "}
                for odor abatement—alone or together.
              </p>
              <p>
                Geographic focus is California and the Denver metro, with project support available
                nationwide. Word-of-mouth—especially around Denver International Airport—remains a
                core way teams find us.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-background p-1 shadow-sm">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-card p-4 sm:p-5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-lg font-semibold text-primary">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.legalName}
              <br />
              {formatAddress()}
            </p>
          </aside>
        </div>
      </Section>

      <Section>
        <div className="surface-card grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Leadership
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              {site.founder.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-accent">{site.founder.title}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              Scott is the public face of the business—available for technical questions, project
              scoping, and direct sales conversations. When you call Molitron, you’re talking to the
              people who build and stand behind the equipment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`}>Email Scott</Button>
              <Button href={site.phoneHref} variant="secondary">
                {site.phone}
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              {[
                "Direct manufacturer relationship",
                "Code- and AHJ-minded recommendations",
                "Honest scope—no overselling the line",
              ].map((item) => (
                <li
                  key={item}
                  className="surface-card flex items-start gap-3 px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="History"
          title="Milestones that still shape the work"
          description="A short record of how Molitron arrived at today’s focused product line."
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((item, i) => (
            <li
              key={item.y}
              className="surface-card relative flex flex-col p-5"
            >
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {item.y}
              </span>
              <span className="mt-3 text-xs font-semibold text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-base font-semibold text-primary">{item.t}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80">{item.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="In the field"
              title="Real equipment. Real install environments."
              description="Product photography and project context from the work we do—filtration, odor abatement, and constrained discharge sites."
            />
            <ul className="mt-2 space-y-3 text-sm leading-relaxed text-foreground/80">
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                Airport and hospitality foodservice installs, including DIA concepts
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                Restaurant and mixed-use projects across California and Colorado
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                UL / ETL listed hardware with clear product roles
              </li>
            </ul>
            <div className="mt-6">
              <Button href="/solutions/airports-hospitality" variant="secondary">
                Airport &amp; hospitality solutions
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm">
              <Image
                src="/images/epfa/epfa-rooftop-1.jpg"
                alt="Molitron EPFA rooftop installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm">
              <Image
                src="/images/moas/moas-closed.png"
                alt="Molitron MOAS odor abatement cabinet"
                fill
                className="object-contain bg-slate-50 p-3"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm">
              <Image
                src="/images/epfa/epfa-closed.png"
                alt="Molitron EPFA filter assembly"
                fill
                className="object-contain bg-slate-50 p-3"
                sizes="25vw"
              />
            </div>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Talk with the manufacturer"
        description="Questions about a project, a listing, or whether MOAS, EPFA, or both fit your site—reach Scott’s team directly."
      />
    </>
  );
}
