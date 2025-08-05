"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    constructor(fromFloor, toFloor, weight) {
        this.fromFloor = fromFloor;
        this.toFloor = toFloor;
        this.weight = weight;
        if (fromFloor < 1 || toFloor < 1) {
            throw new Error(`Invalid floor: from ${fromFloor}, to ${toFloor}. Floor must be >= 1.`);
        }
        if (weight <= 0) {
            throw new Error(`Invalid weight: must be > 0`);
        }
    }
}
exports.Request = Request;
