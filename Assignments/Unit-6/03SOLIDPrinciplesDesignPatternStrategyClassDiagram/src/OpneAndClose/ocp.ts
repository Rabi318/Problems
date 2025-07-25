// Step 1: Create a common interface
interface ShippingStrategy {
  calculate(): number;
}

// Step 2: Implement concrete strategies
class StandardShipping implements ShippingStrategy {
  calculate(): number {
    return 50;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(): number {
    return 100;
  }
}

// Step 3: Context class that uses the strategy
class Shipping {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  calculate(): number {
    return this.strategy.calculate();
  }
}

const standard = new Shipping(new StandardShipping());
console.log(standard.calculate()); // Output: 50

const express = new Shipping(new ExpressShipping());
console.log(express.calculate()); // Output: 100
