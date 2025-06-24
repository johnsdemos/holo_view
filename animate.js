// animate.js

export function startAnimationLoop(
  renderer,
  scene,
  camera,
  cube,
  updateControls,
) {
  function animate() {
    requestAnimationFrame(animate);

    if (updateControls) {
      updateControls();
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
}
