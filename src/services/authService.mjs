import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/password.mjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../error/customErrors.mjs";

export class authService {
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async userRegister(email, password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await this.userRepository.userRegister(email, hashedPassword);
    return user;
  }
  async loginUser(email, password) {
    const user = await this.userRepository.getUserByEmail(email);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new CustomError("contraseña incorrecta", 401);
    }
    const token = jwt.sign(user, process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }
}
