import { describe, it, expect, vi } from "vitest";
import prismaMock from "../mocks/prisma.mjs";
import { orderRepository } from "../../repositories/order.repository.mjs";
vi.mock("../../models/prisma/prisma.mjs", () => {
  return {
    __esModule: true,
    default: prismaMock,
  };
});

const repository = new orderRepository();

describe("Orders tests", () => {
  describe("Get a ordes with pagination", () => {
    describe("given a valid page and pagesize ", () => {
      it("should return orders with pagination", async () => {
        const page = 1,
          pageSize = 1;
        const orders = [
          {
            id: 32,
            status: "PENDING",
            date: "2024-06-14T13:06:27.675Z",
            totalCost: 123.6,
            userId: 1,
            products: [
              {
                quantity: 2,
                product: {
                  name: "product",
                },
              },
              {
                quantity: 10,
                product: {
                  name: "product",
                },
              },
            ],
          },
        ];

        const expectedOrders = orders.slice(0, pageSize);

        prismaMock.order.findMany.mockResolvedValue(expectedOrders);

        const result = await repository.getOrders(page, pageSize);
        expect(result).toEqual(expectedOrders);
      });
    });
  });
});
