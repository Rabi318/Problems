const userId = sessionStorage.getItem("userId");
if (!userId) {
  alert("You must login first!");
  window.location.href = "login.html";
}
document.getElementById("logout-btn").addEventListener("click", () => {
  sessionStorage.removeItem("userId");
  window.location.href = "login.html";
});
async function fetchProduct() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    const container = document.getElementById("product-container");
    container.innerHTML = "";
    products.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `<h4>${product.title}</h4>
        <img src="${product.image}" width="100" />
        <p>${product.price}</p>`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching product: ", error);
  }
}
fetchProduct();
