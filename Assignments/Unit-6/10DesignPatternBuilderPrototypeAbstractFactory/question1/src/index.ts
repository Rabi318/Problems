type PizzaSize = "small" | "medium" | "large";

class Pizza {
  size: PizzaSize;
  cheese: boolean;
  pepperoni: boolean;
  mushrooms: boolean;

  constructor(builder: PizzaBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.mushrooms = builder.mushrooms;
  }
  public getDescription(): string {
    return `Pizza size: ${this.size}, Cheese: ${this.cheese}, Pepperoni: ${this.pepperoni}, Mushrooms: ${this.mushrooms}`;
  }
}

class PizzaBuilder {
  size: PizzaSize = "medium";
  cheese: boolean = false;
  pepperoni: boolean = false;
  mushrooms: boolean = false;
  public setSize(size: PizzaSize): PizzaBuilder {
    this.size = size;
    return this;
  }
  public addCheese(): PizzaBuilder {
    this.cheese = true;
    return this;
  }

  public addPepperoni(): PizzaBuilder {
    this.pepperoni = true;
    return this;
  }

  public addMushrooms(): PizzaBuilder {
    this.mushrooms = true;
    return this;
  }
  public build(): Pizza {
    return new Pizza(this);
  }
}
function main() {
  const customPizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addMushrooms()
    .build();

  console.log(customPizza.getDescription());
}

main();
