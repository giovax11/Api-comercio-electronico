import prisma from "../models/prisma/prisma.mjs";
/**
 * Product type definition
 *
 * @typedef {import("../types/product").product} product
 */
export class ProductRepository {
  /**
   * Create a new product
   *
   * @param {product} product - Product data
   * @returns {Promise<product>} - Created product
   *
   * This method creates a new product with the provided data.
   */
  async createProduct(product) {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    return newProduct;
  }

  /**
   * Update an existing product
   *
   * @param {product} product - Product data
   * @param {number} id - Product ID
   * @returns {Promise<product>} - Updated product
   *
   * This method updates an existing product with the provided data.
   */
  async updateProduct(product, id_product) {
    const updatedProduct = await prisma.product.update({
      where: { id: id_product },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    return updatedProduct;
  }

  /**
   * Delete a product
   *
   * @param {number} id - Product ID
   * @returns {Promise<product>} - Deleted product
   *
   * This method deletes a product by its ID.
   */
  async deleteProduct(id_product) {
    const deltedProduct = await prisma.product.delete({
      where: { id: id_product },
    });
    return deltedProduct;
  }

  /**
   * Get a list of products with pagination
   *
   * @param {number} page - Page number
   * @param {number} pageSize - Page size
   * @returns {Promise<product[]>} - List of products
   *
   * This method retrieves a list of products with pagination.
   */
  async getProducts(page, pagesize) {
    const skip = (page - 1) * pagesize;
    const products = await prisma.product.findMany({
      skip,
      take: pagesize,
    });
    return products;
  }
  async getProduct(id_product) {
    const product = await prisma.product.findUnique({
      where: { id: id_product },
    });
    return product;
  }
}
