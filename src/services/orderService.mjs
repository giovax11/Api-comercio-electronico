import { CustomError } from "../error/customErrors.mjs";

export class orderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async createOrder(order, userId) {
    try {
      const newOrder = await this.orderRepository.createOrder(order, userId);
      return newOrder;
    } catch (err) {
      throw new CustomError("Ha ocurrido un error al crear el pedido", 500);
    }
  }
  async getOrders(userId, page, pagesize) {
    const orders = await this.orderRepository.getOrders(userId, page, pagesize);
    return orders;
  }
  async updateOrder(order, id) {
    const updatedOrder = await this.orderRepository.updateOrder(order, id);
    return updatedOrder;
  }
}
