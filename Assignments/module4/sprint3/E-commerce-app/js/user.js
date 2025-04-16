import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

import { database } from "./firebase-config.js";
const userRole = sessionStorage.getItem("userRole");
if (userRole !== "user") {
  // If admin tries to access, redirect to admin dashboard
  window.location.href = "admin-dashboard.html";
}
const productList = document.getElementById("product-list");

async function fetchProducts() {
  try {
    const productsRef = ref(database, "products");
    const snapshot = await get(productsRef);
    productList.innerHTML = "";
    if (snapshot.exists()) {
      const products = snapshot.val();
      for (const productId in products) {
        const product = products[productId];
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
          <h3>${product.title}</h3>
          <p>Price: $${product.price}</p>
          <img src="${product.image}" alt="${product.title}" />
        `;
        productList.appendChild(productItem);
      }
    } else {
      productList.innerHTML = "<p>No products available.</p>";
    }
  } catch (error) {
    alert("Failed to load products.");
    console.error(error);
  }
}
window.logout = function () {
  sessionStorage.clear();
  window.location.href = "login.html";
};
fetchProducts();
