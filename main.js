import { initScene } from './scene.js';
import { setupFaceMesh } from './faceMesh.js';

let isMediaPipeLoaded = false;
let video;

// Callback to be called once MediaPipe is loaded
export function onMediaPipeLoaded() {
    if (!window.MediaPipe || !window.MediaPipe.FaceMesh || !window.MediaPipe.Camera) {
        console.error("MediaPipe FaceMesh or Camera not loaded properly.");
        return;
    }

    // Mark MediaPipe as loaded
    isMediaPipeLoaded = true;
    console.log("MediaPipe FaceMesh is loaded.");
    init();
}

async function setupVideo() {
    try {
        if (!isMediaPipeLoaded) {
            console.error("MediaPipe FaceMesh is not loaded yet.");
            return;
        }

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            video = document.createElement('video');
            video.width = 640;
            video.height = 480;

            // Try to get the user media (video stream)
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.play();

            // Debugging: Append video to the body to check if the video stream appears
            document.body.appendChild(video);  // <-- For debugging purposes

            // Initialize face mesh and provide the video stream
            setupFaceMesh(video, (headPosition) => {
                console.log("Head Position detected:", headPosition);
                // You can handle the head position here
            });
        } else {
            console.error("getUserMedia not supported");
        }
    } catch (error) {
        console.error("Error accessing the camera:", error);
    }
}

function init() {
    // Ensure MediaPipe is loaded before initializing the scene
    if (!isMediaPipeLoaded) {
        console.error("MediaPipe is not loaded yet!");
        return;
    }

    // Initialize the 3D scene
    initScene();

    // Set up webcam and face mesh detection
    setupVideo();
}

// Start the app once MediaPipe is loaded
if (isMediaPipeLoaded) {
    init();
}
