let topPaddle;
let bottomPaddle;
let puck;
let canvas;
let blocks = [];
let limit;
let blockSize = 30;
let rows = 3;

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
  //translate(blockSize/2,height/2-(rows/2*blockSize))
  let sth = height/2-(rows/2*blockSize);
  limit = width/blockSize;
  for(let i=0;i<limit;i++)
  {
    for(let j=0;j<rows;j++)
    {
      let indestructable = random(1,10) < 3 ? true : false;
      let tmp = new Block(i*blockSize +blockSize/2,j*blockSize+sth,blockSize,blockSize,i%2==0 ? "#f00" : "#00f",indestructable);
      blocks.push(tmp);
    }
  }
}

function draw()
{
  background(51);
  topPaddle.update();
  topPaddle.show();
  bottomPaddle.update();
  bottomPaddle.show();
  for(let block of blocks)
  {
    block.show();
  }
  puck.update(topPaddle,bottomPaddle,blocks);
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
