import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ApplicationCards } from "@/components/ApplicationCards";
import { CtaBand } from "@/components/CtaBand";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("solutions");
export default function SolutionsPage() {
  return (
    <>
      <PageHero config={pageHeroes.solutions} compact />
      <Section tone="white">
        <ApplicationCards />
      </Section>
      <CtaBand
        title="Discuss your application."
        description="Start with the process, airflow and discharge location."
        href="/contact?goal=engineering-conversation"
      />
    </>
  );
}
