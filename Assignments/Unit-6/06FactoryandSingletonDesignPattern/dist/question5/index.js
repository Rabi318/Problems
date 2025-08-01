"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductFactory_1 = require("./ProductFactory");
const SmartWatch_1 = require("./products/SmartWatch");
ProductFactory_1.ProductFactory.register("SmartWatch", SmartWatch_1.SmartWatch);
const p1 = ProductFactory_1.ProductFactory.createProduct("Laptop", "Dell XPS", 1600);
console.log(p1.getDescription());
const p2 = ProductFactory_1.ProductFactory.createProduct("SmartWatch", "Galaxy Watch", 299);
console.log(p2.getDescription());
