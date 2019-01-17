function setup() {
  // Make the drawing take up the whole window
  createCanvas(windowWidth, windowHeight);
  // This creates the background color, RGB (232, 218, 239)
  background(232, 218, 239);
}


let angle = 0
// This is an endless loop that acts as a frame
function draw() {

  background(232, 218, 239);
  fill(255, 204, 0);
  noStroke();

  diameter = 100

  let d1 = 50 + (sin(angle) * diameter) / 2 + diameter / 2;
  ellipse(500, height / 2, d1, d1);
  angle += 0.2
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(232, 218, 239);
}
