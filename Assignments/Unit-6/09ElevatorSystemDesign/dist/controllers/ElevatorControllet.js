"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorController = void 0;
const Enums_1 = require("../models/Enums");
const Delay_1 = require("../utils/Delay");
class ElevatorController {
    constructor(elevators) {
        this.elevators = elevators;
    }
    processElevators() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const elevator of this.elevators) {
                if (elevator.queue.length > 0) {
                    const request = elevator.queue.shift();
                    yield this.moveElevator(elevator, request);
                    elevator.occupancy -= request.weight;
                }
                else {
                    elevator.direction = Enums_1.Direction.Idle;
                    elevator.state = Enums_1.ElevatorState.CloseDoor;
                }
            }
        });
    }
    moveElevator(elevator, request) {
        return __awaiter(this, void 0, void 0, function* () {
            elevator.state = Enums_1.ElevatorState.Moving;
            elevator.direction =
                request.toFloor > elevator.currentFloor ? Enums_1.Direction.Up : Enums_1.Direction.Down;
            while (elevator.currentFloor !== request.fromFloor) {
                if (elevator.currentFloor < request.fromFloor) {
                    elevator.currentFloor++;
                }
                else if (elevator.currentFloor > request.fromFloor &&
                    elevator.currentFloor > 1) {
                    elevator.currentFloor--;
                }
                console.log(`[Elevator ${elevator.id}] Moving to floor ${elevator.currentFloor}`);
                yield (0, Delay_1.delay)(1000);
            }
            yield this.openDoors(elevator);
            while (elevator.currentFloor !== request.toFloor) {
                if (elevator.currentFloor < request.toFloor) {
                    elevator.currentFloor++;
                }
                else if (elevator.currentFloor > request.toFloor &&
                    elevator.currentFloor > 1) {
                    elevator.currentFloor--;
                }
                console.log(`[Elevator ${elevator.id}] Moving to floor ${elevator.currentFloor}`);
                yield (0, Delay_1.delay)(1000);
            }
            yield this.openDoors(elevator);
            elevator.direction = Enums_1.Direction.Idle;
        });
    }
    openDoors(elevator) {
        return __awaiter(this, void 0, void 0, function* () {
            elevator.state = Enums_1.ElevatorState.OpenDoor;
            console.log(`[Elevator ${elevator.id}] Opening doors at floor ${elevator.currentFloor}`);
            yield (0, Delay_1.delay)(1000);
            elevator.state = Enums_1.ElevatorState.CloseDoor;
            console.log(`[Elevator ${elevator.id}] Closing doors`);
            yield (0, Delay_1.delay)(1000);
        });
    }
}
exports.ElevatorController = ElevatorController;
