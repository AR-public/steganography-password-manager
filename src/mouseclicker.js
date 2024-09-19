import { mouse, Button } from '@nut-tree-fork/nut-js';

// Set mouse speed (optional, can adjust the speed of the movement)
mouse.config.autoDelayMs = 100;

// Function to click the mouse
async function clickMouse() {
  const mousePosition = await mouse.getPosition();
  console.log(`Clicking mouse at (${mousePosition.x}, ${mousePosition.y})`);

  // Perform a left mouse click
  await mouse.click(Button.LEFT);
}

// Click the mouse every 3 minutes (180000 milliseconds)
setInterval(clickMouse, 180000);

console.log('Mouse clicker is running. Press Ctrl+C to stop.');
