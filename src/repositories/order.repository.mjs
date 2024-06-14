import prisma from "../models/prisma/prisma.mjs";
import { CustomError } from "../error/customErrors.mjs";

/**
 * @typedef {import("../types/order").order} order
 */

export class orderRepository {
  /**
   * Create a new order
   *
   * @param {order} order - Order data
   * @param {number} userId - User ID
   * @returns {Promise<order>} - Created order
   *
   * This method creates a new order and associates it with the user.
   * It uses a transaction to ensure atomicity, creating the order and
   * its products in a single, all-or-nothing operation.
   */
  async createOrder(order, userId) {
    return prisma
      .$transaction(async (prisma) => {
        const newOrder = await prisma.order.create({
          data: {
            status: order.status,
            date: order.date,
            user: { connect: { id: userId } },
            products: {
              create: order.products.map((product) => ({
                product: {
                  connect: {
                    id: product.id,
                  },
                },
                quantity: product.quantity,
              })),
            },
          },
        });
        //Updates the products stock
        for (let product of order.products) {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              stock: {
                decrement: product.quantity,
              },
            },
          });
        }

        return newOrder;
      })
      .catch((err) => {
        console.log(err);
        throw new CustomError("Ha ocurrido un error al crear el pedido", 500);
      });
  }

  /**
   * Get orders for a user
   *
   * @param {number} userId - User ID
   * @param {number} page - Page number
   * @param {number} pageSize - Page size
   * @returns {Promise<order[]>} - List of orders
   *
   *  This method retrieves orders for the logged user with pagination.
   */
  async getOrders(userId, page, pagesize) {
    const skip = (page - 1) * pagesize;
    const orders = await prisma.order.findMany({
      skip,
      take: pagesize,
      where: {
        userId: userId,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    return orders;
  }

  /**
   * Update an order
   *
   * @param {order} order - Order data
   * @param {number} id - Order ID
   * @returns {Promise<order>} - Updated order
   *
   * This method updates an existing order and its products.
   * It uses a transaction to ensure atomicity, updating the order and
   * its products in a single, all-or-nothing operation.
   */
  async updateOrder(order, id) {
    return prisma
      .$transaction(async (prisma) => {
        //Find the inserted
        const orderToUpdate = await prisma.order.findUnique({
          where: { id },
          include: { products: true },
        });

        const updatedOrder = await prisma.order.update({
          where: { id },
          data: { status: order.status },
        });

        for (let product of order.products) {
          //Validates if the product has already been inserted
          if (!orderToUpdate.products.some((p) => p.productId == product.id)) {
            //Inserts the product into the existing order
            await prisma.orderProduct.create({
              data: {
                order: { connect: { id } },
                product: { connect: { id: product.id } },
                quantity: product.quantity,
              },
            });
            //update the product stock
            await prisma.product.update({
              where: { id: product.id },
              data: {
                stock: {
                  decrement: product.quantity,
                },
              },
            });
          } else {
            //Update the existing product with the new information
            await prisma.orderProduct.update({
              where: {
                orderId_productId: {
                  orderId: id,
                  productId: product.id,
                },
              },
              data: { quantity: product.quantity },
            });
            //Obtains exisitng product
            const existingProduct = orderToUpdate.products.find(
              (p) => p.productId === product.id
            );
            //Update the stock of the product
            await prisma.product.update({
              where: { id: product.id },
              data: {
                stock: {
                  increment: existingProduct.quantity - product.quantity,
                },
              },
            });
          }
        }
        return updatedOrder;
      })
      .catch((err) => {
        console.log(err);
        throw new CustomError(
          "Ha ocurrido un error al actualizar el pedido",
          500
        );
      });
  }
}
