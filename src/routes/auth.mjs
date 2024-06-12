import express from "express";
import { registerUser, loginUser } from "../controlles/authController.mjs";
import {
  validateRegisterUser,
  validateLogin,
} from "../validators/auth.validators.mjs";

export const authRouter = express.Router();

authRouter.post("/user_register", validateRegisterUser(), registerUser);
authRouter.post("/login", validateLogin(), loginUser);
