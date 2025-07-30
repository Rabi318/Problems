// Engine class
class Engine {
  start(): void {
    console.log("Engine started");
  }
}

// Car class tightly coupled with Engine
class Car {
  private engine: Engine;

  constructor() {
    this.engine = new Engine(); // Direct dependency (tight coupling)
  }

  drive(): void {
    this.engine.start();
    console.log("Car is driving");
  }
}

// Run the example
const myCar = new Car();
myCar.drive();
