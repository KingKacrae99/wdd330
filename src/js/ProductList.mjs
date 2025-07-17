import renderListWithTemplate from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    console.log(this.products);
    this.renderList(list); // corregido aquí
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}

function productCardTemplate(product) {
  const isOnSale = product.FinalPrice < product.ListPrice;
  const discount = isOnSale
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100
      )
    : 0;

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">  $${product.FinalPrice}
        ${isOnSale ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>` : ""}
      </p>
      ${
        isOnSale
          ? `<span class="discount-badge">${discount}% OFF</span>`
          : ""
      }
    </a>
  </li>`;
}
