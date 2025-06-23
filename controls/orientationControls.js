// /controls/orientationControls.js

export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 1.0;
  const smoothFactor = config.smoothing ?? 0.1;

  let initialAlpha = null;
  let targetYaw = 0;
  let targetPitch = 0;
  let currentYaw = 0;
  let currentPitch = 0;

  function handleOrientation(event) {
    const { alpha, beta } = event;
    if (alpha == null || beta == null) return;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    // Yaw: horizontal rotation from alpha (compass heading)
    const rawYaw = ((alpha - initialAlpha) * Math.PI / 180) * sensitivity;

    // Pitch: vertical tilt from beta (~0 flat to 180 vertical upside down)
    const rawPitch = ((beta - 90) * Math.PI / 180) * sensitivity;

    // Clamp pitch: prevent looking backward or upside down
    const clampedPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rawPitch));

    targetYaw = rawYaw;
    targetPitch = clampedPitch;
  }

  function update() {
    // Smoothly interpolate rotation
    currentYaw += (targetYaw - currentYaw) * smoothFactor;
    currentPitch += (targetPitch - currentPitch) * smoothFactor;

    camera.rotation.set(currentPitch, currentYaw, 0);
  }

  // iOS permission request flow
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          console.warn('Orientation permission denied');
        }
      })
      .catch(console.error);
  } else {
    // Android or desktop
    window.addEventListener('deviceorientation', handleOrientation, true);
  }

  return update; // per-frame update for smoothing
}
