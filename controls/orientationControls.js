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
    // Normalize the quaternion after interpolation to avoid any drift.
    currentQuaternion.normalize();
    camera.quaternion.copy(currentQuaternion);
  }

  // Recenter the device orientation
  function recenter() {
    initialAlpha = lastAlpha;
  }

  // Handle orientation event, using quaternions directly
  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;
    if (alpha == null || beta == null || gamma == null) return;

    lastAlpha = alpha;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    // Convert alpha, beta, gamma directly into quaternion
    const yaw = ((alpha - initialAlpha) * Math.PI / 180) * sensitivity;
    const pitch = ((beta - 90) * Math.PI / 180) * sensitivity;
    const roll = (gamma * Math.PI / 180) * sensitivity;

    // Yaw: rotation around the Y-axis (vertical)
    const yawQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    // Pitch: rotation around the X-axis (forward/backward tilt)
    const pitchQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);

    // Roll: rotation around the Z-axis (side-to-side tilt)
    const rollQuat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), roll);

    // Combine the quaternions in the correct order (yaw -> pitch -> roll)
    // Quaternion multiplication order is crucial: (yaw * pitch * roll)
    targetQuaternion.copy(yawQuat).multiply(pitchQuat).multiply(rollQuat);

    // Normalize quaternion to avoid floating point drift
    targetQuaternion.normalize();
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
