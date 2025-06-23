export function startRenderLoop(context, config, updateControls = () => {}) {
  const { renderer, scene, camera, cubes = [] } = context;

  function animate() {
    requestAnimationFrame(animate);

    updateControls(); // ← new control update

    // Animate cubes (optional)
    cubes.forEach(cube => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  }

  animate();
}
