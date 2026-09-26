// Run: node --experimental-strip-types --test scripts/verify-viewer-camera.mjs
import assert from 'node:assert/strict';
import test from 'node:test';
import { Box3, BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import {
  assetCameraBounds, canonicalDirection, componentFocusDirection, fitCameraBounds, interpolateCameraPose, stepCameraPose,
  CAMERA_MAX_DISTANCE, CAMERA_MIN_DISTANCE,
} from '../src/components/model/camera-math.ts';

const near = (a, b, message) => assert.ok(Math.abs(a - b) < 1e-8, `${message}: ${a} != ${b}`);
const vectorNear = (a, b, message) => assert.ok(a.distanceTo(b) < 1e-8, message);
const outward = pose => pose.position.clone().sub(pose.target).normalize();
const cameraFor = (pose, aspect = 1) => {
  const camera = new PerspectiveCamera(38, aspect, 0.01, 100);
  camera.position.copy(pose.position);
  camera.lookAt(pose.target);
  camera.updateMatrixWorld(true);
  return camera;
};

test('fit contains every corner at desktop and narrow aspect ratios from front and oblique views', () => {
  const box = new Box3(new Vector3(-2, 0.1, -0.6), new Vector3(1, 3.1, 1.2));
  for (const aspect of [0.45, 0.7, 1, 2.2]) for (const direction of [new Vector3(0, 0, 1), canonicalDirection(0), componentFocusDirection('fan'), new Vector3(-2, 3, -4)]) {
    const pose = fitCameraBounds(box, direction, 38, aspect);
    const camera = cameraFor(pose, aspect);
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      const projected = new Vector3(x, y, z).project(camera);
      assert.ok(Math.abs(projected.x) <= 1 / 1.13 + 1e-8);
      assert.ok(Math.abs(projected.y) <= 1 / 1.13 + 1e-8);
      assert.ok(projected.z > -1 && projected.z < 1);
    }
  }
});

test('pan arrows move the object in screen coordinates without changing orientation or distance', () => {
  const pose = { position: new Vector3(4, 3, -5), target: new Vector3(1, 0.8, 0.4) };
  const reference = pose.target.clone();
  for (const action of ['pan-left', 'pan-right', 'pan-up', 'pan-down']) {
    const next = stepCameraPose(pose, action, 38, 1.5);
    vectorNear(outward(next), outward(pose), action);
    near(next.position.distanceTo(next.target), pose.position.distanceTo(pose.target), action);
    const screen = reference.clone().project(cameraFor(next, 1.5));
    if (action === 'pan-left') assert.ok(screen.x < -0.1);
    if (action === 'pan-right') assert.ok(screen.x > 0.1);
    if (action === 'pan-up') assert.ok(screen.y > 0.1);
    if (action === 'pan-down') assert.ok(screen.y < -0.1);
  }
});

test('interleaved orbit, pan and repeated zoom preserve the latest target and accumulate', () => {
  const original = { position: new Vector3(-3, 2, -4), target: new Vector3(0.2, 1, 0.6) };
  const rotated = stepCameraPose(original, 'rotate-right', 38, 1);
  vectorNear(rotated.target, original.target, 'orbit keeps target');
  near(rotated.position.distanceTo(rotated.target), original.position.distanceTo(original.target), 'orbit keeps distance');
  const panned = stepCameraPose(rotated, 'pan-up', 38, 1);
  let zoomed = panned;
  for (let i = 0; i < 7; i++) zoomed = stepCameraPose(zoomed, 'zoom-in', 38, 1);
  vectorNear(zoomed.target, panned.target, 'zoom keeps panned target');
  vectorNear(outward(zoomed), outward(panned), 'zoom keeps manual orbit');
  near(zoomed.position.distanceTo(zoomed.target), panned.position.distanceTo(panned.target) / 1.1 ** 7, 'commands accumulate');
  for (let i = 0; i < 200; i++) zoomed = stepCameraPose(zoomed, 'zoom-in', 38, 1);
  near(zoomed.position.distanceTo(zoomed.target), CAMERA_MIN_DISTANCE, 'close inspection minimum');
  for (let i = 0; i < 200; i++) zoomed = stepCameraPose(zoomed, 'zoom-out', 38, 1);
  near(zoomed.position.distanceTo(zoomed.target), CAMERA_MAX_DISTANCE, 'far maximum');
});

