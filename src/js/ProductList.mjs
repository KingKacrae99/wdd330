import { renderListwithTemplate, setLocalStorage, getLocalStorage } from "./utils.mjs";

// This purpose of this script will be to generate a list of product cards in HTML from an array.

// returns reusable product card html template for rendering product dynamically 
function productCardTemplate(product) {
    return ` <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2 class="card_brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">${product.FinalPrice}</p>
        <p class="product-discount"><strong>Discount:</strong> </p>
      </a>
      <button id="remove-${product.Id}">Remove From Cart </button>
     </li>
    `;
}
function removeProductFromCart(product_id) {
    let soCart = getLocalStorage("so-cart") || [];
    if (soCart) {
        soCart = soCart.filter(product => product.id === product_id);
        setLocalStorage("so-cart", soCart);
    }
}
//  Class that handles the product cards render based on category
export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category,
        this.dataSource = dataSource,
        this.listElement = listElement
    }

    // gets product object from datasource(productData class) and store in a list
    // then render it using renderList
    async init() {
        // the datasource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData();
        this.renderList(list);
    }

    // render's the product cards from the list using renderListwithTemplate utility func
    renderList(list) {
        // const htmlString = list.map(productCardTemplate);
        //const htmlStrings = list.map(productCardTemplate);
        //this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
        renderListwithTemplate(productCardTemplate, this.listElement, list)

        list.forEach(product => {
            const productBtn = document.getElementById(`remove-${product.Id}`);
            if (productBtn) {
                productBtn.addEventListener('click', () => {
                    removeProductFromCart(product.Id);
                    productBtn.closest(".product-card").remove();
                });
            }
        });
    }
} 