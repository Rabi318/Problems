// Vehicle interface
interface Vehicle {
  start(): void;
}

// Bike class implements Vehicle
class Bike1 implements Vehicle {
  start(): void {
    console.log("Bike is starting");
  }
}

// Car class implements Vehicle
class Car3 implements Vehicle {
  start(): void {
    console.log("Car is starting");
  }
}

// Driver class that uses Vehicle (Strategy Pattern)
class Driver1 {
  private vehicle: Vehicle;

  constructor(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  setVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle; // Swap strategy at runtime
  }

  drive(): void {
    this.vehicle.start();
    console.log("Driving...");
  }
}

// Example usage
const driver = new Driver1(new Bike1());
driver.drive(); // Output: Bike is starting \n Driving...

driver.setVehicle(new Car3());
driver.drive(); // Output: Car is starting \n Driving...
