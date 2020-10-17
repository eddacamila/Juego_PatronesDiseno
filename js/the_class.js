let key;
// Your score
var score = 0;

//Singlenton
class Game {
  
  constructor(stage, countdown = 60) {
    this.stage = stage;
    this.score = 0;
    this.countdown = countdown;
    this.interval = null;
    
    if (typeof Game.instance === 'object') {
      return Game.instance;
    }

    Game.instance = this;
    
    return this;
  }
  
    // Show the start menu
  menu() {
    this.stage.erase();
    this.stage.context.fillStyle = '#000000';
    this.stage.context.font = '36px Arial';
    this.stage.context.textAlign = 'center';
    this.stage.context.fillText('Fat Balls!', this.stage.width / 2, this.stage.height / 4);
    this.stage.context.font = '24px Arial';
    this.stage.context.fillText('Click to Start', this.stage.width / 2, this.stage.height / 2);
    this.stage.context.font = '18px Arial';
    this.stage.context.fillText('Use the arrow keys to move', this.stage.width / 2, (this.stage.height / 4) * 3);
    // Start the game on a click
    this.stage.context.canvas.addEventListener('click', this.start);
  }
  
  start() {
      // Reduce the countdown timer ever second
    this.interval = setInterval(function() {
      this.countdown--;
    }, 1000);
    // Stop listening for click events
    this.stage.context.removeEventListener('click', this.start);
    // Put the target at a random starting point
//    moveTarget();
    // Kick off the draw loop
    
    const ballGamer1 = new BallGamer(stageFrame, 6, '#FF0000', 5);
    ballGamer1.draw();


    for (i = 0; i < 20; i++ ) {
      const ballFood1 = new BallFood(stageFrame, 6, '#00FF00',  2);
      ballGamer1.subscribe(ballFood1);
      ballFood1.draw();
    }

    for (i = 0; i < 10; i++ ) {
      const ballEnemy1 = new BallEnemy(stageFrame, 6, '#0000FF',  6);
      ballEnemy1.draw();
    }
  }
  
  end() {
	// Stop the countdown
    clearInterval(this.interval);
    // Display the final score
    stageFrame.erase();
    stageFrame.context.fillStyle = '#000000';
    stageFrame.context.font = '24px Arial';
    stageFrame.context.textAlign = 'center';
    stageFrame.context.fillText('Final Score: ' + this.score, stageFrame.width / 2, stageFrame.height / 2);
  }
  
  
  
      // Listen for keydown events
   this.stage.context.context.canvas.addEventListener('keydown', function(event) {
     event.preventDefault();
   //  console.log(event.key, event.keyCode);
      key = event.keyCode;
//      game();
//      ballGamer1.notify(ballGamer1);
   });
  
}

function run() {
 
    var instance1 = new Game(80);
    var instance2 = new Game();
 
    alert("Same instance? " + (instance1 === instance2) + instance2.countdown);  
}




// Class stage
class Stage {
  constructor(id, width, height) {

    this.context = document.getElementById(id).getContext('2d');
    this.context.canvas.width = this.width = width;
    this.context.canvas.height = this.height = height;
    
  }
  
  clear () {
    this.context.clearRect(0, 0, this.width, this.height);
  }
  
  erase () {
    this.context.fillStyle = '#FFFFFF';
    this.context.fillRect(0, 0, this.width, this.height);
  }
  
}

//const canvas = document.getElementById('canvas');
//const context = canvas.getContext('2d');
//var countdown = 30;

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


class BallGamer extends Ball {
  constructor(stageB, speed, color , radius) {
    super(stageB, speed, color , radius); 
    this.observers = [];
  }
  
  subscribe( c ){
    this.observers.push(c);
  }
  
  unsubscribe( c ) {
      this.observers = this.observers.filter(observer => observer instanceof c !== true);
  }
  
  notify(ball) {
      this.observers.forEach(observer => {
          observer.notify(ball);
      });
  }
  
  move (direction) {
    // Move the square
    this.notify(this);
    if (direction === 40) {
      this.y += this.speed;
      
      if (this.y + this.radius > this.stageB.height) {
        
        this.y = this.stageB.height - this.radius;
      }
      
    }
    
    if (direction === 38) {
      this.y -= this.speed;
      
      if (this.y - this.radius < 0) {
        this.y = this.radius;
      }
    }
    
    if (direction === 39) {
      this.x += this.speed;
      
      if (this.x + this.radius > this.stageB.width) {
        this.x = this.stageB.width - this.radius;
      }
    }
    
    if (direction === 37) {
      this.x -= this.speed;
      
      if (this.x - this.radius  < 0) {
        this.x = this.radius;
      }
      
    }
  }
  

}

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
      this.draw();
      // Increase the score
      score++;
      ball.radius++;
      
    }
//    console.log([model.x, model.y, model.radius]);

  }

  
}

class BallEnemy extends Ball {
  constructor(stageB, speed, color , radius) {
    super(stageB, speed, color , radius); 
  }
}






function run() {
//  stageFrame.clearRect(0, 0, stageFrame.canvas.width, stageFrame.canvas.height);
//  requestId = window.requestAnimationFrame(frame);
  var stageFrame = new Stage('canvas', 600, 400);
  game1 = new Game(stageFrame);
  game1.menu();
//  
//  ballGamer1.draw('#ffffff');
//  ballGamer1.move(key);
//  ballGamer1.draw();
//  
  if (game1.countdown <= 0) {
    game1.end();
  } else {
    window.requestAnimationFrame(run);
  }
  
  
}

run();
//console.debug(stageFrame);

