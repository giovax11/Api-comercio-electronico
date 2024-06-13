import { CustomError } from "../error/customErrors.mjs";

export class orderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async createOrder(order, userId) {
    const newOrder = await this.orderRepository.createOrder(order, userId);
    return newOrder;
  }
  async getOrders(userId, page, pagesize) {
    const orders = await this.orderRepository.getOrders(userId, page, pagesize);
    return orders;
  }
}
