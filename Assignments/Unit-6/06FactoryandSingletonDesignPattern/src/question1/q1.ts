interface Vehicle {
  getDetails(): string;
}

// Bike class implements Vehicle
class Bike implements Vehicle {
  constructor(private brand: string) {}

  getDetails(): string {
    return `Bike: ${this.brand}`;
  }
}

// Car class implements Vehicle
class Car implements Vehicle {
  constructor(private brand: string) {}

  getDetails(): string {
    return `Car: ${this.brand}`;
  }
}

// VehicleFactory with a static method
class VehicleFactory {
  static createVehicle(type: string, brand: string): Vehicle {
    switch (type) {
      case "Bike":
        return new Bike(brand);
      case "Car":
        return new Car(brand);
      default:
        throw new Error(`Vehicle type '${type}' is not supported.`);
    }
  }
}
