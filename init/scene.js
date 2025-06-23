// /init/scene.js
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function initScene(config) {
  const canvas = document.getElementById('viewport');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    config.camera?.fov || 75,
    window.innerWidth / window.innerHeight,
    config.camera?.near || 0.1,
    config.camera?.far || 1000
  );

  const pos = config.camera?.position || { x: 0, y: 0, z: 5 };
  camera.position.set(pos.x, pos.y, pos.z);

  // Example geometry
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshNormalMaterial()
  );
  scene.add(cube);

  // Resize handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return { renderer, scene, camera, cube };
}
