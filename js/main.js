let topPaddle;
let bottomPaddle;
let puck;
let canvas;

function setup()
{
  angleMode(DEGREES)
  rectMode(CENTER);
  ellipseMode(CENTER);
  canvas = createCanvas(600,600);
  canvas.parent("canvas-wrapper");
  topPaddle = new Paddle(15,100,15,LEFT_ARROW,RIGHT_ARROW,"#cba");
  document.getElementById("top-score").style.color = "#cba";
  bottomPaddle = new Paddle(height-15,100,15,65,68,"#bac");
  document.getElementById("bottom-score").style.color = "#bac";
  puck = new Puck();
}

function draw()
{
  background(51);
  topPaddle.update();
  topPaddle.show();
  bottomPaddle.update();
  bottomPaddle.show();
  puck.update(topPaddle,bottomPaddle);
  puck.show();
  fill(255,0,0);
  strokeWeight(4);
  stroke(255);
  push();
  translate(width/2,height/2);
  // let v1 = createVector(width,0);
  // let v2 = createVector(mouseX-width/2,mouseY-height/2);
  // line(0,0,v1.x,v1.y);
  // line(0,0,v2.x,v2.y);
  // let angle = v1.angleBetween(v2);
  // textSize(25);
  // text(angle,0,100);
  pop();
}
