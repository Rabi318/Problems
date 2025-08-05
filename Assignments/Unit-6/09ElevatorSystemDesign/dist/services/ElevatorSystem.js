"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevatorSystem = void 0;
const Elevator_1 = require("../models/Elevator");
const Enums_1 = require("../models/Enums");
class ElevatorSystem {
    constructor(elevatorCount) {
        this.elevators = [];
        for (let i = 0; i < elevatorCount; i++) {
            this.elevators.push(new Elevator_1.Elevator(i + 1));
        }
    }
    getElevators() {
        return this.elevators;
    }
    assignRequest(request) {
        let bestFit = null;
        for (const elevator of this.elevators) {
            if (elevator.canTakeRequest(request)) {
                if (elevator.isIdle() ||
                    (elevator.direction === Enums_1.Direction.Up &&
                        request.fromFloor >= elevator.currentFloor) ||
                    (elevator.direction === Enums_1.Direction.Down &&
                        request.fromFloor <= elevator.currentFloor)) {
                    bestFit = elevator;
                    break;
                }
            }
        }
        if (bestFit) {
            bestFit.assignRequest(request);
            return true;
        }
        console.log(`No elevator currently available for request from ${request.fromFloor} to ${request.toFloor}`);
        return false;
    }
}
exports.ElevatorSystem = ElevatorSystem;
