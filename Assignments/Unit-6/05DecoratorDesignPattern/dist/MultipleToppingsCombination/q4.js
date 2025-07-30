"use strict";
// Abstract class Beverage
class Beverage3 {
}
// Concrete class GreenTea
class GreenTea3 extends Beverage3 {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
// Sugar Decorator class
class Sugar3 extends Beverage3 {
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
// Honey Decorator class
class Honey extends Beverage3 {
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
// Wrap GreenTea with Sugar and Honey
const tea3 = new Honey(new Sugar3(new GreenTea3()));
console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost()); // 70
