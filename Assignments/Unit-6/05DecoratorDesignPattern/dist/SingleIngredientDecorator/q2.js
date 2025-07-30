"use strict";
// Abstract class Beverage
class Beverage1 {
}
// Concrete class GreenTea
class GreenTea1 extends Beverage1 {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
// Sugar Decorator class
class Sugar extends Beverage1 {
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
// Example usage
const tea1 = new Sugar(new GreenTea1());
console.log(tea.getDescription()); // Green Tea + Sugar
console.log(tea.getCost()); // 50
