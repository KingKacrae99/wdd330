import { setLocalStorage, getLocalStorage, toTwoDecimal} from "./utils.mjs";


// onstuctor of an instance
export default class ProductDetails {
    constructor(productId, dataSource){
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    }

    // i nitializer
    async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      console.log(this.product)

        this.renderProductDetails();

    document
        .getElementById("addToCart")
        .addEventListener("click", () => this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
       productDetailsTemplate(this.product);
    }


}

// generates the product details and set them into Dom
function productDetailsTemplate(product) {
  let deductedPrice = toTwoDecimal(product.SuggestedRetailPrice - product.FinalPrice);
    let discount = toTwoDecimal((deductedPrice / product.SuggestedRetailPrice) * 100);
    console.log(discount)
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;
 
    const productImage = document.getElementById("productImage");
    console.log(product.Image)
  productImage.src = product.Images.PrimaryLarge
;
  productImage.alt = product.NameWithoutBrand;
 
  document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("product-discount-fee").innerHTML = `<strong>Discounted Fee:</strong> $${deductedPrice}`;
  document.getElementById("product_discount").innerHTML = `<strong>Discount:</strong> ${discount}% Off`;    
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;
 
  document.getElementById("addToCart").dataset.id = product.Id;
}