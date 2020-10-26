class Factory {
  
  createBall (stage, type ) 
  {
    var ball;

    if (type === "gamer") {
      ball = new BallGamer(stage, {x:3,y:3}, '#FF0000', 3);
    } else if (type === "food") {
      ball = new BallFood(stage, {x:0,y:0}, '#00FF00',  2);
    } else if (type === "enemy") {
      ball = new BallEnemy(stage, {x:2,y:2}, '#0000FF',  5);
    } 
    
    ball.type = type;
    
    return ball;
  }
  
  createBalls (stage, type, num = 1 ) 
  {
    
    var balls = [];
    
    for (var j = 0; j < num; j++ ) {
      
      var ball = this.createBall (stage, type); 
      balls.push(ball);

    }
        
    return balls;
  }
  
  
}

