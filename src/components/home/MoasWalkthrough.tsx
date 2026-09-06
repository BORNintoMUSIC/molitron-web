"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Arrow } from "./Arrow";
import styles from "./MoasWalkthrough.module.css";

const steps = [
  {
    label: "The cabinet",
    title: "A compact home for odor control.",
    description: "MOAS brings the system together in a wall-mounted stainless-steel cabinet. The cabinet stays outside the duct; remote misting nozzles deliver treatment into the exhaust path.",
    image: "/images/moas/moas-closed-professional-gpt2.png",
    alt: "Closed MOAS cabinet with its external controls",
    detail: "Wall-mounted cabinet",
  },
  {
    label: "Inside the system",
    title: "Take a closer look inside.",
    description: "The self-contained cabinet houses the operating components and solution supply. Explore the interior here, then use the planning guide for the utility, access, and installation requirements.",
    image: "/images/remastered/moas-open-v2.webp",
    alt: "Open MOAS cabinet showing the operating components, tubing, and solution container",
    detail: "Interior equipment view",
  },
  {
    label: "The exhaust path",
    title: "Treatment happens in the exhaust.",
    description: "MOAS atomizes Odor Neutralizer Solution through remote misting nozzles. Nozzle placement, dwell time, configuration, and calibration are evaluated for each project.",
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
      <svg className={styles.diagramLines} viewBox="0 0 760 570" fill="none" role="img" aria-labelledby="exhaust-diagram-title exhaust-diagram-description">
        <title id="exhaust-diagram-title">Cabinet to exhaust path</title>
        <desc id="exhaust-diagram-description">Connecting lines lead from a wall-mounted cabinet to remote misting nozzles in a duct. Arrows indicate exhaust direction. This diagram is illustrative and not an installation drawing.</desc>
        <defs>
          <marker id="exhaust-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="m1 1 5 3-5 3" stroke="#a2c7ba" strokeWidth="1.4" /></marker>
        </defs>
        <path d="M295 202h427v167H295" stroke="#87a79a" strokeWidth="2" />
        <path d="M306 202v167M706 202v167" stroke="#87a79a" strokeWidth="1" />
        <path d="M332 250h72m29 0h95m30 0h117M332 290h72m29 0h95m30 0h117M332 330h72m29 0h95m30 0h117" stroke="#a2c7ba" strokeWidth="1.4" markerEnd="url(#exhaust-arrow)" opacity=".65" />
        <path d="M153 187v-60h315v78M175 187v-40h406v58" stroke="#d0e7a6" strokeWidth="2.5" />
        <path d="M468 198v23m113-23v23" stroke="#e1edcb" strokeWidth="5" strokeLinecap="round" />
        {[468, 581].map((x) => (
          <g key={x} fill="#d0e7a6" opacity=".8">
            <circle cx={x} cy="235" r="3" /><circle cx={x - 9} cy="254" r="2.5" /><circle cx={x + 9} cy="255" r="2.5" />
            <circle cx={x - 16} cy="276" r="2" /><circle cx={x} cy="280" r="2.5" /><circle cx={x + 17} cy="276" r="2" />
            <circle cx={x - 24} cy="303" r="1.8" /><circle cx={x + 23} cy="302" r="1.8" /><circle cx={x} cy="313" r="2" />
          </g>
        ))}
        <path d="M529 187V91h132" stroke="#c4d5c5" strokeWidth="1" />
        <path d="M523 384v61h138" stroke="#c4d5c5" strokeWidth="1" />
      </svg>
      <span className={styles.nozzleLabel}>Remote misting<br />nozzles</span>
      <span className={styles.exhaustLabel}>Kitchen exhaust <span aria-hidden="true">→</span></span>
      <span className={styles.cabinetLabel}>MOAS</span>
    </div>
  );
}

export function MoasWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[activeStep];

  function handleStepKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + steps.length - 1) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    setActiveStep(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="inside-moas" className={styles.section} aria-labelledby="walkthrough-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>A CLOSER LOOK / MOAS</p><h2 id="walkthrough-title">Understand the system.<br /><span>From the inside out.</span></h2></div>
          <p className={styles.headingIntro}>A guided look at the equipment<br className={styles.desktopBreak} /> behind odor abatement.</p>
        </div>

        <div className={styles.walkthrough}>
          <div className={styles.media}>
            <div className={styles.mediaHeader}><span>MOAS / SYSTEM EXPLORER</span><span>0{activeStep + 1} — 03</span></div>
            <div key={activeStep} className={styles.mediaContent}>
              {step.image ? (
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 767px) 85vw, (max-width: 1279px) 54vw, 690px"
                  quality={85}
                  className={styles.equipment}
                />
              ) : <ExhaustDiagram />}
            </div>
            <div className={styles.mediaFooter}><span>{step.detail}</span></div>
          </div>

          <div className={styles.controls}>
            <div className={styles.steps} role="group" aria-label="Explore MOAS">
              {steps.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  ref={(element) => { buttons.current[index] = element; }}
                  aria-pressed={activeStep === index}
                  aria-controls="moas-step-description"
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
            <div id="moas-step-description" className={styles.description} aria-live="polite" aria-atomic="true">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <Link href="/products/moas" className={styles.details}>Explore MOAS specifications <Arrow diagonal /></Link>
            <p className={styles.note}>
              {activeStep === 2 ? "Illustrative layout. Final installation is project-specific." : "Product photography. Equipment details may vary by configuration."}
            </p>
          </div>
        </div>
        <div className={styles.resourceLine}>
          <p>Planning an installation?</p>
          <Link href="/products/moas/installation-planning">Open the MOAS planning guide <Arrow diagonal /></Link>
        </div>
      </div>
    </section>
  );
}
