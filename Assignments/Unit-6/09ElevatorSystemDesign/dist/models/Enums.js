"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.ElevatorState = void 0;
var ElevatorState;
(function (ElevatorState) {
    ElevatorState["Moving"] = "Moving";
    ElevatorState["OpenDoor"] = "OpenDoor";
    ElevatorState["CloseDoor"] = "CloseDoor";
})(ElevatorState || (exports.ElevatorState = ElevatorState = {}));
var Direction;
(function (Direction) {
    Direction["Up"] = "Up";
    Direction["Down"] = "Down";
    Direction["Idle"] = "Idle";
})(Direction || (exports.Direction = Direction = {}));
