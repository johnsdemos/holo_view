// /utils/webGazerInit.js

export function initializeWebGazer() {
  window.onload = () => {
    console.log('Window loaded, initializing WebGazer...');
    
    // Check if WebGazer is available
    if (typeof webgazer !== 'undefined') {
      console.log('WebGazer is loaded and ready!');
      
      // WebGazer setup
      webgazer.setRegression('ridge') // regression model for predicting gaze
        .setTracker('clmtrackr') // using face tracker
        .begin();
      
      // Debugging log to check if button click listener is set
      document.getElementById('start-headtracking').addEventListener('click', () => {
        console.log('Start Head Tracking button clicked!');
        webgazer.begin();
        startHeadTracking();
      });
    } else {
      console.error('WebGazer.js is not loaded.');
    }
  };
}

// Function to handle head tracking and updating camera based on head position
function startHeadTracking() {
  console.log('Head tracking started!');
  
  // Listen for changes in head position
  setInterval(() => {
    const prediction = webgazer.getCurrentPrediction();
    if (prediction) {
      const { x, y } = prediction; // These represent the head's X and Y position

      console.log(`Head Position: x=${x}, y=${y}`);

      // Use x, y to adjust the camera position
      // Map head position to camera movement
      camera.position.x = x * 5;  // Scale the head position to camera movement
      camera.position.y = -y * 5; // Invert Y-axis for natural movement

      // Apply FOV changes based on head distance
      const fov = THREE.MathUtils.lerp(50, 90, Math.abs(y));
      camera.fov = fov;
      camera.updateProjectionMatrix();

      // Always look at the center of the scene
      camera.lookAt(0, 0, 0);
    }
  }, 100); // Update every 100ms
}
