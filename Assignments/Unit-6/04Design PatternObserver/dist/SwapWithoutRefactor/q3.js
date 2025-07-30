"use strict";
// Implement PetrolEngine
class PetrolEngine {
    start() {
        console.log("Petrol engine started");
    }
}
// Implement DieselEngine
class DieselEngine {
    start() {
        console.log("Diesel engine started");
    }
}
// Car depends on the abstraction (IEngine)
class Car2 {
    constructor(engine) {
        this.engine = engine;
    }
    drive() {
        this.engine.start();
        console.log("Driving car");
    }
}
// Example usage
const petrolCar = new Car2(new PetrolEngine());
petrolCar.drive();
const dieselCar = new Car2(new DieselEngine());
dieselCar.drive();
