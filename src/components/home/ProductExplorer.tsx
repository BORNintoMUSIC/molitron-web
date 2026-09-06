"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "./Arrow";
import styles from "./ProductExplorer.module.css";
import { productPresentation } from "@/lib/product-presentation";
import type { Product } from "@/lib/products";

const moasSteps = [
  {
    label: "The cabinet",
    title: "A compact home for odor control.",
    description:
      "MOAS brings the system together in a wall-mounted stainless-steel cabinet. The cabinet stays outside the duct; remote misting nozzles deliver treatment into the exhaust path.",
    image: "/images/moas/moas-closed-professional-gpt2.png",
    alt: "Closed MOAS cabinet with its external controls",
    detail: "Wall-mounted cabinet",
  },
  {
    label: "Inside the system",
    title: "Take a closer look inside.",
    description:
      "The self-contained cabinet houses the operating components and solution supply. Explore the interior here, then use the planning guide for the utility, access, and installation requirements.",
    image: "/images/remastered/moas-open-v2.webp",
    alt: "Open MOAS cabinet showing the operating components, tubing, and solution container",
    detail: "Interior equipment view",
  },
  {
    label: "The exhaust path",
    title: "Treatment happens in the exhaust.",
    description:
      "MOAS atomizes Odor Neutralizer Solution through remote misting nozzles. Nozzle placement, dwell time, configuration, and calibration are evaluated for each project.",
    image: null,
    alt: "Illustrative relationship between the MOAS cabinet and remote nozzles in an exhaust duct",
    detail: "Illustrative system relationship",
  },
] as const;

function ExhaustDiagram() {
  return (
    <div className={styles.diagram}>
      <Image
        src="/images/moas/moas-closed-professional-gpt2.png"
        alt="MOAS cabinet outside the exhaust duct"
        width={220}
        height={300}
        className={styles.diagramCabinet}
        sizes="(max-width: 767px) 28vw, 200px"
        quality={75}
      />
      <svg
        className={styles.diagramLines}
        viewBox="0 0 760 570"
        fill="none"
        role="img"
        aria-labelledby="exhaust-diagram-title exhaust-diagram-description"
      >
        <title id="exhaust-diagram-title">Cabinet to exhaust path</title>
        <desc id="exhaust-diagram-description">
          Connecting lines lead from a wall-mounted cabinet to remote misting
          nozzles in a duct. Arrows indicate exhaust direction. This diagram is
          illustrative and not an installation drawing.
        </desc>
        <defs>
          <marker
            id="exhaust-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="m1 1 5 3-5 3" stroke="#a2c7ba" strokeWidth="1.4" />
          </marker>
        </defs>
        <path d="M295 202h427v167H295" stroke="#87a79a" strokeWidth="2" />
        <path d="M306 202v167M706 202v167" stroke="#87a79a" strokeWidth="1" />
        <path
          d="M332 250h72m29 0h95m30 0h117M332 290h72m29 0h95m30 0h117M332 330h72m29 0h95m30 0h117"
          stroke="#a2c7ba"
          strokeWidth="1.4"
          markerEnd="url(#exhaust-arrow)"
          opacity=".65"
        />
        <path
          d="M153 187v-60h315v78M175 187v-40h406v58"
          stroke="#d0e7a6"
          strokeWidth="2.5"
        />
        <path
          d="M468 198v23m113-23v23"
          stroke="#e1edcb"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {[468, 581].map((x) => (
          <g key={x} fill="#d0e7a6" opacity=".8">
            <circle cx={x} cy="235" r="3" />
            <circle cx={x - 9} cy="254" r="2.5" />
            <circle cx={x + 9} cy="255" r="2.5" />
            <circle cx={x - 16} cy="276" r="2" />
            <circle cx={x} cy="280" r="2.5" />
            <circle cx={x + 17} cy="276" r="2" />
            <circle cx={x - 24} cy="303" r="1.8" />
            <circle cx={x + 23} cy="302" r="1.8" />
            <circle cx={x} cy="313" r="2" />
          </g>
        ))}
        <path d="M529 187V91h132" stroke="#c4d5c5" strokeWidth="1" />
        <path d="M523 384v61h138" stroke="#c4d5c5" strokeWidth="1" />
      </svg>
      <span className={styles.nozzleLabel}>
        Remote misting
        <br />
        nozzles
      </span>
      <span className={styles.exhaustLabel}>
        Kitchen exhaust <span aria-hidden="true">→</span>
      </span>
      <span className={styles.cabinetLabel}>MOAS</span>
    </div>
  );
}

const epfaSteps = [
  {
    label: "The assembly",
    title: "Filtration, in a single enclosure.",
    description:
      "EPFA brings three dry filter stages into an in-line stainless steel assembly. It is documented for smoke particulate and grease vapor from light-duty commercial-kitchen exhaust.",
    image: "/images/remastered/epfa-closed-v2.webp",
    alt: "Closed EPFA assembly with three removable access doors",
    detail: "Stainless steel filter assembly",
  },
  {
    label: "Inside the system",
    title: "Open access to the filter stages.",
    description:
      "Removable gasketed doors provide access to the filter media. The operation and maintenance manual covers monitoring, qualified filter service, cleaning, and equipment records.",
    image: "/images/remastered/epfa-open-v2.webp",
    alt: "Open EPFA assembly showing the internal filter stages",
    detail: "Interior equipment view",
  },
  {
    label: "The filter path",
    title: "A considered sequence of dry filters.",
    description:
      "The path begins with a MERV 9 pre-filter, followed by a MERV 14 high-efficiency stage. The final stage uses MERV 14 media or optional carbon. Broader odor-control needs may call for MOAS.",
    image: null,
    alt: "Illustrative sequence of the EPFA dry filter stages",
    detail: "Illustrative filter sequence",
  },
] as const;

