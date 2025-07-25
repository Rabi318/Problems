//Inheritance approach

/**
types of ducks
indian duck
american duck
rubber duck
so on...
Behaviours 
swim
sound
flight
  */

class DSAInherDuck {
  swim() {
    console.log("I can swim");
  }
  sound() {
    console.log("Quack Quack");
  }
  flight() {
    console.log("I can fly");
  }
}

class DSAInherIndianDuck extends DSAInherDuck {}
