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

let totalPayment = 0;
let firstProduct = true;

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

function renderProducts() {
  const productList = document.getElementById("productList");

  if (!productList) {
    return;
  }

  const products = getProducts();
  productList.innerHTML = "";

  products.forEach(function(product) {
    productList.innerHTML += `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">Price: $${product.price}</p>
        <label for="qty${product.id}">Quantity:</label>
        <input type="number" id="qty${product.id}" min="1" value="1">
        <button onclick="addToCart('${product.name}', ${product.price}, 'qty${product.id}')">Add to Cart</button>
      </article>
    `;
  });
}

function showProducts() {
  document.getElementById("productsSection").style.display = "block";
  document.getElementById("cartSection").style.display = "none";
}

function showCart() {
  document.getElementById("productsSection").style.display = "none";
  document.getElementById("cartSection").style.display = "block";
}

function openAdminPage() {
  const password = prompt("Enter admin password");

  if (password === "1234") {
    sessionStorage.setItem("adminAccess", "true");
    window.location.href = "admin.html";
  } else if (password !== null) {
    alert("Wrong password");
  }
}

function addToCart(productName, price, quantityId) {
  const quantityInput = document.getElementById(quantityId);
  const quantity = parseInt(quantityInput.value, 10);

  if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  const productTotal = price * quantity;
  totalPayment += productTotal;

  const outputBody = document.getElementById("outputBody");

  if (firstProduct) {
    outputBody.innerHTML = "";
    firstProduct = false;
  }

  outputBody.innerHTML += `
    <tr>
      <td>${productName}</td>
      <td>$${price}</td>
      <td>${quantity}</td>
      <td>$${productTotal}</td>
    </tr>
  `;

  document.getElementById("finalPayment").textContent = "Total Payment: $" + totalPayment;
  showCart();
}

function confirmPayment() {
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const paymentMessage = document.getElementById("paymentMessage");

  if (totalPayment === 0) {
    paymentMessage.textContent = "Please add a product first.";
    paymentMessage.style.color = "red";
    return;
  }

  if (!/^\d{16}$/.test(cardNumber)) {
    paymentMessage.textContent = "Please enter a valid 16-digit card number.";
    paymentMessage.style.color = "red";
    return;
  }

  const isConfirmed = confirm("Do you want to confirm this payment?");

  if (isConfirmed) {
    paymentMessage.textContent = "Payment completed successfully.";
    paymentMessage.style.color = "green";
  } else {
    paymentMessage.textContent = "Payment was cancelled.";
    paymentMessage.style.color = "red";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  renderProducts();
});

window.showProducts = showProducts;
window.showCart = showCart;
window.openAdminPage = openAdminPage;
window.addToCart = addToCart;
window.confirmPayment = confirmPayment;
