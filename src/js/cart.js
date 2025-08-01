import { getLocalStorage, qs, notifier } from "./utils.mjs";
const totalAmount = qs(".cart-total__amount");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems ? cartItems.map((item) => cartItemTemplate(item)) : [emptyCartTemplate()];

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  notifier(cartItems);
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function emptyCartTemplate() {
  return `<div class="empty-cart">
    <h2 class="cart-card__empty">Your cart is empty</h2>
  <a href="/index.html">
    <button>Shop Now</button>
  </a>
  </div>
  `;
}

renderCartContents();

function updateTotal() {
  const cartItems = getLocalStorage("so-cart");

  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

  totalAmount.textContent = `$${total.toFixed(2)}`;
}

updateTotal();