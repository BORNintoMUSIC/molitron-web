import { Component, Suspense, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { Box3, Vector2, Vector3, type PerspectiveCamera } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
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
  orbit: number;
  view: 'perspective' | 'front';
  reset: number;
  zoom: number;
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

function Cameras({ asset, view, reset, zoom, doorAngle, selected, orbit }: Pick<ViewerProps, 'asset' | 'view' | 'reset' | 'zoom' | 'doorAngle' | 'selected' | 'orbit'>) {
  const controls = useRef<OrbitControlsType>(null);
  const { camera, invalidate, size } = useThree();
  const destination = useRef<{position: Vector3; target: Vector3} | null>(null);
  useEffect(() => {
    const box = doorAngle > 0 ? asset.frameBox.clone() : new Box3().setFromCenterAndSize(asset.center, asset.size);
    if (selected && selected !== 'main-door' && selected !== 'cabinet') {
      const partBox = new Box3();
      asset.gltf.scene.updateMatrixWorld(true);
      asset.meshes.filter(m => m.partId === selected).forEach(m => partBox.expandByObject(m.object));
      partBox.applyMatrix4(asset.gltf.scene.matrixWorld.clone().invert());
      if (!partBox.isEmpty()) box.copy(partBox).expandByScalar(.12);
    }
    const target = box.getCenter(new Vector3()).sub(asset.center).multiplyScalar(asset.scale);
    target.y += asset.size.y * asset.scale / 2 + 0.025;
    const half = box.getSize(new Vector3()).multiplyScalar(asset.scale / 2);
    const direction = (view === 'front' ? new Vector3(0,0,1) : new Vector3(3.2,1.2,4.7)).normalize();
    direction.applyAxisAngle(new Vector3(0,1,0), orbit * Math.PI / 6);
    const right = new Vector3(0,1,0).cross(direction).normalize();
    const up = direction.clone().cross(right);
    const tanV = Math.tan((camera as PerspectiveCamera).fov * Math.PI / 360);
    const tanH = tanV * size.width / size.height;
    let distance = 0;
    for (const x of [-1,1]) for (const y of [-1,1]) for (const z of [-1,1]) {
      const corner = new Vector3(x*half.x,y*half.y,z*half.z);
      distance = Math.max(distance, corner.dot(direction) + Math.abs(corner.dot(right))/tanH, corner.dot(direction) + Math.abs(corner.dot(up))/tanV);
    }
    destination.current = {position:target.clone().addScaledVector(direction, Math.max(1.2,distance*1.12*Math.exp(-zoom*.15))),target};
    invalidate();
  }, [asset, camera, invalidate, view, reset, zoom, selected, doorAngle, orbit, size.width, size.height]);
  useFrame((_,delta)=>{
    const d=destination.current;if(!d || !controls.current)return;
    const rate=matchMedia('(prefers-reduced-motion: reduce)').matches?1:1-Math.exp(-7*Math.min(delta,.05));
    camera.position.lerp(d.position,rate);controls.current.target.lerp(d.target,rate);controls.current.update();
    if(camera.position.distanceTo(d.position)<.001 && controls.current.target.distanceTo(d.target)<.001)destination.current=null;
    else invalidate();
  });
  return <OrbitControls ref={controls} makeDefault onStart={()=>{destination.current=null;}} enableDamping={false} enablePan={false} minDistance={1.2} maxDistance={15} maxPolarAngle={Math.PI * 0.85} />;
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
  return <ViewerBoundary key={props.asset.gltf.scene.uuid}>
    <Canvas shadows frameloop="demand" dpr={[1, 1.5]} camera={{ fov: 38, near: 0.01, far: 100, position: [3.2, 2.7, 4.7] }}
      gl={{ antialias: true, alpha: true }} fallback={<CanvasFallback />}
      onPointerMissed={() => props.onSelect('')}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 6, 4]} intensity={1.5} />
        <Environment resolution={256} frames={1}>
          <color attach="background" args={['#777d83']} />
          <Lightformer intensity={2} position={[0, 2, 5]} scale={[6, 7, 1]} />
          <Lightformer intensity={4} position={[-4, 4, 3]} rotation={[0, Math.PI / 4, 0]} scale={[3, 7, 1]} />
          <Lightformer intensity={3} position={[4, 2, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 6, 1]} />
          <Lightformer intensity={2} position={[0, 5, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 4, 1]} />
        </Environment>
        <Cabinet {...props} />
        <DevelopmentProfile asset={props.asset} />
        <ContactShadows position={[0,-.02,0]} opacity={.3} scale={9} blur={2.7} far={4} resolution={256} />
        <Cameras {...props} />
      </Suspense>
    </Canvas>
  </ViewerBoundary>;
}
