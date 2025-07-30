"use strict";
// Abstract Beverage class
class Beverage4 {
}
// Coffee base beverage
class Coffee extends Beverage4 {
    getDescription() {
        return "Coffee";
    }
    getCost() {
        return 50;
    }
}
// Sugar topping
class Sugar4 extends Beverage4 {
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
// Honey topping
class Honey2 extends Beverage4 {
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
// WhippedCream topping
class WhippedCream extends Beverage4 {
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
// Creating the custom beverage with toppings
const myDrink = new WhippedCream(new Honey2(new Sugar4(new Coffee())));
console.log(myDrink.getDescription()); // Coffee + Sugar + Honey + WhippedCream
console.log(myDrink.getCost()); // 95
