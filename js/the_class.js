let key;
// Your score
var score = 0;

var stageFrame = new Stage('canvas', 600, 400);
var  game1 = new Game(stageFrame);
game1.start();
stageFrame.context.canvas.focus();

function run() {
stageFrame.erase();
game1.draw();
  
//  stageFrame.clearRect(0, 0, stageFrame.canvas.width, stageFrame.canvas.height);
//  requestId = window.requestAnimationFrame(frame);
  
//  
//  ballGamer1.draw('#ffffff');
//  ballGamer1.move(key);
//  ballGamer1.draw();
//  
//  
//  
//  if (game1.countdown <= 0) {
//    game1.end();
//  } else {
//    window.requestAnimationFrame(run);
//  }
  
  
}

run();
//console.debug(stageFrame);

