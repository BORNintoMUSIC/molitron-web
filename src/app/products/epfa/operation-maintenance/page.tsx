import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import { buildMetadata, seoKeywords } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/products/epfa/operation-maintenance";
const pdfPath = "/docs/epfa-operation-maintenance-manual-2026.pdf";

export const metadata: Metadata = buildMetadata({
  title: "EPFA Installation, Operation & Maintenance Manual | Molitron",
  description:
    "Review current EPFA receiving, installation coordination, monitoring, factory startup, maintenance, filter service, cleaning, troubleshooting, and equipment records. Download Rev A.",
  path,
  image: "/images/heroes/molitron-service-epfa-maintenance-hero-v1.webp",
  imageAlt: "Open Molitron EPFA prepared for organized filter maintenance",
  keywords: [
    ...seoKeywords.epfa,
    "EPFA operation and maintenance manual",
    "Enviro-Pak maintenance",
    "commercial kitchen exhaust filter maintenance",
  ],
  type: "article",
});

const hero = {
  src: "/images/heroes/molitron-service-epfa-maintenance-hero-v1.webp",
  alt: "Open Molitron EPFA prepared for organized filter maintenance",
  eyebrow: "Technical documentation · EPFA-IOM-2026 · Rev A",
  title: "EPFA Installation, Operation & Maintenance Manual",
  description:
    "Use the current receiving, coordination, monitoring, startup, maintenance, filter-service, cleaning, troubleshooting, and recordkeeping reference for EPFA-24 through EPFA-144.",
};

const controlledData = [
  [
    "Listing scope",
    "UL Listed under File MH45752; models EPFA-24 through EPFA-144 were investigated to the UL 8782 Outline of Investigation for Pollution Control Units for Commercial Cooking Operations",
  ],
  ["Filter sequence", "F1 MERV 9 · F2 MERV 14 · F3 MERV 14 or optional carbon"],
  ["Initial EPFA resistance", "1.54 in. w.g.; add hood, duct, discharge, and other system losses"],
  ["Monitoring supply", "120 VAC; no circuit-amperage value is established by this manual"],
  ["Running indication", "Green indication closes at 1.5 in. w.g."],
  ["Service indication", "Red indication at the selected 2–5 in. w.g. high-static setting"],
  ["Basic enclosure length", "63 in.; width follows the EPFA model suffix"],
  ["Service-side clearance", "30 in. minimum"],
  [
    "Other-side clearance",
    "18 in. minimum air space to combustible materials and building insulation, or zero clearance to noncombustible materials",
  ],
  ["Routine interval", "Inspect and service every four weeks; respond immediately to a flashing red service indication"],
] as const;

const roles = [
  [
    "Owner or facility manager",
    "Retain the manual, schedule the four-week inspection and service cycle, keep equipment records, and arrange qualified support when a red or abnormal indication occurs.",
  ],
  [
    "Operator",
    "Keep the indoor status panel visible, recognize normal and service indications, record abnormal conditions, and avoid opening energized controls or changing factory settings.",
  ],
  [
    "Qualified installer",
    "Coordinate access, duct connections, support, drainage, monitoring electrical work, fire suppression, labels, and project documents before startup.",
  ],
  [
    "Factory representative",
    "Perform startup, verify the supported operating condition, record the selected high-static setting, and complete the owner/facility handoff.",
  ],
  [
    "Qualified service personnel",
    "Inspect filters, gaskets, doors, drains, controls, and accessible stainless interior surfaces using current unit-specific information and safe work practices.",
  ],
] as const;

