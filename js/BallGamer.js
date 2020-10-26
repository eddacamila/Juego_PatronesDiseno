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
  
  notify(ball, acction) {
      this.observers.forEach(observer => {
          observer.notify(ball, acction);
      });
  }
  
  move (direction) {

    // Move the square
    // this.notify(this);
    if (direction === 40) {
      this.y += this.speed.y;
      
      if (this.y + this.radius > this.stageB.height) {
        
        this.y = this.stageB.height - this.radius;
      }
      
    }
    
    if (direction === 38) {
      this.y -= this.speed.y;
      
      if (this.y - this.radius < 0) {
        this.y = this.radius;
      }
    }
    
    if (direction === 39) {
      this.x += this.speed.x;
      
      if (this.x + this.radius > this.stageB.width) {
        this.x = this.stageB.width - this.radius;
      }
    }
    
    if (direction === 37) {
      this.x -= this.speed.x;
      
      if (this.x - this.radius  < 0) {
        this.x = this.radius;
      }
      
    }
  }
  

}