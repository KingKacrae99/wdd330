export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    //this.init = this.init.bind(this);

  }

  async init() {
    this.products = await this.dataSource.getData();
    console.log(this.products);
    //this.renderProducts();
  }
}