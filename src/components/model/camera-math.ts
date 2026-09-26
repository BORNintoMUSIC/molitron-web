import { Box3, MathUtils, Spherical, Vector3 } from 'three';
import type { CabinetAsset } from './model';

export type CameraAction = 'fit' | 'front' | 'reset' | 'focus'
  | 'zoom-in' | 'zoom-out'
  | 'rotate-left' | 'rotate-right' | 'rotate-up' | 'rotate-down'
  | 'pan-left' | 'pan-right' | 'pan-up' | 'pan-down';

export type CameraPose = { position: Vector3; target: Vector3 };

export const CAMERA_MIN_DISTANCE = 0.18;
export const CAMERA_MAX_DISTANCE = 24;
export const CAMERA_MIN_POLAR = 0.06;
export const CAMERA_MAX_POLAR = Math.PI * 0.85;

const WORLD_UP = new Vector3(0, 1, 0);

export function canonicalDirection(doorAngle: number) {
  return (doorAngle > 0 ? new Vector3(0.8, 0.5, 5) : new Vector3(3.2, 1.2, 4.7)).normalize();
}

export function componentFocusDirection(partId?: string) {
  // The horizontal fan guard is obscured by the cabinet edge when viewed straight on.
  return (partId === 'fan' ? new Vector3(0.4, -0.35, 1) : new Vector3(0, 0, 1)).normalize();
}

/** Measure the requested mechanism pose without changing its live animation. */
export function assetCameraBounds(asset: CabinetAsset, doorAngle: number, lidOpen: boolean, partId?: string) {
  const previousAngle = asset.door?.rotation.y;
  const previousLidPosition = asset.lid?.position.z;
  try {
    if (asset.door) asset.door.rotation.y = -MathUtils.degToRad(doorAngle);
    if (asset.lid) asset.lid.position.z = lidOpen ? 0.2143252 : 0;
    asset.gltf.scene.updateWorldMatrix(true, true);
    const box = new Box3();
    if (partId) {
      asset.meshes.filter(mesh => mesh.partId === partId).forEach(mesh => box.expandByObject(mesh.object));
    }
    if (box.isEmpty()) box.setFromObject(asset.gltf.scene);
    return box;
  } finally {
    if (asset.door && previousAngle !== undefined) asset.door.rotation.y = previousAngle;
    if (asset.lid && previousLidPosition !== undefined) asset.lid.position.z = previousLidPosition;
    asset.gltf.scene.updateWorldMatrix(true, true);
  }
}

/** Fit every box corner, including depth, within the perspective frustum. */
export function fitCameraBounds(box: Box3, direction: Vector3, fov: number, aspect: number, padding = 1.13): CameraPose {
  const target = box.getCenter(new Vector3());
  const half = box.getSize(new Vector3()).multiplyScalar(0.5);
  const outward = direction.clone().normalize();
  if (outward.lengthSq() === 0) outward.set(0, 0, 1);
  const right = WORLD_UP.clone().cross(outward).normalize();
  if (right.lengthSq() < 0.000001) right.set(1, 0, 0);
  const up = outward.clone().cross(right).normalize();
  const tanV = Math.tan(MathUtils.degToRad(fov) / 2);
  const tanH = tanV * Math.max(aspect, 0.01);
  let distance = CAMERA_MIN_DISTANCE;
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) {
    const corner = new Vector3(x * half.x, y * half.y, z * half.z);
    const depth = corner.dot(outward);
    distance = Math.max(distance,
      depth + Math.abs(corner.dot(right)) * padding / tanH,
      depth + Math.abs(corner.dot(up)) * padding / tanV);
  }
  return { position: target.clone().addScaledVector(outward, Math.min(distance, CAMERA_MAX_DISTANCE)), target };
}

/** Ease around the orbit target, so switching from the rear cannot fly through the model. */
export function interpolateCameraPose(current: CameraPose, destination: CameraPose, rate: number): CameraPose {
  const from = new Spherical().setFromVector3(current.position.clone().sub(current.target));
  const to = new Spherical().setFromVector3(destination.position.clone().sub(destination.target));
  const yaw = MathUtils.euclideanModulo(to.theta - from.theta + Math.PI, Math.PI * 2) - Math.PI;
  const offset = new Spherical(
    MathUtils.lerp(from.radius, to.radius, rate),
    MathUtils.lerp(from.phi, to.phi, rate),
    from.theta + yaw * rate,
  );
  const target = current.target.clone().lerp(destination.target, rate);
  return { position: new Vector3().setFromSpherical(offset).add(target), target };
}

/** Apply a relative command to the current (or already requested) pose. */
export function stepCameraPose(pose: CameraPose, action: CameraAction, fov: number, aspect: number): CameraPose {
  const position = pose.position.clone();
  const target = pose.target.clone();
  const offset = position.clone().sub(target);
  if (action === 'zoom-in' || action === 'zoom-out') {
    const radius = MathUtils.clamp(offset.length() * (action === 'zoom-in' ? 1 / 1.1 : 1.1), CAMERA_MIN_DISTANCE, CAMERA_MAX_DISTANCE);
    position.copy(target).add(offset.setLength(radius));
  } else if (action.startsWith('rotate-')) {
    const spherical = new Spherical().setFromVector3(offset);
    const step = MathUtils.degToRad(12);
    if (action === 'rotate-left') spherical.theta -= step;
    if (action === 'rotate-right') spherical.theta += step;
    if (action === 'rotate-up') spherical.phi -= step;
    if (action === 'rotate-down') spherical.phi += step;
    spherical.phi = MathUtils.clamp(spherical.phi, CAMERA_MIN_POLAR, CAMERA_MAX_POLAR);
    position.copy(target).add(new Vector3().setFromSpherical(spherical));
  } else if (action.startsWith('pan-')) {
    const outward = offset.clone().normalize();
    const right = WORLD_UP.clone().cross(outward).normalize();
    const up = outward.clone().cross(right).normalize();
    // Arrows describe the model's movement on screen, hence the opposite camera movement.
    const amount = 2 * offset.length() * Math.tan(MathUtils.degToRad(fov) / 2) * Math.min(1, aspect) * 0.09;
    const delta = action === 'pan-left' ? right.multiplyScalar(amount)
      : action === 'pan-right' ? right.multiplyScalar(-amount)
      : action === 'pan-up' ? up.multiplyScalar(-amount)
      : up.multiplyScalar(amount);
    position.add(delta);
    target.add(delta);
  }
  return { position, target };
}
