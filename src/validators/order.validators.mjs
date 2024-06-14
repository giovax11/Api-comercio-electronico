import { body, param } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";
import { ORDER_STATES } from "../constants/order.mjs";

// Validation rules for creating an order.
export const validateCreateOrder = () => {
  return [
    //Validate order status
    body("status")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isIn(Object.values(ORDER_STATES))
      .withMessage("The order state is not valid"),

    //Validate order products
    body("products")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isArray({ min: 1 })
      .withMessage("The field must be an array with at least one element"),

    body("products.*.id")
      .isInt()
      .withMessage("Product ID must be an integer")
      // Check if product exists and has sufficient stock
      .custom(async (id, { req }) => {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(id) },
        });
        if (!product) {
          throw new Error("Product does not exist");
        }
        const quantity = req.body.products.find((val) => val.id == id).quantity;
        if (quantity > product.stock) {
          throw new Error(
            `Insufficient Stock : Requested quantity of ${product.name} (${quantity}) exceeds available stock of ${product.stock} `
          );
        }
      }),

    //Validate product quantity
    body("products.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be greater than 0"),
  ];
};

//Validation rules for updating an existing order.
export const validateUpdateOrder = () => {
  return [
    param("id_order").custom(async (id, { req }) => {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: { user: true },
      });
      if (!order) {
        throw new Error("Order not found");
      }

      if (order.user.id !== req.user.id) {
        throw new Error("You do not have permission to access this order");
      }
    }),
    body("status")
      .optional()
      .isIn(Object.values(ORDER_STATES))
      .withMessage("The order state is not valid"),

    body("products")
      .optional()
      .isArray({ min: 1 })
      .withMessage("The field must be an array with at least one element"),

    body("products.*.id")
      .isInt()
      .withMessage("Product ID must be an integer")
      // Check if product exists and has sufficient stock
      .custom(async (id, { req }) => {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(id) },
        });
        if (!product) {
          throw new Error("Product does not exist");
        }
        const quantity = req.body.products.find((val) => val.id == id).quantity;
        if (quantity > product.stock) {
          throw new Error(
            `Insufficient Stock : Requested quantity of ${product.name} (${quantity}) exceeds available stock of ${product.stock} `
          );
        }
      }),
    body("products.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be greater than 0"),
  ];
};
