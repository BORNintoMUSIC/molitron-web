import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { buildMetadata, seoKeywords } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/products/moas/installation-planning";
const pdfPath = "/docs/moas-engineering-specs-installation-2026.pdf";

export const metadata: Metadata = buildMetadata({
  title: "MOAS Installation Planning Guide | Molitron",
  description:
    "Plan MOAS cabinet location, utilities, remote nozzles, tubing, exhaust-fan interlock, access, and project responsibilities. Download Rev A.",
  path,
  image: "/images/heroes/moas.jpg",
  imageAlt: "Molitron MOAS commercial-kitchen odor abatement system cabinet",
  keywords: [
    ...seoKeywords.moas,
    "MOAS installation planning",
    "odor abatement system installation guide",
    "commercial kitchen exhaust planning",
  ],
  type: "article",
});

const hero = {
  src: "/images/heroes/molitron-moas-kitchen-hero-v1.webp",
  alt: "Molitron odor abatement system installed beside a commercial kitchen exhaust hood",
  eyebrow: "Technical documentation · MOAS-INS-001 · Rev A",
  title: "MOAS Engineering & Installation Planning Guide",
  description:
    "Plan the equipment location, utilities, remote nozzles, tubing, exhaust-fan interlock, access, and project responsibilities before installation work begins.",
};

const technicalData = [
  ["Product scope", "Commercial, indoor-use, permanently connected equipment"],
  [
    "Listing",
    "ETL Listed for the U.S. and Canada under Intertek Report 101453585DEN-002; the report identifies UL 197 and CSA C22.2 No. 109",
  ],
  ["Listed equipment rating", "120 V, 3.5 A, 60 Hz"],
  ["Project electrical requirement", "120 VAC, 15 A dedicated circuit"],
  ["Cold-water supply", "1/4 in. at 80 psi"],
  ["Remote solution tubing", "1/4-in. OD"],
  ["Remote air tubing", "3/8-in. OD"],
  ["Maximum nozzle-line length", "100 ft; final routing and installation are project-specific"],
  ["Nozzle-line conduit", "1 in. recommended; not a universal code requirement"],
  [
    "Two-nozzle capacity",
    "Up to 6,000 CFM; final configuration, nozzle location, available path, routing, startup, and calibration are project-specific",
  ],
  ["Cabinet", "18-gauge stainless steel; 24 in. W × 32 in. H × 8 in. D; approximately 100 lb"],
  [
    "Optional solution container",
    "16-gauge stainless steel; 10 gal.; 24 in. W × 12 in. H × 8 in. D; approximately 20 lb empty and 100 lb full",
  ],
  [
    "Supplied container tube",
    "1/2 in. × 30 in.; custom lengths may be specified; 8 ft or less is documented as optimal",
  ],
  ["Low-solution alarm point", "Below 2 gal.; operating reference, not a precision measurement guarantee"],
] as const;

const projectRoles = [
  ["Owner or operator", "Provide current cooking, operating, site, access, and schedule information."],
  [
    "Engineer or designer",
    "Coordinate the exhaust path, structural support, utilities, controls, access, project requirements, and AHJ review.",
  ],
  ["Qualified installer", "Use current controlled project and installation information for the authorized work."],
  [
    "Qualified electrical personnel",
    "Coordinate the dedicated electrical supply, fan-status relationship, and electrical work using current controlled information.",
  ],
  [
    "Authorized startup or service personnel",
    "Perform startup, dilution adjustment, calibration, alarm checks, and service using current controlled instructions.",
  ],
  ["Authority having jurisdiction", "Determine project acceptance under requirements applicable to the project location."],
  ["Molitron", "Provide product information and project-specific application review."],
] as const;

