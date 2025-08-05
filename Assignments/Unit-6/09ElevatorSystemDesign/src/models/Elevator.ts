import { ElevatorState, Direction } from "./Enums";
import { Request } from "./Request";

export class Elevator {
  id: number;
  currentFloor: number = 1;
  direction: Direction = Direction.Idle;
  state: ElevatorState = ElevatorState.CloseDoor;
  capacity: number = 680;
  occupancy: number = 0;
  queue: Request[] = [];

  constructor(id: number) {
    this.id = id;
  }

  canTakeRequest(request: Request): boolean {
    return this.occupancy + request.weight <= this.capacity;
  }

  assignRequest(request: Request) {
    if (this.canTakeRequest(request)) {
      this.queue.push(request);
      this.occupancy += request.weight;
    }
  }

  isIdle(): boolean {
    return this.queue.length === 0;
  }
}
