// /app.js

import { loadConfig } from './init/loadConfig.js';
import { initScene } from './init/sceneSetup.js';
import { startRenderLoop } from './render/loop.js';
import { setupHeadTrackingControls } from './controls/headTrackingControls.js';
import { initializeWebGazer } from './utils/webGazerInit.js';

let config;
let context;

(async () => {
  // 1. Load config from HTML-specified path (data-config="...")
  config = await loadConfig();

  // 2. Initialize the scene, camera, renderer, and cube grid
  context = await initScene();

  // 3. Set up head-tracking controls for the camera
  const controls = config.controls || {};
  const headTracking = setupHeadTrackingControls(context.camera, controls.headTracking);

  // 4. Begin the animation/render loop
  startRenderLoop(context, config, headTracking.update);

  // 5. Initialize WebGazer for head tracking
  initializeWebGazer(context.camera);  // Pass camera to WebGazer initialization
})();
