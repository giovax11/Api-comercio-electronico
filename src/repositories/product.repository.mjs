import prisma from "../models/prisma/prisma.mjs";

export class ProductRepository {
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
  async deleteProduct(id_product) {
    const deltedProduct = await prisma.product.delete({
      where: { id: id_product },
    });
    return deltedProduct;
  }
  async getProducts(page, pagesize) {
    const skip = (page - 1) * pagesize;
    const products = await prisma.product.findMany({
      skip,
      take: pagesize,
    });
    return products;
  }
}
