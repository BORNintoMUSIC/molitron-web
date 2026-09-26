"use client";

import { useCallback, useEffect, useId, useImperativeHandle, useRef, useState, type KeyboardEvent, type Ref } from "react";
import Image from "next/image";
import { moasModel } from "@/lib/moas-model";
import { moasComponents } from "@/lib/moas-components";
import { Viewer } from "./CabinetCanvas";
import { loadCabinet, disposeCabinet, type CabinetAsset } from "./model";
import type { CameraAction, CameraCommand, NavigationMode } from "./ViewerCamera";
import styles from "./MoasModel.module.css";

export default function MoasModelViewer({view: initialView, dismissPanelRef}: {view: "exterior" | "interior"; dismissPanelRef: Ref<() => boolean>}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{attempt: number; asset?: CabinetAsset; error?: string}>({attempt: -1});
  const [angle, setAngle] = useState(initialView === "interior" ? 120 : 0);
  const [lidOpen, setLidOpen] = useState(false);
  const [command, setCommand] = useState<CameraCommand | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>("orbit");
  const [selected, setSelected] = useState("");
  const [progress, setProgress] = useState(0);
  const [rendererFailed, setRendererFailed] = useState(false);
  const [exploration, setExploration] = useState<'whole' | 'inside' | 'components'>(initialView === 'interior' ? 'inside' : 'whole');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const componentsButton = useRef<HTMLButtonElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);
  const helpButton = useRef<HTMLButtonElement>(null);
  const componentPicker = useRef<HTMLSelectElement>(null);
  const focusDetails = useRef(false);
  const id = useId();
  const asset = result.attempt === attempt ? result.asset : undefined;
  const error = result.attempt === attempt ? result.error : undefined;
  const ready = !!asset && !rendererFailed;
  const onUnavailable = useCallback(() => setRendererFailed(true), []);
  function retry() { setRendererFailed(false); setProgress(0); setAttempt(n => n + 1); }

  useImperativeHandle(dismissPanelRef, () => () => {
    if (helpOpen) { setHelpOpen(false); helpButton.current?.focus(); }
    else if (moreOpen) { setMoreOpen(false); moreButton.current?.focus(); }
    else if (detailsOpen) { setDetailsOpen(false); componentsButton.current?.focus({preventScroll: true}); }
    else return false;
    return true;
  }, [helpOpen, moreOpen, detailsOpen]);

  useEffect(() => {
    if (detailsOpen && focusDetails.current) {
      componentPicker.current?.focus({preventScroll: true});
      focusDetails.current = false;
    }
  }, [detailsOpen]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let retained: CabinetAsset | undefined;
    async function load() {
      try {
        const response = await fetch(moasModel.src, {signal: controller.signal});
        if (!response.ok) throw new Error("The 3D model could not be downloaded.");
        const total = Number(response.headers.get('content-length')) || moasModel.bytes;
        const reader = response.body?.getReader();
        const chunks: Uint8Array<ArrayBuffer>[] = [];
        let received = 0;
        if (reader) {
          while (true) {
            const {done,value} = await reader.read(); if (done) break;
            chunks.push(new Uint8Array(value)); received += value.length;
            if (active) setProgress(Math.min(99,Math.round(received/total*100)));
          }
        } else chunks.push(new Uint8Array(await response.arrayBuffer()));
        if (!active) return;
        const next = await loadCabinet(new File(chunks, "moas-cabinet-v32.glb"));
        if (!active) { disposeCabinet(next.gltf.scene); return; }
        retained = next; setResult({attempt, asset: next});
      } catch (failure) {
        if (active) setResult({attempt, error: failure instanceof Error ? failure.message : "3D could not load."});
      }
    }
    void load();
    return () => { active = false; controller.abort(); if (retained) disposeCabinet(retained.gltf.scene); };
  }, [attempt]);

  function navigate(action: CameraAction, partId?: string) {
    setCommand(previous => ({id: (previous?.id ?? 0) + 1, action, partId}));
  }
  function resetView() {
    setAngle(initialView === "interior" ? 120 : 0);
    setLidOpen(false); setSelected(""); setNavigationMode("orbit"); setExploration(initialView === 'interior' ? 'inside' : 'whole'); setDetailsOpen(false); navigate("reset");
  }
  function overview(inside: boolean) {
    setAngle(inside ? 120 : 0); setSelected(""); setExploration(inside ? 'inside' : 'whole'); setDetailsOpen(false);
    navigate("reset");
  }
  function dismissDetails() {
    setDetailsOpen(false);
    componentsButton.current?.focus({preventScroll: true});
  }
  function choose(partId: string, direct = false) {
    setSelected(partId);
    if (direct && partId === 'main-door') setAngle(a=>a>0?0:120);
    else if (direct && partId === 'solution-lid') setLidOpen(v=>!v);
    else if (partId) {
      setExploration('components'); setDetailsOpen(true);
      if (moasComponents.find(c=>c.id===partId)?.inside) setAngle(120);
      navigate('focus', partId);
    }
  }
  function keyboardNavigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!ready || event.altKey || event.ctrlKey || event.metaKey) return;
    const directions: Record<string, 'left' | 'right' | 'up' | 'down'> = {ArrowLeft:'left', ArrowRight:'right', ArrowUp:'up', ArrowDown:'down'};
    const direction = directions[event.key];
    const action = direction ? `${event.shiftKey || navigationMode === 'pan' ? 'pan' : 'rotate'}-${direction}` as CameraAction
      : event.key === '+' || event.key === '=' ? 'zoom-in'
      : event.key === '-' || event.key === '_' ? 'zoom-out'
      : event.key.toLowerCase() === 'f' ? 'fit' : undefined;
    if (action) {event.preventDefault(); navigate(action);}
  }
  const selection = moasComponents.find(part => part.id === selected);
  return <div className={styles.viewer}>
    <div className={styles.exploreBar}>
      <div className={styles.views} role="group" aria-label="Explore MOAS">
        <button type="button" aria-pressed={exploration === 'whole'} onClick={()=>overview(false)}>Whole system</button>
        <button type="button" aria-pressed={exploration === 'inside'} onClick={()=>overview(true)}>Inside</button>
        <button ref={componentsButton} type="button" aria-pressed={exploration === 'components'} aria-expanded={detailsOpen} aria-controls={`${id}-details`} onClick={event=>{focusDetails.current = event.detail === 0;setExploration('components');setDetailsOpen(true);if(detailsOpen && focusDetails.current)componentPicker.current?.focus({preventScroll:true});}}>Components</button>
      </div>
      <p>{exploration === 'components' ? 'Choose a part. Take a closer look.' : exploration === 'inside' ? 'Discover what’s inside.' : 'Meet the system. Explore every detail.'}</p>
    </div>
    <div className={`${styles.workspace} ${detailsOpen ? styles.withDetails : ''}`}>
      <div className={styles.canvas} role="group" tabIndex={ready ? 0 : -1} aria-label="Interactive MOAS model" aria-describedby={`${id}-gestures ${id}-keyboard`} onKeyDown={keyboardNavigate}>
        {asset ? <Viewer asset={asset} doorAngle={angle} lidOpen={lidOpen} command={command} navigationMode={navigationMode} selected={selected} hidden="" wireframe={false} onSelect={id=>choose(id,true)} onUnavailable={onUnavailable} onRetry={retry} /> :
          <><Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 900px" style={{objectFit:'contain'}} /><div className={styles.loading} role={error ? "alert" : "status"}>
            <p>{error || (progress>=99 ? 'Preparing the model…' : `Loading the model… ${progress}%`)}</p>
            {error && <button type="button" onClick={retry}>Retry 3D</button>}
          </div></>}
      </div>
      {detailsOpen && <aside id={`${id}-details`} className={styles.componentPanel} aria-label="Component details">
        <div className={styles.panelHeading}><span className={styles.eyebrow}>COMPONENT EXPLORER</span><div><button type="button" className={styles.sheetToggle} aria-expanded={detailsExpanded} aria-controls={`${id}-description`} onClick={()=>setDetailsExpanded(v=>!v)}>{detailsExpanded ? 'Less' : 'More detail'}</button><button type="button" aria-label="Close component details" onClick={dismissDetails}>×</button></div></div>
        <label className={styles.srOnly} htmlFor={`${id}-component`}>Choose a component</label>
        <select ref={componentPicker} id={`${id}-component`} value={selected} onChange={e=>choose(e.target.value)}>
          <option value="">Choose a component</option>
          {moasComponents.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div id={`${id}-description`} className={styles.componentCard} aria-live="polite">
          <p className={!detailsExpanded ? styles.concise : undefined}>{selection?.description || 'Choose from the list or select a part on the model. Inside components open the cabinet and bring you closer.'}</p>
        </div>
        <div className={styles.componentActions}>
          <button type="button" onClick={()=>{const i=moasComponents.findIndex(c=>c.id===selected);choose(moasComponents[(i+1)%moasComponents.length].id);}}>Next component <span aria-hidden="true">→</span></button>
          <button type="button" onClick={()=>{overview(false);componentsButton.current?.focus({preventScroll:true});}}>Back to whole system</button>
          {(selected === 'solution-lid' || selected === 'solution-container') && <button type="button" disabled={!ready} aria-pressed={lidOpen} onClick={()=>setLidOpen(v=>!v)}>{lidOpen ? 'Close fill lid' : 'Slide fill lid'}</button>}
        </div>
      </aside>}
    </div>
    <div className={styles.controls}>
      <div className={styles.primaryAction}>
        <button type="button" className={styles.door} disabled={!ready} aria-pressed={angle>0} onClick={() => {setSelected('');setAngle(a=>a>0?0:120);}}>{angle > 0 ? 'Close cabinet' : 'Open cabinet'} <span aria-hidden="true">{angle > 0 ? '−' : '+'}</span></button>
      </div>
      <div className={styles.navigation} aria-label="Camera controls" role="group">
        <div className={styles.mode} role="group" aria-label="Drag mode">
          <button type="button" disabled={!ready} aria-pressed={navigationMode==='orbit'} onClick={()=>setNavigationMode('orbit')}>Rotate</button>
          <button type="button" disabled={!ready} aria-pressed={navigationMode==='pan'} onClick={()=>setNavigationMode('pan')}>Pan</button>
        </div>
        <div className={styles.nudges} role="group" aria-label="Zoom">
          <button type="button" aria-label="Zoom out" title="Zoom out" disabled={!ready} onClick={()=>navigate('zoom-out')}>−</button>
          <button type="button" aria-label="Zoom in" title="Zoom in" disabled={!ready} onClick={()=>navigate('zoom-in')}>+</button>
        </div>
        <button type="button" disabled={!ready} onClick={()=>navigate('fit')}>Fit view</button>
        <button ref={moreButton} type="button" aria-expanded={moreOpen} aria-controls={`${id}-more`} onClick={()=>{setMoreOpen(v=>!v);setHelpOpen(false);}}>More controls</button>
      </div>
      <div className={styles.hintRow}><p className={styles.gestures} id={`${id}-gestures`}>Drag to {navigationMode==='pan'?'pan':'rotate'} · Pinch or scroll to zoom</p><button ref={helpButton} type="button" aria-expanded={helpOpen} aria-controls={`${id}-help`} onClick={()=>{setHelpOpen(v=>!v);setMoreOpen(false);}}>Help</button></div>
      <p className={styles.srOnly} id={`${id}-keyboard`}>When the model is focused, use arrow keys to {navigationMode==='pan'?'pan':'rotate'}, Shift and arrows to pan, plus or minus to zoom, and F to fit the whole system.</p>
      {helpOpen && <div id={`${id}-help`} className={styles.secondaryPanel}><h3>Explore your way</h3><p>Drag to rotate, or choose Pan to move across the screen. Two fingers or right-drag also pan. Pinch or scroll to zoom.</p><p>With the model focused: arrow keys rotate or pan, Shift + arrows pan, + / − zoom, and F fits the system. More controls includes direction buttons. Escape closes panels before leaving the viewer.</p><p>Inside and Whole system compose a new view. Cabinet and fill-lid controls keep your camera in place.</p><p>{moasModel.caption}</p></div>}
      {moreOpen && <div id={`${id}-more`} className={styles.secondaryPanel}>
        <h3>Camera &amp; cabinet</h3>
        <div className={styles.precisionRow}><span>{navigationMode==='pan'?'Move model':'Rotate model'}</span><div className={styles.nudges} role="group" aria-label="Direction controls">
          {(['left','right','up','down'] as const).map((direction,index)=><button key={direction} type="button" disabled={!ready} aria-label={`${navigationMode==='pan'?'Move':'Rotate'} ${direction}`} onClick={()=>navigate(`${navigationMode==='pan'?'pan':'rotate'}-${direction}`)}>{['←','→','↑','↓'][index]}</button>)}
        </div></div>
        <div className={styles.angle}><label htmlFor={id}>Door angle</label><input id={id} disabled={!ready} aria-label="Door opening" type="range" min="0" max={moasModel.maxDoorDegrees} value={angle} onChange={event => {setSelected('');setAngle(Number(event.target.value));}} /><output htmlFor={id}>{angle}°</output></div>
        <div className={styles.precisionRow}>
          <button type="button" disabled={!ready} onClick={()=>navigate('front')}>Front view</button>
          {selection && <button type="button" disabled={!ready} onClick={()=>navigate('focus',selected)}>Focus component</button>}
          <button type="button" disabled={!ready} aria-pressed={lidOpen} onClick={()=>setLidOpen(v=>!v)}>{lidOpen?'Close fill lid':'Slide fill lid'}</button>
          <button type="button" disabled={!ready} onClick={resetView}>Reset all</button>
        </div>
        <p>Reset all restores the starting view, mechanisms and selection.</p>
      </div>}
      <p className={styles.note}>{moasModel.caption}</p>
    </div>
  </div>;
}
