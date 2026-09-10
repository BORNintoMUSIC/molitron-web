import { Component, Suspense, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { Vector3, type PerspectiveCamera } from 'three';
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

function Cabinet({ asset, selected, hidden, wireframe, doorAngle, onSelect }: ViewerProps) {
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
  useEffect(() => { invalidate(); }, [doorAngle, invalidate]);
  useFrame((_, delta) => {
    const door = runtime.current.door;
    if (!door) return;
    const target = -doorAngle * Math.PI / 180;
    const difference = target - door.rotation.y;
    if (Math.abs(difference) < 0.0001) return;
    door.rotation.y = reducedMotion.current || Math.abs(difference) < 0.001
      ? target : door.rotation.y + difference * (1 - Math.exp(-6 * Math.min(delta, 0.05)));
    invalidate();
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

function Cameras({ asset, view, reset, zoom }: Pick<ViewerProps, 'asset' | 'view' | 'reset' | 'zoom'>) {
  const controls = useRef<OrbitControlsType>(null);
  const { camera, invalidate, size } = useThree();
  useEffect(() => {
    const target = asset.frameBox.getCenter(new Vector3()).sub(asset.center).multiplyScalar(asset.scale);
    target.y += asset.size.y * asset.scale / 2 + 0.025;
    const half = asset.frameBox.getSize(new Vector3()).multiplyScalar(asset.scale / 2);
    const direction = (view === 'front' ? new Vector3(0,0,1) : new Vector3(3.2,1.2,4.7)).normalize();
    const right = new Vector3(0,1,0).cross(direction).normalize();
    const up = direction.clone().cross(right);
    const tanV = Math.tan((camera as PerspectiveCamera).fov * Math.PI / 360);
    const tanH = tanV * size.width / size.height;
    let distance = 0;
    for (const x of [-1,1]) for (const y of [-1,1]) for (const z of [-1,1]) {
      const corner = new Vector3(x*half.x,y*half.y,z*half.z);
      distance = Math.max(distance, corner.dot(direction) + Math.abs(corner.dot(right))/tanH, corner.dot(direction) + Math.abs(corner.dot(up))/tanV);
    }
    camera.position.copy(target).addScaledVector(direction, distance*1.18*Math.exp(-zoom*.15));
    controls.current?.target.copy(target);
    controls.current?.update();
    invalidate();
  }, [asset, camera, invalidate, view, reset, zoom, size.width, size.height]);
  return <OrbitControls ref={controls} makeDefault enableDamping={false} enablePan={false} minDistance={1.2} maxDistance={15} maxPolarAngle={Math.PI * 0.53} />;
}

export function Viewer(props: ViewerProps) {
  return <ViewerBoundary key={props.asset.gltf.scene.uuid}>
    <Canvas shadows frameloop="demand" dpr={[1, 1.5]} camera={{ fov: 38, near: 0.01, far: 100, position: [3.2, 2.7, 4.7] }}
      gl={{ antialias: true, alpha: true }} fallback={<CanvasFallback />}
      onPointerMissed={() => props.onSelect('')}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 6, 4]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={5} shadow-camera-bottom={-4} shadow-normalBias={0.025} />
        <Environment resolution={128} frames={1}>
          <color attach="background" args={['#899395']} />
          <Lightformer intensity={2} position={[0, 2, 5]} scale={[4, 5, 1]} />
          <Lightformer intensity={4} position={[-4, 4, 3]} rotation={[0, Math.PI / 4, 0]} scale={[3, 6, 1]} />
          <Lightformer intensity={3} position={[4, 2, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 5, 1]} />
          <Lightformer intensity={2} position={[0, 5, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 3, 1]} />
        </Environment>
        <Cabinet {...props} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <shadowMaterial transparent opacity={0.22} />
        </mesh>
        <Cameras asset={props.asset} view={props.view} reset={props.reset} zoom={props.zoom} />
      </Suspense>
    </Canvas>
  </ViewerBoundary>;
}
