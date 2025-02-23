function trackLowStockAndReorder(products) {
  const lowStockProducts = products.filter((product) => product.stock < 100);

  const reorderCosts = lowStockProducts.map((product) => {
    const reorderUnits = 100 - product.stock;
    const totalReorderCost = reorderUnits * product.pricePerUnit;
    return { category: product.category, totalReorderCost };
  });

  const totalReorderCostsByCategory = reorderCosts.reduce(
    (acc, { category, totalReorderCost }) => {
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += totalReorderCost;
      return acc;
    },
    {}
  );

  const sortedCategories = Object.entries(totalReorderCostsByCategory).sort(
    ([, costA], [, costB]) => costB - costA
  );

  const sortedReorderCosts = Object.fromEntries(sortedCategories);

  return sortedReorderCosts;
}

const products = [
  { name: "Laptop", category: "Electronics", stock: 50, pricePerUnit: 1000 },
  { name: "Phone", category: "Electronics", stock: 150, pricePerUnit: 500 },
  { name: "T-shirt", category: "Clothing", stock: 40, pricePerUnit: 20 },
  { name: "Jeans", category: "Clothing", stock: 90, pricePerUnit: 40 },
  { name: "Watch", category: "Accessories", stock: 70, pricePerUnit: 150 },
];

console.log(trackLowStockAndReorder(products));
