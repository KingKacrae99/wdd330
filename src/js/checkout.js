import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  const myForm = document.forms[0]; 
  const isValid = myForm.checkValidity();
  myForm.reportValidity();

  if (!isValid) return; 

  try {
    await checkout.checkout(e.target);
    alert("Order successful!");
    localStorage.removeItem("so-cart");
    window.location.href = "../checkout/success.html";
  } catch (err) {
    alert("Order failed. Try again.");
    console.error(err);
  }
});
