alert("'helloooo'");

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs } from "./utils.mjs";


const dataSource = new ProductData("tents");

const element = qs("#product-list");
console.log(dataSource)
const productList = new ProductList("Tents", dataSource, element);

productList.init();