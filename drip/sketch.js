function setup() {
  // Make the drawing take up the whole window
  createCanvas(windowWidth, windowHeight);

  add();
}

var movers = [];

// Add the initial dripping objects
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

  // This is what is moving the drops every frame
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
  let counter = 0;
  let words = ['S', 'P', 'O', 'O', 'K', 'Y', 'S', 'C', 'A', 'R', 'Y'];

  // This is our drawing loop that we use to draw all the letters
  for (let y = 0; y < height - gap; y += gap) {
    for (let x = 0; x < width - gap; x += gap) {
      // Use the counter to retrieve individual letters by their Unicode number
      let letter = words[counter]

      // Add different color to the vowels and other characters
      // Try changing this to be something different
      // if (letter === "A" || letter === "R" || letter === "T") {
      //   fill("#ed225d");
      // } else {
      fill(255, 0, 0);
      // }

      // Draw the letter to the screen
      text(letter, x, y);

      counter++;
      // If we go over the set of ASCII characters then we shoudl go back to the start :)
      if (counter >= words.length) {
        counter = 0;
      }
    }
  }
}

class Drip {
  constructor(x, y) {
    this.originalY = y;
    this.stopDrawing = false;
    this.mass = random(0, 0.3);
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    // Create a vector of x,y so that we can apply force
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    if (random() > 0.9 && this.mass > 0) {
      this.mass -= 0.005
    }
    if (this.mass <= 0) {
      return;
    }

    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // Add in a random X value to seem like it's moving back and forth
    this.position.x = this.position.x + random(-0.5, 0.5);

    // We must clear acceleration each frame
    this.acceleration.mult(0);
  }

  display() {
    noStroke();

    var gradient = (Math.ceil(this.position.y - this.originalY) * 2)
    fill(255 - gradient, 0, 0)


    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
  }
}
