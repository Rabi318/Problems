"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Floor = void 0;
const ParkingSlot_1 = require("./ParkingSlot");
const Vehicle_1 = require("./Vehicle");
class Floor {
    constructor(floorNumber, slotCount) {
        this.floorNumber = floorNumber;
        this.slots = [];
        for (let i = 0; i < slotCount; i++) {
            const isReserved = i === 0; // Reserve first slot for EVs
            const type = isReserved
                ? [Vehicle_1.VehicleType.EV_CAR]
                : [
                    Vehicle_1.VehicleType.CAR,
                    Vehicle_1.VehicleType.EV_CAR,
                    Vehicle_1.VehicleType.BIKE,
                    Vehicle_1.VehicleType.TRUCK,
                ];
            this.slots.push(new ParkingSlot_1.ParkingSlot(`${floorNumber}-${i + 1}`, type, isReserved));
        }
    }
    findSlot(vehicle) {
        return (this.slots.find((slot) => slot.isAvailable() && slot.assignVehicle(vehicle)) || null);
    }
}
exports.Floor = Floor;
