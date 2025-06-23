// app.js

// Import Three.js (assumes you'll add it via <script> or NPM+bundler later)
import * as THREE from 'https://cdn.skypack.dev/three@0.160.1';

// ======== Setup Renderer ========
const canvas = document.getElementById('viewport');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000); // black background

// ======== Setup Scene ========
const scene = new THREE.Scene();

// ======== Setup Camera ========
const camera = new THREE.PerspectiveCamera(
  75,                                // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,                               // near clipping plane
  1000                               // far clipping plane
);
camera.position.z = 5; // pull camera back so we can see objects

// ======== Add Example Object ========
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial(); // color shifts with surface normal
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ======== Handle Window Resize ========
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ======== Animation Loop ========
function animate() {
  requestAnimationFrame(animate);

  // Rotate cube (for visual confirmation that things work)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
