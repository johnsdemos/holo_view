// /controls/orientationControls.js

export function setupOrientationControls(camera, config = {}) {
  const sensitivity = config.sensitivity ?? 1.0;
  const smoothFactor = config.smoothing ?? 0.1;

  let initialAlpha = null;
  let lastAlpha = null;
  let targetYaw = 0;
  let targetPitch = 0;
  let currentYaw = 0;
  let currentPitch = 0;

  function recenter() {
    initialAlpha = lastAlpha;
  }

  function handleOrientation(event) {
    const { alpha, beta } = event;
    if (alpha == null || beta == null) return;

    lastAlpha = alpha;

    if (initialAlpha === null) {
      initialAlpha = alpha;
    }

    const rawYaw = ((alpha - initialAlpha) * Math.PI / 180) * sensitivity;
    const rawPitch = ((beta - 90) * Math.PI / 180) * sensitivity;
    const clampedPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rawPitch));

    targetYaw = rawYaw;
    targetPitch = clampedPitch;
  }

  function update() {
    currentYaw += (targetYaw - currentYaw) * smoothFactor;
    currentPitch += (targetPitch - currentPitch) * smoothFactor;
    camera.rotation.set(currentPitch, currentYaw, 0);
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

  // iOS requires permission request, Android doesn't
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
