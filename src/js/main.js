import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const product = new ProductData("tents"); // corregido
const tentList = new ProductList("tents", "#product-list");
tentList.init();
console.log(product);
console.log(tentList);
console.log("holaaaa");
