import { Vehicle } from "../models/Vehicle";
import { Floor } from "../models/Floor";
import { ParkingSlot } from "../models/ParkingSlot";

export interface ParkingStrategy {
  findSlot(vehicle: Vehicle, floors: Floor[]): ParkingSlot | null;
}
