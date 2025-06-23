// app.js

import { loadConfig } from './init/loadConfig.js';
import { initScene } from './init/sceneWithDepth.js';
import { setupDevControls } from './controls/devControls.js';
import { startRenderLoop } from './render/loop.js';

let config;
let context;

(async () => {
  // 1. Load config from HTML-specified path (data-config="...")
  config = await loadConfig();

  // 2. Initialize the scene, camera, renderer, and cube grid
  context = initScene(config);

  // 3. Set up keyboard and mouse camera controls for development
  const updateControls = setupDevControls(context.camera, config.controls?.dev);

  // 4. Begin the animation/render loop
  startRenderLoop(context, config, updateControls);
})();
