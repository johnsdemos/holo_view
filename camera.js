import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function createCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 2;
  return camera;
}
