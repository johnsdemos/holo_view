import { setupCanvas } from "./canvas.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { startAnimationLoop } from "./animate.js";

const canvas = document.getElementById("webgl-canvas");

function main() {
  setupCanvas(canvas);

  const { scene, cube } = createScene();
  const camera = createCamera();
  const renderer = createRenderer(canvas);

  startAnimationLoop(renderer, scene, camera, cube);
}

main();
