import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, notifier, getLocalStorage } from "./utils.mjs";
import Alert from "./alert.js";

const dataSource = new ProductData("tents");

const element = qs(".product-list");

const productList = new ProductList("Tents", dataSource, element);

productList.init();

notifier(getLocalStorage("so-cart"));

const alerts = new Alert("../public/json/alerts.json");
    //alerts.init();
