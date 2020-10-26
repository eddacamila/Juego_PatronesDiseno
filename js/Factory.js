/**
 * Implement to pattern Factory
 * 
 */
class Factory {
  
  /**
   * Created Ball by the type
   * @param {Stage} stage
   * @param {string} type
   * @returns {BallFood|BallGamer|BallEnemy|Factory.createBall.ball}
   */
  createBall (stage, type ) 
  {
    var ball;

    if (type === "gamer") {
      ball = new BallGamer(stage, {x:3,y:3}, '#FF0000', 4);
    } else if (type === "food") {
      ball = new BallFood(stage, {x:0,y:0}, '#00FF00',  2);
    } else if (type === "enemy") {
      ball = new BallEnemy(stage, {x:2,y:2}, '#0000FF',  5);
    } 
    
    ball.type = type;
    
    return ball;
  }
  
  /**
   * Created Array Ball by the type, max the num
   * @param {Stage} stage
   * @param {string} type
   * @param {int} num
   * @returns {Array|Factory.createBalls.balls}
   */
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

