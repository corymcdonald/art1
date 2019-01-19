function setup() {
  // Make the drawing take up the whole window
  createCanvas(windowWidth, windowHeight);

  add();
}

var movers = [];

// Restart all the Mover objects randomly
function add() {
  let gap = 50;
  let margin = 10;
  translate(margin * 4, margin * 4);
  for (let y = 0; y < height - gap; y += gap) {
    for (let x = 0; x < width - gap; x += gap) {
      movers.push(new Drip(x, y));
    }
  }
}

// This is an endless loop that acts as a frame
function draw() {
  // Set the gap between letters and the left and top margin
  let gap = 50;
  let margin = 10;
  translate(margin * 4, margin * 4);

  for (var i = 0; i < movers.length; i++) {
    // Gravity is scaled by mass here!
    var gravity = createVector(0, 0.001 * movers[i].mass);
    // Apply gravity
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
  }

  // Set the counter to start at the character you want
  // in this case 35, which is the # symbol
  let counter = 65;

  // Loop as long as there is space on the canvas
  for (let y = 0; y < height - gap; y += gap) {
    for (let x = 0; x < width - gap; x += gap) {
      // Use the counter to retrieve individual letters by their Unicode number
      let letter = char(counter);

      // Add different color to the vowels and other characters
      if (letter === "A" || letter === "R" || letter === "T") {
        fill("#ed225d");
      } else {
        fill(0);
      }

      // Draw the letter to the screen
      text(letter, x, y);

      counter++;
      if (counter > 124) {
        counter = 65;
      }
    }
  }
}

class Drip {
  constructor(x, y) {
    this.mass = 0.3;
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    fill(255, 127);
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }
}
