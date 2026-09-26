import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE, PerspectiveCamera, TOUCH, Vector3 } from 'three';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import type { CabinetAsset } from './model';
import {
  assetCameraBounds, canonicalDirection, componentFocusDirection, fitCameraBounds, interpolateCameraPose, stepCameraPose,
  CAMERA_MAX_DISTANCE, CAMERA_MAX_POLAR, CAMERA_MIN_DISTANCE, CAMERA_MIN_POLAR,
  type CameraAction, type CameraPose,
} from './camera-math';

export type { CameraAction } from './camera-math';
export type NavigationMode = 'orbit' | 'pan';
export type CameraCommand = { id: number; action: CameraAction; partId?: string };

type ViewerCameraProps = {
  asset: CabinetAsset;
  command: CameraCommand | null;
  navigationMode: NavigationMode;
  doorAngle: number;
  lidOpen: boolean;
};

/** One camera/target pair for gestures and buttons; only explicit commands can reframe. */
export function ViewerCamera({ asset, command, navigationMode, doorAngle, lidOpen }: ViewerCameraProps) {
  const controls = useRef<OrbitControlsType>(null);
  const { camera, invalidate } = useThree();
  const destination = useRef<CameraPose | null>(null);
  const initializedAsset = useRef<CabinetAsset | null>(null);
  const handledCommand = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotion.current = media.matches;
      if (controls.current) controls.current.enableDamping = !media.matches && !destination.current;
      invalidate();
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [invalidate]);

  useEffect(() => {
    const orbit = controls.current;
    if (!orbit || !(camera instanceof PerspectiveCamera)) return;
    const initial = initializedAsset.current !== asset;
    // Door animations, selection highlights, resize and mode switches cannot issue camera moves.
    if (!initial && (!command || handledCommand.current === command.id)) return;
    initializedAsset.current = asset;
    handledCommand.current = command?.id ?? null;

    const current = destination.current ?? { position: camera.position.clone(), target: orbit.target.clone() };
    const action = initial ? 'reset' : command!.action;
    const fov = camera.getEffectiveFOV();
    let next: CameraPose;
    let framedBounds: ReturnType<typeof assetCameraBounds> | undefined;
    if (action === 'fit' || action === 'front' || action === 'reset' || action === 'focus') {
      const direction = action === 'fit' ? current.position.clone().sub(current.target)
        : action === 'focus' ? componentFocusDirection(command?.partId)
        : action === 'front' ? new Vector3(0, 0, 1)
        : canonicalDirection(doorAngle);
      framedBounds = assetCameraBounds(asset, doorAngle, lidOpen, action === 'focus' ? command?.partId : undefined);
      next = fitCameraBounds(framedBounds, direction, fov, camera.aspect, action === 'focus' ? 1.28 : 1.13);
    } else {
      next = stepCameraPose(current, action, fov, camera.aspect);
    }
    if (process.env.NODE_ENV === 'development') {
      console.info('MOAS camera command', JSON.stringify({
        action, id: command?.id ?? null, initial,
        current: { position: current.position.toArray(), target: current.target.toArray() },
        destination: { position: next.position.toArray(), target: next.target.toArray() },
        ...(framedBounds ? { bounds: { min: framedBounds.min.toArray(), max: framedBounds.max.toArray() } } : {}),
      }));
    }

    // Consume OrbitControls' private damping remainder without changing the visible pose.
    // Otherwise a button issued just after a drag would inherit an unwanted rotation or pan.
    const visiblePosition = camera.position.clone();
    const visibleTarget = orbit.target.clone();
    orbit.enableDamping = false;
    orbit.update();
    camera.position.copy(visiblePosition);
    orbit.target.copy(visibleTarget);
    orbit.update();

    if (initial || reducedMotion.current) {
      camera.position.copy(next.position);
      orbit.target.copy(next.target);
      orbit.update();
      destination.current = null;
      orbit.enableDamping = !reducedMotion.current;
    } else destination.current = next;
    invalidate();
  }, [asset, camera, command, doorAngle, lidOpen, invalidate]);

  useFrame((_, delta) => {
    const next = destination.current;
    const orbit = controls.current;
    if (!next || !orbit) return;
    const rate = reducedMotion.current ? 1 : 1 - Math.exp(-11 * Math.min(delta, 0.05));
    orbit.enableDamping = false;
    const eased = interpolateCameraPose({ position: camera.position, target: orbit.target }, next, rate);
    camera.position.copy(eased.position);
    orbit.target.copy(eased.target);
    const done = camera.position.distanceToSquared(next.position) < 0.00000025
      && orbit.target.distanceToSquared(next.target) < 0.00000025;
    if (done) {
      camera.position.copy(next.position);
      orbit.target.copy(next.target);
      destination.current = null;
    }
    orbit.update();
    if (done) orbit.enableDamping = !reducedMotion.current;
    else invalidate();
  });

  return <OrbitControls ref={controls} makeDefault
    onStart={() => {
      destination.current = null;
      if (controls.current) controls.current.enableDamping = !reducedMotion.current;
    }}
    enableDamping dampingFactor={0.14} rotateSpeed={0.65} zoomSpeed={0.55} panSpeed={0.8}
    enablePan screenSpacePanning
    minDistance={CAMERA_MIN_DISTANCE} maxDistance={CAMERA_MAX_DISTANCE}
    minPolarAngle={CAMERA_MIN_POLAR} maxPolarAngle={CAMERA_MAX_POLAR}
    mouseButtons={{ LEFT: navigationMode === 'pan' ? MOUSE.PAN : MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
    touches={{ ONE: navigationMode === 'pan' ? TOUCH.PAN : TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }} />;
}
