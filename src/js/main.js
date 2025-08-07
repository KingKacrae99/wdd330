import ExternalServices from "./externalSrevices.mjs";
import ProductList from "./ProductList.mjs";
import { qs, notifier, getLocalStorage,firstTimerAndModal } from "./utils.mjs";
import Alert from "./alert.js";

const dataSource = new ExternalServices("tents");

const element = qs(".product-list");

//const productList = new ProductList("Tents", dataSource, element);

notifier(getLocalStorage("so-cart"));
firstTimerAndModal(getLocalStorage("hasVisited"));

const alerts = new Alert("../public/json/alerts.json");
//alerts.init();
