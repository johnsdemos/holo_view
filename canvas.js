// canvas.js
export function onResize(callback) {
  window.addEventListener("resize", callback);
  callback(); // run immediately
}
