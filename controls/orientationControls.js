// /controls/orientationControls.js

import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 1.0;
  const smoothFactor = config.smoothing ?? 0.1;

  const targetEuler = new THREE.Euler(0, 0, 0, 'YXZ');
  const targetQuaternion = new THREE.Quaternion();

  let lastGamma = 0;

  function recenter() {
    // Reset gamma center if needed in future
  }

  function handleOrientation(event) {
    const { gamma } = event;
    if (gamma == null) return;

    lastGamma = gamma;

    // Convert gamma (roll, ~±90) to yaw rotation on y-axis
    const rollAsYaw = (gamma * Math.PI / 180) * sensitivity;

    targetEuler.set(0, rollAsYaw, 0); // only affect yaw
    targetQuaternion.setFromEuler(targetEuler);
  }

  function update() {
    camera.quaternion.slerp(targetQuaternion, smoothFactor);
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

  // iOS or Android support
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    requestMotionPermission();
  } else {
    window.addEventListener('deviceorientation', handleOrientation, true);
  }

  return {
    update,
    recenter
  };
}
