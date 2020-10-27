
# Fat Ball o Monstruo come círculos. :basketball:
Ejemplo de aplicación de patrones de diseño a un juego básico.

## Demo Temporal 👽
[Ver Demo ](https://imasdyd.com/Juego_PatronesDiseno/)

## Contexto del Juego
Con esta sencilla aplicación de Javascript apoyado de canvas queremos simular una aproximación al juego agar.io
El juego se basa en el movimiento de bolas, donde encontraremos 3 tipos de bolas, "Comida" (Verde), "Enemigos" (Cambian de color) y "Jugador" (Rojo).
Jugador (Rojo): Se representa con una bola roja que inicia con un radio de 4px lo cual permite subsistir sin "comer" a 2 golpes, la idea es colisionar con la "Comida" que son bolas de color verdes que están quietas y aparecen aleatoriamente sobre el escenario cada vez que son comidas.
Comida (Verde): Al se colisionada por el jugador cambiará de posición aleatoriamente y sumará tamaño "Fuerza" y puntos al jugador.
Enemigos (Color Random): Los enemigos al collicionar con le "Jugador" debilitan y lo "adelgazan" así como van quitando puntos, adicionalmente cada vez que colisionan con el jugador a veces rebotan y aumentan de velocidad, como a veces lo consumen totalmente (Truco oculto).

La idea es mantenerse vivo en el juego los 30 segundos que dura el cronometro y hacer la mayor cantidad de puntos posibles.

## Explicación general del Código e imagen de contexto
Las clases que se muestran en el gráfico estan distribuidas en un archivo js diferente. La clase que reune más información en líneas de código es game porque esta implementa los diversos patrones para que funcione el juego. Según lo anterior, primero expondremos el código del archivo ejecutable y después todos los patrones para entender este Game.js: 
```
//Created Stage
var stageFrame = new Stage('canvas', 600, 400);
//Created Game
var  game1 = new Game(stageFrame);
game1.menu();
stageFrame.context.canvas.focus();

```
### Diagrama general de clases

![Diagrama Clases-JuegoComeCirculos](imagenes/DiagramaClasesJuegoPython-DiagramaFinal.png)


En este juego encontramos los siguientes patrones de diseño:
## 1. Patrón Observer :eyes:
Observa los **cambios de estado** que tenga un **sujeto u objeto** para notificar sus suscripciones.
Para este juego el objeto **BallGame** (Bola-jugador) **se suscribe al Game**(Clase que contiene score-tiempo y elementos para que funcione el juego).  
Este Patrón se usa para actualizar el puntaje-score, generando que la actualización de estya información según la interacción  y el incremento del radio del BallGamer.
### Según esto tenemos en el código:
**1.Sobre la clase BallGamer:**
```
class BallGamer extends Ball {
...

  /**
   * Set a new observer to observers
   * @param {object} c
   */
  subscribe( c ){
    this.observers.push(c);
  }
  
  /**
   * Remove observer to observers
   * @param {object} c
   */
  unsubscribe( c ) {
      this.observers = this.observers.filter(observer => observer instanceof c !== true);
  }
  
  /**
   * Set a notifiaction all  to observers
   * @param {object} ball
   * @param {string} action
   */
  notify(ball, action) {
      this.observers.forEach(observer => {
          observer.notify(ball, action);
      });
  }
 .... 
 }
```
**2.Sobre la clase Game:**
```
class Game {...
  
  /**
   * Get notification from BallGamer partten Observer
   * @param {Ball} ball
   * @param {string} acction
   * 
   */
  notify(ball, acction) {
    
    if (acction === 'add') {
      this.score++;
    } else if(acction === 'sub') {
      this.score--;
      
      if (ball.radius <= 2) {
        console.log('End');
        this.runner = false;
        setTimeout(this.end, 300);
      }
      
    }

  }
  
}
```
### Diagrama Patrón Observer

![Diagrama Clases-Observer](imagenes/DiagramaClasesJuegoPython-Observador.png)

## 2. Patrón Singleton :walking:
Restringe la creación de objetos de la clase **Game**, porque hay una única clase-objeto juego. De este nos interesa el Stage o escenario.Que tiene la información de ancho, alto del cuadro de juego, la cuenta regresiva, el score, además necesitamos el inicio y finalizacion del juego.
### Según esto tenemos en el código:
**2.Sobre la clase Game:**
```
//Singlenton
class Game {
  
  /**
   * 
   * @param {Stage} stageG
   * @param {int} countdown
   * @returns {Game.constructor|Game|Game.instance}
   */
  constructor(stageG, countdown = 30) {
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
  ....
```
### Diagrama Patrón Singleton

![Diagrama Clases-Singleton](imagenes/DiagramaClasesJuegoPython-Singleton.png)

## 3. Patrón Mediator :speech_balloon:
Comunica todas las interacciones entre **BallGamer, BallFood, BallEnemy"** a la clase **Game** para que se muestren los cambios de color, se reste el radio si hay colisión, si muere el jugador o para que aparezca más alimento **BallFood**. Para implementar esta capacidad se creo una clase **Mediator**
### Según esto tenemos en el código:
**1. Clase Mediator**
```
/**
 * Implement to pattern Mediator, for communication between all balls
 * 
 */
class Mediator {
  
  constructor() {
    this.participants = [];
  }

/**
 * Set a participant to array participats
 * @param {objet} participant
 */
  register(participant) {
      this.participants.push(participant);
      participant.mediator = this;
  }
  
  /**
 * Set many participants to array participats
 * @param {array} participants
 */
  registerMany(participants) {
    
    for ( var participant in participants) { 
      this.participants.push(participants[participant]);
      participants[participant].mediator = this;
    }
  }
  
  /**
   * Report to alll participants a message from anoter participants.
   * @param {int} x
   * @param {int} y
   * @param {Ball} from
   * @param {Ball} to
   */
  report(x, y, from, to) {
    if (to) {                      // single message
        to.receive(x, y, from);    
    } else {                       // broadcast message
      for ( var key in this.participants) {   
        if (this.participants[key] !== from) {
            this.participants[key].receive(x, y, from);
        }
      }
    }
  }
  
}
```
**2. En la clase game:**
```
class Game {
....
//Call class Mediator
    var mediator = new Mediator();
            
    const gamer1  = factory.createBall(this.stageG, 'gamer' );
    mediator.register(gamer1);
    gamer1.subscribe(Game.instance);
    
    var ballFoods = factory.createBalls(this.stageG, 'food', 30);
    mediator.registerMany(ballFoods);
    
    var ballEnemys = factory.createBalls(this.stageG, 'enemy', 20);
    mediator.registerMany(ballEnemys);
    
    this.mediator = mediator;
   
```

### Diagrama Patrón Mediator

![Diagrama Clases-Mediator](imagenes/DiagramaClasesJuegoPython-Mediador.png)

## 4. Patrón FactoryMethod :factory:
Este patrón crea nuevos objetos de cada una de las bolas del juego: **BallEnemy, BallFood, BallGamer".** Es importante subrayar que el objetivo clave del método Factory es la extensibilidad. Los métodos de fábrica se utilizan con frecuencia en aplicaciones que manipulan colecciones de objetos que son diferentes pero que al mismo tiempo tienen muchas características (es decir, métodos y propiedades) en común[2].

Para implementar este patrón, se creo una clase independiente denominada Factory y es llamada en Game, creando los tipos de objetos que se necesitan para jugar.  

### Según esto tenemos en el código:
**1. Clase Factory**
```
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


```

**1. En Clase Game**
```
class Game {...
    //Call class Factory
    var factory = new Factory();
    //Call class Mediator
    var mediator = new Mediator();
            
    const gamer1  = factory.createBall(this.stageG, 'gamer' );
    mediator.register(gamer1);
    gamer1.subscribe(Game.instance);
    
    var ballFoods = factory.createBalls(this.stageG, 'food', 30);
    mediator.registerMany(ballFoods);
    
    var ballEnemys = factory.createBalls(this.stageG, 'enemy', 20);
    mediator.registerMany(ballEnemys);
    
    this.mediator = mediator;
}
```

### Diagrama Patrón Factory Method
![Diagrama Clases-FactoryMethod](imagenes/DiagramaClasesJuegoPython-FactoryMethod.png)

## 5. Patrón Iterator :recycle:
Este patrón se utiliza para dibujar las collecciones de objetos asociados a los tipos de bola: **BallGame, BallFood, BallEnemy** . Entonces, este patrón de iterador permite recorrer de manera efectiva una colección de objetos, que son los tipos de bola para dibujarlos en el lienzo, comunicando esto por medio del mediador al **Game**. Para la implementación se creo una clase Iterator que se llama en Game, específicamente en la función draw().

El patrón Iterator permite a los desarrolladores de JavaScript diseñar construcciones de bucle que son mucho más flexibles y sofisticadas.
### Según esto tenemos en el código:
**1. En Clase Iterator**
```
/**
 * Pattern Iterator
 * 
 */
class Iterator {
  /**
   * 
   * @param {Array} items
   * @returns {Iterator}
   */
  constructor(items) {
    this.index = 0;
    this.items = items;
  }
  
  /**
   * Get the first item from array
   * @returns {Array}
   */
  first () {
    this.reset();
    return this.next();
  }
  
  /**
   * Get the next item from array
   * @returns {Array}
   */
  next() {
    return this.items[this.index++];
  }
  
  /**
   * Validate value to index, Never should be maJor to length
   * @returns {Boolean}
   */
  hasNext() {
    return this.index <= this.items.length;
  }
  
  /**
   * Reset index
   */
  reset() {
    this.index = 0;
  }
  
  /**
   * Loop for all Array
   * @param {array} callback
   */
  each(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
  
}
```
**2. En Clase Game**
```
class Game {...
 * Draw all ball at the stage
   */
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
  
  
}
```
### Diagrama Patrón Iterator

![Diagrama Clases-Iterator](imagenes/DiagramaClasesJuegoPython-Iterador.png)

## Bibliografía :green_book:
[1]https://anexsoft.com/patron-observador-con-javascript-observer-pattern


[2] https://www.dofactory.com/javascript/design-patterns


## Código Base  :rotating_light:

- http://bencentra.com/2017-07-11-basic-html5-canvas-games.html

- https://www.webfx.com/blog/web-design/bouncing-a-ball-around-with-html5-and-javascript/

- https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

- https://stackoverflow.com/questions/15403510/object-oriented-javascript-for-canvas


## Sugerencias :pushpin: 

Aplicar lógica de Quadtree para mayor eficiencia para calcular coliciones.

http://hawkee.com/snippet/9732/

## Autores ✒️

Edda Camila Rodrigez - 20202099033 :woman:


Néstor Camilo Beltrán - 20202099021 :older_man:
