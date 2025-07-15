import { getLocalStorage, getParam, notifier} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./productDetails.mjs";


const productId = getParam('products');
const dataSource = new ProductData('tents');

const product = new productDetails(productId, dataSource);
product.init();
notifier(getLocalStorage("so-cart"));

console.log(dataSource.findProductById(productId))

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
