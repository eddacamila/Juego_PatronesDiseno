class BallEnemy extends Ball {
  constructor(stageB, speed, color , radius) {
    super(stageB, speed, color , radius); 
  }
  
  move () {
    
    if (this.x >= this.stageB.width || this.x <= 0){
      this.speed.x *= -1;
    }

    if (this.y >= this.stageB.height || this.y <= 0){
      this.speed.y *= -1;
    }
//
//    this.x += Math.round(Math.random() * (this.speed - 1) + 1);
//    this.y += Math.round(Math.random() * (this.speed - 1) + 1);
  
    this.x += this.speed.x;
    this.y += this.speed.y;

  }
  
}
