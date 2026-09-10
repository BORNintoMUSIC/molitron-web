import { Box3, Color, Material, Mesh, MeshStandardMaterial, Object3D, Texture, Vector3 } from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

export type CabinetAsset = {
  gltf: GLTF;
  filename: string;
  bytes: number;
  parseMs: number;
  meshes: { id: string; label: string; partId: string; object: Mesh }[];
  parts: { id: string; label: string; sourcePath: string }[];
  door: Object3D | null;
  triangles: number;
  materials: number;
  center: Vector3;
  size: Vector3;
  scale: number;
  frameBox: Box3;
};

// This first trial intentionally accepts a single self-contained GLB.
// Refuse remote resources so choosing a local asset does not fetch external files.
function validateContainer(data: ArrayBuffer) {
  if (data.byteLength < 20) throw new Error('This file is too short to be a GLB model.');
  const header = new DataView(data);
  if (header.getUint32(0, true) !== 0x46546c67 || header.getUint32(4, true) !== 2) {
    throw new Error('Choose a GLB 2.0 export of the cabinet.');
  }
  if (header.getUint32(8, true) !== data.byteLength) throw new Error('The GLB file is incomplete. Export it again.');
  const jsonLength = header.getUint32(12, true);
  if (header.getUint32(16, true) !== 0x4e4f534a || jsonLength > data.byteLength - 20) {
    throw new Error('The GLB model has an invalid header.');
  }
  const json = JSON.parse(new TextDecoder().decode(new Uint8Array(data, 20, jsonLength)));
  for (const resource of [...(json.buffers ?? []), ...(json.images ?? [])]) {
    if (resource.uri && !resource.uri.startsWith('data:')) {
      throw new Error('Export a self-contained GLB with textures embedded. This trial does not load external resources.');
    }
  }
  if (json.extensionsRequired?.includes('KHR_draco_mesh_compression') || json.extensionsRequired?.includes('KHR_texture_basisu')) {
    throw new Error('For this first trial, export without Draco or KTX2 compression. We can add compression after the cabinet is verified.');
  }
}

export async function loadCabinet(file: File): Promise<CabinetAsset> {
  if (!file.name.toLowerCase().endsWith('.glb')) throw new Error('Choose a .glb file. Fusion/STEP/OBJ files need presentation preparation first.');
  if (file.size > 150 * 1024 * 1024) throw new Error('This trial accepts models up to 150 MB. Export a smaller representative assembly.');
  const data = await file.arrayBuffer();
  validateContainer(data);
  const started = performance.now();
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.parseAsync(data, '');
  try {
    gltf.scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(gltf.scene);
    const size = box.getSize(new Vector3());
    if (box.isEmpty() || !Number.isFinite(size.length()) || size.length() === 0) throw new Error('The export contains no visible model geometry.');
    const meshes: CabinetAsset['meshes'] = [];
    const parts = new Map<string, CabinetAsset['parts'][number]>();
    let door: Object3D | null = null;
    const materialIds = new Set<string>();
    let triangles = 0;
    gltf.scene.traverse((object) => {
      if (object.userData.interaction === 'main-door') door = object;
      if (!(object instanceof Mesh)) return;
      const names: string[] = [];
      let partId = '';
      let partLabel = '';
      let ancestor: Object3D | null = object;
      while (ancestor && ancestor !== gltf.scene) {
        if (ancestor.name) names.unshift(ancestor.name);
        partId ||= ancestor.userData.partId ?? '';
        partLabel ||= ancestor.userData.label ?? '';
        ancestor = ancestor.parent;
      }
      partId ||= object.uuid;
      const label = partLabel || 'Cabinet component';
      parts.set(partId, {id: partId, label, sourcePath: ''});
      meshes.push({ id: object.uuid, partId, label: names.join(' / ') || label, object });
      triangles += (object.geometry.index?.count ?? object.geometry.attributes.position?.count ?? 0) / 3;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => materialIds.add(material.uuid));
      object.castShadow = true;
      object.receiveShadow = true;
    });
    const frameBox = box.clone();
    // Fit the complete door sweep, keeping it visible in a narrow phone viewport.
    const preparedDoor = door as Object3D | null;
    if (preparedDoor) {
      const original = preparedDoor.rotation.y;
      for (const angle of [45, 90, 120, 150]) {
        preparedDoor.rotation.y = -angle * Math.PI / 180;
        gltf.scene.updateMatrixWorld(true);
        frameBox.union(new Box3().setFromObject(gltf.scene));
      }
      preparedDoor.rotation.y = original;
      gltf.scene.updateMatrixWorld(true);
    }
    return { gltf, filename: file.name, bytes: file.size, parseMs: performance.now() - started,
      meshes, parts: [...parts.values()].sort((a,b) => a.id === 'main-door' ? -1 : b.id === 'main-door' ? 1 : a.label.localeCompare(b.label)), door, triangles: Math.round(triangles), materials: materialIds.size,
      size, center: box.getCenter(new Vector3()), scale: 3 / Math.max(size.x, size.y, size.z), frameBox };
  } catch (error) {
    disposeCabinet(gltf.scene);
    throw error;
  }
}

export function disposeCabinet(scene: Object3D) {
  const geometries = new Set<Mesh['geometry']>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
  });
  materials.forEach((material) => {
    Object.values(material).forEach((value) => { if (value instanceof Texture) textures.add(value); });
    material.dispose();
  });
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => {
    texture.dispose();
    const image = texture.source.data;
    if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
  });
}

/** Imperative Three.js resource update. Returns cleanup before the asset is disposed. */
export function configureMaterials(asset: CabinetAsset, selected: string, wireframe: boolean) {
  const originals = new Map<string, Material | Material[]>();
  const copies: Material[] = [];
  for (const mesh of asset.meshes) {
    originals.set(mesh.id, mesh.object.material);
    const source = Array.isArray(mesh.object.material) ? mesh.object.material : [mesh.object.material];
    const prepared = source.map(material => {
      const copy = material.clone();
      if ('wireframe' in copy) copy.wireframe = wireframe;
      if (mesh.partId === selected && copy instanceof MeshStandardMaterial) {
        copy.emissive = new Color('#97c18c');
        copy.emissiveIntensity = 0.35;
      }
      copies.push(copy);
      return copy;
    });
    mesh.object.material = Array.isArray(mesh.object.material) ? prepared : prepared[0];
  }
  return () => {
    asset.meshes.forEach(mesh => { mesh.object.material = originals.get(mesh.id)!; });
    copies.forEach(copy => copy.dispose());
  };
}
