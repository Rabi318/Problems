import { Vehicle, VehicleType } from "./Vehicle";

export class ParkingSlot {
  public vehicle: Vehicle | null = null;
  constructor(
    public readonly id: string,
    public readonly type: VehicleType[],
    public readonly isReservedForEV: boolean = false
  ) {}

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  assignVehicle(vehicle: Vehicle): boolean {
    if (this.isAvailable() && this.type.includes(vehicle.type)) {
      if (this.isReservedForEV && vehicle.type !== VehicleType.EV_CAR) {
        return false;
      }
      this.vehicle = vehicle;
      return true;
    }
    return false;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }
}
