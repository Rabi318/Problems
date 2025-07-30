"use strict";
// Car implements IVehicle
class Car1 {
    start() {
        console.log("Car is starting");
    }
}
// Bike implements IVehicle
class Bike {
    start() {
        console.log("Bike is starting");
    }
}
// Driver depends on abstraction (IVehicle), not concrete classes
class Driver {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
}
// Run the example
const carDriver = new Driver(new Car1());
carDriver.drive();
const bikeDriver = new Driver(new Bike());
bikeDriver.drive();
// Output:
// Car is starting
// Driving...
// Bike is starting
// Driving...
