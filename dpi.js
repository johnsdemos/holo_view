// dpi.js

export function watchDevicePixelRatio(renderer) {
  let currentRatio = window.devicePixelRatio;

  function updateDPI() {
    const newRatio = window.devicePixelRatio;
    if (newRatio !== currentRatio) {
      currentRatio = newRatio;
      renderer.setPixelRatio(newRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      console.log("📐 DPI updated to", newRatio);
    }
  }

  // Use matchMedia to detect resolution changes
  const mediaQuery = window.matchMedia(`(resolution: ${currentRatio}dppx)`);
  mediaQuery.addEventListener("change", updateDPI);

  // Optional: recheck on resize in case browser misses event
  window.addEventListener("resize", updateDPI);
}
