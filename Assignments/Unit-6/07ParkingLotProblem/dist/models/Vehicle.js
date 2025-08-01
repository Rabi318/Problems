"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.VehicleType = void 0;
var VehicleType;
(function (VehicleType) {
    VehicleType["BIKE"] = "BIKE";
    VehicleType["CAR"] = "CAR";
    VehicleType["TRUCK"] = "TRUCK";
    VehicleType["EV_CAR"] = "EV_CAR";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
class Vehicle {
    constructor(number, type) {
        this.number = number;
        this.type = type;
    }
}
exports.Vehicle = Vehicle;
