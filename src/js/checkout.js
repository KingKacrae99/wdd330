import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await checkout.checkout(e.target);
    alert("Order successful!");
    localStorage.removeItem("so-cart");
    window.location.href = "/confirmation.html";
  } catch (err) {
    alert("Order failed. Try again.");
    console.error(err);
  }
});
