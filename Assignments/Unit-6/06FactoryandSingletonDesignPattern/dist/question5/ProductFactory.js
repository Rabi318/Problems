"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFactory = void 0;
const productMap_1 = require("./productMap");
class ProductFactory {
    static register(type, productClass) {
        productMap_1.productMap[type] = productClass;
    }
    static createProduct(type, name, price) {
        const ProductClass = productMap_1.productMap[type];
        if (!ProductClass)
            throw new Error(`Unknown product type: ${type}`);
        return new ProductClass(name, price);
    }
}
exports.ProductFactory = ProductFactory;
