import { ProductFactory } from "./ProductFactory";
import { SmartWatch } from "./products/SmartWatch";

ProductFactory.register("SmartWatch", SmartWatch);

const p1 = ProductFactory.createProduct("Laptop", "Dell XPS", 1600);
console.log(p1.getDescription());

const p2 = ProductFactory.createProduct("SmartWatch", "Galaxy Watch", 299);
console.log(p2.getDescription());
