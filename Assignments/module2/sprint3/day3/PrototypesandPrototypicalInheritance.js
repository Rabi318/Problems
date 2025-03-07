class Animal {
  constructor() {
    this.type = "Animal";
  }
  sound() {
    console.log("Animal sound");
  }
}

class Dog extends Animal {
  constructor() {
    super();
  }
  sound() {
    console.log("Bark");
  }
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.contructor = Dog;

const myDog = new Dog();
myDog.sound();
