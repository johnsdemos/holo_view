// /init/sceneWithDepth.js
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function initScene(config) {
  const canvas = document.getElementById('viewport');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  // ======== Camera Setup ========
  const camera = new THREE.PerspectiveCamera(
    config.camera?.fov || 75,
    window.innerWidth / window.innerHeight,
    config.camera?.near || 0.1,
    config.camera?.far || 1000
  );

  const pos = config.camera?.position || { x: 0, y: 1.5, z: 5 };
  camera.position.set(pos.x, pos.y, pos.z);

  // ======== Floor ========
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshPhongMaterial({ color: 0x111111, side: THREE.DoubleSide })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);

  // ======== Lighting ========
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 10, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0x404040); // soft global light
  scene.add(ambient);

  // ======== Depth Grid of Cubes ========
  const cubeGrid = new THREE.Group();

  const rows = 3;
  const cols = 5;
  const depthLayers = 5;
  const spacing = 2;

  for (let z = 0; z < depthLayers; z++) {
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(`hsl(${z * 60}, 80%, 60%)`)
          })
        );
        cube.position.set(
          (x - cols / 2) * spacing,
          0.5 + y * spacing,
          -z * spacing * 3
        );
        cubeGrid.add(cube);
      }
    }
  }

  scene.add(cubeGrid);

  // ======== Resize Handling ========
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    renderer,
    scene,
    camera,
    cubes: cubeGrid.children
  };
}
