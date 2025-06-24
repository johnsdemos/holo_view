// controls.js
// responsible for translating input into head motion

import { isKeyDown } from "./input.js";
import * as THREE from "https://unpkg.com/three@0.177.0/build/three.module.js";

export function updateHeadFromInput(head, screenCorners, speed = 0.01) {
  const [bl, br, tl, _] = screenCorners;

  const right = new THREE.Vector3().subVectors(br, bl).normalize();
  const up = new THREE.Vector3().subVectors(tl, bl).normalize();
  const forward = new THREE.Vector3().crossVectors(up, right).normalize();

  if (isKeyDown("w")) head.addScaledVector(forward, -speed); // move closer to screen
  if (isKeyDown("s")) head.addScaledVector(forward, speed);
  if (isKeyDown("a")) head.addScaledVector(right, -speed);
  if (isKeyDown("d")) head.addScaledVector(right, speed);
  if (isKeyDown("q")) head.addScaledVector(up, -speed);
  if (isKeyDown("e")) head.addScaledVector(up, speed);
}
