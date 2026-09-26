"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { moasModel } from "@/lib/moas-model";
import styles from "./MoasModel.module.css";

const ModelViewer = dynamic(() => import("./MoasModelViewer"), {
  ssr: false,
  loading: () => <div className={styles.starting}><Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 1200px" className={styles.poster} /><div className={styles.loading} role="status">Starting 3D…</div></div>,
});

export function MoasModelStage({view, children}: {view: "exterior" | "interior"; children: ReactNode}) {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const launch = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const expand = useRef<HTMLButtonElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dismissPanel = useRef<(() => boolean) | null>(null);
  const wasActive = useRef(false);
  useEffect(() => {
    if (active) {
      stage.current?.scrollIntoView({block: 'start', behavior: 'instant'});
      back.current?.focus({preventScroll: true});
    }
    else if (wasActive.current) launch.current?.focus({preventScroll: true});
    wasActive.current = active;
  }, [active]);
  useEffect(()=>{if(!expanded)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous;};},[expanded]);
  return <div ref={stage} role={expanded?'dialog':undefined} aria-modal={expanded?true:undefined} aria-label={expanded?'MOAS interactive model':undefined} className={active ? `${styles.activeStage} ${expanded ? styles.expanded : ''}` : styles.inactiveStage} data-model-active={active} onKeyDown={event => {
    if (active && event.key === 'Escape') { event.preventDefault(); if(dismissPanel.current?.())return; if(expanded){setExpanded(false);expand.current?.focus({preventScroll:true});}else setActive(false); }
    if(expanded && event.key==='Tab') {
      const focusable=Array.from(stage.current?.querySelectorAll<HTMLElement>('button:not(:disabled), select:not(:disabled), input:not(:disabled), [tabindex="0"]') ?? []).filter(element=>element.getClientRects().length > 0 && !element.closest('[inert]'));
      const first=focusable?.[0], last=focusable?.[focusable.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
    }
  }}>
    {active ? <>
      <div className={styles.heading}><span>MOAS / INTERACTIVE 3D</span><div><button ref={expand} type="button" aria-pressed={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?'Reduce':'Expand'}</button><button ref={back} type="button" onClick={() => {setExpanded(false);setActive(false);}}>Back to images</button></div></div>
      <ModelViewer key={view} view={view} dismissPanelRef={dismissPanel} />
    </> : <>
      {children}
      <button ref={launch} type="button" className={styles.launch} onClick={() => setActive(true)}><span>Explore in 3D <span aria-hidden="true">↗</span></span><small>Open · explore · discover</small></button>
    </>}
  </div>;
}
