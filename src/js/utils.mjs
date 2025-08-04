// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the value of a parameter from the url
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  
  // check if the product exists
  if (product) return  product;
  return null;
}

export default function renderListWithTemplate (template, parentElement, list, position = "afterbegin", clear = false) {
   const htmlStrings = list.map(template);

   if (clear) {
      parentElement.innerHTML = "";
   }
    parentElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}

export function notifier(cartItem) {
  const counter = document.getElementById("counter");
  if (cartItem) {
    counter.textContent = cartItem.length;
  } else {
    counter.textContent = 0;
  }
}

export function toTwoDecimal(num) {
  return num.toFixed(2);
}

export function alertMessage(message, scroll = true) {
 
  const existing = document.querySelector(".custom-alert");
  if (existing) existing.remove();

  
  const alert = document.createElement("div");
  alert.classList.add("custom-alert");
  alert.textContent = message;

 
  alert.style.backgroundColor = "#4bcc56ff";
  alert.style.color = "#333";
  alert.style.padding = "12px";
  alert.style.marginBottom = "16px";
  alert.style.marginTop = "16px";
  alert.style.borderRadius = "6px";
  alert.style.boxShadow = "0 2px 5px rgba(0,0,0,0.15)";
  alert.style.fontWeight = "500";

  const main = document.querySelector("main");
  if (main) {
    main.prepend(alert);
    if (scroll) window.scrollTo(0, 0);
    setTimeout(() => alert.remove(), 3000);
  }
}
