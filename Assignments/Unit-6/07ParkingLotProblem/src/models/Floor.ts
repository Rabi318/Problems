import { ParkingSlot } from "./ParkingSlot";
import { Vehicle, VehicleType } from "./Vehicle";

export class Floor {
  slots: ParkingSlot[] = [];

  constructor(public readonly floorNumber: number, slotCount: number) {
    for (let i = 0; i < slotCount; i++) {
      const isReserved = i === 0; // Reserve first slot for EVs
      const type = isReserved
        ? [VehicleType.EV_CAR]
        : [
            VehicleType.CAR,
            VehicleType.EV_CAR,
            VehicleType.BIKE,
            VehicleType.TRUCK,
          ];
      this.slots.push(
        new ParkingSlot(`${floorNumber}-${i + 1}`, type, isReserved)
      );
    }
  }

  findSlot(vehicle: Vehicle): ParkingSlot | null {
    return (
      this.slots.find(
        (slot) => slot.isAvailable() && slot.assignVehicle(vehicle)
      ) || null
    );
  }
}
