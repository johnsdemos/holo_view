import { updateHeadPosition } from './faceMesh.js';

let scene, camera, renderer, cubes = [];
let headPosition = { x: 0, y: 0, z: 0 };  // Placeholder for head position

export function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create Two Cubes at Different Depths
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    let cube1 = new THREE.Mesh(geometry, material1);
    cube1.position.z = -5;  // Near cube
    scene.add(cube1);
    cubes.push(cube1);

    let cube2 = new THREE.Mesh(geometry, material2);
    cube2.position.z = -10;  // Far cube
    scene.add(cube2);
    cubes.push(cube2);

    camera.position.z = 2;  // Adjust camera position if needed

    // Start the render loop
    requestAnimationFrame(render);
}

function render() {
    // Update head position from face mesh
    updateHeadPosition(headPosition);

    // Apply head movement to parallax effect
    cubes.forEach(cube => {
        cube.position.x = headPosition.x * 5; // Horizontal movement based on head position
        cube.position.y = headPosition.y * 5; // Vertical movement
    });

    // Update the camera position to simulate parallax
    camera.position.x = headPosition.x * 2; // Simple left-right parallax
    camera.position.y = headPosition.y * 2; // Up-down parallax

    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(render);
}
