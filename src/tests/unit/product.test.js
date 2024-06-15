import { describe, it, expect, vi } from "vitest";
import prismaMock from "../mocks/prisma.mjs";
import { ProductRepository } from "../../repositories/product.repository.mjs";
vi.mock("../../models/prisma/prisma.mjs", () => {
  return {
    __esModule: true,
    default: prismaMock,
  };
});

const repository = new ProductRepository();

describe("Test for product", () => {
  describe("Get products", () => {
    describe("given a valid page and pagesize", () => {
      it("should return products with pagination", async () => {
        const page = 1,
          pageSize = 1;
        const products = [
          {
            id: 1,
            name: "Product",
            price: 100,
            description: "Example",
            stock: 1,
          },
          {
            id: 2,
            name: "Product",
            price: 100,
            description: "Example",
            stock: 1,
          },
        ];
        const expectedProducts = products.slice(0, pageSize);

        prismaMock.product.findMany.mockResolvedValue(expectedProducts);

        const result = await repository.getProducts(page, pageSize);
        expect(result).toEqual(expectedProducts);
      });
    });
  });

  describe("Create product", () => {
    it("should create and return a new product", async () => {
      const productData = {
        name: "New Product",
        description: "Description of the product",
        price: 99.99,
        stock: 10,
      };
      const createdProduct = { ...productData, id: 1 };

      prismaMock.product.create.mockResolvedValue(createdProduct);

      const result = await repository.createProduct(productData);

      expect(result).toEqual(createdProduct);
      expect(prismaMock.product.create).toHaveBeenCalledWith({
        data: productData,
      });
    });
  });

  describe("Update a product", () => {
    it("should update and return the product", async () => {
      const updatedData = {
        name: "Updated Product",
        description: "Updated description",
        price: 109.99,
        stock: 15,
      };
      const id_product = 1;
      const updatedProduct = { ...updatedData, id: id_product };

      prismaMock.product.update.mockResolvedValue(updatedProduct);

      const result = await repository.updateProduct(updatedData, id_product);

      expect(result).toEqual(updatedProduct);
      expect(prismaMock.product.update).toHaveBeenCalledWith({
        where: { id: id_product },
        data: updatedData,
      });
    });
  });

  describe("Delete product", () => {
    it("should delete and return the product", async () => {
      const id_product = 1;
      const deletedProduct = { id: id_product, name: "Deleted Product" };

      prismaMock.product.delete.mockResolvedValue(deletedProduct);

      const result = await repository.deleteProduct(id_product);

      expect(result).toEqual(deletedProduct);
      expect(prismaMock.product.delete).toHaveBeenCalledWith({
        where: { id: id_product },
      });
    });
  });
});
