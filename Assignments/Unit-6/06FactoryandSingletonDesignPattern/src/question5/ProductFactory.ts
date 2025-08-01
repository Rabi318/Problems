import { Product } from "./products/Product";
import { productMap } from "./productMap";

export type ProductConstructor = new (name: string, price: number) => Product;

export class ProductFactory {
  static register(type: string, productClass: ProductConstructor): void {
    productMap[type] = productClass;
  }

  static createProduct(type: string, name: string, price: number): Product {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error(`Unknown product type: ${type}`);
    return new ProductClass(name, price);
  }
}
