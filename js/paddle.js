class Paddle
{
  constructor(y,w,h,leftKey,rightKey,color)
  {
    this.position = createVector(width*0.5,y);
    this.size = createVector(w,h);
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.speed = 4;
    this.color = color;
  }

  update()
  {
    if(keyIsDown(this.leftKey) && (this.position.x -this.size.x*0.5> 0))
    {
      this.position.x-=this.speed;
    }
    else if(keyIsDown(this.rightKey) && (this.position.x + this.size.x*0.5< width))
    {
      this.position.x+=this.speed;
    }
  }

  show()
  {
    fill(this.color);
    noStroke();
    rect(this.position.x,
         this.position.y,
         this.size.x,
         this.size.y)
  }
}
