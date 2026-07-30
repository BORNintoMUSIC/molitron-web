import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("industrial");

const reviewQuestions = [
  {
    title: "What is the source?",
    body: "Describe the process, operating schedule, materials, and the specific odor, smoke, grease-vapor, or particulate concern. A product should not be selected from a facility label alone.",
  },
  {
    title: "What moves through the exhaust?",
    body: "Provide airflow, temperature, moisture, existing filtration, duct path, fan arrangement, discharge location, and nearby sensitive receptors when known.",
  },
  {
    title: "What must the project satisfy?",
    body: "Identify the site, jurisdiction, design team, authority having jurisdiction, access constraints, utilities, and the outcome the project team is trying to achieve.",
  },
] as const;

export default function IndustrialSolutionsPage() {
  return (
    <>
      <PageHero config={pageHeroes.industrial}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Start an application review
        </Button>
        <Button
          href="/resources"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          Review product documents
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading
          eyebrow="First principle"
          title="Define the airstream before discussing equipment"
          description="Molitron’s active product documentation is centered on commercial-kitchen exhaust. Cannabis history and other specialty inquiries can be discussed, but fit is never assumed from an industry category."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {reviewQuestions.map((item, index) => (
            <article key={item.title} className="surface-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                Review {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Product boundaries"
              title="What the active systems are documented to do"
            />
            <div className="space-y-4">
              <div className="border-l-4 border-accent bg-card p-5">
                <h2 className="text-lg font-semibold text-primary">MOAS</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  MOAS atomizes Odor Neutralizer Solution through remote misting nozzles for
                  commercial-kitchen exhaust odor abatement. Configuration and results are
                  project-specific.
                </p>
                <Link href="/products/moas" className="link-shine mt-3 inline-flex font-semibold text-accent">
                  Review MOAS scope →
                </Link>
              </div>
              <div className="border-l-4 border-primary bg-card p-5">
                <h2 className="text-lg font-semibold text-primary">EPFA</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  EPFA provides three-stage dry filtration for smoke particulate and grease vapor
                  in light-duty commercial-kitchen exhaust. Its documented scope should not be
                  generalized to an unrelated industrial process.
                </p>
                <Link href="/products/epfa" className="link-shine mt-3 inline-flex font-semibold text-accent">
                  Review EPFA scope →
                </Link>
              </div>
            </div>
          </div>

          <aside className="surface-card surface-card-static p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Useful first package
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-primary">
              Send enough context for a real answer
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80">
              {[
                "Facility type, city, and state",
                "Process description and operating schedule",
                "Airflow and exhaust temperature, if known",
                "Contaminants or odor concern",
                "Existing hood, filters, duct, and fan arrangement",
                "Discharge location and nearby occupied areas or outdoor-air intakes",
                "Drawings, photographs, or equipment schedules that are safe to share",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="accent">
        <SectionHeading
          title="Cannabis facilities have a dedicated review path"
          description="Molitron has cannabis-related installation and application history. The process and exhaust path still determine whether an active product is a sensible fit."
        />
        <Button href="/solutions/cannabis" variant="secondary">
          Explore cannabis applications
        </Button>
      </Section>

      <CtaBand
        title="Have a nonstandard exhaust problem?"
        description="Describe the process and airstream. Molitron can review whether an active product belongs in the conversation."
      />
    </>
  );
}
