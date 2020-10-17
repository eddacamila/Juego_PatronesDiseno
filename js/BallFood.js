
class BallFood extends Ball {
  constructor(stageB, speed, color , radius) {
    super(stageB, speed, color , radius); 

  }
  
  notify(ball) {
    
    if (this.collide(ball.x, ball.y, ball.radius)) {
      // collision detected!
      // Respawn the target
      this.draw('#FFFFFF');
      this.moveRandom();
      // Increase the score
//      score++;
      ball.radius++;
      this.draw();
      
    }
    
//    console.log([model.x, model.y, model.radius]);

  }

  
}