function FilterDiagram() {
  return (
    <div
      className={styles.filterDiagram}
      role="img"
      aria-label="Illustrative EPFA filter path: MERV 9 pre-filter, MERV 14 high-efficiency filter, then MERV 14 or optional carbon final stage."
    >
      <p className={styles.flowLabel}>
        Kitchen exhaust <span aria-hidden="true">→</span>
      </p>
      <div className={styles.filterStages}>
        {[
          ["01", "Pre-filter", "MERV 9"],
          ["02", "High efficiency", "MERV 14"],
          ["03", "Final stage", "MERV 14", "or optional carbon"],
        ].map(([number, label, value, option]) => (
          <div key={number}>
            <span>{number}</span>
            <div className={styles.filterMesh} aria-hidden="true" />
            <p>{label}</p>
            <strong>{value}</strong>
            {option && <small>{option}</small>}
          </div>
        ))}
      </div>
      <p className={styles.filterCaption}>
        Three-stage dry filtration · Illustrative sequence
      </p>
    </div>
  );
}

export function ProductExplorer({
  product: fixedProduct,
}: {
  product?: Product["slug"];
}) {
  const [selectedProduct, setSelectedProduct] =
    useState<Product["slug"]>("moas");
  const product = fixedProduct ?? selectedProduct;
  const presentation = productPresentation[product];
  const steps = product === "moas" ? moasSteps : epfaSteps;
  const [activeStep, setActiveStep] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[activeStep];

  function handleStepKey(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    buttons.current[next]?.focus();
  }

  return (
    <section
      id="system-explorer"
      className={styles.section}
      aria-labelledby="walkthrough-title"
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>
              A CLOSER LOOK / {product.toUpperCase()}
            </p>
            <h2 id="walkthrough-title">
              Understand the system.
              <br />
              <span>From the inside out.</span>
            </h2>
          </div>
          <p className={styles.headingIntro}>
            Explore the equipment, its interior,
            <br className={styles.desktopBreak} /> and the way it works.
          </p>
        </div>

        <div
          className={styles.productSwitch}
          role="group"
          aria-label="Choose a system"
        >
          {!fixedProduct &&
            (["moas", "epfa"] as const).map((slug) => (
              <button
                key={slug}
                type="button"
                aria-pressed={product === slug}
                aria-controls="explorer-content"
                onClick={() => {
                  setSelectedProduct(slug);
                  setActiveStep(0);
                }}
              >
                {slug.toUpperCase()}
                <span>{productPresentation[slug].role}</span>
              </button>
            ))}
        </div>
        <div id="explorer-content" className={styles.walkthrough}>
          <div className={styles.media}>
            <div className={styles.mediaHeader}>
              <span>{product.toUpperCase()} / SYSTEM EXPLORER</span>
              <span>0{activeStep + 1} — 03</span>
            </div>
            <div key={product + activeStep} className={styles.mediaContent}>
              {step.image ? (
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 767px) 85vw, (max-width: 1279px) 54vw, 690px"
                  quality={85}
                  className={styles.equipment}
                />
              ) : product === "moas" ? (
                <ExhaustDiagram />
              ) : (
                <FilterDiagram />
              )}
            </div>
            <div className={styles.mediaFooter}>
              <span>{step.detail}</span>
            </div>
          </div>

          <div className={styles.controls}>
            <div
              className={styles.steps}
              role="group"
              aria-label={"Explore " + product.toUpperCase()}
            >
              {steps.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  ref={(element) => {
                    buttons.current[index] = element;
                  }}
                  aria-pressed={activeStep === index}
                  aria-controls="explorer-step-description"
                  className={styles.step}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(event) => handleStepKey(event, index)}
                >
                  <span className={styles.number}>0{index + 1}</span>
                  <span>{item.label}</span>
                  <Arrow />
                </button>
              ))}
            </div>
            <div
              id="explorer-step-description"
              className={styles.description}
              aria-live="polite"
              aria-atomic="true"
            >
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <Link
              href={"/products/" + product + "#specifications"}
              className={styles.details}
            >
              Explore {product.toUpperCase()} specifications <Arrow diagonal />
            </Link>
            <p className={styles.note}>
              {activeStep === 2
                ? "Illustrative layout. Final installation is project-specific."
                : "Product photography. Equipment details may vary by configuration."}
            </p>
          </div>
        </div>
        <div className={styles.resourceLine}>
          <p>Keep the technical details close.</p>
          <Link href={presentation.guide}>
            Read the {product.toUpperCase()}{" "}
            {product === "moas" ? "planning guide" : "manual"}{" "}
            <Arrow diagonal />
          </Link>
        </div>
      </div>
    </section>
  );
}
