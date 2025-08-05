import { Elevator } from "../models/Elevator";
import { Request } from "../models/Request";
import { ElevatorState, Direction } from "../models/Enums";
import { delay } from "../utils/Delay";

export class ElevatorController {
  constructor(private elevators: Elevator[]) {}

  async processElevators() {
    for (const elevator of this.elevators) {
      if (elevator.queue.length > 0) {
        const request = elevator.queue.shift()!;
        await this.moveElevator(elevator, request);
        elevator.occupancy -= request.weight;
      } else {
        elevator.direction = Direction.Idle;
        elevator.state = ElevatorState.CloseDoor;
      }
    }
  }

  async moveElevator(elevator: Elevator, request: Request) {
    elevator.state = ElevatorState.Moving;
    elevator.direction =
      request.toFloor > elevator.currentFloor ? Direction.Up : Direction.Down;

    while (elevator.currentFloor !== request.fromFloor) {
      if (elevator.currentFloor < request.fromFloor) {
        elevator.currentFloor++;
      } else if (
        elevator.currentFloor > request.fromFloor &&
        elevator.currentFloor > 1
      ) {
        elevator.currentFloor--;
      }

      console.log(
        `[Elevator ${elevator.id}] Moving to floor ${elevator.currentFloor}`
      );
      await delay(1000);
    }

    await this.openDoors(elevator);

    while (elevator.currentFloor !== request.toFloor) {
      if (elevator.currentFloor < request.toFloor) {
        elevator.currentFloor++;
      } else if (
        elevator.currentFloor > request.toFloor &&
        elevator.currentFloor > 1
      ) {
        elevator.currentFloor--;
      }

      console.log(
        `[Elevator ${elevator.id}] Moving to floor ${elevator.currentFloor}`
      );
      await delay(1000);
    }

    await this.openDoors(elevator);
    elevator.direction = Direction.Idle;
  }

  async openDoors(elevator: Elevator) {
    elevator.state = ElevatorState.OpenDoor;
    console.log(
      `[Elevator ${elevator.id}] Opening doors at floor ${elevator.currentFloor}`
    );
    await delay(1000);
    elevator.state = ElevatorState.CloseDoor;
    console.log(`[Elevator ${elevator.id}] Closing doors`);
    await delay(1000);
  }
}
