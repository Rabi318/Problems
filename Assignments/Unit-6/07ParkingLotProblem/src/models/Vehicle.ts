export enum VehicleType {
  BIKE = "BIKE",
  CAR = "CAR",
  TRUCK = "TRUCK",
  EV_CAR = "EV_CAR",
}

export class Vehicle {
  constructor(
    public readonly number: string,
    public readonly type: VehicleType
  ) {}
}
