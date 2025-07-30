// Abstract class Beverage
abstract class Beverage2 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Concrete class GreenTea
class GreenTea2 extends Beverage {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

// Sugar Decorator class
class Sugar2 extends Beverage2 {
  private beverage: Beverage2;

  constructor(beverage: Beverage2) {
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

// Using two layers of Sugar decorator
const tea2 = new Sugar2(new Sugar2(new GreenTea2()));

console.log(tea.getDescription()); // Green Tea + Sugar + Sugar
console.log(tea.getCost()); // 60

// Output:
// Green Tea + Sugar + Sugar
// 60
