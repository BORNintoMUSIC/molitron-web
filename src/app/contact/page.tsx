import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Section } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = metadataFor("contact");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{
    product?: string | string[];
    goal?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const product =
    typeof query.product === "string" &&
    ["moas", "epfa", "both", "not-sure"].includes(query.product)
      ? query.product
      : "not-sure";
  const goal =
    typeof query.goal === "string" &&
    ["quote", "engineering-conversation", "service"].includes(query.goal)
      ? query.goal
      : "quote";
  return (
    <>
      <PageHero config={pageHeroes.contact} compact />
      <Section>
        <div className="contact-grid">
          <aside className="contact-panel">
            <h2>Call or email.</h2>
            <div className="contact-links">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={"mailto:" + site.email}>{site.email}</a>
            </div>
            <p className="text-sm">
              {site.president.name}, {site.president.title}
              <br />
              Colorado based. Nationwide project support.
            </p>
          </aside>
          <div className="form-shell min-w-0">
            <h2>How can we help?</h2>
            <p>Share what you know. Technical details are optional.</p>
            <QuoteForm
              key={product + goal}
              initialProduct={product}
              initialGoal={goal}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
