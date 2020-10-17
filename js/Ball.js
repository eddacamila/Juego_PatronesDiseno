class Ball {
  
  constructor(stageB, speed, color , radius ) {
    
    var Xmax = stageB.width - radius;
    var Ymax = stageB.height - radius;
    var min = radius;
    this.stageB = stageB;
    this.x = Math.round(Math.random() * (Xmax - min) + min);
    this.y = Math.round(Math.random() * (Ymax - min) + min);
    this.speed = speed;
    this.color = color;
    this.radius = radius;
  }
  
  draw (color = false) {

    this.stageB.context.beginPath();
    var currentR = this.radius;
    
    if (color) {
      this.stageB.context.fillStyle = color;
      currentR += 1;
    } else {
      this.stageB.context.fillStyle = this.color;
    }
    
  //  context.fillRect(x, y, sideLength, sideLength);
    // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
    this.stageB.context.arc(this.x, this.y, currentR, 0, Math.PI*2, true); 
    this.stageB.context.closePath();
    this.stageB.context.fill();
  }
  
  collide (x, y, radius) {
  
   // Collide with the target 
    var dx = this.x - x;
    var dy = this.y - y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + radius) {
       return true;
    }
    
    return false;
  }
  
    
  moveRandom() {
    var Xmax = this.stageB.width - this.radius;
    var Ymax = this.stageB.height - this.radius;
    var min = this.radius;

    this.x = Math.round(Math.random() * (Xmax - min) + min);
    this.y = Math.round(Math.random() * (Ymax - min) + min);
    console.debug([this.x, this.y]);
  }
  
  
}