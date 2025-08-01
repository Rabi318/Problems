import { ParkingLot } from "./services/ParkingLot";
import { DefaultParkingStrategy } from "./strategies/DefaultParkingStrategy";
import { NearestFirstStrategy } from "./strategies/NearestFirstStrategy";
import { Vehicle, VehicleType } from "./models/Vehicle";

const lot = new ParkingLot(3, 5, new DefaultParkingStrategy());

// const lot = new ParkingLot(3, 5, new NearestFirstStrategy());
const v1 = new Vehicle("KA-01-EV-1234", VehicleType.EV_CAR);
const ticket1 = lot.park(v1);
console.log("Ticket:", ticket1);

const v2 = new Vehicle("KA-01-AB-9999", VehicleType.CAR);
const ticket2 = lot.park(v2);
console.log("Ticket:", ticket2);

setTimeout(() => {
  console.log(lot.unpark(ticket1!.ticketId));
  console.log(lot.unpark(ticket2!.ticketId));
}, 3600);
