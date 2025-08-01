import { ParkingStrategy } from "../services/ParkingStrategy";
import { Vehicle } from "../models/Vehicle";
import { Floor } from "../models/Floor";
import { ParkingSlot } from "../models/ParkingSlot";

export class DefaultParkingStrategy implements ParkingStrategy {
  findSlot(vehicle: Vehicle, floors: Floor[]): ParkingSlot | null {
    for (const floor of floors) {
      const slot = floor.findSlot(vehicle);
      if (slot) return slot;
    }
    return null;
  }
}
