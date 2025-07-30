"use strict";
// Bike class implements Vehicle
class Bike1 {
    start() {
        console.log("Bike is starting");
    }
}
// Car class implements Vehicle
class Car3 {
    start() {
        console.log("Car is starting");
    }
}
// Driver class that uses Vehicle (Strategy Pattern)
class Driver1 {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }
    setVehicle(vehicle) {
        this.vehicle = vehicle; // Swap strategy at runtime
    }
    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }
}
// Example usage
const driver = new Driver1(new Bike1());
driver.drive(); // Output: Bike is starting \n Driving...
driver.setVehicle(new Car3());
driver.drive(); // Output: Car is starting \n Driving...
