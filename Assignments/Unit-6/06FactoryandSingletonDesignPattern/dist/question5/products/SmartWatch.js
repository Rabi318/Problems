"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartWatch = void 0;
class SmartWatch {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getDescription() {
        return `SmartWatch: ${this.name}, Price: $${this.price}`;
    }
}
exports.SmartWatch = SmartWatch;
