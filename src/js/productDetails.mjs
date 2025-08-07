import { setLocalStorage, getLocalStorage, toTwoDecimal, alertMessage, qs } from "./utils.mjs";



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

  const existingItemIndex = cartItems.findIndex(
    (item) => item.Id === this.product.Id
  );

  if (existingItemIndex !== -1) {
    
    cartItems[existingItemIndex].quantity =
      (cartItems[existingItemIndex].quantity || 1) + 1;
  } else {
    
    const productToAdd = { ...this.product, quantity: 1 };
    cartItems.push(productToAdd);
  }

  setLocalStorage("so-cart", cartItems);
  alertMessage("🛒 Product added to cart!", false);
  
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
  const slider = qs(".slider");
  console.log(product.Image)
  const extraImgList = product.Images.ExtraImages
  
  if (extraImgList) {
    slider.innerHTML = '';

    slider.innerHTML += `
      <div class="slide">
        <img class="divider" id="productImage"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}" />
      </div>`

    extraImgList.forEach(image => {
      const slide = `<div class="slide">
      <img src="${image.Src}" alt="${image.Title}" id="productImage">
      </div>`;
      slider.innerHTML += slide;
      console.log(image.Src)
    });

    initiateCarousel();
  } else {
    productImage.src = product.Images.PrimaryLarge
    productImage.alt = product.NameWithoutBrand;
  }

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("product-discount-fee").innerHTML = `<strong>Discounted Fee:</strong> $${deductedPrice}`;
  document.getElementById("product_discount").innerHTML = `<strong>Discount:</strong> ${discount}% Off`;    
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

function initiateCarousel() {
  const slides= document.querySelectorAll(".slide")
  const slider = qs(".slider")
  let currentIndex = 0;
  const allslides = slides.length
  setInterval(() => {
    currentIndex = (currentIndex + 1) % allslides;
    console.log(currentIndex * 100)
    slider.style.transform = `translateX(-${currentIndex * 100}%)`
  },3000)

}

