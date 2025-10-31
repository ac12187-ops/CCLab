/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");


  dancer = new AnnaDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();

  dancer.update();
  dancer.display();
}


class AnnaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
  }
  update() {
    let sinValue = sin(frameCount * 0.05) * 50
    this.y = height / 2 + sinValue
    this.x = map(noise(frameCount * 0.015), 0, 1, 0, width)
    this.angle = sin(frameCount * 0.05) * radians(15)


  }
  display() {

    push();
    translate(this.x, this.y);
    rotate(this.angle)
    //red circle 
    fill(139, 0, 0)
    circle(0, 0, 150, 155)
    //white circles
    noStroke()
    fill(255)
    ellipse(0, -35, 55, 60)
    ellipse(35, 0, 55, 60)
    ellipse(0, 35, 55, 60)
    ellipse(-35, 0, 55, 60)
    //yellow part
    noStroke()
    fill(255, 204, 0)
    ellipse(0, 0, 55, 55)
    //eyes
    fill(0)
    ellipse(-9, -8, 6, 8)
    ellipse(9, -8, 6, 8)
    fill(255)
    ellipse(-8, -10, 2, 2)
    ellipse(8, -10, 2, 3)
    //mouth
    noStroke()
    fill("red")
    arc(0, 1, 35, 40, 0, PI)

    this.drawReferenceShapes()
    pop()

  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/