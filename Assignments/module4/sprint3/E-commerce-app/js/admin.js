import {
  getDatabase,
  ref,
  get,
  set,
  push,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import { database } from "./firebase-config.js";

const userRole = sessionStorage.getItem("userRole");
if (userRole !== "admin") {
  window.location.href = "user-dashboard.html";
}

const productForm = document.getElementById("product-form");
const productList = document.getElementById("product-list");
const titleInput = document.getElementById("title");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");

let editingProductId = null;

async function fetchProducts() {
  try {
    const productsRef = ref(database, "products/");
    const snapshot = await get(productsRef);
    productList.innerHTML = ""; // Clear existing products
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
          <div class = "btn-container">
          <button class="delete-btn" onclick="deleteProduct('${productId}')">Delete</button>
          <button class = "edit-btn" onclick="editProduct('${productId}')">Edit</button>
          </div>
        `;
        productList.appendChild(productItem);
      }
    } else {
      productList.innerHTML = "<p>No products available.</p>";
    }
  } catch (error) {
    alert("Failed to fetch products!");
    console.error(err);
  }
}
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const price = parseFloat(priceInput.value.trim());
  const image = imageInput.value.trim();

  if (!title || !price || !image) {
    alert("Please fill all fields!");
    return;
  }
  const productData = { title, price, image };
  try {
    if (editingProductId) {
      await update(ref(database, `products/${editingProductId}`), productData);
      alert("Product updated successfully!");
      editingProductId = null;
      productForm.reset();
    } else {
      const newProductRef = push(ref(database, "products/"));
      await set(newProductRef, productData);
      alert("Product added successfully!");
    }
    productForm.reset();
    fetchProducts();
  } catch (error) {
    alert("Error saving product!");
    console.error(err);
  }
});
window.deleteProduct = function (productId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?"
  );
  if (!confirmDelete) return;

  remove(ref(database, "products/" + productId))
    .then(() => {
      alert("Product deleted successfully!");
      fetchProducts();
    })
    .catch((err) => alert("Error deleting product: " + err.message));
};
window.editProduct = function (productId) {
  const productRef = ref(database, "products/" + productId);
  get(productRef).then((snapshot) => {
    if (snapshot.exists()) {
      const product = snapshot.val();
      titleInput.value = product.title;
      priceInput.value = product.price;
      imageInput.value = product.image;
      editingProductId = productId;
    } else {
      alert("Product not found!");
    }
  });
};
window.logout = function () {
  sessionStorage.clear();
  window.location.href = "login.html";
};
fetchProducts();
