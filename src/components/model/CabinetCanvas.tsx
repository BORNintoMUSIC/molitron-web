import { Component, Suspense, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { Vector2 } from 'three';
import { ViewerCamera, type CameraCommand, type NavigationMode } from './ViewerCamera';
import { configureMaterials, type CabinetAsset } from './model';
import Image from 'next/image';
import { moasModel } from '@/lib/moas-model';
import styles from './MoasModel.module.css';

type ViewerProps = {
  asset: CabinetAsset;
  selected: string;
  hidden: string;
  wireframe: boolean;
  doorAngle: number;
  lidOpen: boolean;
  command: CameraCommand | null;
  navigationMode: NavigationMode;
  onSelect: (id: string) => void;
};

class ViewerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <CanvasFallback />;
    return this.props.children;
  }
}

function CanvasFallback() {
  return <div className={styles.canvasFallback}><Image src={moasModel.poster} alt={moasModel.posterAlt} fill sizes="(max-width: 767px) 90vw, 690px" style={{objectFit:'contain'}} /><p>3D could not start. You can return to images above and try again.</p></div>;
}

function Cabinet({ asset, selected, hidden, wireframe, doorAngle, lidOpen, onSelect }: ViewerProps) {
  const invalidate = useThree((state) => state.invalidate);
  // Three.js objects are an imperative renderer resource, kept behind a ref.
  const runtime = useRef(asset);
  useLayoutEffect(() => { runtime.current = asset; }, [asset]);
  const reducedMotion = useRef(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reducedMotion.current = media.matches; invalidate(); };
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [invalidate]);
  useEffect(() => { invalidate(); }, [doorAngle, lidOpen, invalidate]);
  useFrame((_, delta) => {
    const door = runtime.current.door;
    const lid = runtime.current.lid;
    const ease = reducedMotion.current ? 1 : 1 - Math.exp(-7 * Math.min(delta, 0.05));
    let moving = false;
    if (door) {
      const target = -doorAngle * Math.PI / 180;
      const difference = target - door.rotation.y;
      if (Math.abs(difference) > .00001) { door.rotation.y += Math.abs(difference) < .0001 ? difference : difference * ease; moving = true; }
    }
    if (lid) {
      const target = lidOpen ? .2143252 : 0;
      const difference = target - lid.position.z;
      if (Math.abs(difference) > .000001) { lid.position.z += Math.abs(difference) < .00001 ? difference : difference * ease; moving = true; }
    }
    if (moving) invalidate();
  });
  // Restore source materials before the owner's passive disposal on asset replacement.
  useLayoutEffect(() => {
    const restore = configureMaterials(asset, selected, wireframe);
    invalidate();
    return restore;
  }, [asset, selected, wireframe, invalidate]);

  useLayoutEffect(() => {
    const meshes = asset.meshes.filter(item => item.partId === hidden).map(item => ({object:item.object, visible:item.object.visible}));
    meshes.forEach(mesh => { mesh.object.visible = false; });
    invalidate();
    return () => { meshes.forEach(mesh => { mesh.object.visible = mesh.visible; }); };
  }, [asset, hidden, invalidate]);

  return <group position={[0, asset.size.y * asset.scale / 2 + 0.025, 0]} scale={asset.scale}>
    <group position={asset.center.clone().negate()}>
      <primitive object={asset.gltf.scene} dispose={null} onClick={(event: { stopPropagation: () => void; object: { uuid: string }; delta: number }) => {
        if (event.delta > 5) return;
        event.stopPropagation();
        onSelect(asset.meshes.find(mesh => mesh.id === event.object.uuid)?.partId ?? '');
      }} />
    </group>
  </group>;
}

