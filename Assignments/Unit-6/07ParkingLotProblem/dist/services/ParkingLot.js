"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
const Floor_1 = require("../models/Floor");
const Ticket_1 = require("../models/Ticket");
class ParkingLot {
    constructor(floorCount, slotsPerFloor, strategy) {
        this.strategy = strategy;
        this.floors = [];
        this.tickets = new Map();
        this.ticketCounter = 1;
        for (let i = 0; i < floorCount; i++) {
            this.floors.push(new Floor_1.Floor(i + 1, slotsPerFloor));
        }
    }
    park(vehicle) {
        const slot = this.strategy.findSlot(vehicle, this.floors);
        if (!slot)
            return null;
        const ticket = new Ticket_1.Ticket(`TICKET-${this.ticketCounter++}`, vehicle, slot, new Date());
        this.tickets.set(ticket.ticketId, ticket);
        return ticket;
    }
    unpark(ticketId) {
        const ticket = this.tickets.get(ticketId);
        if (!ticket)
            return `Invalid Ticket ID`;
        const exitTime = new Date();
        const charges = ticket.calculateCharges(exitTime);
        ticket.slot.removeVehicle();
        this.tickets.delete(ticketId);
        return `Vehicle ${ticket.vehicle.number} unparked. Total Charges: ₹${charges}`;
    }
}
exports.ParkingLot = ParkingLot;
