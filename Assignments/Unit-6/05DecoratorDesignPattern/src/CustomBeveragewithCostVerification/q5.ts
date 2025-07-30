// Abstract Beverage class
abstract class Beverage4 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Coffee base beverage
class Coffee extends Beverage4 {
  getDescription(): string {
    return "Coffee";
  }

  getCost(): number {
    return 50;
  }
}

// Sugar topping
class Sugar4 extends Beverage4 {
  private beverage: Beverage4;
  constructor(beverage: Beverage4) {
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

// Honey topping
class Honey2 extends Beverage4 {
  private beverage: Beverage4;
  constructor(beverage: Beverage4) {
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

// WhippedCream topping
class WhippedCream extends Beverage4 {
  private beverage: Beverage4;
  constructor(beverage: Beverage4) {
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

// Creating the custom beverage with toppings
const myDrink = new WhippedCream(new Honey2(new Sugar4(new Coffee())));

console.log(myDrink.getDescription()); // Coffee + Sugar + Honey + WhippedCream
console.log(myDrink.getCost()); // 95
