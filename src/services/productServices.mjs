/**
 * @typedef {import("../types/product").product} product
 */
export class productService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  /**
   * Create a new product
   *
   * @param {product} product - Product data
   * @returns {Promise<product>} - Created product
   */
  async createProduct(product) {
    const newProduct = await this.productRepository.createProduct(product);
    return newProduct;
  }

  /**
   * Get products
   *
   * @param {number} page - Page number
   * @param {number} pageSize - Page size
   * @returns {Promise<product[]>} - List of products
   */
  async getProducts(page, pagesize) {
    const products = await this.productRepository.getProducts(page, pagesize);
    return products;
  }
  /**
   * Update a product
   *
   * @param {product} product - Product data
   * @param {number} id - Product ID
   * @returns {Promise<product>} - Updated product
   */
  async updateProducts(product, id_product) {
    const updatedProduct = await this.productRepository.updateProduct(
      product,
      id_product
    );
    return updatedProduct;
  }

  /**
   * Delete a product
   *
   * @param {number} id - Product ID
   * @returns {Promise<product>} - Deleted product
   */
  async deleteProduct(id_product) {
    const deletedProduct = await this.productRepository.deleteProduct(
      id_product
    );
    return deletedProduct;
  }
}
