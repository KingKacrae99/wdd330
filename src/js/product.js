import { getLocalStorage, getParam, notifier } from "./utils.mjs";
import ExternalServices from "./externalSrevices.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
const dataSource = new ExternalServices();

const product = new productDetails(productId, dataSource);
product.init();
notifier(getLocalStorage("so-cart"));

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
  product.addProductToCart();
});

//function addProductToCart(product) {
//let cart = getLocalStorage("so-cart");
//if (!//Array.isArray(cart)) {
//cart = [];
//}
//cart.push(product);
//setLocalStorage("so-cart", cart);
//}

// add to cart button event handler
/*async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}*/

// add listener to Add to Cart button
/*document*/
/*.getElementById("addToCart")
  .addEventListener("click", addToCartHandler);*/
