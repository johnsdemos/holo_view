// app.js

// Import the official ES module build of Three.js from a stable CDN (unpkg)
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

// ======== Setup Renderer ========
const canvas = document.getElementById('viewport');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true // Smooth edges
});

renderer.setSize(window.innerWidth, window.innerHeight); // Fullscreen
renderer.setPixelRatio(window.devicePixelRatio);          // HiDPI / Retina support
renderer.setClearColor(0x000000);                         // Background color

// ======== Setup Scene ========
const scene = new THREE.Scene();

// ======== Setup Camera ========
const camera = new THREE.PerspectiveCamera(
  75,                                         // FOV
  window.innerWidth / window.innerHeight,     // Aspect ratio
  0.1,                                        // Near clipping plane
  1000                                        // Far clipping plane
);

camera.position.z = 5; // Move camera back so we can see the scene

// ======== Add a Simple Cube ========
const geometry = new THREE.BoxGeometry();                 // Cube shape
const material = new THREE.MeshNormalMaterial();          // Color shifts with normals
const cube = new THREE.Mesh(geometry, material);          // Combine into a mesh
scene.add(cube);                                          // Add cube to the scene

// ======== Handle Window Resize ========
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update camera
  camera.updateProjectionMatrix();                        // Apply new aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight); // Resize renderer
});

// ======== Animation Loop ========
function animate() {
  requestAnimationFrame(animate); // Schedule the next frame

  // Simple rotation animation to verify rendering
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera); // Draw the scene from the camera's POV
}

animate(); // Start the loop
