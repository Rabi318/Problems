import { Product } from "./Product";

export class Laptop implements Product {
  constructor(private name: string, private price: number) {}

  getDescription(): string {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}