function DevelopmentProfile({asset}:{asset:CabinetAsset}) {
  const samples=useRef<number[]>([]);
  const reported=useRef(false);
  useFrame(({gl},delta)=>{
    if(process.env.NODE_ENV!=='development' || reported.current)return;
    if(delta>0 && delta<.2)samples.current.push(delta*1000);
    if(samples.current.length===90){
      const sorted=samples.current.slice(10).sort((a,b)=>a-b);
      console.info('MOAS renderer sample',JSON.stringify({medianFrameMs:sorted[40],p95FrameMs:sorted[76],lastPassDrawCalls:gl.info.render.calls,lastPassTriangles:gl.info.render.triangles,geometryCount:gl.info.memory.geometries,textureCount:gl.info.memory.textures,parseMs:asset.parseMs,assetBytes:asset.bytes,viewport:gl.getSize(new Vector2()).toArray()}));
      reported.current=true;
    }
  });
  return null;
}

export function Viewer(props: ViewerProps) {
  const gesture = useRef({x: 0, y: 0, moved: false, pointers: new Set<number>()});
  useEffect(() => {
    const move = (event: PointerEvent) => {
      const state = gesture.current;
      if (state.pointers.size && Math.hypot(event.clientX-state.x, event.clientY-state.y) > 5) state.moved = true;
    };
    const end = (event: PointerEvent) => {gesture.current.pointers.delete(event.pointerId);};
    const cancel = () => {gesture.current.pointers.clear(); gesture.current.moved = true;};
    // OrbitControls continues drags outside the canvas; track the same lifetime.
    window.addEventListener('pointermove', move, {passive: true});
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', cancel);
    window.addEventListener('blur', cancel);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', cancel);
      window.removeEventListener('blur', cancel);
    };
  }, []);
  const select = (id: string) => { if (!gesture.current.moved) props.onSelect(id); };
  return <ViewerBoundary key={props.asset.gltf.scene.uuid}>
    <Canvas shadows frameloop="demand" dpr={[1, 1.5]} camera={{ fov: 38, near: 0.01, far: 100, position: [3.2, 2.7, 4.7] }}
      gl={{ antialias: true, alpha: true }} fallback={<CanvasFallback />}
      onPointerDownCapture={event => {
        const state = gesture.current;
        if (state.pointers.size === 0) {state.x = event.clientX; state.y = event.clientY; state.moved = false;}
        state.pointers.add(event.pointerId);
        if (state.pointers.size > 1) state.moved = true;
      }}
      onPointerUpCapture={event => gesture.current.pointers.delete(event.pointerId)}
      onPointerCancelCapture={event => {gesture.current.pointers.delete(event.pointerId);gesture.current.moved = true;}}
      onPointerMissed={() => select('')}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 5, 6]} intensity={1.8} castShadow
          shadow-mapSize={[1024, 1024]} shadow-camera-left={-3} shadow-camera-right={3}
          shadow-camera-top={4} shadow-camera-bottom={-3} shadow-camera-near={0.5} shadow-camera-far={16}
          shadow-bias={-0.00015} shadow-normalBias={0.008} shadow-radius={3} />
        <directionalLight position={[4, 2, 4]} intensity={0.5} />
        {/* Neutral studio reflections stay independent of the forest backdrop. */}
        <Environment resolution={256} frames={1} environmentIntensity={0.9}>
          <color attach="background" args={['#666b70']} />
          <Lightformer intensity={2.2} position={[1, 2, 5]} scale={[3, 6, 1]} />
          <Lightformer intensity={2.5} position={[-4, 3, 3]} rotation={[0, Math.PI / 4, 0]} scale={[3, 6, 1]} />
          <Lightformer intensity={2} position={[4, 2, 3]} rotation={[0, -Math.PI / 3, 0]} scale={[1.8, 5, 1]} />
          <Lightformer intensity={3} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 4, 1]} />
          <Lightformer intensity={1.5} position={[0, 2, -5]} rotation={[0, Math.PI, 0]} scale={[4, 5, 1]} />
        </Environment>
        <Cabinet {...props} onSelect={select} />
        <DevelopmentProfile asset={props.asset} />
        <ContactShadows position={[0,-.02,0]} opacity={.24} scale={9} blur={2.7} far={4} resolution={256} />
        <ViewerCamera {...props} />
      </Suspense>
    </Canvas>
  </ViewerBoundary>;
}
