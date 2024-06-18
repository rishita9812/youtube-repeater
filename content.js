// Create and style the floating button
const floatingButton = document.createElement('div');
floatingButton.innerHTML = '🔄';
floatingButton.style.position = 'fixed';
floatingButton.style.top = '50%';
floatingButton.style.right = '0';
floatingButton.style.transform = 'translateY(-50%)';
floatingButton.style.backgroundColor = 'rgba(0, 0, 255, 0.7)';
floatingButton.style.color = 'white';
floatingButton.style.padding = '20px';
floatingButton.style.fontSize = '24px';
floatingButton.style.borderRadius = '50%';
floatingButton.style.cursor = 'pointer';
floatingButton.style.zIndex = '1000';
floatingButton.title = 'YouTube Repeater';
document.body.appendChild(floatingButton);

// Create and style the settings panel (unchanged)
const settingsPanel = document.createElement('div');
settingsPanel.style.position = 'fixed';
settingsPanel.style.top = '50%';
settingsPanel.style.right = '70px';
settingsPanel.style.transform = 'translateY(-50%)';
settingsPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
settingsPanel.style.color = 'white';
settingsPanel.style.padding = '20px';
settingsPanel.style.borderRadius = '10px';
settingsPanel.style.zIndex = '1000';
settingsPanel.style.display = 'none';

// // Add inputs to the settings panel (unchanged)
// settingsPanel.innerHTML = `
//   <label>Start Time:</label><br>
//   <input type="number" id="start-minutes" placeholder="MM" min="0" style="width: 40px;"> :
//   <input type="number" id="start-seconds" placeholder="SS" min="0" max="59" style="width: 40px;"><br><br>
//   <label>End Time:</label><br>
//   <input type="number" id="end-minutes" placeholder="MM" min="0" style="width: 40px;"> :
//   <input type="number" id="end-seconds" placeholder="SS" min="0" max="59" style="width: 40px;"><br><br>
//   <label>Repeat Count:</label><br>
//   <input type="number" id="count" min="1" value="1" style="width: 80px;"><br><br>
//   <button id="set-loop">Set Loop</button>
//   <button id="stop-loop" style="background-color: #f44336; color: white;">Stop Loop</button>
//   <button id="quit-loop" style="background-color: #607d8b; color: white;">Quit Loop</button>
//   <p id="instructions" style="color: #ffffff; font-size: 12px; margin-top: 10px;">Press 'F' to set start time, 'E' to set end time, 'Q' to quit loop </p>
//   <p id="instructions" style="color: #e51a1a; font-size: 13px; margin-top: 10px;">NOTE: if the number of times loop has to be is not specified , it is infinite unless specified</p>
//
// `;



// Updated settings panel with improved styling
settingsPanel.innerHTML = `
  <style>
    .settings-label {
      color: #ffffff;
      font-size: 14px;
      margin-top: 8px;
    }
    .input-group {
      margin-bottom: 12px;
    }
    .input-group input {
      width: 40px;
      padding: 4px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 8px;
    }
    .button-group button {
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 8px;
    }
    #instructions {
      color: #ffffff;
      font-size: 12px;
      margin-top: 10px;
    }
    #warning {
      color: #e51a1a;
      font-size: 13px;
      margin-top: 10px;
    }
  </style>

  <div class="input-group">
    <label class="settings-label">Start Time:</label><br>
    <input type="number" id="start-minutes" placeholder="MM" min="0">
    :
    <input type="number" id="start-seconds" placeholder="SS" min="0" max="59">
  </div>

  <div class="input-group">
    <label class="settings-label">End Time:</label><br>
    <input type="number" id="end-minutes" placeholder="MM" min="0">
    :
    <input type="number" id="end-seconds" placeholder="SS" min="0" max="59">
  </div>

  <div class="input-group">
    <label class="settings-label">Repeat Count:</label><br>
    <input type="number" id="count" min="1" value="1" style="width: 80px;">
  </div>

  <div class="button-group">
    <button id="set-loop" style="background-color: #4CAF50; color: white;">Set Loop</button>
    <button id="stop-loop" style="background-color: #f44336; color: white;">Stop Loop</button>
    <button id="quit-loop" style="background-color: #607d8b; color: white;">Quit Loop</button>
  </div>

  <p id="instructions">Press 'B' to set start time, 'E' to set end time, 'Q' to quit loop.</p>

  <p id="warning">NOTE: If the repeat count is not specified</p>
  <p id="warning">The loop will run infinitely unless stopped.</p>

`;

