interface FlyStrategy {
  fly(): void;
}

class CanFly implements FlyStrategy {
  fly(): void {
    console.log("Flying...");
  }
}

class CannotFly implements FlyStrategy {
  fly(): void {
    console.log("I can't fly");
  }
}

class Bird {
  protected flyStrategy: FlyStrategy;

  constructor(strategy: FlyStrategy) {
    this.flyStrategy = strategy;
  }

  fly(): void {
    this.flyStrategy.fly();
  }
}

const sparrow = new Bird(new CanFly());
const ostrich = new Bird(new CannotFly());

sparrow.fly();
ostrich.fly();
