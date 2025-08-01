import { Vehicle } from "./Vehicle";
import { ParkingSlot } from "./ParkingSlot";

export class Ticket {
  constructor(
    public readonly ticketId: string,
    public readonly vehicle: Vehicle,
    public readonly slot: ParkingSlot,
    public readonly entryTime: Date
  ) {}

  calculateCharges(exitTime: Date): number {
    const duration = Math.ceil(
      (exitTime.getTime() - this.entryTime.getTime()) / 3600000
    ); // in hours
    const rate = {
      BIKE: 10,
      CAR: 20,
      EV_CAR: 25,
      TRUCK: 30,
    };
    return rate[this.vehicle.type] * duration;
  }
}
