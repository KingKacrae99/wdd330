// js/CheckoutProcess.mjs
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./externalSrevices.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.cartItems = getLocalStorage(this.key) || [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  init() {
    this.calculateSummary();
    this.addZipListener();
  }

  calculateSummary() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice * item.quantity, 0);
    this.tax = this.subtotal * 0.06;
    const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;
    this.total = this.subtotal + this.tax + this.shipping;

    document.querySelector("#subtotal").textContent = this.subtotal.toFixed(2);
    document.querySelector("#tax").textContent = this.tax.toFixed(2);
    document.querySelector("#shipping").textContent = this.shipping.toFixed(2);
    document.querySelector("#total").textContent = this.total.toFixed(2);
  }

  addZipListener() {
    const zip = document.getElementById("zip");
    if (zip) {
      zip.addEventListener("blur", () => this.calculateSummary());
    }
  }

  packageItems() {
    return this.cartItems.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity
    }));
  }

  async checkout(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const order = {
      ...data,
      orderDate: new Date().toISOString(),
      items: this.packageItems(),
      orderTotal: this.total.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2)
    };

    const service = new ExternalServices();
    return await service.checkout(order);
  }
}
