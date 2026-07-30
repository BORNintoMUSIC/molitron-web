import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("solutions");

const solutions = [
  {
    href: "/solutions/restaurants",
    title: "Restaurants",
    body: "Pollution control units and exhaust odor abatement for commercial kitchens—new builds, remodels, and sidewall discharge.",
  },
  {
    href: "/solutions/airports-hospitality",
    title: "Airports & hospitality",
    body: "Listed filtration and odor control for high-visibility foodservice, including airport concessions and hotels.",
  },
  {
    href: "/solutions/cannabis",
    title: "Cannabis",
    body: "Odor-sensitive facilities exploring exhaust filtration and project-specific odor-abatement options.",
  },
  {
    href: "/solutions/industrial",
    title: "Industrial & specialty",
    body: "Application review for nonstandard exhaust concerns, with clear boundaries around the active products’ documented scope.",
  },
];

export default function SolutionsIndexPage() {
  return (
    <>
      <PageHero config={pageHeroes.solutions} />
      <Section>
        <div className="mb-10 grid gap-5 border-y border-border py-6 sm:grid-cols-3">
          {[
            ["Odor", "Start with MOAS and the available exhaust path."],
            ["Smoke particulate & grease vapor", "Start with EPFA and the cooking load."],
            ["Nonstandard process", "Start with an application review, not a product assumption."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="text-sm font-bold text-primary">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group surface-card p-6"
            >
              <h2 className="text-xl font-semibold text-primary transition-colors group-hover:text-accent">
                {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{s.body}</p>
              <span className="link-shine mt-4 inline-block text-sm font-semibold text-accent">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
