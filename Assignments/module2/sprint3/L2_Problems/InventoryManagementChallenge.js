const url = "https://fakestoreapi.com/products";
async function fetchInventory(url) {
  try {
    const res = await fetch(url);
    const products = await res.json();

    const categorizedData = {};

    // Loop through each product and organize by category
    products.forEach((product) => {
      const category = product.category;
      const price = product.price;

      // If the category does not exist, initialize it
      if (!categorizedData[category]) {
        categorizedData[category] = {
          count: 0,
          products: [],
          totalPrice: 0,
          mostExpensive: { price: -Infinity },
          leastExpensive: { price: Infinity },
        };
      }

      // Add the product to the category
      categorizedData[category].products.push(product);
      categorizedData[category].count++;
      categorizedData[category].totalPrice += price;

      // Update the most expensive and least expensive products
      if (price > categorizedData[category].mostExpensive.price) {
        categorizedData[category].mostExpensive = product;
      }

      if (price < categorizedData[category].leastExpensive.price) {
        categorizedData[category].leastExpensive = product;
      }
    });

    // Calculate average price for each category
    for (let category in categorizedData) {
      const categoryData = categorizedData[category];
      categoryData.averagePrice = categoryData.totalPrice / categoryData.count;
    }

    console.log(categorizedData);
  } catch (error) {
    console.log("Error fetching inventory:", error);
  }
}

// Call the function to fetch and process the inventory data
fetchInventory(url);
