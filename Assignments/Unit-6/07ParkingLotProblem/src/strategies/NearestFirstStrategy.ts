import { ParkingStrategy } from "../services/ParkingStrategy";
import { Vehicle } from "../models/Vehicle";
import { Floor } from "../models/Floor";
import { ParkingSlot } from "../models/ParkingSlot";

export class NearestFirstStrategy implements ParkingStrategy {
  findSlot(vehicle: Vehicle, floors: Floor[]): ParkingSlot | null {
    // Prioritize lower floors and lower slot IDs
    for (const floor of floors.sort((a, b) => a.floorNumber - b.floorNumber)) {
      const slot = floor.slots
        .filter((slot) => slot.isAvailable())
        .sort(
          (a, b) => parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1])
        )
        .find((slot) => slot.assignVehicle(vehicle));
      if (slot) return slot;
    }
    return null;
  }
}
