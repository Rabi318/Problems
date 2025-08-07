"use strict";
// Apple Devices
class AppleLaptop {
    specifications() {
        console.log("Apple Laptop: MacBook Pro with M3 chip, 16GB RAM, 512GB SSD");
    }
}
class ApplePhone {
    specifications() {
        console.log("Apple Phone: iPhone 15 Pro Max, A17 chip, 256GB storage");
    }
}
// Samsung Devices
class SamsungLaptop {
    specifications() {
        console.log("Samsung Laptop: Galaxy Book4 Pro, Intel i7, 16GB RAM, 1TB SSD");
    }
}
class SamsungPhone {
    specifications() {
        console.log("Samsung Phone: Galaxy S24 Ultra, Snapdragon 8 Gen 3, 512GB storage");
    }
}
// Apple Factory
class AppleFactory {
    createDevice(type) {
        if (type === "Laptop") {
            return new AppleLaptop();
        }
        else if (type === "Phone") {
            return new ApplePhone();
        }
        else {
            throw new Error("Unknown device type for Apple.");
        }
    }
}
// Samsung Factory
class SamsungFactory {
    createDevice(type) {
        if (type === "Laptop") {
            return new SamsungLaptop();
        }
        else if (type === "Phone") {
            return new SamsungPhone();
        }
        else {
            throw new Error("Unknown device type for Samsung.");
        }
    }
}
function main() {
    // Apple Factory
    const appleFactory = new AppleFactory();
    const appleLaptop = appleFactory.createDevice("Laptop");
    appleLaptop.specifications();
    // Samsung Factory
    const samsungFactory = new SamsungFactory();
    const samsungPhone = samsungFactory.createDevice("Phone");
    samsungPhone.specifications();
}
main();
