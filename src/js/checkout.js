import CheckoutProcess from "./checkoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout-form"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    myForm.reportValidity();
    for (let element in myForm.elements) {
      if(!element.validity.valid)
        msg = `${element.name} ${element.setsetCustomValidity("is invalid")}`
       alertMessages(msg)
    }
    try {
    await checkout.checkout(e.target);
    alert("Order successful!");
    localStorage.removeItem("so-cart");
    window.location.href = "../checkout/success.html";
  } catch (err) {
    alert("Order failed. Try again.");
    console.error(err);
  }
    
  }


});
