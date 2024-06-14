import { body } from "express-validator";
import prisma from "../models/prisma/prisma.mjs";
import { PASSWORD_MIN_LENGTH } from "../constants/password.mjs";

// Validate register user request
export const validateRegisterUser = () => {
  return [
    // Email validation
    body("email")
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage("The fiel is required")
      .isEmail()
      .withMessage("Enter a valid email address")
      // Check if email is already registered
      .custom(async (email) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) {
          throw new Error("a user has already registered with this email");
        }
      }),

    // Password validation
    body("password")
      .isLength({ min: PASSWORD_MIN_LENGTH })
      .withMessage(
        `The password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
      )
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
      .withMessage(
        `The password must have at least one capital letter, a number and a special character.`
      ),
  ];
};

// Validate login request
export const validateLogin = () => {
  return [
    body("email")
      .normalizeEmail()
      .not()
      .isEmpty()
      .withMessage("The field is required")
      .isEmail()
      .withMessage("Ingrese un email valido")
      // Check if email is registered
      .custom(async (email) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error("The user entered has not been registered");
        }
      }),
    body("password").not().isEmpty().withMessage("The field is required"),
  ];
};
