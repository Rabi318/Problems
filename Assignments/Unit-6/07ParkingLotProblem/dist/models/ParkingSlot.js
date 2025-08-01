"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSlot = void 0;
const Vehicle_1 = require("./Vehicle");
class ParkingSlot {
    constructor(id, type, isReservedForEV = false) {
        this.id = id;
        this.type = type;
        this.isReservedForEV = isReservedForEV;
        this.vehicle = null;
    }
    isAvailable() {
        return this.vehicle === null;
    }
    assignVehicle(vehicle) {
        if (this.isAvailable() && this.type.includes(vehicle.type)) {
            if (this.isReservedForEV && vehicle.type !== Vehicle_1.VehicleType.EV_CAR) {
                return false;
            }
            this.vehicle = vehicle;
            return true;
        }
        return false;
    }
    removeVehicle() {
        this.vehicle = null;
    }
}
exports.ParkingSlot = ParkingSlot;
