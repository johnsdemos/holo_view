// app.js

import { loadConfig } from './init/loadConfig.js';
import { initScene } from './init/sceneWithDepth.js';
import { setupDevControls } from './controls/devControls.js';
import { setupTouchControls } from './controls/touchControls.js';
import { startRenderLoop } from './render/loop.js';
import { setupOrientationControls } from './controls/orientationControls.js';


let config;
let context;

(async () => {
  // 1. Load config from HTML-specified path (data-config="...")
  config = await loadConfig();

  // 2. Initialize the scene, camera, renderer, and cube grid
  context = initScene(config);

  // 3. Set up keyboard and mouse camera controls for development
  const controls = config.controls || {};
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  let updateControls = () => {};

  if (isMobile && controls.orientation) {
    updateControls = setupOrientationControls(context.camera, config.controls.orientation);
  } else if (isMobile && config.controls?.touch) {
    updateControls = setupTouchControls(context.camera, controls.touch);
  } else {
    updateControls = setupDevControls(context.camera, controls.dev);
  }

  // 4. Begin the animation/render loop

  startRenderLoop(context, config, updateControls);
  const loadingEl = document.getElementById('loading-screen');
  if (loadingEl) loadingEl.style.display = 'none';

})();

// app.js (after startRenderLoop or in the loop itself)


