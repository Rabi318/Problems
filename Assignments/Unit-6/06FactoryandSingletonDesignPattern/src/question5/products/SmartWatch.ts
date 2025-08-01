import { Product } from "./Product";

export class SmartWatch implements Product {
  constructor(private name: string, private price: number) {}

  getDescription(): string {
    return `SmartWatch: ${this.name}, Price: $${this.price}`;
  }
}
