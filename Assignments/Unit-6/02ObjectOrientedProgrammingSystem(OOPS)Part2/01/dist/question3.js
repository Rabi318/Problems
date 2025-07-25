"use strict";
// Concrete strategies
class FastFly {
    fly() {
        console.log("Flying fast like a rocket!");
    }
}
class NoFly {
    fly() {
        console.log("I cannot fly");
    }
}
// Context class
class Duck1 {
    constructor(strategy) {
        this.flyStrategy = strategy;
    }
    performFly() {
        this.flyStrategy.fly();
    }
    setFlyStrategy(strategy) {
        this.flyStrategy = strategy;
    }
}
// Test the behavior
const duck = new Duck1(new FastFly());
duck.performFly(); // Output: Flying fast like a rocket!
duck.setFlyStrategy(new NoFly());
duck.performFly(); // Output: I cannot fly
