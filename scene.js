// scene.js

import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function createScene() {
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0,1,-2);
  scene.add(cube);
  return { scene, cube };
}
