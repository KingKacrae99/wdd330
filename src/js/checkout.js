import CheckoutProcess from "./checkoutProcess.mjs";
import { alertMessage } from "./utils.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();

  const myForm = document.forms[0]; 
  const isValid = myForm.checkValidity();
  myForm.reportValidity();
  alertMessage()

  if (!isValid) {
    const invalidFields = [...myForm.elements].filter(field => !field.validity.valid);
    

    const messages = invalidFields.map(field => {
      const label = myForm.querySelector(`label[for="${field.id}"]`);
      const name = label ? label.textContent : field.name || field.id || "Unknown field";
      return `• ${name} is invalid.`;
    }).join("\n");

    alertMessage("Please fix the following:\n\n" + messages);
    return;
  } 

  try {
    await checkout.checkout(e.target);
    alert("Order successful!");
    localStorage.removeItem("so-cart");
    alertMessage("Order successful!");
    window.location.href = "../checkout/success.html";
  } catch (err) {
    alert("Order failed. Try again.");
    alertMessage("Order failed. Try again.");
  }
});
