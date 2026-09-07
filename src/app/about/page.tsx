import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";
import { Arrow } from "@/components/home/Arrow";
import { pageHeroes } from "@/lib/heroes";
import { featuredCustomerReferences } from "@/lib/customer-logos";
import { metadataFor } from "@/lib/seo";
import { site } from "@/lib/site";
export const metadata: Metadata = metadataFor("about");
export default function AboutPage() {
  return (
    <>
      <PageHero config={pageHeroes.about} />
      <Section tone="white">
        <div className="editorial-grid">
          <div>
            <p className="eyebrow mb-8">Our story begins in</p>
            <div className="heritage-year">1986</div>
          </div>
          <div>
            <SectionHeading title="Built here. Sold direct." />
            <div className="space-y-5 text-base leading-relaxed text-muted">
              <p>
                Our family business has manufactured commercial kitchen
                pollution control and odor abatement equipment since 1986.
              </p>
              <p>
                Owners, facility managers and design teams work directly with
                Molitron on equipment selection and support.
              </p>
            </div>
            <Link href="/products" className="text-link mt-6">
              Meet MOAS & EPFA <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
      <Section>
        <div className="editorial-grid">
          <SectionHeading
            eyebrow="Direct from Molitron"
            title={`Meet ${site.president.name}.`}
          />
          <div className="border-t border-border pt-7">
            <p className="eyebrow">{site.president.title}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Talk directly with Molitron about equipment selection, an exhaust
              application or support for an installed system.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={"mailto:" + site.email}>Email Molitron</Button>
              <Button href={site.phoneHref} variant="secondary">
                {site.phone}
              </Button>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="In the field"
              title="Colorado roots. Projects nationwide."
              description="Installation history spans the United States, including multiple restaurant concepts at Denver International Airport."
            />
            <Link href="/solutions" className="text-link mt-6">
              Explore the applications <Arrow diagonal />
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/remastered/epfa-rooftop-installation-v2.webp"
              alt="Molitron EPFA rooftop installation"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 90vw, 600px"
            />
          </div>
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Installation history"
          title="Selected installations"
        />
        <CustomerLogoGrid
          references={featuredCustomerReferences}
          layout="featured"
        />
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
          References identify installation history and do not imply endorsement,
          sponsorship, or a current commercial relationship.
        </p>
      </Section>
    </>
  );
}