// Add the settings panel to the document
document.body.appendChild(settingsPanel);

// Rest of the script remains unchanged as per the previous implementation


// Rest of the script remains unchanged as per the previous implementation


let startTime = null;
let endTime = null;
let video = null;
let loopFn = null;
let isLooping = false;

// Function to set the loop
function setLoop(start, end) {
  if (!video) return;

  video.currentTime = start;

  video.removeEventListener('timeupdate', loopFn);
  loopFn = function() {
    if (video.currentTime >= end) {
      video.currentTime = start;
    }
  };
  video.addEventListener('timeupdate', loopFn);

  // Change button color to yellow when looping
  floatingButton.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
  isLooping = true;
}

// Event listener for the "Set Loop" button
document.getElementById('set-loop').addEventListener('click', () => {
  video = document.querySelector('video');
  if (video) {
    const startMinutes = parseInt(document.getElementById('start-minutes').value) || 0;
    const startSeconds = parseInt(document.getElementById('start-seconds').value) || 0;
    const endMinutes = parseInt(document.getElementById('end-minutes').value) || 0;
    const endSeconds = parseInt(document.getElementById('end-seconds').value) || 0;
    startTime = startMinutes * 60 + startSeconds;
    endTime = endMinutes * 60 + endSeconds;
    setLoop(startTime, endTime);
  }
});

// Event listener for the "Stop Loop" button
document.getElementById('stop-loop').addEventListener('click', () => {
  stopLoop();
});

// Event listener for the "Quit Loop" button
document.getElementById('quit-loop').addEventListener('click', () => {
  quitLoop();
});

// Keyboard event listeners
document.addEventListener('keydown', (event) => {
  if (event.key === 'b' || event.key === 'B') {
    video = document.querySelector('video');
    if (video) {
      startTime = video.currentTime;
      const minutes = Math.floor(startTime / 60);
      const seconds = Math.floor(startTime % 60);
      document.getElementById('start-minutes').value = minutes;
      document.getElementById('start-seconds').value = seconds;
      floatingButton.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; // Red when 'F' is pressed
    }
  } else if (event.key === 'e' || event.key === 'E') {
    video = document.querySelector('video');
    if (video) {
      endTime = video.currentTime;
      const minutes = Math.floor(endTime / 60);
      const seconds = Math.floor(endTime % 60);
      document.getElementById('end-minutes').value = minutes;
      document.getElementById('end-seconds').value = seconds;
      floatingButton.style.backgroundColor = 'rgba(0, 255, 0, 0.7)'; // Green when 'E' is pressed
      if (startTime !== null) {
        setLoop(startTime, endTime);
      }
    }
  } else if (event.key === 'q' || event.key === 'Q') {
    quitLoop();
  }
});

// Function to stop the loop
function stopLoop() {
  if (video) {
    video.removeEventListener('timeupdate', loopFn);
    loopFn = null;
  }
  startTime = null;
  endTime = null;
  floatingButton.style.backgroundColor = 'rgba(0, 0, 255, 0.7)'; // Blue when not in use
  isLooping = false;
}

// Function to quit the loop completely
function quitLoop() {
  stopLoop();
  settingsPanel.style.display = 'none';
}

// Detect URL change to stop the loop
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    quitLoop();
  }
}).observe(document, { subtree: true, childList: true });

// Click event listener for the floating button to toggle settings panel
floatingButton.addEventListener('click', () => {
  settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
});
