"use strict";
// Bike class implements Vehicle
class Bike {
    constructor(brand) {
        this.brand = brand;
    }
    getDetails() {
        return `Bike: ${this.brand}`;
    }
}
// Car class implements Vehicle
class Car {
    constructor(brand) {
        this.brand = brand;
    }
    getDetails() {
        return `Car: ${this.brand}`;
    }
}
// VehicleFactory with a static method
class VehicleFactory {
    static createVehicle(type, brand) {
        switch (type) {
            case "Bike":
                return new Bike(brand);
            case "Car":
                return new Car(brand);
            default:
                throw new Error(`Vehicle type '${type}' is not supported.`);
        }
    }
}
