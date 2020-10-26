//-------------------------------SCENE CLASS------------------------------//

function Scene(context, width, height, images)
{
    this.context = context;
    this.width = width;
    this.height = height;
    this.images = images;
    this.actors = [];
}

Scene.prototype.register = function(actor)
{
    this.actors.push(actor);
}

Scene.prototype.unregister = function(actor)
{
    var index = this.actors.indexOf(actor);
    if(index >= 0)
    {
        this.actors.splice(index,1);
    }
}

Scene.prototype.draw = function()
{
    this.context.clearRect(0, 0, this.width, this.height);
    for(var i = 0;i < this.actors.length; i++)
    {
      console.debug(this.actors);
        this.actors[i].draw();
    }
}

//-------------------------------ACTOR CLASS-------------------------------//

function Actor(scene, type, x, y )
{
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type;
    scene.register(this);
}

Actor.prototype.moveTo = function(x, y)
{
    this.x = x;
    this.y = y;
    this.scene.draw();
}

Actor.prototype.exit = function()
{
    this.scene.unregister(this);
    this.scene.draw();
}

Actor.prototype.draw = function()
{
    var image = this.scene.images[this.type]; // how does this work???
    console.debug([image, this.type]);
    this.scene.context.drawImage(image, this.x, this.y);
}

Actor.prototype.width = function()
{
    return this.scene.images[this.type].width;
}

Actor.prototype.height = function()
{
    return this.scene.images[this.type].height;
}

//-----------------------------SPACESHIP CLASS------------------------------//

function Spaceship(scene, x, y)
{
    Actor.call(this, scene, 'spaceShipImageId', x, y);
}

Spaceship.prototype = Object.create(Actor.prototype);

Spaceship.prototype.left = function()
{
    this.moveTo(Math.max(this.x - 10, 0), this.y);
}

Spaceship.prototype.right = function()
{
    var maxWidth = this.scene.width - this.width();
    this.moveTo(Math.min(this.x + 10, maxWidth), this.y);
}

Spaceship.prototype.type = "Spaceship";


var planet = document.getElementById('planet');
var ship = document.getElementById('ship');
var ctx = document.getElementById('canvas').getContext('2d');
var imageData = {'spaceShipImageId': ship, 'planetImageId': planet};
var scene = new Scene(ctx, 800, 600, imageData);
var spaceship = new Spaceship(scene, 10, 10);
scene.draw();