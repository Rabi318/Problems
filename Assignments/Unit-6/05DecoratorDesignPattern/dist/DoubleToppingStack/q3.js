"use strict";
// Abstract class Beverage
class Beverage2 {
}
// Concrete class GreenTea
class GreenTea2 extends Beverage {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
// Sugar Decorator class
class Sugar2 extends Beverage2 {
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
// Using two layers of Sugar decorator
const tea2 = new Sugar2(new Sugar2(new GreenTea2()));
console.log(tea.getDescription()); // Green Tea + Sugar + Sugar
console.log(tea.getCost()); // 60
// Output:
// Green Tea + Sugar + Sugar
// 60
