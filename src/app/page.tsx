import type { Metadata } from "next";
import Link from "next/link";
import { ProductOpening } from "@/components/home/ProductOpening";
import { ProductExplorer } from "@/components/home/ProductExplorer";
import { Arrow } from "@/components/home/Arrow";
import { ApplicationCards } from "@/components/ApplicationCards";
import { Button } from "@/components/Button";
import { CustomerLogoGrid } from "@/components/CustomerLogoGrid";
import { Section, SectionHeading } from "@/components/Section";
import { featuredCustomerReferences } from "@/lib/customer-logos";
import { metadataFor } from "@/lib/seo";
export const metadata: Metadata = metadataFor("home");

export default function HomePage() {
  return (
    <>
      <ProductOpening />
      <ProductExplorer />
      <Section tone="white">
        <SectionHeading
          eyebrow="Your application"
          title="From the kitchen to the neighbors."
          description="Plan around the cooking process, the exhaust route, and the people nearby."
        />
        <ApplicationCards />
      </Section>
      <Section tone="dark">
        <div className="heritage-panel">
          <div>
            <p className="eyebrow mb-8">A family business. Since</p>
            <div className="heritage-year">1986</div>
          </div>
          <div>
            <h2>
              Built in Colorado.
              <br />
              Supported by Molitron.
            </h2>
            <p>
              Work directly with the manufacturer, from equipment selection to
              support for an installed system.
            </p>
            <Link href="/about" className="text-link">
              Meet Molitron <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
      <Section tone="white" className="!py-10 sm:!py-12">
        <h2 className="eyebrow mb-6">Selected installation history</h2>
        <CustomerLogoGrid
          references={featuredCustomerReferences}
          layout="featured"
        />
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
          References identify installation history and do not imply endorsement,
          sponsorship, or a current commercial relationship.
        </p>
      </Section>
      <Section>
        <div className="editorial-grid next-step-grid">
          <div>
            <SectionHeading
              eyebrow="Your next step"
              title="Let’s review your exhaust plan."
              description="Share your cooking equipment, airflow, and discharge location. Start with what you know."
            />
            <Button href="/contact">
              Discuss your project <Arrow diagonal />
            </Button>
          </div>
          <div className="next-step-resources">
            <h3 className="eyebrow">Already planning or operating a system?</h3>
            <Link
              href="/products/moas/installation-planning"
              className="online-guide"
            >
              <div>
                <p className="eyebrow">MOAS</p>
                <h3>Installation planning</h3>
              </div>
              <Arrow diagonal />
            </Link>
            <Link
              href="/products/epfa/operation-maintenance"
              className="online-guide"
            >
              <div>
                <p className="eyebrow">EPFA</p>
                <h3>Operation & maintenance</h3>
              </div>
              <Arrow diagonal />
            </Link>
            <Link href="/service-parts" className="text-link">
              Service & parts <Arrow diagonal />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
