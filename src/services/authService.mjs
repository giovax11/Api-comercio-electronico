import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/password.mjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/customErrors.mjs";

/**
 * @typedef {import("../types/user").User} user
 */

export class authService {
  userRepository;
  /**
   * Constructor
   *
   * @param {userRepository} userRepository - User repository instance
   */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  /**
   * Register a new user
   *
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<user>} - Registered user
   */
  async userRegister(email, password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.userRegister(email, hashedPassword);
    return user;
  }

  /**
   * login user
   *
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<string>} - token
   */
  async loginUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);

    // Compare the provided password with the stored password using bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new CustomError("contraseña incorrecta", 401);
    }
    // Generate a JSON Web Token (JWT) for the logged-in user
    const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }
}
