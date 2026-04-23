const storageKey = "smartCarProducts";

const defaultProducts = [
  {
    id: 1,
    name: "Sedan Car",
    price: 12000,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Sports Car",
    price: 15000,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "SUV Car",
    price: 18000,
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Electric Car",
    price: 20000,
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Luxury Car",
    price: 25000,
    image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=400&q=80"
  }
];

function getProducts() {
  const savedProducts = localStorage.getItem(storageKey);

  if (!savedProducts) {
    localStorage.setItem(storageKey, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  const products = JSON.parse(savedProducts);

  if (!Array.isArray(products) || products.length === 0) {
    localStorage.setItem(storageKey, JSON.stringify(defaultProducts));
    return defaultProducts;
  }

  return products;
}

function saveProducts(products) {
  localStorage.setItem(storageKey, JSON.stringify(products));
}

function checkAdminAccess() {
  const hasAccess = sessionStorage.getItem("adminAccess");

  if (hasAccess === "true") {
    return;
  }

  const password = prompt("Enter admin password");

  if (password === "1234") {
    sessionStorage.setItem("adminAccess", "true");
  } else {
    alert("Wrong password");
    window.location.href = "index.html";
  }
}

function renderAdminProducts() {
  const adminProductList = document.getElementById("adminProductList");

  if (!adminProductList) {
    return;
  }

  const products = getProducts();
  adminProductList.innerHTML = "";

  products.forEach(function(product) {
    adminProductList.innerHTML += `
      <article class="admin-product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete Product</button>
      </article>
    `;
  });
}

function deleteProduct(productId) {
  const products = getProducts().filter(function(product) {
    return product.id !== productId;
  });

  saveProducts(products);
  renderAdminProducts();

  const adminMessage = document.getElementById("adminMessage");
  adminMessage.textContent = "Product deleted successfully.";
  adminMessage.style.color = "green";
}

function logoutAdmin() {
  sessionStorage.removeItem("adminAccess");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
  checkAdminAccess();
  renderAdminProducts();

  const productForm = document.getElementById("productForm");

  if (!productForm) {
    return;
  }

  productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").value.trim();
    const productPrice = parseInt(document.getElementById("productPrice").value, 10);
    const productImage = document.getElementById("productImage").value.trim();
    const adminMessage = document.getElementById("adminMessage");

    if (!productName || isNaN(productPrice)) {
      adminMessage.textContent = "Please fill all fields correctly.";
      adminMessage.style.color = "red";
      return;
    }

    const products = getProducts();

    const newProduct = {
      id: Date.now(),
      name: productName,
      price: productPrice,
      image: productImage || "https://via.placeholder.com/400x250?text=SmartCar"
    };

    products.push(newProduct);
    saveProducts(products);
    renderAdminProducts();

    productForm.reset();
    adminMessage.textContent = "Product added successfully.";
    adminMessage.style.color = "green";
  });
});

window.deleteProduct = deleteProduct;
window.logoutAdmin = logoutAdmin;
