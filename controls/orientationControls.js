// /controls/orientationControls.js
export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity || 1.0;
  let initialAlpha = null;

  function handleOrientation(event) {
    const { alpha, beta, gamma } = event;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    const yaw = ((alpha - initialAlpha) * Math.PI / 180) * sensitivity;
    const pitch = (beta - 90) * Math.PI / 180 * sensitivity;

    camera.rotation.set(pitch, yaw, 0); // basic pitch/yaw, no roll
  }

  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    // iOS: ask for permission first
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
        } else {
          console.warn('Device orientation permission denied');
        }
      })
      .catch(console.error);
  } else {
    // Android or non-iOS: no permission prompt needed
    window.addEventListener('deviceorientation', handleOrientation, true);
  }

  return () => {}; // no per-frame update needed
}
