// renderer.js

import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio); // optional
  return renderer;
}
