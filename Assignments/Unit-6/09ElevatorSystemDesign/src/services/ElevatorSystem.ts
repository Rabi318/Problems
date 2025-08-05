import { Elevator } from "../models/Elevator";
import { Request } from "../models/Request";
import { Direction } from "../models/Enums";

export class ElevatorSystem {
  elevators: Elevator[] = [];

  constructor(elevatorCount: number) {
    for (let i = 0; i < elevatorCount; i++) {
      this.elevators.push(new Elevator(i + 1));
    }
  }

  getElevators(): Elevator[] {
    return this.elevators;
  }

  assignRequest(request: Request): boolean {
    let bestFit: Elevator | null = null;

    for (const elevator of this.elevators) {
      if (elevator.canTakeRequest(request)) {
        if (
          elevator.isIdle() ||
          (elevator.direction === Direction.Up &&
            request.fromFloor >= elevator.currentFloor) ||
          (elevator.direction === Direction.Down &&
            request.fromFloor <= elevator.currentFloor)
        ) {
          bestFit = elevator;
          break;
        }
      }
    }

    if (bestFit) {
      bestFit.assignRequest(request);
      return true;
    }

    console.log(
      `No elevator currently available for request from ${request.fromFloor} to ${request.toFloor}`
    );
    return false;
  }
}
