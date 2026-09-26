"use client";

import { useEffect, useId, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { moasModel } from "@/lib/moas-model";
import { moasComponents } from "@/lib/moas-components";
import { Viewer } from "./CabinetCanvas";
import { loadCabinet, disposeCabinet, type CabinetAsset } from "./model";
import type { CameraAction, CameraCommand, NavigationMode } from "./ViewerCamera";
import styles from "./MoasModel.module.css";

export default function MoasModelViewer({view: initialView}: {view: "exterior" | "interior"}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{attempt: number; asset?: CabinetAsset; error?: string}>({attempt: -1});
  const [angle, setAngle] = useState(initialView === "interior" ? 120 : 0);
  const [lidOpen, setLidOpen] = useState(false);
  const [command, setCommand] = useState<CameraCommand | null>(null);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>("orbit");
  const [selected, setSelected] = useState("");
  const [progress, setProgress] = useState(0);
  const id = useId();
  const asset = result.attempt === attempt ? result.asset : undefined;
  const error = result.attempt === attempt ? result.error : undefined;

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
    setLidOpen(false); setSelected(""); setNavigationMode("orbit"); navigate("reset");
  }
  function choose(partId: string, direct = false) {
    setSelected(partId);
    if (direct && partId === 'main-door') setAngle(a=>a>0?0:120);
    else if (direct && partId === 'solution-lid') setLidOpen(v=>!v);
    else if (partId) {
      if (moasComponents.find(c=>c.id===partId)?.inside) setAngle(120);
      navigate('focus', partId);
    }
  }
  function keyboardNavigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!asset || event.altKey || event.ctrlKey || event.metaKey) return;
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
    <div className={styles.canvas} role="group" tabIndex={asset ? 0 : -1} aria-label="Interactive MOAS model" aria-describedby={`${id}-gestures ${id}-keyboard`} onKeyDown={keyboardNavigate}>
      {asset ? <Viewer asset={asset} doorAngle={angle} lidOpen={lidOpen} command={command} navigationMode={navigationMode} selected={selected} hidden="" wireframe={false} onSelect={id=>choose(id,true)} /> :
        <><Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 900px" style={{objectFit:'contain'}} /><div className={styles.loading} role={error ? "alert" : "status"}>
          <p>{error || (progress>=99 ? 'Preparing the model…' : `Loading the model… ${progress}%`)}</p>
          {error && <button type="button" onClick={() => {setProgress(0);setAttempt(n => n + 1);}}>Retry 3D</button>}
        </div></>}
    </div>
    <aside className={styles.componentPanel} aria-label="Explore components">
      <label htmlFor={`${id}-component`}>Explore the system</label>
      <select id={`${id}-component`} disabled={!asset && !error} value={selected} onChange={e=>choose(e.target.value)}>
        <option value="">Choose a component</option>
        {moasComponents.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <div className={styles.componentCard} aria-live="polite">
        <span className={styles.eyebrow}>{selection ? 'COMPONENT DETAIL' : 'EXPLORE MOAS'}</span>
        <h3>{selection?.name || 'A closer look inside'}</h3>
        <p>{selection?.description || 'Open the cabinet, slide the fill lid, or choose a component for a closer look. Use Pan to move the model across the screen without turning it.'}</p>
      </div>
      <div className={styles.componentActions}>
        {selection && <button type="button" disabled={!asset} onClick={()=>navigate('focus',selected)}>Focus component</button>}
        <button type="button" disabled={!asset && !error} onClick={()=>{const i=moasComponents.findIndex(c=>c.id===selected);choose(moasComponents[(i+1)%moasComponents.length].id);}}>Next component <span aria-hidden="true">→</span></button>
      </div>
    </aside>
    <div className={styles.controls}>
      <div className={styles.navigation} aria-label="View controls" role="group">
        <div className={styles.mode} role="group" aria-label="Drag mode">
          <button type="button" disabled={!asset} aria-pressed={navigationMode==='orbit'} onClick={()=>setNavigationMode('orbit')}>Rotate</button>
          <button type="button" disabled={!asset} aria-pressed={navigationMode==='pan'} onClick={()=>setNavigationMode('pan')}>Pan</button>
        </div>
        <div className={styles.nudges} role="group" aria-label={navigationMode==='pan'?'Move model':'Rotate model'}>
          {(['left','right','up','down'] as const).map((direction,index)=><button key={direction} type="button" disabled={!asset} aria-label={`${navigationMode==='pan'?'Move':'Rotate'} ${direction}`} title={`${navigationMode==='pan'?'Move':'Rotate'} ${direction}`} onClick={()=>navigate(`${navigationMode==='pan'?'pan':'rotate'}-${direction}`)}>{['←','→','↑','↓'][index]}</button>)}
        </div>
        <div className={styles.nudges} role="group" aria-label="Zoom">
          <button type="button" aria-label="Zoom out" title="Zoom out" disabled={!asset} onClick={()=>navigate('zoom-out')}>−</button>
          <button type="button" aria-label="Zoom in" title="Zoom in" disabled={!asset} onClick={()=>navigate('zoom-in')}>+</button>
        </div>
        <button type="button" disabled={!asset} onClick={()=>navigate('fit')}>Fit view</button>
        <button type="button" disabled={!asset} onClick={()=>navigate('front')}>Front</button>
        <button type="button" disabled={!asset} onClick={resetView}>Reset</button>
      </div>
      <p className={styles.gestures} id={`${id}-gestures`}>Drag to {navigationMode==='pan'?'pan':'rotate'} · Scroll or pinch to zoom · Two fingers or right-drag to pan</p>
      <p className={styles.srOnly} id={`${id}-keyboard`}>When the model is focused, use arrow keys to {navigationMode==='pan'?'pan':'rotate'}, Shift and arrows to pan, plus or minus to zoom, and F to fit the whole system.</p>
      <div className={styles.mechanisms}>
      <div className={styles.buttons}>
        <button type="button" className={styles.door} disabled={!asset} aria-pressed={angle>0} onClick={() => {setSelected('');setAngle(a=>a>0?0:120);}}>{angle > 0 ? "Close door" : "Open door"}</button>
        <button type="button" disabled={!asset} aria-pressed={lidOpen} onClick={()=>{setSelected('');setLidOpen(v=>!v);}}>{lidOpen?'Close fill lid':'Slide fill lid'}</button>
      </div>
      <div className={styles.angle}><label htmlFor={id}>Door</label><input id={id} disabled={!asset} aria-label="Door opening" type="range" min="0" max={moasModel.maxDoorDegrees} value={angle} onChange={event => {setSelected('');setAngle(Number(event.target.value));}} /><output htmlFor={id}>{angle}°</output></div>
      </div>
      <p className={styles.note}>{moasModel.caption}</p>
    </div>
  </div>;
}
