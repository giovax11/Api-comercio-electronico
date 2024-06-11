import express from "express";
import { registerUser } from "../controlles/authController.mjs";

export const authRouter = express.Router();

authRouter.post('/user_register', registerUser);
