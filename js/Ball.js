class Ball {
  /**
   * 
   * @param {Stage} stageB
   * @param {object{x,y}} speed
   * @param {string} color
   * @param {int} radius
   * @returns {Ball}
   */
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
    this.type = null;
    
    this.mediator = null;
  }


  report(x, y, to) {
    this.mediator.report(x, y, this, to);
  }
  
  receive (x, y, from) {

    if (this.collide(x, y, from.radius)) {
      // collision detected!
      // Respawn the target
//      this.draw('#FFFFFF');

      if (this.type === 'enemy' && from.type === 'enemy') {
        this.speed.x *= -1;
        this.speed.y *= -1;
        this.color = this.getRandomColor();
        from.speed.y *= -1;
        from.speed.y *= -1;
        from.color = this.getRandomColor();
      }
      
      if (this.type === 'gamer' && from.type === 'food') {
        
        from.moveRandom();
        this.radius++;
        this.notify(this, 'add');
      }
      
//      if (this.type === 'food' && from.type === 'gamer') {
//        
//        this.moveRandom();
//        from.radius++;
//      }
      
      
      if (this.type === 'gamer' && from.type === 'enemy') {
        
//        this.moveRandom();
        if (this.radius >= 2) {
          this.radius--;
          from.speed.x *= -1;
          from.speed.y *= -1;
          from.speed.x ++;
          from.speed.y ++;
          this.notify(this, 'sub');
        }
      }
      
//      if (this.type === 'enemy' && from.type === 'food') {
//        
////        this.moveRandom();
//          this.radius++;
//          if (this.radius > 10) {
//            this.speed.x ++;
//            this.speed.y ++;
//          }
//          from.moveRandom();
//      }
      
//      if (this.type === 'enemy' && from.type === 'gamer') {
//        
////        this.moveRandom();
//        if (from.radius >= 2) {
//          from.radius--;
//          this.speed.x ++;
//          this.speed.y ++;
//          this.speed.x *= -1;
//          this.speed.y *= -1;
//          from.notify(from, 'sub');
//        }
//      }
      
      
      // Increase the score
  //      score++;
//      ball.radius++;
//      this.draw();

    }
    
    
  }

  /**
   * Draw the ball
   * 
   */
  draw () {
    this.stageB.context.beginPath();
    var currentR = this.radius;
    this.stageB.context.fillStyle = this.color;

    // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
    this.stageB.context.arc(this.x, this.y, currentR, 0, Math.PI*2, true);
    this.stageB.context.closePath();
    this.stageB.context.fill();
  }

  /**
   * Validate the collition
   * 
   */
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

  /**
   * Move the ball by random cordenates
   * 
   */
  moveRandom() {
    var Xmax = this.stageB.width - this.radius;
    var Ymax = this.stageB.height - this.radius;
    var min = this.radius;

    this.x = Math.round(Math.random() * (Xmax - min) + min);
    this.y = Math.round(Math.random() * (Ymax - min) + min);
    console.debug([this.x, this.y]);
  }
  
  /**
   * Get a collor in HEX by random
   * @returns {String}
   */
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