test('small component framing uses relative padding rather than cabinet-scale padding', () => {
  const box = new Box3(new Vector3(-0.03, 0, -0.02), new Vector3(0.03, 0.09, 0.02));
  const pose = fitCameraBounds(box, new Vector3(0, 0, 1), 38, 1, 1.28);
  assert.ok(pose.position.distanceTo(pose.target) < 0.25);
  assert.ok(pose.position.distanceTo(pose.target) >= CAMERA_MIN_DISTANCE);
});

test('rear-to-front transitions preserve orbit radius and use the shortest yaw across its wrap', () => {
  const rear = { position: new Vector3(0, 1, -4), target: new Vector3(0, 1, 0) };
  const front = { position: new Vector3(0, 1, 4), target: new Vector3(0, 1, 0) };
  for (const rate of [0, 0.25, 0.5, 0.75, 1]) {
    const pose = interpolateCameraPose(rear, front, rate);
    near(pose.position.distanceTo(pose.target), 4, 'transition cannot cross the target');
  }
  const nearRearLeft = { position: new Vector3(-0.1, 0, -4), target: new Vector3() };
  const nearRearRight = { position: new Vector3(0.1, 0, -4), target: new Vector3() };
  const midpoint = interpolateCameraPose(nearRearLeft, nearRearRight, 0.5);
  assert.ok(midpoint.position.z < -4, 'crossing the yaw wrap stays behind the target');
  near(midpoint.position.x, 0, 'short yaw midpoint');
  const panned = stepCameraPose(front, 'pan-right', 38, 1);
  const midwayPan = interpolateCameraPose(front, panned, 0.5);
  vectorNear(outward(midwayPan), outward(front), 'pan easing does not rotate');
});

test('mechanism framing uses requested door angle in the rendered coordinate system and restores animation', () => {
  const scene = new Group();
  const door = new Group();
  const mesh = new Mesh(new BoxGeometry(1, 2, 0.1), new MeshBasicMaterial());
  mesh.position.x = 0.5;
  door.add(mesh);
  scene.add(door);
  const sourceOffset = new Group();
  sourceOffset.position.set(-1, -2, 0.4);
  sourceOffset.add(scene);
  const rendered = new Group();
  rendered.position.set(0, 1.525, 0);
  rendered.scale.setScalar(1.7);
  rendered.add(sourceOffset);
  door.rotation.y = -0.2;
  scene.updateWorldMatrix(true, true);
  const liveBounds = new Box3().setFromObject(scene);
  const liveMatrix = mesh.matrixWorld.clone();
  const asset = { gltf: { scene }, door, meshes: [{ partId: 'main-door', object: mesh }] };
  const openBounds = assetCameraBounds(asset, 90, false, 'main-door');
  assert.ok(openBounds.getSize(new Vector3()).z > 1.6);
  assert.ok(openBounds.getSize(new Vector3()).x < 0.18);
  near(door.rotation.y, -0.2, 'door animation restored');
  assert.deepEqual(mesh.matrixWorld.elements, liveMatrix.elements);
  const restoredBounds = new Box3().setFromObject(scene);
  vectorNear(restoredBounds.min, liveBounds.min, 'bounds restored');
  vectorNear(restoredBounds.max, liveBounds.max, 'bounds restored');
  mesh.geometry.dispose();
  mesh.material.dispose();
});

test('reset framing is identical after an open fill lid and preserves the live lid animation', () => {
  const scene = new Group();
  const lid = new Group();
  const mesh = new Mesh(new BoxGeometry(0.6, 0.02, 0.4), new MeshBasicMaterial());
  lid.add(mesh);
  scene.add(lid);
  const asset = { gltf: { scene }, door: null, lid, meshes: [{ partId: 'solution-lid', object: mesh }] };
  const initialBounds = assetCameraBounds(asset, 0, false);
  lid.position.z = 0.2143252;
  scene.updateWorldMatrix(true, true);
  const liveMatrix = mesh.matrixWorld.clone();
  const resetBounds = assetCameraBounds(asset, 0, false);
  vectorNear(resetBounds.min, initialBounds.min, 'closed reset lower bound is deterministic');
  vectorNear(resetBounds.max, initialBounds.max, 'closed reset upper bound is deterministic');
  near(lid.position.z, 0.2143252, 'live lid position is restored');
  assert.deepEqual(mesh.matrixWorld.elements, liveMatrix.elements);
  const openBounds = assetCameraBounds(asset, 0, true);
  near(openBounds.max.z - initialBounds.max.z, 0.2143252, 'open lid framing uses requested extent');
  mesh.geometry.dispose();
  mesh.material.dispose();
});
