import express from "express";
import { registerUser, loginUser } from "../controlles/authController.mjs";
import {
  validateRegisterUser,
  validateLogin,
} from "../validators/auth.validators.mjs";

export const authRouter = express.Router();

/**
 * Register a new user
 *
 * Validates the request body using the validateRegisterUser middleware
 * and then calls the registerUser controller function to create a new user
 */
authRouter.post("/register", validateRegisterUser(), registerUser);

/**
 * Login an existing user
 *
 * Validates the request body using the validateLogin middleware
 * and then calls the loginUser controller function to authenticate the user
 */
authRouter.post("/login", validateLogin(), loginUser);
