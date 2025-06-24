import { onResize } from "./canvas.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { startAnimationLoop } from "./animate.js";

const canvas = document.getElementById("webgl-canvas");

function main() {
  const { scene, cube } = createScene();
  const camera = createCamera();
  const renderer = createRenderer(canvas);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  onResize(resize);
  startAnimationLoop(renderer, scene, camera, cube);
}

main();
