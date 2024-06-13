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

orderRouter.post("/create_order", validateCreateOrder(), createOrder);
orderRouter.get("/get_orders", getOrders);
orderRouter.put("/update_order/:id_order", validateUpdateOrder(), updateOrder);
