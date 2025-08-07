"use strict";
class Car {
    constructor(builder) {
        this.brand = builder.brand;
        this.engine = builder.engine;
        this.color = builder.color;
        this.sunroof = builder.sunroof;
        this.automaticTransmission = builder.automaticTransmission;
    }
    display() {
        console.log("Car Details:");
        console.log(`Brand: ${this.brand}`);
        console.log(`Engine: ${this.engine}`);
        console.log(`Color: ${this.color}`);
        console.log(`Sunroof: ${this.sunroof}`);
        console.log(`Automatic Transmission: ${this.automaticTransmission}`);
    }
}
class CarBuilder {
    constructor() {
        this.brand = "";
        this.engine = "";
        this.color = "";
        this.sunroof = false;
        this.automaticTransmission = false;
    }
    setBrand(brand) {
        this.brand = brand;
        return this;
    }
    setEngine(engine) {
        this.engine = engine;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    addSunroof() {
        this.sunroof = true;
        return this;
    }
    setAutomaticTransmission() {
        this.automaticTransmission = true;
        return this;
    }
    build() {
        return new Car(this);
    }
}
function main() {
    const teslaModelS = new CarBuilder()
        .setBrand("Tesla Model S")
        .setEngine("Electric")
        .setColor("Black")
        .addSunroof()
        .setAutomaticTransmission()
        .build();
    teslaModelS.display();
}
main();
