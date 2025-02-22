function ProcessProducts(products) {
  const productName = products.map((product) => product.name);
  productName.forEach((name) => {
    const product = products.find((product) => product.name === name);
    if (product.price > 50) {
      console.log(`${name} is above 50`);
    } else {
      console.log(`${name} is below 50`);
    }
  });
}

const products = [
  { name: "Laptop", price: 1000 },
  { name: "Mouse", price: 20 },
];

ProcessProducts(products);
