"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
class Ticket {
    constructor(ticketId, vehicle, slot, entryTime) {
        this.ticketId = ticketId;
        this.vehicle = vehicle;
        this.slot = slot;
        this.entryTime = entryTime;
    }
    calculateCharges(exitTime) {
        const duration = Math.ceil((exitTime.getTime() - this.entryTime.getTime()) / 3600000); // in hours
        const rate = {
            BIKE: 10,
            CAR: 20,
            EV_CAR: 25,
            TRUCK: 30,
        };
        return rate[this.vehicle.type] * duration;
    }
}
exports.Ticket = Ticket;
