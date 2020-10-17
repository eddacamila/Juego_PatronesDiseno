//Singlenton
class Game {
  
  constructor(stageG, countdown = 60) {
    this.stageG = stageG;
    this.score = 0;
    this.countdown = countdown;
    this.interval = null;
    this.gamer = null;
    
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
        console.debug(this.stageG);

        console.debug(1);
    this.stageG.context.canvas.addEventListener('click', this.start);
        console.debug(this.stageG);

        console.debug(2);
  }
  
  start() {
        console.debug(this.stageG);
        console.debug(3);

    // Reduce the countdown timer ever second
    this.interval = setInterval(function() {
      this.countdown--; 
    }, 1000);
    
    // Stop listening for click events
    console.debug(this.stageG);
//    this.stageG.context.canvas.removeEventListener('click', this.start);
//    this.eventKeys();
    // Put the target at a random starting point
//    moveTarget();
    // Kick off the draw loop
    
    const gamer1  = new BallGamer(this.stageG, 6, '#FF0000', 5);
    this.gamer = gamer1;
    gamer1.draw();
    console.debug(this.gamer);
    this.stageG.context.canvas.addEventListener('keydown', function(event) {
      event.preventDefault();
      console.log(event.key, event.keyCode);
      key = event.keyCode;
      gamer1.move(event.keyCode);
      gamer1.draw();
      gamer1.notify(gamer1);
      //      game();
    }, this);

    for (var j = 0; j < 20; j++ ) {
      const ballFood1 = new BallFood(this.stageG, 6, '#00FF00',  2);
      this.gamer.subscribe(ballFood1);
      ballFood1.draw();
    }

//    for (var i = 0; i < 10; i++ ) {
//      const ballEnemy1 = new BallEnemy(this.stageG, 6, '#0000FF',  6);
//      ballEnemy1.draw();
//    }
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
//    console.debug(this.gamer.observers);
    this.gamer.draw();
      console.debug(this.gamer.observers);
    this.gamer.observers.forEach(function(ballFood) {
      ballFood.draw();
    }, this);
    
  }
//  eventKeys () {
//    // Listen for keydown events
//    this.stageG.context.canvas.addEventListener('keydown', function(event) {
//      event.preventDefault();
//      console.log(event.key, event.keyCode);
//      key = event.keyCode;
//      //      game();
//      //      ballGamer1.notify(ballGamer1);
//    });
//  }
  
}