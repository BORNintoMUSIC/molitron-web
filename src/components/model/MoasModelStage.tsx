"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { moasModel } from "@/lib/moas-model";
import styles from "./MoasModel.module.css";

const ModelViewer = dynamic(() => import("./MoasModelViewer"), {
  ssr: false,
  loading: () => <div className={styles.loading} role="status">Starting 3D…</div>,
});

export function MoasModelStage({view, children}: {view: "exterior" | "interior"; children: ReactNode}) {
  const [active, setActive] = useState(false);
  const launch = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const wasActive = useRef(false);
  useEffect(() => {
    if (active) back.current?.focus({preventScroll: true});
    else if (wasActive.current) launch.current?.focus({preventScroll: true});
    wasActive.current = active;
  }, [active]);
  return <div className={active ? styles.activeStage : styles.inactiveStage} data-model-active={active} onKeyDown={event => { if (active && event.key === "Escape") { event.preventDefault(); setActive(false); } }}>
    {active ? <>
      <Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 690px" className={styles.poster} />
      <ModelViewer key={view} view={view} />
      <div className={styles.heading}><span>MOAS / 3D FIRST DRAFT</span><button ref={back} type="button" onClick={() => setActive(false)}>Back to images</button></div>
    </> : <>
      {children}
      <button ref={launch} type="button" className={styles.launch} onClick={() => setActive(true)}><span>Explore in 3D <span aria-hidden="true">↗</span></span><small>First draft · 7 MB</small></button>
    </>}
  </div>;
}
