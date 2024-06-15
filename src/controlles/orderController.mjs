import { orderService } from "../services/orderService.mjs";
import { request, response } from "express";
import { orderRepository } from "../repositories/order.repository.mjs";
import { validationResult } from "express-validator";

// Create an instance of the OrderRepository class
const OrderRepository = new orderRepository();
// Create an instance of the OrderService class, passing in the OrderRepository instance
const service = new orderService(OrderRepository);

/**
 *Create a new order controller
 *
 * @param {request} req
 * @param {response} res
 * @route /api/orders/
 * @method POST
 */

export async function createOrder(req, res, next) {
  const order = req.body;
  try {
    // Validate the request data using the express-validator middleware
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
 *Get orders users orders
 *
 * @param {request} req
 * @param {response} res
 * @route /api/orders/?page=?&pageSize=?
 * @method GET
 */

export async function getOrders(req, res, next) {
  try {
    const userId = req.user.id;

    // Extract the page and page size from the query string, defaulting to 1 and 10 if not provided
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const products = await service.getOrders(userId, page, pageSize);
    res.send(products);
  } catch (err) {
    next(err);
  }
}

/**
 *Update a order by id
 *
 * @param {request} req
 * @param {response} res
 * @route /api/orders/id_order
 * @method PUT
 */

export async function updateOrder(req, res, next) {
  try {
    // Validate the request data using the express-validator middleware
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

/**
 *Delete a order by id
 *
 * @param {request} req
 * @param {response} res
 * @route /api/orders/id_order
 * @method DELETE
 */

export async function deleteOrder(req, res, next) {
  try {
    // Validate the request data using the express-validator middleware
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id_order = parseInt(req.params.id_order);
    const order = req.body;

    const updatedOrder = await service.deleteOrder(id_order);
    res.send(updatedOrder);
  } catch (err) {
    next(err);
  }
}
