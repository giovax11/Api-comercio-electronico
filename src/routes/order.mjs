import express from "express";
import { createOrder, getOrders } from "../controlles/orderController.mjs";
import { validateCreateOrder } from "../validators/order.validators.mjs";

export const orderRouter = express.Router();

orderRouter.post("/create_order", validateCreateOrder(), createOrder);
orderRouter.get("/get_orders", getOrders);
