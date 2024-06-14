import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
} from "../controlles/orderController.mjs";
import {
  validateCreateOrder,
  validateUpdateOrder,
} from "../validators/order.validators.mjs";

export const orderRouter = express.Router();

/**
 * Create a new order
 *
 * Validates the request body using the validateCreateOrder middleware
 * and then calls the createOrder controller function to create a new order
 */
orderRouter.post("/create_order", validateCreateOrder(), createOrder);

/**
 * Get an existing order
 *
 * Validates the request params using the validateGetOrder middleware
 * and then calls the getOrder controller function to retrieve an order
 */
orderRouter.get("/get_orders", getOrders);

/**
 * Update an existing order
 *
 * Validates the request body and params using the validateUpdateOrder middleware
 * and then calls the updateOrder controller function to update an order
 */
orderRouter.put("/update_order/:id_order", validateUpdateOrder(), updateOrder);
