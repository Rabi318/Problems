// Abstract class Beverage
abstract class Beverage1 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Concrete class GreenTea
class GreenTea1 extends Beverage1 {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

// Sugar Decorator class
class Sugar extends Beverage1 {
  private beverage: Beverage1;

  constructor(beverage: Beverage1) {
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

// Example usage
const tea1 = new Sugar(new GreenTea1());
console.log(tea.getDescription()); // Green Tea + Sugar
console.log(tea.getCost()); // 50
