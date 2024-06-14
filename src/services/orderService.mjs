import { CustomError } from "../error/customErrors.mjs";
/**
 * @typedef {import("../types/order").order} order
 */
export class orderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  /**
   * Create a new order
   *
   * @param {order} order - Order data
   * @param {number} userId - User ID
   * @returns {Promise<order>} - Created order
   */
  async createOrder(order, userId) {
    try {
      const newOrder = await this.orderRepository.createOrder(order, userId);
      return newOrder;
    } catch (err) {
      throw new CustomError("Ha ocurrido un error al crear el pedido", 500);
    }
  }
  /**
   * Get orders for a user
   *
   * @param {number} userId - User ID
   * @param {number} page - Page number
   * @param {number} pageSize - Page size
   * @returns {order[]} - List of orders
   */
  async getOrders(userId, page, pagesize) {
    const orders = await this.orderRepository.getOrders(userId, page, pagesize);
    return orders;
  }

  /**
   * Update an order
   *
   * @param {order} order - Order data
   * @param {number} id - Order ID
   * @returns {Promise<order>} - Updated order
   */
  async updateOrder(order, id) {
    const updatedOrder = await this.orderRepository.updateOrder(order, id);
    return updatedOrder;
  }
}
