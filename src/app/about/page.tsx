import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
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
            <SectionHeading title="Purposeful equipment. A personal connection." />
            <div className="space-y-5 text-base leading-relaxed text-muted">
              <p>
                Molitron is a family business with a practical focus: pollution
                control and odor abatement for commercial-kitchen exhaust.
              </p>
              <p>
                Our equipment is fabricated in Colorado and sold directly.
                Owners, facility managers, and design teams speak with the
                manufacturer about the application, equipment, and support.
              </p>
              <p>
                Today, that work centers on two products: MOAS for odor
                abatement and EPFA for dry filtration. Each has a distinct role;
                some projects use both.
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
            title="Talk to the people behind the equipment."
          />
          <div className="border-t border-border pt-7">
            <h2 className="text-3xl font-medium tracking-tight">
              {site.president.name}
            </h2>
            <p className="eyebrow mt-2">{site.president.title}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Scott Airhart is Molitron’s President. Bring your project details,
              equipment questions, or service inquiry directly to Molitron.
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
              description="Molitron has project and installation history across the United States, including multiple restaurant concepts at Denver International Airport."
            />
            <p className="text-base leading-relaxed text-muted">
              California and Colorado are longstanding focus markets. Each new
              conversation begins with the actual process, exhaust path, and
              project requirements.
            </p>
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
          title="Experience across foodservice environments."
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
      <CtaBand title="A direct conversation starts here." />
    </>
  );
}
