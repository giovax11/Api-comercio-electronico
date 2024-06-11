import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/password.mjs";
export class authService {
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async userRegister(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await this.userRepository.userRegister(
        email,
        hashedPassword
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
