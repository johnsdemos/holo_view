// loop.js (or whatever your render loop file is)

export function startRenderLoop(context, config, updateControls) {
  function animate() {
    // Call the updateControls function (this will be headTracking.update)
    updateControls();

    // Your rendering code here (update the scene, camera, etc.)
    context.renderer.render(context.scene, context.camera);

    // Request the next frame
    requestAnimationFrame(animate);
  }

  // Start the animation loop
  animate();
}
