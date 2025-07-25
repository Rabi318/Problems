"use strict";
// Step 2: Implement concrete strategies
class StandardShipping {
    calculate() {
        return 50;
    }
}
class ExpressShipping {
    calculate() {
        return 100;
    }
}
// Step 3: Context class that uses the strategy
class Shipping {
    constructor(strategy) {
        this.strategy = strategy;
    }
    calculate() {
        return this.strategy.calculate();
    }
}
const standard = new Shipping(new StandardShipping());
console.log(standard.calculate()); // Output: 50
const express = new Shipping(new ExpressShipping());
console.log(express.calculate()); // Output: 100
