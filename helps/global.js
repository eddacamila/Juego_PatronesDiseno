//var context;
//var dx= 4;
//var dy=4;
//var y=150;
//var x=10;


// Collect The Square game

// Get a reference to the canvas DOM element
var canvas = document.getElementById('canvas');
console.debug(canvas);
// Get the canvas drawing context
var context = canvas.getContext('2d');
console.debug(context);



//
//function draw(){
//	context= myCanvas.getContext('2d');
//	context.clearRect(0,0,500,500);
//	context.beginPath();
//	context.fillStyle="#0000ff";
//	context.arc(x,y,20,0,Math.PI*2,true);
//	context.closePath();
//	context.fill();
//	if( x<0 || x > 500)
//	dx=-dx;
//	if( y<0 || y > 500)
//		dy=-dy;
//		x+=dx;
//		y+=dy;
//}
//
//setInterval(draw,10); 









// Your score
var score = 0;

// Properties for your square
var x = 50; // X position
var y = 100; // Y position
var speed = 6; // Distance to move each frame
var sideLength = 20; // Length of each side of the square

// FLags to track which keys are pressed
var down = false;
var up = false;
var right = false;
var left = false;

// Properties for the target square
var targetX = 0;
var targetY = 0;
var targetLength = 10;


// Countdown timer (in seconds)
var countdown = 30;
// ID to track the setTimeout
var id = null;

// Listen for keydown events
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = true;
  }
  if (event.keyCode === 38) { // UP
    up = true;
  }
  if (event.keyCode === 37) { // LEFT
    left = true;
  }
  if (event.keyCode === 39) { // RIGHT
    right = true;
  }
});

// Listen for keyup events
canvas.addEventListener('keyup', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = false;
  }
  if (event.keyCode === 38) { // UP
    up = false;
  }
  if (event.keyCode === 37) { // LEFT
    left = false;
  }
  if (event.keyCode === 39) { // RIGHT
    right = false;
  }
});

// Show the start menu
function menu() {
  erase();
  context.fillStyle = '#000000';
  context.font = '36px Arial';
  context.textAlign = 'center';
  context.fillText('Fat Balls!', canvas.width / 2, canvas.height / 4);
  context.font = '24px Arial';
  context.fillText('Click to Start', canvas.width / 2, canvas.height / 2);
  context.font = '18px Arial';
  context.fillText('Use the arrow keys to move', canvas.width / 2, (canvas.height / 4) * 3);
  // Start the game on a click
  canvas.addEventListener('click', startGame);
}

// Start the game
function startGame() {
	// Reduce the countdown timer ever second
  id = setInterval(function() {
    countdown--;
  }, 1000);
  // Stop listening for click events
  canvas.removeEventListener('click', startGame);
  // Put the target at a random starting point
  moveTarget();
  // Kick off the draw loop
  draw();
}

// Show the game over screen
function endGame() {
	// Stop the countdown
  clearInterval(id);
  // Display the final score
  erase();
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'center';
  context.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2);
}

// Move the target square to a random position
function moveTarget() {
  var Xmax = canvas.width - targetLength;
  var Ymax = canvas.height - targetLength;
  var min = targetLength;

  this.x = Math.round(Math.random() * (Xmax - min) + min);
  this.y = Math.round(Math.random() * (Ymax - min) + min);
  
  this.draw();
//  return [targetX, targetY];
 
}

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, 1000, 600);
}

// The main draw loop
function draw() {
  erase();
  // Move the square
  if (down) {
    y += speed;
  }
  if (up) {
    y -= speed;
  }
  if (right) {
    x += speed;
  }
  if (left) {
    x -= speed;
  }
  // Keep the square within the bounds
  if (y + sideLength > canvas.height) {
    y = canvas.height - sideLength;
  }
  if (y - sideLength < 0) {
    y = sideLength;
  }
  if (x - sideLength  < 0) {
    x = sideLength;
  }
  if (x + sideLength > canvas.width) {
    x = canvas.width - sideLength;
  }

 
 // Collide with the target 
var dx = targetX - x;
var dy = targetY - y;
var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < targetLength + sideLength) {
    // collision detected!
    // Respawn the target
    moveTarget();
    // Increase the score
    score++;
    sideLength++;
}
 
  
  // Draw the square
  
  context.beginPath();
  context.fillStyle = '#FF0000';
//  context.fillRect(x, y, sideLength, sideLength);
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(x,y,sideLength,0,Math.PI*2,true); 
  context.closePath();
  context.fill();

  
  
  context.beginPath();
  // Draw the target 
  
  context.fillStyle = '#00FF00';
  context.arc(targetX, targetY, targetLength, 0, Math.PI*2, true); 
//  context.fillRect(targetX, targetY, targetLength, targetLength);
  context.closePath();
  context.fill();
 
//  for (let i = 0; i < 10; i++) {
//    var xy = moveTarget();
//    
//    context.beginPath();
//    context.fillStyle = '#0000FF';
//    
//    context.arc(xy[0], xy[1], targetLength, 0, Math.PI*2, true); 
//    context.closePath();
//    context.fill();
//  }
  
  
  
  // Draw the score and time remaining
  context.fillStyle = '#000000';
  context.font = '24px Arial';
  context.textAlign = 'left';
  context.fillText('Score: ' + score, 10, 24);
  context.fillText('Time Remaining: ' + countdown, 10, 50);
  // End the game or keep playing
  if (countdown <= 0) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}


//function drawcircle() {
//  context.beginPath();
//  context.fillStyle="#000000";
//  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
//  context.arc(x,y,20,0,Math.PI*2,true); 
//  context.closePath();
//  context.fill();
//}
// Start the game
menu();
canvas.focus();
//drawcircle(); 