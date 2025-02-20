const checkout = {
  items: [],
  total: 0,
  addItem(item) {
    if (!item || typeof item.price !== "number" || isNaN(item.price)) {
      console.log("Invalid Price");
      return;
    }
    this.items.push(item);
    this.total += item.price;
    console.log(`Added ${item.name} - $${item.price.toFixed(2)}`);
  },
  getTotal() {
    return `Total : $${this.total.toFixed(2)}`;
  },
};

checkout.addItem({ name: "Coffee Maker", price: parseFloat("99.95") });

checkout.addItem({ name: "Milk", price: 3.5 });
console.log(checkout.getTotal());
