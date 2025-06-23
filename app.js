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

  // 3. Set up controls
  const controls = config.controls || {};
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  let updateControls = () => {};

  if (isMobile && controls.orientation) {
    const orientationController = setupOrientationControls(context.camera, controls.orientation);
    updateControls = orientationController.update;

    // Add a recenter button
    const recenterBtn = document.createElement('button');
    recenterBtn.innerText = "Recenter";
    recenterBtn.style.position = 'absolute';
    recenterBtn.style.bottom = '1rem';
    recenterBtn.style.left = '1rem';
    recenterBtn.style.zIndex = '999';
    recenterBtn.style.padding = '0.5rem 1rem';
    recenterBtn.style.fontSize = '1rem';
    recenterBtn.style.borderRadius = '6px';
    recenterBtn.style.border = 'none';
    recenterBtn.style.background = '#111';
    recenterBtn.style.color = '#fff';
    document.body.appendChild(recenterBtn);

    recenterBtn.addEventListener('click', () => {
      orientationController.recenter();
    });

  } else if (isMobile && controls.touch) {
    updateControls = setupTouchControls(context.camera, controls.touch);
  } else {
    updateControls = setupDevControls(context.camera, controls.dev);
  }

  // 4. Begin the animation/render loop
  startRenderLoop(context, config, updateControls);

  // 5. Hide loading screen if present
  const loadingEl = document.getElementById('loading-screen');
  if (loadingEl) loadingEl.style.display = 'none';
})();
