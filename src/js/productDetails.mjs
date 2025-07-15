import { setLocalStorage, getLocalStorage} from "./utils.mjs";


// Class that handles the rendering of a product instance
export default class ProductDetails {
    constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    // initializes product and render its detials
    async init() {
        // retreives product for the dataSource
        this.product = await this.dataSource.findProductById(this.productId);

        // render the product details
        this.renderProductDetails();

    
       document.getElementById("addToCart").addEventListener("click", () => this.addProductToCart.bind(this));
    }

    // add the product to cart stored in localstorage
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    /** 
     * renders the product details by:
     * calling the productDetailsTemplate that generates the HtML layout
    **/
    renderProductDetails() {
       productDetailsTemplate(this.product);
    }


}

// generates the product details and set them into Dom
function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}