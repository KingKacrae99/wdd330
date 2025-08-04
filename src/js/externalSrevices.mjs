const baseURL = import.meta.env.VITE_SERVER_URL
console.log(baseURL)

function convertToJson(res) {
  const response= res.json()
  if (res.ok) {
    return res.json();
  } else {
    const jsonResponse = JSON.stringify(response)
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor(category) {
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
async getData(category) {
  const response = await fetch(`${baseURL}products/search/${category} `);
  const data = await convertToJson(response);
  return data.Result;
}
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response)
    return data.Result;
  }
  async checkout(order) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    };
    console.log(`${baseURL}checkout`)
    const response = await fetch(`${baseURL}checkout/`, options).then(convertToJson);

    if (!response.ok) {
      throw new Error("Order failed.");
    }

    return await response.json();
  }
}
