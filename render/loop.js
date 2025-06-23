// /render/loop.js

export function startRenderLoop(context, config) {
  const { renderer, scene, camera, cube } = context;

  function animate() {
    requestAnimationFrame(animate);

    // Placeholder animation (can be modularized too)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}
