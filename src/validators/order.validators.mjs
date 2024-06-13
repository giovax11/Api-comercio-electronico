import { body, param } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";
import { ORDER_STATES } from "../constants/order.mjs";

export const validateCreateOrder = () => {
  return [
    body("status")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isIn(Object.values(ORDER_STATES))
      .withMessage("The order state is not valid"),

    body("products")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isArray({ min: 1 })
      .withMessage("The field must be an array with at least one element"),

    body("products.*.id")
      .isInt()
      .withMessage("Product ID must be an integer")
      .custom(async (id) => {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(id) },
        });
        if (!product) {
          throw new Error("Product does not exist");
        }
      }),
    body("products.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be greater than 0"),
  ];
};
