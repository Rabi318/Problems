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
const ElevatorSystem_1 = require("./services/ElevatorSystem");
const ElevatorControllet_1 = require("./controllers/ElevatorControllet");
const Request_1 = require("./models/Request");
const system = new ElevatorSystem_1.ElevatorSystem(3);
const controller = new ElevatorControllet_1.ElevatorController(system.getElevators());
const requests = [
    new Request_1.Request(1, 5, 60),
    new Request_1.Request(3, 7, 80),
    new Request_1.Request(2, 9, 120),
    new Request_1.Request(1, 6, 600),
    new Request_1.Request(5, 2, 90),
];
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (const request of requests) {
        system.assignRequest(request);
    }
    setInterval(() => controller.processElevators(), 2000);
}))();
