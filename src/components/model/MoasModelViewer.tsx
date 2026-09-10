"use client";

import { useEffect, useId, useState } from "react";
import { moasModel } from "@/lib/moas-model";
import { Viewer } from "./CabinetCanvas";
import { loadCabinet, disposeCabinet, type CabinetAsset } from "./model";
import styles from "./MoasModel.module.css";

export default function MoasModelViewer({view: initialView}: {view: "exterior" | "interior"}) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<{attempt: number; asset?: CabinetAsset; error?: string}>({attempt: -1});
  const [angle, setAngle] = useState(initialView === "interior" ? 120 : 0);
  const [view, setView] = useState<"perspective" | "front">("perspective");
  const [reset, setReset] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [selected, setSelected] = useState("");
  const [hidden, setHidden] = useState("");
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
        const bytes = await response.arrayBuffer();
        if (!active) return;
        const next = await loadCabinet(new File([bytes], "moas-cabinet-v16.glb"));
        if (!active) { disposeCabinet(next.gltf.scene); return; }
        retained = next;
        setResult({attempt, asset: next});
      } catch (failure) {
        if (active) setResult({attempt, error: failure instanceof Error ? failure.message : "3D could not load."});
      }
    }
    void load();
    return () => { active = false; controller.abort(); if (retained) disposeCabinet(retained.gltf.scene); };
  }, [attempt]);

  function resetView() { setAngle(initialView === "interior" ? 120 : 0); setView("perspective"); setSelected(""); setHidden(""); setZoom(0); setReset(n => n + 1); }
  if (!asset) return <div className={styles.loading} role={error ? "alert" : "status"}>
    <p>{error || "Loading the cabinet…"}</p>
    {error && <button type="button" onClick={() => setAttempt(n => n + 1)}>Retry 3D</button>}
  </div>;

  const selection = asset.parts.find(part => part.id === selected);
  return <div className={styles.viewer}>
    <div className={styles.canvas} role="img" aria-label="Interactive unfinished MOAS cabinet. Use the buttons below to open the door, change view, and zoom.">
      <Viewer asset={asset} doorAngle={angle} selected={selected} hidden={hidden} wireframe={false} view={view} reset={reset} zoom={zoom} onSelect={setSelected} />
    </div>
    <div className={styles.controls}>
      <div className={styles.buttons}>
        <button type="button" className={styles.door} onClick={() => { setAngle(angle > 0 ? 0 : 120); setHidden(""); }}>{angle > 0 ? "Close door" : "Open door"}</button>
        <button type="button" onClick={() => setView(view === "front" ? "perspective" : "front")} aria-pressed={view === "front"}>Front view</button>
        <button type="button" onClick={resetView}>Reset</button>
        <button type="button" aria-label="Zoom out" disabled={zoom <= -3} onClick={() => setZoom(n => n - 1)}>−</button>
        <button type="button" aria-label="Zoom in" disabled={zoom >= 4} onClick={() => setZoom(n => n + 1)}>+</button>
      </div>
      <div className={styles.angle}><label htmlFor={id}>Door</label><input id={id} aria-label="Door opening" type="range" min="0" max={moasModel.maxDoorDegrees} value={angle} onChange={event => { setAngle(Number(event.target.value)); setHidden(""); }} /><output htmlFor={id}>{angle}°</output></div>
      <div className={styles.selection}><span aria-live="polite">{selection?.label || "Drag to orbit · pinch to zoom · click a part"}</span>{(selected || hidden) && <button type="button" onClick={() => setHidden(hidden ? "" : selected)}>{hidden ? "Restore part" : "Hide part"}</button>}</div>
      <p className={styles.note}>{moasModel.caption}</p>
    </div>
  </div>;
}
