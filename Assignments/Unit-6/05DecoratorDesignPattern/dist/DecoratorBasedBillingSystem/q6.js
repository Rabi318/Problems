"use strict";
// Abstract Beverage class
class Beverage5 {
}
// Base beverages
class Espresso extends Beverage5 {
    getDescription() {
        return "Espresso";
    }
    getCost() {
        return 80;
    }
}
class LemonTea extends Beverage5 {
    getDescription() {
        return "LemonTea";
    }
    getCost() {
        return 40;
    }
}
// Toppings decorators
class Sugar5 extends Beverage5 {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}
class Honey3 extends Beverage5 {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}
class WhippedCream2 extends Beverage5 {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + WhippedCream";
    }
    getCost() {
        return this.beverage.getCost() + 15;
    }
}
// Example orders
const order1 = new Honey3(new WhippedCream2(new Espresso()));
const order2 = new Sugar5(new Sugar5(new LemonTea()));
console.log("Order 1:", order1.getDescription()); // Espresso + WhippedCream + Honey
console.log("Cost 1: ₹", order1.getCost()); // 80 + 15 + 20 = ₹115
console.log("Order 2:", order2.getDescription()); // LemonTea + Sugar + Sugar
console.log("Cost 2: ₹", order2.getCost()); // 40 + 10 + 10 = ₹60
