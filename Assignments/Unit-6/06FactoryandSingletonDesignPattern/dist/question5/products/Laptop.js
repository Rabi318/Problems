"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Laptop = void 0;
class Laptop {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getDescription() {
        return `Laptop: ${this.name}, Price: $${this.price}`;
    }
}
exports.Laptop = Laptop;
