// screen-config.js
// returns head position and 4 screen corners in world space

import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

// Return a fixed "head" position in world space
export function getMockHeadPosition() {
  return new THREE.Vector3(0, 1.6, 3); // 3 meters away, centered
}

// Return bottom-left, bottom-right, top-left, top-right screen corners
export function computeScreenCorners() {
  const width = 1.0;
  const height = 0.6;
  const center = new THREE.Vector3(0, 1.6, 0); // screen center in world space
  const normal = new THREE.Vector3(0, 0, -1); // screen faces -Z, so normal -Z

  const right = new THREE.Vector3(1, 0, 0).multiplyScalar(width / 2);
  const up = new THREE.Vector3(0, 1, 0).multiplyScalar(height / 2);

  const bl = new THREE.Vector3().copy(center).sub(right).sub(up);
  const br = new THREE.Vector3().copy(center).add(right).sub(up);
  const tl = new THREE.Vector3().copy(center).sub(right).add(up);
  const tr = new THREE.Vector3().copy(center).add(right).add(up);

  return [bl, br, tl, tr];
}
