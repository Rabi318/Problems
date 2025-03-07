function Car(make, model, year, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = isAvailable;
}

function Customer(name, rentedCars = []) {
  this.name = name;
  this.rentedCars = rentedCars;
}

Customer.prototype.rentCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${car.make} ${car.model} is rented by ${this.name}`);
  } else {
    console.log(`The car is already rented.`);
  }
};

function PremiumCustomer(name, rentedCars = [], discountRate = 0.1) {
  const premiumCustomer = Object.create(Customer.prototype);
  premiumCustomer.name = name;
  premiumCustomer.rentedCars = rentedCars;
  premiumCustomer.discountRate = discountRate;
  return premiumCustomer;
}
PremiumCustomer.prototype.applyDiscount = function (price) {
  return price * (1 - this.discountRate);
};

function calculateRentalPrice(car, days, customer) {
  const basePrice = 50;
  const carType = car.model === "SUV" ? 1.5 : 1;
  let totalPrice = basePrice * days * carType;

  if (customer instanceof PremiumCustomer) {
    totalPrice = customer.applyDiscount(totalPrice);
  }
  return totalPrice;
}

Customer.prototype.returnCar = function (car) {
  const index = this.rentedCars.indexOf(car);
  if (index !== -1) {
    this.rentedCars.splice(index, 1);
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is returned by ${this.name}`);
  } else {
    console.log(`The car is not rented by ${this.name}`);
  }
};

function Maintenance(car, delay) {
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is ready for rent`);
  }, delay);
}

const car1 = new Car("Toyota", "Corolla", 2020);
const car2 = new Car("Honda", "Civic", 2021, true);
const car3 = new Car("Ford", "SUV", 2019, true);

const customer1 = new Customer("Bob marley");
const premCustomer = PremiumCustomer("Babu Sona", [], 0.2);

customer1.rentCar(car1);
premCustomer.rentCar(car2);

customer1.returnCar(car1);

const price = calculateRentalPrice(car3, 5, premCustomer);
console.log(`Total rental price: ${price}`);
