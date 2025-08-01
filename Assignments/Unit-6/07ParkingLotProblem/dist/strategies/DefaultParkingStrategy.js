"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultParkingStrategy = void 0;
class DefaultParkingStrategy {
    findSlot(vehicle, floors) {
        for (const floor of floors) {
            const slot = floor.findSlot(vehicle);
            if (slot)
                return slot;
        }
        return null;
    }
}
exports.DefaultParkingStrategy = DefaultParkingStrategy;
