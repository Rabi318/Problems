function createcar(make, model, year) {
  return {
    make,
    model,
    year,
    describeCar() {
      console.log(`This car is a ${this.year} ${this.make}  ${this.model}.`);
    },
  };
}

const car = createcar("Toyota", "Camry", 2022);
car.describeCar();
