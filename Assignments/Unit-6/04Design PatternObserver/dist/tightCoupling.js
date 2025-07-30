"use strict";
// Engine class
class Engine {
    start() {
        console.log("Engine started");
    }
}
// Car class tightly coupled with Engine
class Car {
    constructor() {
        this.engine = new Engine(); // Direct dependency (tight coupling)
    }
    drive() {
        this.engine.start();
        console.log("Car is driving");
    }
}
// Run the example
const myCar = new Car();
myCar.drive();
