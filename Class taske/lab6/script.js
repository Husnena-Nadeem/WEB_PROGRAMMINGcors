document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let product = document.getElementById("product").value;
    let quantity = document.getElementById("quantity").value;

    let error = document.getElementById("error");
    let result = document.getElementById("result");

    error.textContent = "";
    result.innerHTML = "";

    // Validation
    if (name === "" || email === "" || product === "" || quantity === "") {
        error.textContent = "Please fill all fields!";
        return;
    }

    if (quantity <= 0) {
        error.textContent = "Quantity must be greater than 0!";
        return;
    }

    // Display Result
    result.innerHTML = `
        <h3>Order Confirmation</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
    `;
});