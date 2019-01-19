function setup() {
  // Make the drawing take up the whole window
  createCanvas(windowWidth, windowHeight);
  // This creates the background color, RGB (232, 218, 239)
  background(white[0], white[1], white[2]);
}

// Let's define some colors here
// https://p5js.org/learn/color.html
let yellow = [242, 190, 84];
let white = [240, 217, 207]
let cyan = [135, 174, 180];
let navy = [21, 62, 92]
let red = [237, 85, 96];


// This is an endless loop that acts as a frame
function draw() {
  noStroke();

  let points = Math.floor(random(10)) + 2;

  // What happens if we randomly generate these numbers?
  let x = 50;
  let y = 50;

  // Try uncommenting these out :)

  // let randomColor = random([cyan, navy, red, yellow])
  // fill(randomColor[0], randomColor[1], randomColor[2])

  star(
    x,
    y,
    15, // Radius 1
    30, // Radius 2
    5 // 5 pointed star
  );
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(white[0], white[1], white[2]);
}
