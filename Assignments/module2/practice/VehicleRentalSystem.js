//Vehicle function
function Vehicle(name, type, isAvailable = true) {
  this.name = name;
  this.type = type;
  this.isAvailable = isAvailable;
}

//Customer function
function Customer(name) {
  this.name = name;
  this.rentedVehicles = [];
}

//Rent Vehicle method for customer
Customer.prototype.rentVehicle = function (vehicle) {
  if (vehicle.isAvailable) {
    if (this.rentedVehicles.length <= 2) {
      vehicle.isAvailable = false;
      this.rentedVehicles.push(vehicle.name);
      console.log(`${this.name} has rented ${vehicle.name}`);
    } else {
      console.log(`${this.name} can't rent more than 2 vehicle at a time`);
    }
  } else {
    console.log(`Sorry, ${vehicle.name} is already rented.`);
  }
};

//Premium Customer function
function PremiumCustomer(name) {
  Customer.call(this, name);
  this.isVip = true;
}

//Inherit methods from customer
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

//Override the rentVehicle method for premiumCustomer
PremiumCustomer.prototype.rentVehicle = function (vehicle) {
  if (vehicle.isAvailable) {
    if (this.rentedVehicles.length < 4) {
      vehicle.isAvailable = false;
      this.rentedVehicles.push(vehicle.name);
      console.log(`${this.name} (VIP) has rented ${vehicle.name}`);
    } else {
      console.log(
        `${this.name} (VIP) can not rent more than 4 vehicles at a time`
      );
    }
  } else {
    console.log(`Sorry, ${vehicle.name} is already rented.`);
  }
};

//using bind for renting
function rentForCustomer(vehicle) {
  console.log(`Renting vehicle for ${this.name}`);
  this.rentVehicle(vehicle);
}

//Create Vehicle
const hondaCivic = new Vehicle("Honda Civic", "Car");
const bike = new Vehicle("Honda Sp125", "Bike");

//Create regular customers
const customer1 = new Customer("Alina");

//create premium customers
const premCustomer = new Customer("Zaara");

//Rent vehicles using customer and premiumcustomer methods
customer1.rentVehicle(hondaCivic);
premCustomer.rentVehicle(bike);

console.log(`${customer1.name} rented vehicles: `, customer1.rentedVehicles);
console.log(
  `${premCustomer.name} rented vehcles: `,
  premCustomer.rentedVehicles
);
