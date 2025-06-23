// app.js
import { loadConfig } from './init/loadConfig.js';
import { initScene } from './init/scene.js';
import { startRenderLoop } from './render/loop.js';

let config;
let context;

(async () => {
  // 1. Load config from data-config attribute
  config = await loadConfig();

  // 2. Set up scene, camera, and renderer
  context = initScene(config);

  // 3. Begin animation loop
  startRenderLoop(context, config);
})();
