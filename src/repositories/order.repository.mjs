import prisma from "../models/prisma/prisma.mjs";
import { CustomError } from "../error/customErrors.mjs";

export class orderRepository {
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
  async updateOrder(order, id) {
    return prisma
      .$transaction(async (prisma) => {
        const orderToUpdate = await prisma.order.findUnique({
          where: { id },
          include: { products: true },
        });

        const updatedOrder = await prisma.order.update({
          where: { id },
          data: { status: order.status },
        });

        for (let product of order.products) {
          if (!orderToUpdate.products.some((p) => p.productId == product.id)) {
            await prisma.orderProduct.create({
              data: {
                order: { connect: { id } },
                product: { connect: { id: product.id } },
                quantity: product.quantity,
              },
            });
            await prisma.product.update({
              where: { id: product.id },
              data: {
                stock: {
                  decrement: product.quantity,
                },
              },
            });
          } else {
            await prisma.orderProduct.update({
              where: {
                orderId_productId: {
                  orderId: id,
                  productId: product.id,
                },
              },
              data: { quantity: product.quantity },
            });
            const existingProduct = orderToUpdate.products.find(
              (p) => p.productId === product.id
            );
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
