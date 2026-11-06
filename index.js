const products = [
  { name: "T-shirt", price: 20, quantity: 2 },
  { name: "Shoes", price: 50, quantity: 1 },
  { name: "Cap", price: 15, quantity: 1 }
];
const orderItems = document.getElementById("order-items");
const standard = document.getElementById("standard");
const express = document.getElementById("express");
const promoCode = document.getElementById("promo-code");
const applyPromo = document.getElementById("apply-promo");
const promoMessage = document.getElementById("promo-message");
const discountText = document.getElementById("discount");
const cash = document.getElementById("cash"); // Finds the Cash radio button.
const card = document.getElementById("card"); // Finds the Card radio button.
const cardDetails = document.getElementById("card-details"); // Finds the card fields group.
const checkoutForm = document.getElementById("checkout-form");

let totalItems = 0;
let subtotal = 0;
let deliveryFee = 5;
let discount = 0;


for (let i = 0; i < products.length; i++) {
  const listItem = document.createElement("li");
listItem.textContent = products[i].name + " - $" + products[i].price + " each - Quantity: " + products[i].quantity;
orderItems.appendChild(listItem);
totalItems = totalItems + products[i].quantity;
subtotal =subtotal + products[i].price * products[i].quantity;
}

const itemCount = document.getElementById("item-count");
itemCount.textContent = totalItems;

const subtotalItem = document.getElementById("subtotal");
subtotalItem.textContent = "$" + subtotal.toFixed(2);

const totalAmount = subtotal + deliveryFee;
const total = document.getElementById("total");
total.textContent = "$" + totalAmount.toFixed(2);

const deliveryText = document.getElementById("delivery-fee");

function updateTotal() {
  const newTotal = subtotal - discount + deliveryFee;

  discountText.textContent = "$" + discount.toFixed(2);
  deliveryText.textContent = "$" + deliveryFee.toFixed(2);
  total.textContent = "$" + newTotal.toFixed(2);
}

standard.addEventListener("change", function () {
  deliveryFee = 5;
  updateTotal();
});

express.addEventListener("change", function () {
  deliveryFee = 10;
  updateTotal();
});


applyPromo.addEventListener("click", function () {
  const code = promoCode.value.trim().toUpperCase();

  if (code === "SAVE10") {
    discount = subtotal * 0.10;
    promoMessage.textContent = "10% discount applied!";
    promoMessage.style.color = "green";
  } else {
    discount = 0;
    promoMessage.textContent = "Invalid promo code.";
    promoMessage.style.color = "red";

  }

  updateTotal();
});


cash.addEventListener("change", function () { // Runs when Cash is selected.
  cardDetails.hidden = true; // Hides the card fields.
  cardDetails.disabled = true; // Skips their required checks.
});

card.addEventListener("change", function () { // Runs when Card is selected.
  cardDetails.hidden = false; // Shows the card fields.
  cardDetails.disabled = false; // Enables the fields and their required checks.
});

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Keeps the page from reloading.

  const fullName = document.getElementById("full-name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (fullName === "" || phone === "" || address === "") {
    alert("Please enter your name, phone number, and address.");
    return; // Stops here if information is missing.
  }

  alert("Your information is ready!");
});