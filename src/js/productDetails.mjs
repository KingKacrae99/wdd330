import { setLocalStorage, getLocalStorage, toTwoDecimal } from "./utils.mjs";
import  updateBreadcrumb  from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this)); // bind fixed
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existingItem = cartItems.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cartItems.push(this.product);
    }

    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    //updateBreadcrumb("productDetail", { category: this.product.Category });
    productDetailsTemplate(this.product);
  }
}

// Generates the product details and sets them into the DOM
function productDetailsTemplate(product) {
  const brandName = product?.Brand?.Name ?? "Unknown Brand";
  const productName = product?.NameWithoutBrand ?? "Unnamed Product";
  const imageUrl = product?.Image ?? "";
  const finalPrice = toTwoDecimal(product.FinalPrice);
  const suggestedPrice = product?.SuggestedRetailPrice ?? finalPrice;

  const deductedPrice = toTwoDecimal(suggestedPrice - finalPrice);
  const discount = suggestedPrice > 0 ? toTwoDecimal((deductedPrice / suggestedPrice) * 100) : 0;

  document.querySelector("h2").textContent = brandName;
  document.querySelector("h3").textContent = productName;

  const productImage = document.getElementById("productImage");
  productImage.src = imageUrl;
  productImage.alt = productName;

  document.getElementById("productPrice").textContent = `$${finalPrice}`;
  document.getElementById("product-discount-fee").innerHTML = `<strong>Discounted Fee:</strong> $${deductedPrice}`;
  document.getElementById("product_discount").innerHTML = `<strong>Discount:</strong> ${discount}% Off`;

  document.getElementById("productColor").textContent = product?.Colors?.[0]?.ColorName ?? "N/A";
  document.getElementById("productDesc").innerHTML = product?.DescriptionHtmlSimple ?? "";

  document.getElementById("addToCart").dataset.id = product.Id;
}
