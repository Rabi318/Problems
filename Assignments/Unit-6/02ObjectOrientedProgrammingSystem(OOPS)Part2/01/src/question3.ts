interface FlyStrategy {
  fly(): void;
}

// Concrete strategies
class FastFly implements FlyStrategy {
  fly(): void {
    console.log("Flying fast like a rocket!");
  }
}

class NoFly implements FlyStrategy {
  fly(): void {
    console.log("I cannot fly");
  }
}

// Context class
class Duck1 {
  private flyStrategy: FlyStrategy;

  constructor(strategy: FlyStrategy) {
    this.flyStrategy = strategy;
  }

  performFly(): void {
    this.flyStrategy.fly();
  }

  setFlyStrategy(strategy: FlyStrategy): void {
    this.flyStrategy = strategy;
  }
}

// Test the behavior
const duck = new Duck1(new FastFly());
duck.performFly(); // Output: Flying fast like a rocket!

duck.setFlyStrategy(new NoFly());
duck.performFly(); // Output: I cannot fly
