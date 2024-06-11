import express from "express";
import { registerUser } from "../controlles/authController.mjs";
import { validateRegisterUser } from "../validators/auth.validators.mjs";

export const authRouter = express.Router();

authRouter.post("/user_register", validateRegisterUser(), registerUser);
