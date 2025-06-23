// /controls/touchControls.js
export function setupTouchControls(camera, config = {}) {
  const rotationSpeed = config.rotationSpeed || 0.005;
  let lastTouch = null;

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchMove(e) {
    if (e.touches.length !== 1 || !lastTouch) return;

    const touch = e.touches[0];
    const dx = touch.clientX - lastTouch.x;
    const dy = touch.clientY - lastTouch.y;

    camera.rotation.y -= dx * rotationSpeed;
    camera.rotation.x -= dy * rotationSpeed;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // clamp pitch

    lastTouch = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd() {
    lastTouch = null;
  }

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });

  return () => {}; // no per-frame update needed
}