export default function EpfaOperationMaintenancePage() {
  const manualLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "EPFA Installation, Operation & Maintenance Manual",
    description:
      "Current receiving, installation coordination, monitoring, startup, maintenance, filter service, cleaning, troubleshooting, and recordkeeping guidance for the Molitron EPFA.",
    url: `${site.url}${path}`,
    inLanguage: "en-US",
    version: "Rev A",
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
    about: {
      "@type": "Product",
      name: "Enviro-Pak Filter Assembly (EPFA)",
      manufacturer: { "@type": "Organization", name: site.legalName },
    },
    associatedMedia: {
      "@type": "MediaObject",
      name: "EPFA Installation, Operation & Maintenance Manual · Rev A",
      contentUrl: `${site.url}${pdfPath}`,
      encodingFormat: "application/pdf",
    },
  };

  return (
    <>
      <JsonLd data={manualLd} />
      <PageHero config={hero} compact>
        <Button href={pdfPath} className="!bg-on-brand !text-brand hover:!bg-white">
          Open the final PDF
        </Button>
        <Button
          href="/products/epfa"
          variant="secondary"
          className="!border-on-brand/35 !bg-transparent !text-on-brand hover:!border-on-brand hover:!bg-white/10"
        >
          View EPFA product page
        </Button>
      </PageHero>

      <Section noReveal className="!py-8 sm:!py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link href="/products" className="font-medium text-accent hover:underline">
            Products
          </Link>{" "}
          <span aria-hidden>/</span>{" "}
          <Link href="/products/epfa" className="font-medium text-accent hover:underline">
            EPFA
          </Link>{" "}
          <span aria-hidden>/</span>{" "}
          <span aria-current="page">Operation and maintenance</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-lg border border-warning/35 bg-accent-soft px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Current equipment reference · project coordination still required
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              This companion helps owners, facility managers, operators, installers, service personnel,
              engineers, and AHJs find the manual&apos;s essential information online. It does not replace
              unit labels, current project documents, qualified work, permits, testing, or AHJ review.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            {[
              ["Document", "EPFA-IOM-2026"],
              ["Revision", "Rev A"],
              ["Revision date", "July 2026"],
              ["Format", "24-page print PDF"],
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
          eyebrow="Before installation or startup"
          title="Coordinate the complete exhaust and service path"
          description="EPFA is installed between the kitchen hood and exhaust fan. The project team coordinates the equipment with the duct, fan, supports, access, drains, monitoring supply, fire suppression, permits, and testing."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="surface-card surface-card-static p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-primary">Receiving and placement</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>Confirm the model, serial number, accessories, airflow direction, and service side.</li>
              <li>Document shipping damage or missing items before installation.</li>
              <li>Preserve the 30-in. minimum service-side clearance and the applicable material clearance.</li>
              <li>Provide a same-height service platform where above-ceiling placement requires one.</li>
            </ul>
          </article>
          <article className="surface-card surface-card-static p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-primary">Project interfaces</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/80">
              <li>Coordinate the two bottom support channels, roof curb or suspension, and project anchorage.</li>
              <li>Complete welded inlet and outlet grease-duct connections.</li>
              <li>Route the three cleaning drains to the project drain and grease-interceptor arrangement.</li>
              <li>Complete the building sprinkler connection or optional factory ANSUL pre-piping path through the responsible field parties.</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Controlled values"
          title="Technical relationships used by the manual"
          description="Use current unit labels and project documents for installation and commissioning. The manual does not publish a common-terminal number or a complete construction wiring diagram."
        />
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="w-[32%] px-4 py-3 font-semibold sm:px-5">Item</th>
                <th className="px-4 py-3 font-semibold sm:px-5">Current manual relationship</th>
              </tr>
            </thead>
            <tbody>
              {controlledData.map(([item, value], index) => (
                <tr key={item} className={index % 2 === 0 ? "bg-card" : "bg-background"}>
                  <th className="align-top px-4 py-3 font-semibold text-primary sm:px-5">{item}</th>
                  <td className="px-4 py-3 leading-relaxed text-foreground/80 sm:px-5">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted">
          Product Listing does not establish project approval, code approval, suitability, or AHJ
          acceptance for a particular installation. Final fan selection must include all system losses.
        </p>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Status panel"
          title="Respond to the indication without changing factory settings"
          description="Keep the indoor panel visible for daily monitoring and record the indication, gauge reading, date, and service action."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [
              "Green running indication",
              "Continue normal facility operation, keep the panel visible, maintain the four-week inspection cycle, and record abnormal conditions.",
            ],
            [
              "Flashing red service indication",
              "Respond immediately, record the light and gauge condition, and arrange qualified filter inspection and service. Do not treat control readjustment as an operator action.",
            ],
            [
              "No light, both lights, or unstable indication",
              "Record the condition and route it to qualified service. Do not open energized controls or guess at terminal relationships.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="surface-card surface-card-static p-5">
              <h3 className="text-base font-semibold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Maintenance and records"
          title="Use a repeatable qualified-service cycle"
          description="The manual combines scheduled inspection, filter service, qualified steam cleaning, condition response, and retained records."
        />
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["01", "Inspect", "Check the status indication and gauge, access doors, gaskets, filter fit, drains, and visible equipment condition."],
            ["02", "Service filters", "Preserve the F1/F2/F3 order, install filters individually without overlap, and maintain the documented gasket relationship."],
            ["03", "Clean safely", "Qualified personnel control energy, protect the controls, use the cleaning drains, steam-clean accessible stainless surfaces, inspect, and dry before return to service."],
            ["04", "Record and respond", "Record the date, readings, filter actions, cleaning, technician, next due date, and unresolved conditions with the equipment records."],
          ].map(([number, title, body]) => (
            <li key={number} className="surface-card surface-card-static p-5">
              <span className="text-xs font-bold tracking-[0.14em] text-accent">{number}</span>
              <h3 className="mt-3 text-base font-semibold text-primary">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-lg border border-border bg-card p-5 sm:p-6">
          <h3 className="text-lg font-semibold text-primary">Printable equipment records</h3>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-foreground/80">
            Rev A includes a receiving record, owner acknowledgment, contractor pre-start checkoff,
            contractor identification record, factory startup and monitoring record, maintenance log,
            and a 17 × 11-in. installation and commissioning foldout. These are printable writing pages;
            the PDF contains no interactive form fields or hidden submission behavior.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeading
          eyebrow="Responsibilities"
          title="Keep each handoff explicit"
          description="The manual supports coordination, but it does not transfer project design, safe-work, installation, testing, permitting, or acceptance responsibilities to the document."
        />
        <div className="table-scroll overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-card">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-brand text-on-brand">
              <tr>
                <th className="w-[30%] px-4 py-3 font-semibold sm:px-5">Participant</th>
                <th className="px-4 py-3 font-semibold sm:px-5">Manual responsibility</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(([participant, responsibility], index) => (
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
      </Section>

      <Section tone="accent">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Final publication</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Download the complete 24-page manual
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
              Rev A includes the full receiving, installation coordination, monitoring, startup,
              maintenance, filter service, cleaning, troubleshooting, warranty, printable record,
              and 17 × 11-in. foldout content.
            </p>
          </div>
          <Button href={pdfPath}>Open final PDF · Rev A</Button>
        </div>
      </Section>

      <CtaBand
        title="Need help with an installed EPFA?"
        description="Send the model, serial number, facility, status-panel condition, gauge reading, maintenance history, and photos of the unit labels when available."
      />
    </>
  );
}
