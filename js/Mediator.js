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