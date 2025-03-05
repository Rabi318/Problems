function createInventoryItem(name, category, price) {
  return {
    name,
    category,
    price,
    describeItem() {
      console.log(
        `Item: ${this.name}, Category: ${this.category}, Price: ${this.price}`
      );
    },
  };
}

function addItmeDiscount(inventoryItem, discountPercent) {
  // console.log(inventoryItem);
  inventoryItem.discountedPrice =
    inventoryItem.price * (1 - discountPercent / 100);
  inventoryItem.applyDiscount = function () {
    console.log(`Discounted Price for ${this.name}: ${this.discountedPrice}`);
  };
  return inventoryItem;
}

const item1 = createInventoryItem("Laptop", "Electronics", 1500);
item1.describeItem();

const discount = addItmeDiscount(item1, 10);
discount.applyDiscount();
