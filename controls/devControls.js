// /controls/devControls.js

import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';


export function setupDevControls(camera, config = {}) {
  const speed = config.speed || 0.05;
  const rotationSpeed = config.rotationSpeed || 0.005;

  const keys = new Set();
  let isMouseDown = false;
  let lastMouse = { x: 0, y: 0 };

  // ====== Keyboard Movement ======
  window.addEventListener('keydown', (e) => keys.add(e.key.toLowerCase()));
  window.addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

  // ====== Mouse Look ======
  window.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;

    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;

    camera.rotation.y -= dx * rotationSpeed; // yaw
    camera.rotation.x -= dy * rotationSpeed; // pitch
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // clamp

    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  });

  // ====== Update Camera Position Each Frame ======
  function update() {
    const dir = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);

    camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();

    right.crossVectors(dir, up).normalize();

    if (keys.has('w')) camera.position.addScaledVector(dir, speed);
    if (keys.has('s')) camera.position.addScaledVector(dir, -speed);
    if (keys.has('a')) camera.position.addScaledVector(right, -speed);
    if (keys.has('d')) camera.position.addScaledVector(right, speed);
    if (keys.has('q')) camera.position.y += speed;
    if (keys.has('e')) camera.position.y -= speed;
  }

  return update;
}
