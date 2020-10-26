//Singlenton
class Game {
  
  constructor(stageG, countdown = 60) {
    this.stageG = stageG;
    this.score = 0;
    this.countdown = countdown;
    this.interval = null;
    this.mediator = null;
    
    if (typeof Game.instance === 'object') {
      return Game.instance;
    }
  
    Game.instance = this;
    
    return this;
  }
  
    // Show the start menu
  menu() {
    this.stageG.erase();
    this.stageG.context.fillStyle = '#000000';
    this.stageG.context.font = '36px Arial';
    this.stageG.context.textAlign = 'center';
    this.stageG.context.fillText('Fat Balls!', this.stageG.width / 2, this.stageG.height / 4);
    this.stageG.context.font = '24px Arial';
    this.stageG.context.fillText('Click to Start', this.stageG.width / 2, this.stageG.height / 2);
    this.stageG.context.font = '18px Arial';
    this.stageG.context.fillText('Use the arrow keys to move', this.stageG.width / 2, (this.stageG.height / 4) * 3);
  
    // Start the game on a click
//    this.stageG.context.canvas.addEventListener('click', this.start.bind(this), false);
    this.stageG.context.canvas.addEventListener('click', function(event) {
      event.preventDefault();
      Game.instance.start();
    });
    
  }
  
  run() {
    if (Game.instance.runner === true) {
      Game.instance.stageG.erase();
      Game.instance.draw();

      Game.instance.stageG.context.fillStyle = '#000000';
      Game.instance.stageG.context.font = '18px Arial';
      Game.instance.stageG.context.textAlign = 'left';
      Game.instance.stageG.context.fillText('Score: ' + Game.instance.score, 10, 24);
      Game.instance.stageG.context.fillText('Time Remaining: ' + Game.instance.countdown, 10, 50);
    
      if (Game.instance.countdown <= 0) {
        Game.instance.end();
      } else {
        window.requestAnimationFrame(Game.instance.run);
      }
    }
  }
  
  start() {
    
    this.stageG.clear();
    // Reduce the countdown timer ever second
    this.interval = setInterval(function() {
      Game.instance.countdown--; 
    }, 2000);
    
    // Stop listening for click events
//    console.debug(this.stageG);
    this.stageG.context.canvas.removeEventListener('click', this.start);

//    this.eventKeys();
    // Put the target at a random starting point
//    moveTarget();
    // Kick off the draw loop
    
    var factory = new Factory();
    
    var mediator = new Mediator();
    
    
    
    const gamer1  = factory.createBall(this.stageG, 'gamer' );
    mediator.register(gamer1);
    
    var ballFoods = factory.createBalls(this.stageG, 'food', 20);
    mediator.registerMany(ballFoods);
    
    var ballEnemys = factory.createBalls(this.stageG, 'enemy', 10);
    mediator.registerMany(ballEnemys);
    
    this.mediator = mediator;
   
    this.stageG.context.canvas.addEventListener('keydown', function(event) {
      event.preventDefault();
      console.log(event.key, event.keyCode);
      gamer1.move(event.keyCode);

    }, this);

    this.runner = true;
    this.run();

  }
  
  end() {
	// Stop the countdown
    clearInterval(this.interval);
    // Display the final score
    this.stageG.erase();
    this.stageG.context.fillStyle = '#000000';
    this.stageG.context.font = '24px Arial';
    this.stageG.context.textAlign = 'center';
    this.stageG.context.fillText('Final Score: ' + this.score, this.stageG.width / 2, this.stageG.height / 2);
  }
  
  
  draw() {

    var iterBalls = new Iterator(this.mediator.participants);
    
    iterBalls.each(function(ball) {
      
      if (ball.type === 'enemy') {
        ball.move();
      }
      
      ball.report(ball.x, ball.y);
      ball.draw();
    }, this);
    
  }
  
  notify(ball, acction) {
    
    if (acction === 'add') {
      this.score++;
    } else if(acction === 'sub') {
      this.score--;
      
      if (ball.radius <= 2) {
        this.end();
      }
      
    }

  }
  
}