import { ElevatorSystem } from "./services/ElevatorSystem";
import { ElevatorController } from "./controllers/ElevatorControllet";
import { Request } from "./models/Request";

const system = new ElevatorSystem(3);
const controller = new ElevatorController(system.getElevators());

const requests = [
  new Request(1, 5, 60),
  new Request(3, 7, 80),
  new Request(2, 9, 120),
  new Request(1, 6, 600),
  new Request(5, 2, 90),
];

(async () => {
  for (const request of requests) {
    system.assignRequest(request);
  }

  setInterval(() => controller.processElevators(), 2000);
})();
