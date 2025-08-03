import { getLocalStorage, qs, notifier, setLocalStorage } from "./utils.mjs";
const totalAmount = qs(".cart-total__amount");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems ? cartItems.map((item) => cartItemTemplate(item)) : [emptyCartTemplate()];

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  notifier(cartItems);
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    
    <div class="cart-card__quantity-controls">
      <button class="decrease-qty" data-id="${item.Id}">−</button>
      <span class="cart-card__quantity">qty: ${item.quantity || 1}</span>
      <button class="increase-qty" data-id="${item.Id}">+</button>
    </div>

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

function updateTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

function attachEventListeners() {
  document.querySelectorAll(".increase-qty").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      updateQuantity(id, 1);
    })
  );

  document.querySelectorAll(".decrease-qty").forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      updateQuantity(id, -1);
    })
  );
}

function updateQuantity(id, change) {
  let cartItems = getLocalStorage("so-cart") || [];

  cartItems = cartItems.map((item) => {
    if (item.Id === id) {
      const newQty = (item.quantity || 1) + change;
      item.quantity = newQty < 1 ? 1 : newQty;
    }
    return item;
  });

  setLocalStorage("so-cart", cartItems);
  renderCartContents(); // Re-render the cart
}

renderCartContents();
updateTotal();
attachEventListeners(); 