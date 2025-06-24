// projection.js
import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function updateCameraFromHeadAndScreen(
  camera,
  headPos,
  screenCorners,
  near,
  far,
) {
  const [bl, br, tl, tr] = screenCorners;

  const vr = new THREE.Vector3().subVectors(br, bl); // right
  const vu = new THREE.Vector3().subVectors(tl, bl); // up
  const vn = new THREE.Vector3().crossVectors(vr, vu).normalize(); // normal

  const eye = headPos.clone();
  const va = new THREE.Vector3().subVectors(bl, eye);
  const vb = new THREE.Vector3().subVectors(br, eye);
  const vc = new THREE.Vector3().subVectors(tl, eye);

  const d = -va.dot(vn);
  if (d <= 0.01) return;

  const l = (vr.dot(va) * near) / d;
  const r = (vr.dot(vb) * near) / d;
  const b = (vu.dot(va) * near) / d;
  const t = (vu.dot(vc) * near) / d;

  const projection = new THREE.Matrix4().makePerspective(l, r, t, b, near, far);
  camera.projectionMatrix.copy(projection);

  // Set position and orientation (do not reset matrix manually)
  const look = new THREE.Vector3().addVectors(eye, vn);
  camera.position.copy(eye);
  camera.up.copy(vu);
  camera.lookAt(look);
}
