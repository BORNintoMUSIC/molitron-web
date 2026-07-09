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
    body: "Pollution control units and odor abatement for commercial kitchens—new builds and remodels.",
  },
  {
    href: "/solutions/airports-hospitality",
    title: "Airports & hospitality",
    body: "High-visibility foodservice environments, including airport concessions and hotels.",
  },
  {
    href: "/solutions/cannabis",
    title: "Cannabis",
    body: "Odor-sensitive facilities exploring exhaust filtration and abatement options.",
  },
];

export default function SolutionsIndexPage() {
  return (
    <>
      <PageHero config={pageHeroes.solutions} />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
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
