import { onResize } from "./canvas.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { startAnimationLoop } from "./animate.js";
import { createGrid } from "./grid.js";
import { setupKeyboardInput } from "./input.js";
import { updateHeadFromInput } from "./controls.js";
import { updateCameraFromHeadAndScreen } from "./projection.js";

import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";
import { computeScreenCorners, getMockHeadPosition } from "./screen-config.js";

const head = getMockHeadPosition();
const screenCorners = computeScreenCorners();

setupKeyboardInput();

const canvas = document.getElementById("webgl-canvas");

function main() {
  const { scene, cube } = createScene();
  const camera = createCamera();
  const renderer = createRenderer(canvas);
  const grid = createGrid();
  scene.add(grid);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  onResize(resize);

  startAnimationLoop(renderer, scene, camera, cube, () => {
      updateHeadFromInput(head, screenCorners);
    updateCameraFromHeadAndScreen(camera, head, screenCorners, 0.1, 1000);
  });
}
main();
