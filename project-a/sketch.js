/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let fishX = 0;
let sharkY;
let sharkX = -200;
let sharkVisible = true;
let chaseRadius = 140;
let lerpAmount = 0.05;

function setup() {
  sharkY = random(250, height); // initial shark Y position
   let canvas = createCanvas(800, 500);
   canvas.parent ("p5-canvas-container");

}

function draw() {
  drawBackground(40);
  function drawBackground(circleSize) {
    background(0, 0, 139);
    for (let y = 10; y < height; y += circleSize) {
      for (let x = 10; x < width; x += circleSize) {
        fill(random(50), random(50), random(255));
        let dia = random(0, 17);
        circle(x, y, dia);
        for (let z = 0; z < width; z += circleSize) {
          for (let h = 0; h < height; h += circleSize) {
            let waveX = sin(frameCount * 0.05) * 10;
            let waveY = cos(frameCount * 0.05) * 10;
            circle(waveX, waveY, 5);
          }
        }
      }
    }
  }
  let wave = cos(frameCount * 0.05) * 50;
  let fishY = (height / 3) * 2 + wave;
  fishX += 2;
  if (fishX > width + 100) {
    fishX = -100;
  }

  if (sharkVisible) {
    let d = dist(sharkX, sharkY, fishX, fishY);
    if (d < chaseRadius) {
      sharkX = lerp(sharkX, fishX - 60, lerpAmount);
      sharkY = lerp(sharkY, fishY, lerpAmount);
    } else {
      sharkX += 5;
    }
    if (sharkX > width + 200) {
      // redraw shark
      sharkX = -200;
      sharkY = random(height / 2, height - 100);
    }
    drawShark(sharkX, sharkY);
  }
  push();
  if (!sharkVisible) {
    let wiggleAngle = sin(frameCount * 0.2) * 10;
    translate(fishX, fishY);
    rotate(radians(wiggleAngle));
    translate(-fishX, -fishY);
  }
  drawCreature(fishX, (height / 3) * 2 + wave, "orange");
  pop();
  drawSeaweed("lime");
}

function mousePressed() {
  sharkVisible = false;
}
function mouseReleased() {
  sharkVisible = true;
}
function drawShark(x, y) {
  push();
  translate(x, y);
  fill(100);
  noStroke();
  ellipse(0, 0, 130, 50);
  triangle(-25, -22, 10, -25, 0, -45);
  triangle(-35, -20, -20, -20, -22, -35);
  triangle(-45, -15, -35, -15, -40, -25);
  triangle(-50, 0, -80, -30, -80, 30);
  fill(255);
  ellipse(-5, 13, 55, 20);
  fill(255);
  circle(30, -10, 10);
  fill(0);
  circle(32, -11, 5);
  fill(255);
  circle(33, -12, 2);
  pop();
}

function drawCreature(x, y, bodyColor) {
  push();
  translate(x, y);
  rotate(radians(45));
  fill(bodyColor);
  rect(-15, -25, 50, 50);
  pop();

  push();
  translate(x, y);
  fill(0);
  circle(20, 3, 7);
  fill(255);
  circle(22, 2, 3);
  noStroke();
  fill(bodyColor);
  triangle(-15, 0, -40, -15, -40, 30);
  fill("red");
  for (let i = 0; i < 5; i++) {
    circle(-39, -13 + i * 10, 5);
    for (let i = 0; i < 2; i++) {
      circle(-20, i * 10, 4);
    }
  }

  fill(0);
  stroke("purple");
  strokeWeight(2);
  line(7, -27, 7, 42);
  line(-5, -15, -5, 30);
  noStroke();
  fill(220, 20, 60);
  ellipse(14, 12, 10, 5);

  fill(255, 150);
  noStroke();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 2; j++) {
      circle(-10 + i * 15, -5 + j * 25, 4);
    }
  }
  pop();
}

function drawSeaweed(seaweedColor) {
  fill(seaweedColor);
  noStroke();
  for (let x = 10; x < width; x += 20) {
    beginShape();
    for (let y = height - 10; y > height - 85; y -= 20) {
      let offset = sin(frameCount * 0.05 + y * 0.1 + x) * 5;
      vertex(x + offset, y);
    }
    endShape();
  }
}


