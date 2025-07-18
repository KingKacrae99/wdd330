import { renderListwithTemplate, setLocalStorage, getLocalStorage, toTwoDecimal } from "./utils.mjs";

// This purpose of this script will be to generate a list of product cards in HTML from an array.

// returns reusable product card html template for rendering product dynamically 
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
function removeProductFromCart(product_id) {
    let soCart = getLocalStorage("so-cart") || [];
    console.log(soCart);

    if (soCart) {
        console.log(`This is diff: '${product_id}'`)
        soCart = soCart.filter(product => product.Id != `"${product_id}"`);
        setLocalStorage("so-cart", soCart);
        console.log(soCart);
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
                productBtn.addEventListener('click', (e) => {
                    const completeId= e.target.id;
                    const productId = completeId.split('-')[1];

                    console.log(productId)
                    removeProductFromCart(productId);
                    productBtn.closest(".product-card").remove();
                });
            }
        });
        
    }
} 