// /controls/orientationControls.js

import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 1.0;
  const smoothFactor = config.smoothing ?? 0.1;

  let initialAlpha = null;
  let lastAlpha = 0;

  const targetQuaternion = new THREE.Quaternion();
  const currentQuaternion = new THREE.Quaternion();

  // Update the camera quaternion smoothly
  function update() {
    currentQuaternion.slerp(targetQuaternion, smoothFactor);
    camera.quaternion.copy(currentQuaternion);
  }

  // Recenter the device orientation
  function recenter() {
    initialAlpha = lastAlpha;
  }

  // Handle orientation event, using quaternions
  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;
    if (alpha == null || beta == null || gamma == null) return;

    lastAlpha = alpha;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    // Normalize rotation in terms of pitch, yaw, and roll (alpha, beta, gamma)
    const yaw = ((alpha - initialAlpha) * Math.PI / 180) * sensitivity;
    const pitch = ((beta - 90) * Math.PI / 180) * sensitivity;
    const roll = (gamma * Math.PI / 180) * sensitivity;

    // Directly convert the euler angles to a quaternion
    targetQuaternion.setFromEuler(new THREE.Euler(pitch, yaw, roll, 'YXZ'));  // Using 'YXZ' order for proper orientation

  }

  // Request motion permission for iOS
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

  // iOS or Android support
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
