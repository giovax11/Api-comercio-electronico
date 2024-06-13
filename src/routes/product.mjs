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
import { authMiddleware } from "../middlewares/authMiddleware.mjs";

export const productRouter = express.Router();

productRouter.post("/create_product" ,validateCreateProduct(), createProduct);
productRouter.get("/get_products", getProducts);
productRouter.delete("/delete_product/:id_product",validateDeleteProduct(), deleteProduct);
productRouter.put("/update_product/:id_product",validateUpdateProduct() ,updateProduct);
