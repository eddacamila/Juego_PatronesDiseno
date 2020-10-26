//Created Stage
var stageFrame = new Stage('canvas', 600, 400);
//Created Game
var  game1 = new Game(stageFrame);
game1.menu();
stageFrame.context.canvas.focus();
