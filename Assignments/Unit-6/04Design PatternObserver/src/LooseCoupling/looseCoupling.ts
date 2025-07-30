// Define the interface
interface IVehicle {
  start(): void;
}

// Car implements IVehicle
class Car1 implements IVehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Bike implements IVehicle
class Bike implements IVehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

// Driver depends on abstraction (IVehicle), not concrete classes
class Driver {
  private vehicle: IVehicle;

  constructor(vehicle: IVehicle) {
    this.vehicle = vehicle;
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Run the example
const carDriver = new Driver(new Car1());
carDriver.drive();

const bikeDriver = new Driver(new Bike());
bikeDriver.drive();

// Output:
// Car is starting
// Driving...
// Bike is starting
// Driving...
