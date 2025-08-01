import { ProductConstructor } from "./ProductFactory";
import { Laptop } from "./products/Laptop";
import { SmartWatch } from "./products/SmartWatch";

export const productMap: Record<string, ProductConstructor> = {
  Laptop,
  SmartWatch,
};
