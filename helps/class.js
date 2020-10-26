// 📌INHERITANCE  BETWEEN  CLASSES  IN  JAVASCRIPT                                                               

// PRINCIPAL  CLASS 👇

class Individual {
  constructor(name, surname, age){
    this.name = name
    this.surname = surname
    this.age = age
  }
  
  // METHOD  TO  INTRODUCE  YOURSELF 👋
  
  introduceSelf(){
    document.write(
      `\n Hello! My name is ${this.name} ${this.surname}, I am ${this.age} years old.`
    )
  }
}

// NEW  CLASS.  IT'LL  "EXTEND"  THE  PRINCIPAL  CLASS. THAT'S  HOW  YOU  CREATE  INHERITANCE!!

class WebDeveloper extends Individual {
	constructor(name, surname, age){
      super(name, surname, age); // We're calling the principal class constructor
    }
  
  // METHOD  TO  INTRODUCE  YOURSELF  AS A  WEBDEV 👋 (overwrites introduceSelf from the ppal class)
  introduceSelf(){
    document.write(
      `\n Hello! My name is ${this.name} ${this.surname}, I am a web developer!`
    )
  }
}

// CREATING VARS FOR THOSE CLASSES AND USING THE METHODS

let Desire = new Individual('Desire', 'Marron', 24);
let devDesire = new WebDeveloper('Desire', 'Marron', 24);

Desire.introduceSelf();
devDesire.introduceSelf();