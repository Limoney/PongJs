class Block
{
  constructor(x,y,w,h,color,indestructable)
  {
    this.position = createVector(x,y);
    this.size = createVector(w,h);
    this.color = color;
    this.indestructable = indestructable;
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
