import { CustomError } from "../error/customErrors.mjs";

export class productService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async createProduct(product) {
    const newProduct = await this.productRepository.createProduct(product);
    return newProduct;
  }
  async getProducts(page, pagesize) {
    const products = await this.productRepository.getProducts(page, pagesize);
    return products;
  }
  async updateProducts(product, id_product) {
    const updatedProduct = await this.productRepository.updateProduct(
      product,
      id_product
    );
    return updatedProduct;
  }
  async deleteProduct(id_product) {
    const deletedProduct = await this.productRepository.deleteProduct(
      id_product
    );
    return deletedProduct;
  }
}
