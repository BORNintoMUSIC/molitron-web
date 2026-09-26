import Link from "next/link";
import { Button } from "./Button";
import { PageHero } from "./PageHero";
import { Section, SectionHeading } from "./Section";
import { CtaBand } from "./CtaBand";
import { Arrow } from "./home/Arrow";
import { pageHeroes } from "@/lib/heroes";
import { applicationDetails, applications } from "@/lib/applications";

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
          href="#planning"
          className="!bg-on-brand !text-brand hover:!bg-white"
        >
          What to plan for <Arrow />
        </Button>
      </PageHero>
      <Section id="planning" tone="white">
        <div className="editorial-grid">
          <div>
            <SectionHeading eyebrow="Project brief" title={content.title} />
            <p className="text-base leading-relaxed text-muted">
              {content.scope}
            </p>
            <div className="application-product-links">
              <Link href="/products/moas">
                MOAS <span>Odor abatement</span>
                <Arrow diagonal />
              </Link>
              <Link href="/products/epfa">
                EPFA <span>Dry filtration</span>
                <Arrow diagonal />
              </Link>
            </div>
          </div>
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
            {content.context && (
              <p className="application-context">{content.context}</p>
            )}
            <Link href="/resources" className="text-link mt-6">
              Planning guides & manuals <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
      <CtaBand
        title={content.cta}
        description={content.ctaDescription}
        href="/contact?goal=engineering-conversation"
        label="Discuss the application"
      />
    </>
  );
}
