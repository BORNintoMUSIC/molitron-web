"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { moasModel } from "@/lib/moas-model";
import { moasComponents } from "@/lib/moas-components";
import { Viewer } from "./CabinetCanvas";
import { loadCabinet, disposeCabinet, type CabinetAsset } from "./model";
import styles from "./MoasModel.module.css";

export default function MoasModelViewer({view: initialView}: {view: "exterior" | "interior"}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{attempt: number; asset?: CabinetAsset; error?: string}>({attempt: -1});
  const [angle, setAngle] = useState(initialView === "interior" ? 120 : 0);
  const [lidOpen, setLidOpen] = useState(false);
  const [view, setView] = useState<"perspective" | "front">("perspective");
  const [reset, setReset] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [orbit, setOrbit] = useState(0);
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

  function resetView() { setAngle(initialView === "interior" ? 120 : 0); setLidOpen(false); setView("perspective"); setSelected(""); setZoom(0); setOrbit(0); setReset(n => n + 1); }
  function choose(partId: string, direct = false) {
    setSelected(partId); setZoom(0);
    if (direct && partId === 'main-door') setAngle(a=>a>0?0:120);
    else if (direct && partId === 'solution-lid') setLidOpen(v=>!v);
    else if (moasComponents.find(c=>c.id===partId)?.inside) setAngle(120);
  }
  const selection = moasComponents.find(part => part.id === selected);
  return <div className={styles.viewer}>
    <div className={styles.canvas} role="group" aria-label="Interactive MOAS model. Equivalent controls and component descriptions follow.">
      {asset ? <Viewer asset={asset} doorAngle={angle} lidOpen={lidOpen} orbit={orbit} selected={selected} hidden="" wireframe={false} view={view} reset={reset} zoom={zoom} onSelect={id=>choose(id,true)} /> :
        <><Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 900px" style={{objectFit:'contain'}} /><div className={styles.loading} role={error ? "alert" : "status"}>
          <p>{error || (progress>=99 ? 'Preparing the model…' : `Loading the model… ${progress}%`)}</p>
          {error && <button type="button" onClick={() => {setProgress(0);setAttempt(n => n + 1);}}>Retry 3D</button>}
        </div></>}
    </div>
    <aside className={styles.componentPanel} aria-label="Explore components">
      <label htmlFor={`${id}-component`}>Explore the system</label>
      <select id={`${id}-component`} value={selected} onChange={e=>choose(e.target.value)}>
        <option value="">Choose a component</option>
        {moasComponents.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <div className={styles.componentCard} aria-live="polite">
        <span className={styles.eyebrow}>{selection ? 'COMPONENT DETAIL' : 'EXPLORE MOAS'}</span>
        <h3>{selection?.name || 'A closer look inside'}</h3>
        <p>{selection?.description || 'Open the cabinet, slide the fill lid, or choose a component to learn about its role. Drag to orbit and pinch or scroll to zoom.'}</p>
      </div>
      <button className={styles.tour} type="button" onClick={()=>{const i=moasComponents.findIndex(c=>c.id===selected);choose(moasComponents[(i+1)%moasComponents.length].id);}}>Next component <span aria-hidden="true">→</span></button>
    </aside>
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button type="button" className={styles.door} disabled={!asset} aria-pressed={angle>0} onClick={() => {setSelected('');setAngle(a=>a>0?0:120);}}>{angle > 0 ? "Close door" : "Open door"}</button>
        <button type="button" disabled={!asset} aria-pressed={lidOpen} onClick={()=>{setSelected('');setLidOpen(v=>!v);}}>{lidOpen?'Close fill lid':'Slide fill lid'}</button>
        <button type="button" onClick={resetView}>Reset</button>
        <button type="button" disabled={!asset} onClick={() => setView(view === "front" ? "perspective" : "front")} aria-pressed={view === "front"}>Front view</button>
        <button type="button" aria-label="Rotate left" disabled={!asset} onClick={()=>setOrbit(v=>v-1)}>↶</button>
        <button type="button" aria-label="Rotate right" disabled={!asset} onClick={()=>setOrbit(v=>v+1)}>↷</button>
        <button type="button" aria-label="Zoom out" disabled={!asset || zoom <= -3} onClick={() => setZoom(n => n - 1)}>−</button>
        <button type="button" aria-label="Zoom in" disabled={!asset || zoom >= 4} onClick={() => setZoom(n => n + 1)}>+</button>
      </div>
      <div className={styles.angle}><label htmlFor={id}>Door</label><input id={id} disabled={!asset} aria-label="Door opening" type="range" min="0" max={moasModel.maxDoorDegrees} value={angle} onChange={event => {setSelected('');setAngle(Number(event.target.value));}} /><output htmlFor={id}>{angle}°</output></div>
      <p className={styles.note}>{moasModel.caption}</p>
    </div>
  </div>;
}
