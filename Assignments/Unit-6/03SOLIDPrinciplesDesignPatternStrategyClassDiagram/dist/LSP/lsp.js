"use strict";
class CanFly {
    fly() {
        console.log("Flying...");
    }
}
class CannotFly {
    fly() {
        console.log("I can't fly");
    }
}
class Bird {
    constructor(strategy) {
        this.flyStrategy = strategy;
    }
    fly() {
        this.flyStrategy.fly();
    }
}
const sparrow = new Bird(new CanFly());
const ostrich = new Bird(new CannotFly());
sparrow.fly();
ostrich.fly();
