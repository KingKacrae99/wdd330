import renderListWithTemplate from "./utils.mjs";
import { toTwoDecimal } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log(list);
    this.renderList(list); 
    const categoryHead = document.getElementById("category-head");
    categoryHead.textContent = `Top Products: ${this.category}`
  }

  // renders the list of products to the html 
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);

    // sort or filters pproduct by name or price
    const sortOption = document.getElementById("sort")
    sortOption.addEventListener('change', () => {
      const selectedValue = sortOption.value;
      switch (selectedValue) {
        case "a-z":
          list.sort((a,z) => {
            return a.Name.localeCompare(z.Name); 
          })
          break;
        case "z-a":
          list.sort((a,z) => {
            return z.Name.localeCompare(a.Name); 
          })
          break;
        case "price-asc":
          list.sort((a,z) => {
            return a.FinalPrice - z.FinalPrice; 
          })
          break;
        case "price-desc":
          list.sort((a,z) => {
            return z.FinalPrice - a.FinalPrice; 
          })
          break;
      
        default:
          break;
      }
      renderListWithTemplate(productCardTemplate, this.listElement, list);
    })
  }
}
function productCardTemplate(product) {
    let deductedPrice = product.SuggestedRetailPrice - product.FinalPrice;
    let discount = toTwoDecimal((deductedPrice / product.SuggestedRetailPrice) * 100);

    const isOnSale = product.SuggestedRetailPrice > product.FinalPrice;

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
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

/*
function productCardTemplate(product) {
    let deductedPrice = product.SuggestedRetailPrice - product.FinalPrice;
    let discount = toTwoDecimal((deductedPrice / product.SuggestedRetailPrice) * 100);
    return ` <li class="product-card">
      <a href="product_pages/?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card_brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">${product.FinalPrice}</p>
        <p class="product-card_discount"><strong>Discount:</strong></p>
        <p class="product-reduced_fee"><strong>Discounted Fee:</strong> ${toTwoDecimal(deductedPrice)}</p>
      </a>
      <button id="remove-${product.Id}">Remove From Cart </button>
     </li>
    `;
}
*/