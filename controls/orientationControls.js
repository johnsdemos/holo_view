// /controls/orientationControls.js

import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 1.0;
  const smoothFactor = config.smoothing ?? 0.1;

  let initialAlpha = null;
  let targetQuaternion = new THREE.Quaternion();
  let currentQuaternion = new THREE.Quaternion();
  let lastAlpha = 0;

  const tempEuler = new THREE.Euler(0, 0, 0, 'YXZ'); // pitch, yaw, roll (rotate in the correct order)

  // Helper to update camera orientation smoothly
  function update() {
    currentQuaternion.slerp(targetQuaternion, smoothFactor);
    camera.quaternion.copy(currentQuaternion);
  }

  // Recenter the device orientation
  function recenter() {
    initialAlpha = lastAlpha;  // Re-center to current heading
  }

  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;
    if (alpha == null || beta == null || gamma == null) return;

    lastAlpha = alpha;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    // Correcting for portrait-to-landscape transition by adjusting pitch and yaw
    // Convert the device's orientation into Euler angles (adjust for 3D space)
    tempEuler.set(
      (beta * Math.PI / 180) * sensitivity,   // Pitch (tilt forward/back)
      ((alpha - initialAlpha) * Math.PI / 180) * sensitivity, // Yaw (compass direction)
      (gamma * Math.PI / 180) * sensitivity // Roll (side tilt)
    );

    // Convert Euler angles to quaternion to avoid gimbal lock
    targetQuaternion.setFromEuler(tempEuler);
  }

  function requestMotionPermission() {
    const button = document.createElement('button');
    button.innerText = "Enable Motion Controls";
    button.style.position = 'absolute';
    button.style.top = '1rem';
    button.style.left = '1rem';
    button.style.zIndex = '999';
    button.style.padding = '0.5rem 1rem';
    button.style.fontSize = '1rem';
    button.style.background = '#111';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '6px';

    document.body.appendChild(button);

    button.addEventListener('click', () => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
          document.body.removeChild(button);
        } else {
          alert("Motion access denied.");
        }
      }).catch(err => {
        console.error("Motion permission error:", err);
      });
    });
  }

  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    requestMotionPermission();  // iOS
  } else {
    window.addEventListener('deviceorientation', handleOrientation, true); // Android
  }

  return {
    update,
    recenter
  };
}
