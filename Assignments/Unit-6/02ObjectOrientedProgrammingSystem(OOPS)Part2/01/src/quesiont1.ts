class Duck {
  swim() {
    console.log("I know swimming");
  }
}

class MallardDuck extends Duck {}

let mallard = new MallardDuck();
mallard.swim();

class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Penguin extends Bird {
  fly() {
    console.log("I cannot fly");
  }
}

let bird = new Bird();
let penguin = new Penguin();

bird.fly(); // Output: I can fly
penguin.fly(); // Output: I cannot fly

// Simulated interface: IDuck with swim(), fly(), sound()

class ToyDuck {
  fly() {
    console.log("Cannot fly");
  }

  sound() {
    console.log("Cannot sound");
  }

  swim() {
    console.log("Can float on water");
  }
}

let toy = new ToyDuck();
toy.fly(); // Output: Cannot fly
toy.sound(); // Output: Cannot sound
toy.swim(); // Output: Can float on water
