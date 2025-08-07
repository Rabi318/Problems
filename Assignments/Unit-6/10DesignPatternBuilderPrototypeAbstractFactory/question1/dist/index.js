"use strict";
class Pizza {
    constructor(builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.mushrooms = builder.mushrooms;
    }
    getDescription() {
        return `Pizza size: ${this.size}, Cheese: ${this.cheese}, Pepperoni: ${this.pepperoni}, Mushrooms: ${this.mushrooms}`;
    }
}
class PizzaBuilder {
    constructor() {
        this.size = "medium";
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    addCheese() {
        this.cheese = true;
        return this;
    }
    addPepperoni() {
        this.pepperoni = true;
        return this;
    }
    addMushrooms() {
        this.mushrooms = true;
        return this;
    }
    build() {
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
