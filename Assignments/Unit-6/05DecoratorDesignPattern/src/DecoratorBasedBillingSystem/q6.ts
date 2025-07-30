// Abstract Beverage class
abstract class Beverage5 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Base beverages
class Espresso extends Beverage5 {
  getDescription(): string {
    return "Espresso";
  }
  getCost(): number {
    return 80;
  }
}

class LemonTea extends Beverage5 {
  getDescription(): string {
    return "LemonTea";
  }
  getCost(): number {
    return 40;
  }
}

// Toppings decorators
class Sugar5 extends Beverage5 {
  private beverage: Beverage;
  constructor(beverage: Beverage5) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.beverage.getCost() + 10;
  }
}

class Honey3 extends Beverage5 {
  private beverage: Beverage;
  constructor(beverage: Beverage5) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.beverage.getCost() + 20;
  }
}

class WhippedCream2 extends Beverage5 {
  private beverage: Beverage5;
  constructor(beverage: Beverage5) {
    super();
    this.beverage = beverage;
  }
  getDescription(): string {
    return this.beverage.getDescription() + " + WhippedCream";
  }
  getCost(): number {
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
