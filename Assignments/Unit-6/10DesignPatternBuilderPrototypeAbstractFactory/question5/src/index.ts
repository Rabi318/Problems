interface Device {
  specifications(): void;
}

// Apple Devices
class AppleLaptop implements Device {
  specifications(): void {
    console.log("Apple Laptop: MacBook Pro with M3 chip, 16GB RAM, 512GB SSD");
  }
}

class ApplePhone implements Device {
  specifications(): void {
    console.log("Apple Phone: iPhone 15 Pro Max, A17 chip, 256GB storage");
  }
}

// Samsung Devices
class SamsungLaptop implements Device {
  specifications(): void {
    console.log(
      "Samsung Laptop: Galaxy Book4 Pro, Intel i7, 16GB RAM, 1TB SSD"
    );
  }
}

class SamsungPhone implements Device {
  specifications(): void {
    console.log(
      "Samsung Phone: Galaxy S24 Ultra, Snapdragon 8 Gen 3, 512GB storage"
    );
  }
}

// Abstract Factory Interface
interface DeviceFactory {
  createDevice(type: string): Device;
}

// Apple Factory
class AppleFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "Laptop") {
      return new AppleLaptop();
    } else if (type === "Phone") {
      return new ApplePhone();
    } else {
      throw new Error("Unknown device type for Apple.");
    }
  }
}

// Samsung Factory
class SamsungFactory implements DeviceFactory {
  createDevice(type: string): Device {
    if (type === "Laptop") {
      return new SamsungLaptop();
    } else if (type === "Phone") {
      return new SamsungPhone();
    } else {
      throw new Error("Unknown device type for Samsung.");
    }
  }
}

function main(): void {
  // Apple Factory
  const appleFactory: DeviceFactory = new AppleFactory();
  const appleLaptop: Device = appleFactory.createDevice("Laptop");
  appleLaptop.specifications();

  // Samsung Factory
  const samsungFactory: DeviceFactory = new SamsungFactory();
  const samsungPhone: Device = samsungFactory.createDevice("Phone");
  samsungPhone.specifications();
}

main();
