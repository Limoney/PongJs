class Puck
{
  constructor()
  {
    this.position = createVector(width*0.5,height*0.5);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.r = 15;
    this.reset();
    this.lastWallBounce = millis();
    this.lastPaddleBounce = millis();
    this.canBounceOffWall = true;
    this.canBounceOffPaddle = true;
    this.maxSpeed = 8;
    this.topScore = document.getElementById("top-score");
    this.bottomScore = document.getElementById("bottom-score");
    this.wallBounces = 0;
    this.maxBounces = 4;
  }

  update(topPaddle,bottomPaddle,blocks)
  {
    if(this.velocity.mag()>this.maxSpeed)this.velocity.setMag(this.maxSpeed);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if(this.velocity.mag()>3)this.velocity.setMag(this.velocity.mag()-this.velocity.mag()*0.005);
    // setInterval(this.bounce(),3000);

    let currentTime = millis();
    if(!this.canBounceOffWall && currentTime-this.lastWallBounce>500)
    {
      this.canBounceOffWall=true;
    }
    if(!this.canBounceOffPaddle && currentTime-this.lastPaddleBounce>1000)
    {
      this.canBounceOffPaddle=true;
    }
    if(this.canBounceOffWall)
    {
      this.bounce();
    }
    if(this.canBounceOffPaddle)
    {
      this.checkPaddle(topPaddle);
      this.checkPaddle(bottomPaddle);
    }

    //test
    this.checkBlocks(blocks);

    fill(255,0,0);
    stroke(255,0,0);
    strokeWeight(8);
  }

  reset()
  {
    this.position = createVector(width*0.5,height*0.5);
    this.velocity.mult(0);
    //this.acceleration = p5.Vector.random2D().setMag(4.75);
    let angle = random(30,150);
    if(random(-1,1)>0.5) angle*=-1;
    this.acceleration = createVector(cos(angle),sin(angle)).setMag(2);
    //this.acceleration = createVector(0,1.5);

  }

  show()
  {
    fill(255);
    noStroke();
    ellipse(this.position.x,this.position.y,this.r,this.r);
  }

  bounce()
  {
    let collided = false;
    let buffor = 0;
    if(this.position.x - this.r*0.5 < 0)
    {
      collided=true;
      this.position.x = this.r*0.5 + buffor;
      this.wallBounces++;
    }
    else if(this.position.x + this.r*0.5 > width)
    {
      collided=true;
      this.position.x = width-this.r*0.5 -buffor;
      this.wallBounces++;
    }
    else if(this.position.y+this.r*0.5<0)
    {
      this.bottomScore.innerText = parseInt(this.bottomScore.innerText)+1;
      this.reset();
      return;
    }
    else if(this.position.y-this.r*0.5>height)
    {
        this.topScore.innerText = parseInt(this.topScore.innerText)+1;
      this.reset();
      return;
    }

    if(collided)
    {
      let vec = this.velocity.copy();
      if(this.wallBounces<this.maxBounces)vec.setMag(vec.mag()*1.5);
      else vec.setMag(vec.mag()*10);
      this.velocity.x*=-1;
      vec.x*=-1;
      this.acceleration.add(vec);
      this.canBounceOffWall=false;
      this.lastWallBounce = millis();
    }
  }

  checkCollision(obj)
  {
    let halfr = this.r*0.5;
    let halfpaddleh = obj.size.y*0.5;
    let halfpaddlew = obj.size.x*0.5;
    if((this.position.x+halfr>obj.position.x-halfpaddlew &&
        this.position.x-halfr<obj.position.x+halfpaddlew) &&
        this.position.y+halfr>obj.position.y-halfpaddleh &&
        this.position.y-halfr<obj.position.y+halfpaddleh)
    {
      this.wallBounces = 0;
      let v1 = createVector(obj.position.y,0);
      let v2 = this.velocity;
      let angle = v2.angleBetween(v1);

      angle = 180-angle;
      let sth = map(this.position.x,obj.position.x-halfpaddlew,obj.position.x+halfpaddlew,-60,60);
      angle+=sth;
      let v =createVector(cos(angle),sin(angle)).setMag(4);
      this.velocity = v;
      this.velocity.x*=-1;
      if(obj.position.y>height/2)this.velocity.y*=-1;
      return true;
    }
    else return false;
  }

  checkPaddle(paddle)
  {
    let halfr = this.r*0.5;
    let halfpaddleh = paddle.size.y*0.5;
    let halfpaddlew = paddle.size.x*0.5;
    if((this.position.x+halfr>paddle.position.x-halfpaddlew &&
        this.position.x-halfr<paddle.position.x+halfpaddlew) &&
        this.position.y+halfr>paddle.position.y-halfpaddleh &&
        this.position.y-halfr<paddle.position.y+halfpaddleh)
    {
      this.wallBounces = 0;
      let v1 = createVector(paddle.position.y,0);
      let v2 = this.velocity;
      let angle = v2.angleBetween(v1);
      // console.log(angle);
      // console.log(v1);
      // console.log(v2);

      fill(255);
      stroke(255);
      push();
      translate(0,paddle.position.y);
      line(0,0,v1.x,v1.y);
      pop();

      push();
      stroke(255,0,0);
      translate(this.position.x,this.position.y);
      line(-v2.x*100,-v2.y*100,v2.x*100,v2.y*100);
      pop();

      noStroke();
      text("new"+angle,width/2,height/2);
      angle = 180-angle;
      let sth = map(this.position.x,paddle.position.x-halfpaddlew,paddle.position.x+halfpaddlew,-60,60);
      angle+=sth;
      text("sth"+sth,width/2,height/2+60);
      let v =createVector(cos(angle),sin(angle)).setMag(4);
      this.velocity = v;
      text("old "+angle,width/2,height/2 + 30);
      console.log(v);

      push();
      stroke(255,255,0);
      translate(this.position.x,this.position.y);
      line(-v.x*100,-v.y*100,v.x*100,v.y*100);
      pop();

      //
      // push();
      // fill(255,0,0);
      // strokeWeight(4);
      // stroke(255);
      // textSize(25);
      // translate(this.position.x,this.position.y);
      // //line(0,0,v1.x,v1.y);
      // fill(255,0,0);
      // stroke(255,0,0);
      // line(0,0,v2.x*100,v2.y*100);
      // noStroke();
      // text("old: "+angle,-50,-100);
      // angle = 180 - angle;
      // text("new: "+angle,-50,-200);
      // pop();
      //
      // push();
      // fill(255,255,0);
      // strokeWeight(4);
      // stroke(255,255,0);
      // translate(this.position.x,this.position.y);
      // //newv.setMag(2);
      // let newv = p5.Vector.fromAngle(angle);
      // line(0,0,newv.x*100,newv.y*100);
      // pop();
      //this.velocity = newv.setMag(2);
      this.velocity.x*=-1;
      if(paddle.position.y>height/2)this.velocity.y*=-1;
      this.canBounceOffPaddle=false;
      this.lastPaddleBounce = millis();
      //debugger;
    }
  }

  checkBlocks(blocks)
  {
    for(let i = blocks.length-1;i>=0;i--)
    {
      if(this.checkCollision(blocks[i]))
      {
        blocks[i].color = "#cab";
        if(!blocks[i].indestructable)blocks.splice(i,1);
      }
    }
  }
}
/*
ehh
checkPaddle(paddle)
{
  let halfr = this.r*0.5;
  let halfpaddleh = paddle.size.y*0.5;
  let halfpaddlew = paddle.size.x*0.5;
  if((this.position.x+halfr>paddle.position.x-halfpaddlew &&
      this.position.x-halfr<paddle.position.x+halfpaddlew) &&
      this.position.y+halfr>paddle.position.y-halfpaddleh &&
      this.position.y-halfr<paddle.position.y+halfpaddleh)
  {
    this.wallBounces = 0;
    let diff = paddle.position.x - this.position.x;
    let angle = map(diff,0,halfpaddlew*2,-75,75);
    // let relativeIntersectY = (paddle.position.y) - this.position.y;
    // let normRelIntY = relativeIntersectY/halfpaddleh;
    // console.log(normRelIntY);
    // let angle = normRelIntY* 75;
    let vec = createVector(cos(angle),sin(angle)).setMag(10);
    if(paddle.position.y<height/2)vec.y*=-1;
    this.acceleration.add(vec);
    this.canBounceOffPaddle=false;
    this.lastPaddleBounce = millis();
  }
}

*/
/*
works?
let relativeIntersectY = (paddle.position.y) - this.position.y;
let normRelIntY = relativeIntersectY/halfpaddleh;
console.log(normRelIntY);
let angle = normRelIntY* 75;
let vec = createVector(cos(angle),sin(angle)).setMag(10);
vec.y*=-1;
this.acceleration.add(vec);
this.canBounceOffPaddle=false;
this.lastPaddleBounce = millis();

*/
