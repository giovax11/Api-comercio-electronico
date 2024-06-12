import { body, param } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";

export const validateCreateProduct = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .withMessage("El campo es requerido")
      .isLength({ max: 100 })
      .withMessage("El campo ha excedido el maximo de caracteres permitidos")
      .custom(async (name) => {
        const product = await prisma.product.findUnique({
          where: { name: name },
        });
        if (product) {
          throw new Error(
            "Ya existe un producto con el mismo nombre registrado"
          );
        }
      }),
    body("description")
      .not()
      .isEmpty()
      .withMessage("El campo es requerido")
      .isLength({ max: 250 })
      .withMessage("El campo ha excedido el maximo de caracteres permitidos"),

    body("price")
      .not()
      .isEmpty()
      .withMessage("El campo es requerido")
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser un número mayor o igual a 0"),

    body("stock")
      .not()
      .isEmpty()
      .withMessage("El campo es requerido")
      .isInt({ min: 0 })
      .withMessage("El stock debe ser un número mayor o igual a 0"),
  ];
};

export const validateDeleteProduct = () => {
  return [
    param("id_product").custom(async (id) => {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        throw new Error("No existe un producto con el id especificado");
      }
    }),
  ];
};

export const validateUpdateProduct = () => {
  return [
    param("id_product").custom(async (id) => {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
      if (!product) {
        throw new Error("No existe un producto con el id especificado");
      }
    }),
    body("name")
      .optional()
      .isLength({ min: 1 })
      .withMessage("El campo a actuaalizar no puede estar vacio ")
      .isLength({ max: 100 })
      .withMessage("El campo ha excedido el maximo de caracteres permitidos"),

    body("description")
      .optional()
      .isLength({ min: 1 })
      .withMessage("El campo a actuaalizar no puede estar vacio ")
      .isLength({ max: 250 })
      .withMessage(`El campo ha excedido el maximo de caracteres permitidos`),

    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser un número mayor o igual a 0"),

    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("El precio debe ser un número mayor o igual a 0"),
  ];
};
