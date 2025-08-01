"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParkingLot_1 = require("./services/ParkingLot");
const DefaultParkingStrategy_1 = require("./strategies/DefaultParkingStrategy");
const Vehicle_1 = require("./models/Vehicle");
const lot = new ParkingLot_1.ParkingLot(3, 5, new DefaultParkingStrategy_1.DefaultParkingStrategy());
// const lot = new ParkingLot(3, 5, new NearestFirstStrategy());
const v1 = new Vehicle_1.Vehicle("KA-01-EV-1234", Vehicle_1.VehicleType.EV_CAR);
const ticket1 = lot.park(v1);
console.log("Ticket:", ticket1);
const v2 = new Vehicle_1.Vehicle("KA-01-AB-9999", Vehicle_1.VehicleType.CAR);
const ticket2 = lot.park(v2);
console.log("Ticket:", ticket2);
setTimeout(() => {
    console.log(lot.unpark(ticket1.ticketId));
    console.log(lot.unpark(ticket2.ticketId));
}, 3600);
