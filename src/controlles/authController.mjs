import { UserRepository } from "../repositories/auth.repository.mjs";
import { request, response } from "express";

const repository = new UserRepository();

/**
 *
 * @param {request} req
 * @param {response} res
 * @route /api/auth/user_register
 * @method POST
 */

export async function registerUser(req, res, next) {
  try {
    let password = req.body.password;
    let email = req.body.email;
    const user = await repository.userRegister(email, password);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}
