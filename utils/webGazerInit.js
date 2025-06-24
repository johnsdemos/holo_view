// /utils/webGazerInit.js

export function initializeWebGazer(camera) {
  console.log('Initializing WebGazer...');
  
  document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM fully loaded, continuing initialization...');
  
    // Check if WebGazer is available
    if (typeof webgazer !== 'undefined') {
      console.log('WebGazer is loaded and ready!');
      
      try {
        webgazer.setRegression('ridge') // regression model for predicting gaze
          .setTracker('clmtrackr') // using face tracker
          .begin();

        console.log('WebGazer setup complete');
      } catch (error) {
        console.error('Error initializing WebGazer:', error);
      }

      const startButton = document.getElementById('start-headtracking');
      if (startButton) {
        console.log('Start Head Tracking button found!');
        
        startButton.addEventListener('click', () => {
          console.log('Start Head Tracking button clicked!');
          
          // Ensure WebGazer is ready before starting
          if (webgazer.isReady()) {
            console.log('WebGazer is ready to start!');
            startHeadTracking(camera); // Start head tracking logic
          } else {
            console.log('WebGazer is not ready yet');
          }
        });
      } else {
        console.error('Start Head Tracking button not found');
      }
    } else {
      console.error('WebGazer.js is not loaded.');
    }
  });
}

// Function to handle head tracking and updating camera based on head position
export function startHeadTracking(camera) {
  console.log('Head tracking started!');
  
  setInterval(() => {
    const prediction = webgazer.getCurrentPrediction();
    
    if (prediction) {
      const { x, y } = prediction;
      console.log(`Head Position: x=${x}, y=${y}`);

      // Adjust the camera position based on the head's position
      if (camera) {
        camera.position.x = x * 5;  // Scale the head position to camera movement
        camera.position.y = -y * 5; // Invert Y-axis for natural movement

        // Adjust Field of View (FOV)
        const fov = THREE.MathUtils.lerp(50, 90, Math.abs(y));
        camera.fov = fov;
        camera.updateProjectionMatrix();
        
        camera.lookAt(0, 0, 0); // Always look at the center of the scene
      } else {
        console.error('Camera object is undefined.');
      }
    } else {
      console.log('No gaze prediction yet');
    }
  }, 100); // Update every 100ms
}
