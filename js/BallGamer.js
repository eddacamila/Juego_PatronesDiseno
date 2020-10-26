class BallGamer extends Ball {
  /**
   * 
   * @param {Stage} stageB
   * @param {object{x,y}} speed
   * @param {string} color
   * @param {int} radius
   * @returns {BallGamer}
   */
  constructor(stageB, speed, color , radius) {
    super(stageB, speed, color , radius); 
    this.observers = [];
  }
  
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
  
  /**
   * Get a key down event and set the direction to the ball
   * @param {Number event} direction
   * 
   */
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