// converts json string into js object
function convertToJson(res) {
  // if response is ok
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// A class for handle product based on category
export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  //fetches product from the specified path 
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  // finds the product with the specified Id
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
