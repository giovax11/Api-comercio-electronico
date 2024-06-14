import { body, param } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";

// Function to validate create product request
export const validateCreateProduct = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isLength({ max: 100 })
      .withMessage("The field has exceeded the maximum allowed characters")
      .custom(async (name) => {
        const product = await prisma.product.findUnique({
          where: { name: name },
        });
        if (product) {
          throw new Error("A product with the same name is already registered");
        }
      }),

    // Validate product description
    body("description")
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isLength({ max: 250 })
      .withMessage("The field has exceeded the maximum allowed characters"),

    // Validate product price
    body("price")
      .not()
      .isEmpty()
      .withMessage("The field has exceeded the maximum allowed characters")
      .isFloat({ min: 0 })
      .withMessage("The price must be greater or equal to zero"),

    // Validate product stock
    body("stock")
      .not()
      .isEmpty()
      .withMessage("The field has exceeded the maximum allowed characters")
      .isInt({ min: 0 })
      .withMessage("The stock must be greater or equal to zero"),
  ];
};

// Function to validate delete product request
export const validateDeleteProduct = () => {
  return [
    // Validate product id
    param("id_product").custom(async (id) => {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        throw new Error("There is no product with the specified id");
      }
    }),
  ];
};

// Function to validate update product request
export const validateUpdateProduct = () => {
  return [
    param("id_product").custom(async (id) => {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        throw new Error("There is no product with the specified id");
      }
    }),
    body("name")
      .optional()
      .isLength({ min: 1 })
      .withMessage("The fiel can not be empty")
      .isLength({ max: 100 })
      .withMessage("The field has exceeded the maximum allowed characters"),

    body("description")
      .optional()
      .isLength({ min: 1 })
      .withMessage("The fiel can not be empty")
      .isLength({ max: 250 })
      .withMessage(`The field has exceeded the maximum allowed characters`),

    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("The price must be greater or equal to zero"),

    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("The stock must be greater than or equal to zero"),
  ];
};
