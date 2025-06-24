// faceMesh.js

// Avoid global state by passing the headPosition as an argument and returning updated position

export function setupFaceMesh(video, onFaceDetected) {
    // Ensure MediaPipe FaceMesh is loaded
    if (!window.MediaPipe || !window.MediaPipe.FaceMesh || !window.MediaPipe.Camera) {
        console.error("MediaPipe FaceMesh or Camera not loaded properly.");
        return;
    }

    const { FaceMesh, Camera } = window.MediaPipe;

    const faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
        maxNumFaces: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    faceMesh.onResults((results) => onFaceResults(results, onFaceDetected));

    // Start processing the video stream for face mesh results
    const camera = new Camera(video, {
        onFrame: async () => {
            await faceMesh.send({ image: video });
        },
        width: 640,
        height: 480
    });
    camera.start();
}

function onFaceResults(results, onFaceDetected) {
    console.log("Face mesh results:", results);
    if (results.multiFaceLandmarks) {
        const landmarks = results.multiFaceLandmarks[0];

        // Using the midpoint of the eyes (landmark indices 33 and 362)
        const leftEye = landmarks[33];
        const rightEye = landmarks[362];
        const headPosition = {
            x: (leftEye.x + rightEye.x) / 2 - 0.5,  // Normalize to screen center
            y: (leftEye.y + rightEye.y) / 2 - 0.5,
            z: (leftEye.z + rightEye.z) / 2 // Depth (z)
        };

        // Call the callback with the updated head position
        onFaceDetected(headPosition);
    }
}

// Function to update head position from other modules
export function updateHeadPosition(position) {
    // Simply return a copy of the updated position (avoid mutating global state)
    return { x: position.x, y: position.y, z: position.z };
}
