import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Section } from "@/components/Section";
import { pageHeroes } from "@/lib/heroes";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = metadataFor("contact");

export default function ContactPage() {
  return (
    <>
      <PageHero config={pageHeroes.contact} compact />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="surface-card space-y-4 p-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                <a
                  className="mt-1 inline-flex min-h-11 items-center font-semibold text-primary hover:text-accent"
                  href={site.phoneHref}
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                <a
                  className="mt-1 inline-flex min-h-11 items-center break-all font-semibold text-primary hover:text-accent"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Project support</p>
                <p className="mt-1 font-medium text-primary">Nationwide</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Contact</p>
                <p className="mt-1 font-medium text-primary">
                  {site.founder.name}, {site.founder.title}
                </p>
              </div>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted">
              California and Colorado are longstanding focus markets, with project support available nationwide.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="surface-card p-4 sm:p-6 md:p-8">
              <h2 className="text-lg font-semibold text-primary">Project details</h2>
              <p className="mt-1 text-sm text-muted">Fields marked * are required.</p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
