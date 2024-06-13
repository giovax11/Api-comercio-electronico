import prisma from "../models/prisma/prisma.mjs";

export class orderRepository {
  async createOrder(order, userId) {
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
    return newOrder;
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
}
