import express from "express";
import {
  validateCreateProduct,
  validateDeleteProduct,
  validateUpdateProduct,
} from "../validators/product.validators.mjs";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controlles/productController.mjs";

export const productRouter = express.Router();

/**
 * Create a new product
 *
 * Validates the request body using the validateCreateProduct middleware
 * and then calls the createProduct controller function to create a new product
 */
productRouter.post("/create_product", validateCreateProduct(), createProduct);

/**
 * Get an existing product
 *
 * Validates the request params using the validateGetProduct middleware
 * and then calls the getProduct controller function to retrieve a product
 */
productRouter.get("/get_products", getProducts);

/**
 * Update an existing product
 *
 * Validates the request body and params using the validateUpdateProduct middleware
 * and then calls the updateProduct controller function to update a product
 */
productRouter.delete(
  "/delete_product/:id_product",
  validateDeleteProduct(),
  deleteProduct
);

/**
 * Update an existing product
 *
 * Validates the request body and params using the validateUpdateProduct middleware
 * and then calls the updateProduct controller function to update a product
 */
productRouter.put(
  "/update_product/:id_product",
  validateUpdateProduct(),
  updateProduct
);
