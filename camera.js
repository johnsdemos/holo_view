// camera.js
import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function createCamera() {
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1.6, 3);
  camera.lookAt(0, 1.6, 0);
  return camera;
}
