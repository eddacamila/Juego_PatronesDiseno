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