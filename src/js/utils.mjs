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

export function renderWithTemplate (template, parentElement, data, callback) {
  
    parentElement.innerHTML = template;
    if(callback) {
      callback(data);
    }
}

export async function loadTemplate (path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export function  loadHeaderFooter() {
  const header = loadTemplate("../public/partials/header.html");
  const footer = loadTemplate("../public/partials/footer.html");
  renderListWithTemplate(header, qs("#main-header"));
  renderListWithTemplate(footer, qs("#footer"));
}