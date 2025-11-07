// CCLab Mini Project - 9.R Particle World Template

let hearts = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < 20; i++) {
    hearts[i] = new Heart(width / 2, height / 2);
  }
}

function draw() {
  background(0);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < hearts.length; i++) {
    hearts[i].update();
    hearts[i].display();
    //console.log(hearts[i]);

  }

  // limit the number of particles
  if (hearts.length > 60) {
    hearts.splice(0, 1); // remove the first (oldest) particle
  }
}

class Heart {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.col = color(255, 60, 110)
    this.r = 50 * 0.3
    this.offset = random(1000)
    this.floatY = 0;
    this.angle = random(360);
    this.distance = 0;
    this.speed = random(0.5, 1.5)

  }
  // methods (functions): particle's behaviors
  update() {
    this.floatY = sin(frameCount * 0.05 + this.offset) * 8;
    this.angle += this.speed * 0.5;
    this.distance += 0.3
    this.x = width / 2 + cos(this.angle) * this.distance;
    this.y = height / 2 + sin(this.angle) * this.distance + this.floatY
  }
  display() {
    // particle's appearance
    angleMode(DEGREES)
    for (let i = 0; i < 8; i++) {
      fill(10, 10, 80, 20 + 40 * i)
      let amplitude = i * 160 + 125;


      for (let angle = 0; angle < 360; angle += 60) {
        let px = this.x + cos(angle) * amplitude;
        let py = this.y + sin(angle) * amplitude + this.floatY;


        push();
        translate(px, py);
        noStroke();
        fill(this.col)
        circle(-this.r, - this.r, 2 * this.r);
        circle(this.r, - this.r, 2 * this.r);
        triangle(- 2.03 * this.r, - this.r, 2.03 * this.r, - this.r, 0, 2.6 * this.r);

        pop();
      }
    }
  }
}


