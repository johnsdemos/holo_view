// /controls/headTrackingControls.js

import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function setupHeadTrackingControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 0.1;
  const fovRange = config.fovRange ?? [50, 90]; // Adjust FOV based on head movement (near/far)

  let lastMousePosition = { x: 0, y: 0 };

  function update() {
    // Simulate head movement using mouse position
    document.addEventListener('mousemove', (event) => {
      const mouseX = event.clientX / window.innerWidth - 0.5; // Normalize mouse to [-0.5, 0.5]
      const mouseY = event.clientY / window.innerHeight - 0.5; // Normalize mouse to [-0.5, 0.5]

      // Adjust camera position based on mouse (acting as head movement)
      camera.position.x = mouseX * 5; // Move left-right (simulating user head move)
      camera.position.y = -mouseY * 5; // Move up-down (simulating user head move)

      // Adjust the camera's FOV based on distance (simulating user moving closer or farther)
      const fov = THREE.MathUtils.lerp(fovRange[0], fovRange[1], Math.abs(mouseY));
      camera.fov = fov;
      camera.updateProjectionMatrix(); // Apply the new FOV

      // Keep the camera always looking forward (straight at the scene)
      camera.lookAt(0, 0, 0);
    });
  }

  return { update };
}
