function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    describeCar() {
      console.log(`This car is a ${year} ${make} ${model}.`);
    },
  };
}

// Example usage:
const car = createCar("Toyota", "Camry", 2022);
car.describeCar();
