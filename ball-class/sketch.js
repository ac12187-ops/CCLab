let balls = [];
let num = 1;
let song, beep;
let interacted = false;

function preload() {
  song = loadSound("assets/sounds/song.mp3")
  beep = loadSound("assets/sounds/beat.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < num; i++) {
    balls.push(new Ball(width / 2, height / 2));
  }
}

function mousePressed() {
  if (!interacted) {
    song.play()
    interacted = true;
  }

}

function keyPressed() {
  balls.push(new Ball(mouseX, mouseY))
}

function draw() {
  background(0);

  if (interacted) {
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].display();
      balls[i].checkEdges();
      balls[i].checkMouse();

    }
    for (let i = balls.length - 1; i >= 0; i--) {
      let b = balls[i]
      if (b.isDone) {
        balls.splice(i, 1)
      }
    }
    fill(255)
    textSize(24);
    text("number of balls: " + balls.length, width / 2, 30)

  } else {
    textAlign(CENTER);
    fill(255)
    text("click me to interact", width / 2, height / 2)
  }

}
class Ball {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1, 1);
    this.size = random(20, 50)

    this.myRate = map(this.size, 20, 50, 1, 0.4)
    this.col = color(255, 200)
    this.isDone = false;
  }
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkEdges() {
    if (this.x > width || this.x < 0) {
      this.xSpeed = -this.xSpeed;
      beep.rate(this.myRate)
      beep.play()
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed = -this.ySpeed;
      beep.rate(this.myRate)
      beep.play()
    }
  }

  checkMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.size / 2) {
      if (mouseIsPressed) {
        this.isDone = true;
      }
      this.col = color(255, 255, 30)
    } else {
      this.col = color(255, 200)
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.col);
    noStroke();
    circle(0, 0, this.size)
    pop();
  }
}