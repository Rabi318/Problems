const url = "https://fakestoreapi.com/products";

async function fetchData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const products = data.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
    }));
    console.log(products);
    const totalPrice = calculateTotalPrice(products);
    console.log("Total Price:", totalPrice.toFixed(2));
  } catch (error) {
    console.log("Failed to fetch products:", error);
  }
}
function calculateTotalPrice(products) {
  return products.reduce((total, product) => total + product.price, 0);
}
fetchData(url);
