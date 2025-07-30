// Define the common interface
interface IEngine {
  start(): void;
}

// Implement PetrolEngine
class PetrolEngine implements IEngine {
  start(): void {
    console.log("Petrol engine started");
  }
}

// Implement DieselEngine
class DieselEngine implements IEngine {
  start(): void {
    console.log("Diesel engine started");
  }
}

// Car depends on the abstraction (IEngine)
class Car2 {
  private engine: IEngine;

  constructor(engine: IEngine) {
    this.engine = engine;
  }

  drive(): void {
    this.engine.start();
    console.log("Driving car");
  }
}

// Example usage
const petrolCar = new Car2(new PetrolEngine());
petrolCar.drive();

const dieselCar = new Car2(new DieselEngine());
dieselCar.drive();
