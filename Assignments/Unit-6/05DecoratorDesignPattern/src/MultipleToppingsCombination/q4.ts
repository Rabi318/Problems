// Abstract class Beverage
abstract class Beverage3 {
  abstract getDescription(): string;
  abstract getCost(): number;
}

// Concrete class GreenTea
class GreenTea3 extends Beverage3 {
  getDescription(): string {
    return "Green Tea";
  }

  getCost(): number {
    return 40;
  }
}

// Sugar Decorator class
class Sugar3 extends Beverage3 {
  private beverage: Beverage3;

  constructor(beverage: Beverage3) {
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

// Honey Decorator class
class Honey extends Beverage3 {
  private beverage: Beverage3;

  constructor(beverage: Beverage3) {
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

// Wrap GreenTea with Sugar and Honey
const tea3 = new Honey(new Sugar3(new GreenTea3()));

console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost()); // 70
