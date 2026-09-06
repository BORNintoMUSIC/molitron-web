import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { ApplicationCards } from "@/components/ApplicationCards";
import { CtaBand } from "@/components/CtaBand";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("solutions");
export default function SolutionsPage() {
  return (
    <>
      <PageHero config={pageHeroes.solutions} />
      <Section tone="white">
        <SectionHeading
          eyebrow="Applications"
          title="Start with your environment."
          description="Commercial kitchens are at the center of Molitron’s work. Other processes begin with a specific application review."
        />
        <ApplicationCards />
      </Section>
      <CtaBand title="Tell us what moves through your exhaust." />
    </>
  );
}
