import { orderService } from "../services/orderService.mjs";
import { request, response } from "express";
import { orderRepository } from "../repositories/order.repository.mjs";
import { validationResult } from "express-validator";
import { ProductRepository } from "../repositories/product.repository.mjs";

const OrderRepository = new orderRepository();
const service = new orderService(OrderRepository);
/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/order/create_order
 * @method POST
 */

export async function createOrder(req, res, next) {
  const order = req.body;
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id;
    const createProduct = await service.createOrder(order, userId);
    res.send(createProduct);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/order/get_order
 * @method GET
 */

export async function getOrders(req, res, next) {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const products = await service.getOrders(userId, page, pageSize);
    res.send(products);
  } catch (err) {
    next(err);
  }
}

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/order/update_order
 * @method PUT
 */

export async function updateOrder(req, res, next) {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_order = parseInt(req.params.id_order);
    const order = req.body;
    const updatedOrder = await service.updateOrder(order, id_order);
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
}
