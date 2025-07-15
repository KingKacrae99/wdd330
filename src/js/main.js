
import ProductData from "./ProductData.mjs"
import ProductList from "./ProductList.mjs";
import { getLocalStorage, notifier } from "./utils.mjs";

// retreive product instance based specified category
const datasource = new ProductData("tents");

// Gets the html dom of the product-list
const element = document.querySelector(".product-list");

// product-list instance
const productCards = new ProductList("tents", datasource, element);

productCards.init();
notifier(getLocalStorage("so-cart"));