export default function MoasInstallationPlanningPage() {
  const guideLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "MOAS Engineering & Installation Planning Guide",
    description:
      "Project-planning guidance for the MOAS cabinet, utilities, remote nozzles, tubing, exhaust-fan interlock, access, and team responsibilities.",
    url: `${site.url}${path}`,
    inLanguage: "en-US",
    version: "Rev A",
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    about: {
      "@type": "Product",
      name: "Molitron Odor Abatement System (MOAS)",
      manufacturer: { "@type": "Organization", name: site.legalName },
    },
    associatedMedia: {
      "@type": "MediaObject",
      name: "MOAS Engineering & Installation Planning Guide · Rev A",
      contentUrl: `${site.url}${pdfPath}`,
      encodingFormat: "application/pdf",
    },
  };

  return (
    <>
      <JsonLd data={guideLd} />
      <PageHero config={hero} compact>
        <Button href={pdfPath} className="!bg-on-brand !text-brand hover:!bg-white">
          Open the final PDF
        </Button>
        <Button
          href="/products/moas"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          View MOAS product page
        </Button>
      </PageHero>

      <Section noReveal className="!py-8 sm:!py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link href="/products" className="font-medium text-accent hover:underline">
            Products
          </Link>{" "}
          <span aria-hidden>/</span>{" "}
          <Link href="/products/moas" className="font-medium text-accent hover:underline">
            MOAS
          </Link>{" "}
          <span aria-hidden>/</span>{" "}
          <span aria-current="page">Installation planning</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-lg border border-warning/35 bg-accent-soft px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Project planning and coordination — not for construction
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              This guide helps owners and facility managers organize a MOAS project and gives
              engineers, architects, contractors, service personnel, and AHJs a common planning
              reference. It is not a construction drawing, wiring diagram, startup procedure,
              calibration procedure, service manual, or project approval.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            {[
              ["Document", "MOAS-INS-001"],
              ["Revision", "Rev A"],
              ["Revision date", "July 2026"],
              ["Format", "8-page PDF"],
            ].map(([label, value]) => (
              <div key={label} className="bg-card p-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Project inputs"
          title="Start with the complete commercial-kitchen exhaust path"
          description="Assemble these inputs before selecting equipment locations or coordinating utilities. A useful review starts with the full system—not only the cabinet."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="surface-card surface-card-static p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-primary">Cooking and exhaust information</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>Cooking equipment under the hood, including fuel type.</li>
              <li>Menu and cooking processes that affect the exhaust load.</li>
              <li>Hood arrangement, exhaust airflow, duct route, and fan arrangement.</li>
              <li>Discharge location and available path from the proposed nozzles to discharge.</li>
              <li>Nearby air intakes, occupied areas, property lines, and other sensitive receptors.</li>
            </ul>
          </article>
          <article className="surface-card surface-card-static p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-primary">Site and project information</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>Project name, address, jurisdiction, status, and anticipated schedule.</li>
              <li>New construction, remodel, or existing-system modification.</li>
              <li>Design professional, installing contractors, service contact, and AHJ contacts.</li>
              <li>Proposed cabinet and optional solution-container locations.</li>
              <li>Available electrical and cold-water utilities.</li>
              <li>Access for installation, inspection, refilling, startup, and future service.</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="System relationship"
          title="Coordinate the MOAS components as one project system"
          description="The wall-mounted cabinet supplies separate air and solution lines to two remote misting nozzles in the exhaust path. The optional solution container, utilities, fan-status relationship, and service access are coordinated with that path."
        />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", "Exhaust path", "Coordinate the hood, duct, fan, discharge, and available path after the nozzle location."],
            ["02", "Two remote nozzles", "Locate the misting nozzles through project-specific review; preserve access to the duct interface."],
            ["03", "Separate tubing", "Route 1/4-in. OD solution tubing and 3/8-in. OD air tubing back to the cabinet."],
            ["04", "Cabinet and utilities", "Coordinate cold water, dedicated electrical supply, optional container, ventilation, and fan interlock."],
          ].map(([number, title, body]) => (
            <li key={number} className="surface-card surface-card-static p-5">
              <span className="text-xs font-bold tracking-[0.14em] text-accent">{number}</span>
              <h3 className="mt-3 text-base font-semibold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-lg border border-border bg-card p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Exhaust-fan interlock intent</h3>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/80">
            MOAS is intended not to operate when the exhaust fan is off. Qualified electrical
            personnel must coordinate the actual fan-status signal, control or relay function,
            dedicated supply, and authorized installation information. The planning guide does not
            provide relay terminals, conductor colors, line/load connections, or construction wiring.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Controlled values"
          title="Technical data for planning conversations"
          description="Keep the listed equipment rating separate from the project electrical requirement. These values describe different electrical concepts and cannot be substituted for one another."
        />
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="w-[32%] px-4 py-3 font-semibold sm:px-5">Item</th>
                <th className="px-4 py-3 font-semibold sm:px-5">Current planning value</th>
              </tr>
            </thead>
            <tbody>
              {technicalData.map(([item, value], index) => (
                <tr key={item} className={index % 2 === 0 ? "bg-card" : "bg-background"}>
                  <th className="align-top px-4 py-3 font-semibold text-primary sm:px-5">{item}</th>
                  <td className="px-4 py-3 leading-relaxed text-foreground/80 sm:px-5">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
          Product listing does not establish project approval, code approval, suitability, or AHJ
          acceptance for a particular installation. The up-to capacity value is not a guaranteed
          result for every project.
        </p>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Responsibilities"
          title="Coordinate the handoff before installation and startup"
          description="Installation, electrical work, startup, calibration, and service are for qualified or authorized personnel using current controlled information."
        />
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="w-[30%] px-4 py-3 font-semibold sm:px-5">Participant</th>
                <th className="px-4 py-3 font-semibold sm:px-5">Planning responsibility</th>
              </tr>
            </thead>
            <tbody>
              {projectRoles.map(([participant, responsibility], index) => (
                <tr key={participant} className={index % 2 === 0 ? "bg-card" : "bg-background"}>
                  <th className="align-top px-4 py-3 font-semibold text-primary sm:px-5">
                    {participant}
                  </th>
                  <td className="px-4 py-3 leading-relaxed text-foreground/80 sm:px-5">
                    {responsibility}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-warning/35 bg-accent-soft p-5">
            <h3 className="text-base font-semibold text-primary">Safety boundary</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              MOAS is permanently connected electrical equipment. The cabinet contains no
              user-serviceable parts. Electrical-shock and hot-surface hazards may remain inside the
              equipment. Employer programs, qualified personnel, and current controlled instructions
              govern authorized work.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-base font-semibold text-primary">Use the guide within its limits</h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Final supports, anchors, clearances, access, nozzle location, duct penetration,
              fabrication, sealing, plumbing, controls, wiring, startup, and service require current
              controlled project information. Diagrams are educational and not to scale unless a
              scale is expressly shown.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="accent">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Final publication</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Download the complete eight-page planning guide
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              Rev A includes the system overview, cabinet and optional-container planning views,
              nozzle and duct interface, exhaust-fan interlock function, consolidated field-planning
              reference, controlled technical data, and document limitations.
            </p>
          </div>
          <Button href={pdfPath}>Open final PDF · Rev A</Button>
        </div>
      </Section>

      <CtaBand
        title="Discuss a MOAS project with Molitron"
        description="Send the cooking equipment, airflow, hood and duct arrangement, discharge location, project address, available utilities, proposed equipment locations, and project status."
      />
    </>
  );
}
