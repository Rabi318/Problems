"use strict";
// Abstract class Beverage
class Beverage {
}
// GreenTea class extending Beverage
class GreenTea extends Beverage {
    getDescription() {
        return "Green Tea";
    }
    getCost() {
        return 40;
    }
}
// Example usage
const tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost()); // 40
