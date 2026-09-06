import Link from "next/link";
import { Button } from "./Button";
import { PageHero } from "./PageHero";
import { Section, SectionHeading } from "./Section";
import { ProductCard } from "./ProductCard";
import { CtaBand } from "./CtaBand";
import { Arrow } from "./home/Arrow";
import { pageHeroes } from "@/lib/heroes";
import { applicationDetails, applications } from "@/lib/applications";
import { products } from "@/lib/products";

export function ApplicationPage({
  kind,
}: {
  kind: keyof typeof applicationDetails;
}) {
  const content = applicationDetails[kind];
  const visual = applications.find((application) => application.key === kind)!;
  return (
    <>
      <PageHero config={{ ...pageHeroes[kind], alt: visual.alt }}>
        <Button
          href="/contact?goal=engineering-conversation"
          className="!bg-on-brand !text-brand hover:!bg-white"
        >
          Discuss the application <Arrow diagonal />
        </Button>
        <Button
          href="/products"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!bg-white/10"
        >
          Explore both systems
        </Button>
      </PageHero>
      <Section tone="white">
        <div className="editorial-grid">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.intro}
          />
          <div className="editorial-rows">
            {content.considerations.map(([title, body], index) => (
              <article key={title} className="editorial-row">
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div className="editorial-grid">
          <div>
            <SectionHeading
              eyebrow="Project context"
              title={content.contextTitle}
            />
            <p className="text-base leading-relaxed text-muted">
              {content.context}
            </p>
          </div>
          <aside className="border-l border-border pl-6 sm:pl-10">
            <p className="eyebrow">Helpful information to share</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {content.inputs.map((input) => (
                <li key={input} className="py-4 text-base text-foreground">
                  {input}
                </li>
              ))}
            </ul>
            <Link
              href="/contact?goal=engineering-conversation"
              className="text-link mt-5"
            >
              Start with your project <Arrow diagonal />
            </Link>
          </aside>
        </div>
      </Section>
      <Section tone="white">
        <SectionHeading
          eyebrow="Molitron equipment"
          title="Get to know the two systems."
          description="Explore each product’s documented scope, specifications, and technical references. Final selection and project acceptance remain project-specific."
        />
        <div className="grid gap-10 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="online-guide resource-cta !mb-0">
          <div>
            <p className="eyebrow">For your design team</p>
            <h3>Keep the product information close.</h3>
            <p>
              Read the guides online or download the current MOAS and EPFA
              publications.
            </p>
          </div>
          <Button href="/resources" variant="secondary">
            Open the document library
          </Button>
        </div>
      </Section>
      <CtaBand
        title={content.cta}
        href="/contact?goal=engineering-conversation"
      />
    </>
  );
}
