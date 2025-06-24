// controls.js
// responsible for translating input into head motion

import { isKeyDown } from "./input.js";
import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function updateHeadFromInput(head, speed = 0.05) {
  const direction = new THREE.Vector3(0, 0, -1); // looking forward in -Z
  const right = new THREE.Vector3(1, 0, 0); // right is +X

  if (isKeyDown("w")) head.addScaledVector(direction, speed);
  if (isKeyDown("s")) head.addScaledVector(direction, -speed);
  if (isKeyDown("a")) head.addScaledVector(right, -speed);
  if (isKeyDown("d")) head.addScaledVector(right, speed);
  if (isKeyDown("q")) head.y -= speed;
  if (isKeyDown("e")) head.y += speed;
}
