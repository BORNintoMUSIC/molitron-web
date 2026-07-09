import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { DocDownloads } from "@/components/DocDownloads";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { getProduct } from "@/lib/products";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("restaurants");

export default function RestaurantsPage() {
  const epfa = getProduct("epfa");
  const moas = getProduct("moas");

  return (
    <>
      <PageHero config={pageHeroes.restaurants}>
        <Button href="/contact" className="!bg-on-brand !text-brand hover:!bg-white">
          Request a restaurant project quote
        </Button>
        <Button
          href="/products/epfa"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          View EPFA
        </Button>
      </PageHero>

      <Section tone="white">
        <SectionHeading
          title="Common restaurant scenarios"
          description="Visible smoke and cooking odor invite complaints—and code enforcement. Match filtration, odor abatement, or both to the load."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            {
              t: "New builds",
              d: "Coordinate early on CFM, hood layout, and discharge path—especially mixed-use sites where neighbors and AHJs raise the bar.",
            },
            {
              t: "Remodels",
              d: "Upgrade grease, smoke, and odor control when menus change, complaints resume, or the AHJ requires listed pollution control.",
            },
            {
              t: "Urban / sidewall discharge",
              d: "When roof discharge is limited, EPFA dry filtration and MOAS molecular odor neutralization become critical path items.",
            },
            {
              t: "Chains & independents",
              d: "From high-volume QSR to chef-driven kitchens—light-duty loads often fit EPFA; persistent odor calls for MOAS, or both.",
            },
          ].map((card) => (
            <div key={card.t} className="surface-card p-5">
              <h2 className="text-lg font-semibold text-primary">{card.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{card.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="What to send for a faster quote"
          description="Typical sales cycles run 1–6 months depending on construction schedule and submittals."
        />
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm text-foreground/80">
          <li>City / state and project type (new vs remodel)</li>
          <li>CFM if known</li>
          <li>List of cooking equipment under the hood</li>
          <li>Install preference: rooftop, indoor, or sidewall</li>
          <li>Whether odor control is required in addition to filtration</li>
        </ul>
      </Section>

      {epfa && moas ? (
        <Section tone="white">
          <SectionHeading
            eyebrow="Downloads"
            title="Specs for restaurant submittals"
            description="Share brochures and engineering docs with your design team while you request a project-specific stack."
          />
          <DocDownloads
            documents={[epfa.documents[0], moas.documents[0]]}
            productName="Restaurant projects"
          />
        </Section>
      ) : null}

      <CtaBand title="Restaurant project? Let’s price the right stack." />
    </>
  );
}
