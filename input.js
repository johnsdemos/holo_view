// input.js

const keys = new Set();

export function setupKeyboardInput() {
  window.addEventListener("keydown", (e) => {
    console.log("keydown:", e.key);
    keys.add(e.key.toLowerCase());
  });

  window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
}

export function isKeyDown(key) {
  return keys.has(key.toLowerCase());
}
