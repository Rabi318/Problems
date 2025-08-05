"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elevator = void 0;
const Enums_1 = require("./Enums");
class Elevator {
    constructor(id) {
        this.currentFloor = 1;
        this.direction = Enums_1.Direction.Idle;
        this.state = Enums_1.ElevatorState.CloseDoor;
        this.capacity = 680;
        this.occupancy = 0;
        this.queue = [];
        this.id = id;
    }
    canTakeRequest(request) {
        return this.occupancy + request.weight <= this.capacity;
    }
    assignRequest(request) {
        if (this.canTakeRequest(request)) {
            this.queue.push(request);
            this.occupancy += request.weight;
        }
    }
    isIdle() {
        return this.queue.length === 0;
    }
}
exports.Elevator = Elevator;
