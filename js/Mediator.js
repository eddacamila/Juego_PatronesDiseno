class Mediator {
  
  constructor() {
    this.participants = [];
  }

  register(participant) {
//    console.debug(participant);
      this.participants.push(participant);
      participant.mediator = this;
  }
  
  registerMany(participants) {
    
    for ( var participant in participants) { 
      this.participants.push(participants[participant]);
      participants[participant].mediator = this;
    }
  }
  
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