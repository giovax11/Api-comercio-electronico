import { authService } from "../services/authService.mjs";
import { request, response } from "express";
import { UserRepository } from "../repositories/auth.repository.mjs";
import { validationResult } from "express-validator";

const userRepository = new UserRepository();
const service = new authService(userRepository);

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/auth/user_register
 * @method POST
 */

export async function registerUser(req, res, next) {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let password = req.body.password;
    let email = req.body.email;
    const user = await service.userRegister(email, password);
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/auth/login
 * @method POST
 */

export async function loginUser(req, res, next) {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let password = req.body.password;
    let email = req.body.email;
    const token = await service.loginUser(email, password);
    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (err) {
    next(err);
  }
}
