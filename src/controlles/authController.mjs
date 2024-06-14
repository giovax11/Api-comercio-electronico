import { authService } from "../services/authService.mjs";
import { request, response } from "express";
import { UserRepository } from "../repositories/auth.repository.mjs";
import { validationResult } from "express-validator";

const userRepository = new UserRepository();
const service = new authService(userRepository);

/**
 * Register a new user
 *
 * @param {request} req
 * @param {response} res
 * @route /api/auth/user_register
 * @method POST
 */

export async function registerUser(req, res, next) {
  try {
    //Validation response from the validation middleware
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await service.userRegister(email, password);
    res.send(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
/**
 *User login
 *
 * @param {request} req
 * @param {response} res
 * @route /api/auth/login
 * @method POST
 */

export async function loginUser(req, res, next) {
  try {
    //Validation response from the validation middleware
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //Generate a new token for the user
    const token = await service.loginUser(email, password);
    //Set token cookie to client with a success response
    res
      .cookie("token", token, {
        httpOnly: true,
        path: "/",
      })
      .status(200)
      .json({
        error: null,
        data: { token },
      });
  } catch (err) {
    next(err);
  }
}
