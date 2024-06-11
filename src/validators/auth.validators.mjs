import { body } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";
import { PASSWORD_MIN_LENGTH } from "../constants/password.mjs";

export const validateRegisterUser = (UserRepository) => {
  return [
    body("email")
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage("El campo es requerido")
      .isEmail()
      .withMessage("Ingrese un email valido")
      .custom(async (email) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
          throw new Error("El email ya está registrado");
        }
      }),
    body("password")
      .isLength({ min: PASSWORD_MIN_LENGTH })
      .withMessage(
        `La contrasena debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .withMessage(`La contrasena debe tener al menos una mayuscula, un numeor y un caracter especial`),
  ];
};
