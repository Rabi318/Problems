import { Floor } from "../models/Floor";
import { Vehicle } from "../models/Vehicle";
import { Ticket } from "../models/Ticket";
import { ParkingStrategy } from "./ParkingStrategy";

export class ParkingLot {
  private floors: Floor[] = [];
  private tickets: Map<string, Ticket> = new Map();
  private ticketCounter = 1;

  constructor(
    floorCount: number,
    slotsPerFloor: number,
    private strategy: ParkingStrategy
  ) {
    for (let i = 0; i < floorCount; i++) {
      this.floors.push(new Floor(i + 1, slotsPerFloor));
    }
  }

  park(vehicle: Vehicle): Ticket | null {
    const slot = this.strategy.findSlot(vehicle, this.floors);
    if (!slot) return null;

    const ticket = new Ticket(
      `TICKET-${this.ticketCounter++}`,
      vehicle,
      slot,
      new Date()
    );
    this.tickets.set(ticket.ticketId, ticket);
    return ticket;
  }

  unpark(ticketId: string): string {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return `Invalid Ticket ID`;

    const exitTime = new Date();
    const charges = ticket.calculateCharges(exitTime);
    ticket.slot.removeVehicle();
    this.tickets.delete(ticketId);

    return `Vehicle ${ticket.vehicle.number} unparked. Total Charges: ₹${charges}`;
  }
}
